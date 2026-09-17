# 项目地图

本仓库是本地 AI 视频 Prompt 生产 harness；唯一交付物为 `outputs/<episode-id>/video-prompt.md`。

| 要完成的事 | 从这里开始 |
| --- | --- |
| 生成或修订视频 Prompt | `.agents/skills/video-prompt-producer/SKILL.md` |
| 理解项目范围、资料优先级与目录职责 | `.doc/README.md` |
| 查看单集事实输入 | `episodes/<episode-id>/brief.md` |
| 查看系列角色与视觉连续性 | `series/<series-id>/` |
| 检查最终文件 | `scripts/validate-video-prompt.mjs` |

只写入目标集的 `outputs/<episode-id>/video-prompt.md`，并在交付前运行校验脚本。项目规则、背景说明、流程和模板统一维护在 `.doc/`；不要在 `AGENTS.md` 或 Skill 中复制它们。
