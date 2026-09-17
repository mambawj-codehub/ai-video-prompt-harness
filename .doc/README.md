# 文档地图

这里是本仓库所有稳定知识的唯一维护位置：项目背景、生成规则、工作流程和输出模板。`AGENTS.md` 与项目内 Skill 只将 Codex 路由到这里，不重复规则正文。

## 按任务读取

| 任务 | 必读资料 | 再读取 |
| --- | --- | --- |
| 首次进入项目或判断范围 | [项目背景](project-background.md) | [工作流程](workflow.md) |
| 生成或修订某集 Prompt | [工作流程](workflow.md) → [生成规则](generation-rules.md) → [比奇堡世界观与角色选角](bikini-bottom-setting.md) → [输出模板](templates/video-prompt-template.md) | 目标 `brief.md` 与其引用的 `series/` 文件 |
| 排查结构校验失败 | [生成规则](generation-rules.md) | `scripts/validate-video-prompt.mjs` 的报错信息 |
| 新建系列或补充背景 | [项目背景](project-background.md) | `series/<series-id>/` 下的事实资料 |

## 文档职责

- [项目背景](project-background.md)：项目边界、资料优先级和目录职责。
- [生成规则](generation-rules.md)：Prompt 的固定内容合同、时间与不确定信息规则。
- [工作流程](workflow.md)：从输入读取到校验交付的可执行步骤。
- [比奇堡世界观与角色选角](bikini-bottom-setting.md)：所有视频共享的叙事背景、角色锚点与经济角色选用规则。
- [输出模板](templates/video-prompt-template.md)：`video-prompt.md` 的唯一结构来源。

`series/` 与 `episodes/` 保存具体创作事实，不在此处复制；`outputs/` 只保存交付结果。
