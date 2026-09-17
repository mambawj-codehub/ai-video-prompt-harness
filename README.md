# AI Video Prompt Harness

这是一个由 Codex 在本地运行的 AI 视频 Prompt 生产项目，不是应用程序。它不包含 Codex SDK、Agents API、Web 界面、数据库、视频模型适配器或视频生成 API。

全部视频使用《海绵宝宝》的比奇堡作为教育性二创叙事背景，以熟悉角色解释通货膨胀、通货紧缩、市盈率等经济概念。角色的经济身份按当集关系选定，详细规则见 [比奇堡世界观与角色选角](.doc/bikini-bottom-setting.md)。

Codex 在项目根目录启动后，先通过精简的 `AGENTS.md` 找到项目内 Skill 与 `.doc/` 文档地图，再读取系列资料与单集 brief，生成可直接交给视频创作流程使用的 Markdown Prompt，并把结果保存到固定位置：

```text
outputs/<episode-id>/video-prompt.md
```

## 快速使用

1. 在 `episodes/<episode-id>/brief.md` 写清本集目标、时长、受众、必需事实和禁用内容；时长按概念复杂度确定，最长 150 秒。
2. 在项目根目录启动 Codex，并要求它使用 `.agents/skills/video-prompt-producer/SKILL.md` 生成该集 Prompt。
3. Codex 会按 `.doc/workflow.md` 读取 `series/underwater-economics/` 的系列设定与 `.doc/templates/` 中的模板，生成文件并运行校验。

示例产物已生成在 [outputs/001-inflation/video-prompt.md](outputs/001-inflation/video-prompt.md)。

## 校验

项目不依赖 npm 包；本机有 Node.js 即可运行：

```bash
node scripts/validate-video-prompt.mjs outputs/001-inflation/video-prompt.md
```

校验器会检查固定章节、时间轴连续性、逐段分镜字段、负面约束及结尾状态。它验证结构与可执行性，不替代对事实、叙事质量或视觉创意的人工审核。

## 目录

```text
AGENTS.md                              # Codex 的项目地图
.doc/                                  # 项目背景、规则、流程与输出模板的唯一来源
.agents/skills/video-prompt-producer/ # 生成任务的轻量路由 Skill
series/underwater-economics/           # 系列事实资料：角色、设定、视觉连续性
episodes/<episode-id>/brief.md         # 单集事实与交付约束
outputs/<episode-id>/video-prompt.md   # 固定核心产物
scripts/validate-video-prompt.mjs      # 零依赖结构校验器
```

## 工作边界

- `brief.md` 是本集的事实与交付约束来源；系列资料定义跨集连续性。具体优先级见 `.doc/project-background.md`。
- 输出只写可生产的 Prompt，不调用任何视频模型，也不伪称已生成视频。
- 缺少关键事实或参考素材时，Prompt 必须明确标注待确认项，不能编造外部资产或数据。
