#!/usr/bin/env node

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const input = process.argv[2];
const requiredHeadings = [
  '视频目标', '全局视觉风格', '角色和参考素材', '完整故事', '精确时间轴',
  '分镜与时间轴', '连续性要求', '负面约束', '结尾状态',
];
const sceneFields = ['场景', '角色', '画面构图', '角色动作', '摄影机运动', '对白和旁白', '连续性要求'];

function seconds(timestamp) {
  const match = /^(\d{2}):(\d{2})$/.exec(timestamp);
  if (!match || Number(match[2]) > 59) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function sectionBody(markdown, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const headingMatch = new RegExp(`^## ${escaped}\\s*$`, 'm').exec(markdown);
  if (!headingMatch || headingMatch.index === undefined) return '';
  const contentStart = headingMatch.index + headingMatch[0].length;
  const remaining = markdown.slice(contentStart);
  const nextHeading = /^## /m.exec(remaining);
  return remaining.slice(0, nextHeading?.index).trim();
}

if (!input) {
  console.error('用法：node scripts/validate-video-prompt.mjs <video-prompt.md>');
  process.exit(2);
}

const file = resolve(input);
if (!existsSync(file)) {
  console.error(`错误：找不到文件：${file}`);
  process.exit(2);
}

const markdown = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const errors = [];
if (!/^# Video Prompt：.+/m.test(markdown)) errors.push('缺少一级标题“# Video Prompt：<episode-id>｜<集标题>”。');
for (const heading of requiredHeadings) {
  if (!new RegExp(`^## ${heading}\\s*$`, 'm').test(markdown)) errors.push(`缺少固定章节：${heading}。`);
}
for (const heading of ['角色和参考素材', '完整故事', '精确时间轴', '分镜与时间轴', '连续性要求', '负面约束', '结尾状态']) {
  if (!sectionBody(markdown, heading)) errors.push(`固定章节“${heading}”不能为空。`);
}

const objective = sectionBody(markdown, '视频目标');
for (const label of ['受众', '总时长', '观看后应理解或感受到', '核心问题']) {
  if (!new RegExp(`^- ${label}：\\s*\\S`, 'm').test(objective)) errors.push(`“视频目标”缺少非空字段：${label}。`);
}
const style = sectionBody(markdown, '全局视觉风格');
for (const label of ['媒介与质感', '光线与色彩', '画幅与构图', '屏幕文字', '音乐与声景']) {
  if (!new RegExp(`^- ${label}：\\s*\\S`, 'm').test(style)) errors.push(`“全局视觉风格”缺少非空字段：${label}。`);
}

const timeline = sectionBody(markdown, '精确时间轴');
if (!/^\|\s*时间段\s*\|/m.test(timeline)) errors.push('“精确时间轴”缺少时间段表格。');
const references = sectionBody(markdown, '角色和参考素材');
if (!/^\|\s*对象\s*\|/m.test(references)) errors.push('“角色和参考素材”缺少对象参考表格。');
const scenesBody = sectionBody(markdown, '分镜与时间轴');
const sceneHeaders = [...scenesBody.matchAll(/^### (\d{2}:\d{2})-(\d{2}:\d{2})\s*$/gm)];
const scenes = sceneHeaders.map((header, index) => {
  const bodyStart = header.index + header[0].length;
  const bodyEnd = sceneHeaders[index + 1]?.index ?? scenesBody.length;
  return [header[0], header[1], header[2], scenesBody.slice(bodyStart, bodyEnd)];
});
if (scenes.length === 0) errors.push('“分镜与时间轴”至少需要一个“### MM:SS-MM:SS”分镜。');

let previousEnd = 0;
for (const [index, match] of scenes.entries()) {
  const [, startText, endText, body] = match;
  const start = seconds(startText);
  const end = seconds(endText);
  const prefix = `分镜 ${index + 1}（${startText}-${endText}）`;
  if (start === null || end === null || end <= start) errors.push(`${prefix} 的时间格式或顺序无效。`);
  if (start !== previousEnd) errors.push(`${prefix} 未与上一段连续；应从 ${String(Math.floor(previousEnd / 60)).padStart(2, '0')}:${String(previousEnd % 60).padStart(2, '0')} 开始。`);
  if (end !== null && end > start) previousEnd = end;
  for (const field of sceneFields) {
    if (!new RegExp(`^- ${field}：\\s*\\S`, 'm').test(body)) errors.push(`${prefix} 缺少非空字段：${field}。`);
  }
  if (!timeline.includes(startText) || !timeline.includes(endText)) errors.push(`${prefix} 未在“精确时间轴”中出现。`);
}

const statedDuration = objective.match(/^- 总时长：\s*(\d+)\s*秒/m);
if (!statedDuration) errors.push('“视频目标”的总时长必须写成“<整数> 秒”。');
else if (scenes.length > 0 && previousEnd !== Number(statedDuration[1])) errors.push(`分镜终点为 ${previousEnd} 秒，与声明总时长 ${statedDuration[1]} 秒不一致。`);

const negative = sectionBody(markdown, '负面约束');
if ((negative.match(/^\s*-\s+\S/gm) ?? []).length < 5) errors.push('“负面约束”至少需要五条非空条目。');
const ending = sectionBody(markdown, '结尾状态');
for (const label of ['最终画面', '最后一句音频', '观众带走的结论']) {
  if (!new RegExp(`^- ${label}：\\s*\\S`, 'm').test(ending)) errors.push(`“结尾状态”缺少非空字段：${label}。`);
}

if (errors.length > 0) {
  console.error(`校验失败：${file}`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`校验通过：${file}（${scenes.length} 个连续分镜，${previousEnd} 秒）`);
