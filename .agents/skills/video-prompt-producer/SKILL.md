---
name: video-prompt-producer
description: 根据本仓库的系列资料与单集 brief 生成、修订并校验可执行的中文 AI 视频 Prompt；用于本地 Markdown 交付，不生成视频或调用外部视频服务。
---

# Video Prompt Producer

为 `episodes/<episode-id>/brief.md` 产出唯一核心文件 `outputs/<episode-id>/video-prompt.md`。先以 brief 的本集约束为准，再继承 `series/` 的角色和视觉连续性；不要把不确定的事实或外部资产写成已知事实。

## 执行

1. 读取 [内容合同](references/content-contract.md) 与 [输出模板](templates/video-prompt-template.md)。
2. 读取目标 brief，以及它引用的系列资料。缺少关键输入时，在 Prompt 的相应位置标为“待确认”，不要杜撰来源。
3. 严格沿用模板的一级、二级章节和逐段字段。为每个时间段写可拍摄、可剪辑的具体画面，而不是笼统复述故事。
4. 输出到 `outputs/<episode-id>/video-prompt.md`。确保时间段从 `00:00` 连续覆盖到 brief 要求的时长。
5. 执行 `node scripts/validate-video-prompt.mjs outputs/<episode-id>/video-prompt.md`。修复所有错误；校验只确认格式和时间结构，仍需自行检查事实、清晰度与创意是否符合 brief。

## 决策规则

- 将“完整故事”写成因果清楚的观看体验；将“精确时间轴”写成总览；逐段章节负责落实镜头语言。
- 角色可以是人物、拟人角色或明确的无角色镜头，但每段都要说明谁或什么承载行动。
- “参考素材”只列出仓库中已有的资料路径或 brief 提供的资产；没有外部素材时说明“无外部素材，按本系列原创设定制作”。
- 负面约束既要覆盖视觉瑕疵，也要覆盖事实误导、角色漂移和不合适的情绪表达。

参见 [内容合同](references/content-contract.md) 了解必填字段和可检查约束；模板位于 [templates/video-prompt-template.md](templates/video-prompt-template.md)。
