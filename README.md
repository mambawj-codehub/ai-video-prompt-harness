# AI Video Prompt Harness

这是一个由 Codex 在本地运行的 AI 视频 Prompt 生产项目，不是应用程序。它不包含 Codex SDK、Agents API、Web 界面、数据库、视频模型适配器或视频生成 API。

Codex 在项目根目录启动后，读取本仓库的 `AGENTS.md`、项目内 Skill、系列资料与单集 brief，生成可直接交给视频创作流程使用的 Markdown Prompt，并把结果保存到固定位置：

```text
outputs/<episode-id>/video-prompt.md
```

## 快速使用

1. 在 `episodes/<episode-id>/brief.md` 写清本集目标、时长、受众、必需事实和禁用内容。
2. 在项目根目录启动 Codex，并要求它使用 `.agents/skills/video-prompt-producer/SKILL.md` 生成该集 Prompt。
3. Codex 会读取 `series/underwater-economics/` 的系列设定，复制输出模板的结构，生成文件并运行校验。

示例产物已生成在 [outputs/001-inflation/video-prompt.md](outputs/001-inflation/video-prompt.md)。

## 校验

项目不依赖 npm 包；本机有 Node.js 即可运行：

```bash
node scripts/validate-video-prompt.mjs outputs/001-inflation/video-prompt.md
```

校验器会检查固定章节、时间轴连续性、逐段分镜字段、负面约束及结尾状态。它验证结构与可执行性，不替代对事实、叙事质量或视觉创意的人工审核。

## 目录

```text
.agents/skills/video-prompt-producer/  # Codex 执行的项目内 Skill、参考规则和模板
series/underwater-economics/           # 系列世界观、角色与视觉连续性资料
episodes/<episode-id>/brief.md         # 单集创作输入
outputs/<episode-id>/video-prompt.md   # 固定核心产物
scripts/validate-video-prompt.mjs      # 零依赖结构校验器
```

## 工作边界

- `brief.md` 是本集的事实与交付约束来源；系列资料定义跨集连续性。
- 输出只写可生产的 Prompt，不调用任何视频模型，也不伪称已生成视频。
- 缺少关键事实或参考素材时，Prompt 必须明确标注待确认项，不能编造外部资产或数据。
