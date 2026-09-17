# Prompt 生产工作流程

## 输入与输出

- 输入：`episodes/<episode-id>/brief.md`，以及它引用的 `series/<series-id>/` 事实资料。
- 输出：只写 `outputs/<episode-id>/video-prompt.md`。
- 结构：从 [输出模板](templates/video-prompt-template.md) 开始；不要在输出中保留模板占位符。

## 执行步骤

1. 确认目标 `episode-id`，阅读该集 brief，摘出时长、受众、必须出现的事实和禁止内容。
2. 阅读 [比奇堡世界观与角色选角](bikini-bottom-setting.md)，先确定当集需要哪些经济功能，再从角色表中选角；再阅读 brief 引用的系列资料。
3. 按模板写出完整故事、时间轴和连续分镜。让每个镜头推动一个明确的叙事或理解动作，并让角色行动展示其经济功能。
4. 检查所有事实与素材引用是否来自输入；对缺失信息标记“待确认”。
5. 运行：

   ```bash
   node scripts/validate-video-prompt.mjs outputs/<episode-id>/video-prompt.md
   ```

6. 修复校验错误，再自行审核 brief 中的必须项、禁止项和角色连续性。校验通过后才交付。

## 修改既有输出

只改用户指定集的输出文件。重新生成前先读取原文件，保留仍然符合最新 brief、系列资料和生成规则的内容；不要影响其他 episode 的输出。
