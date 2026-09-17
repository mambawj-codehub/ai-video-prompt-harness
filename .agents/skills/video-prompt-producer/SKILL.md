---
name: video-prompt-producer
description: 根据本仓库的系列资料与单集 brief 生成、修订并校验可执行的中文 AI 视频 Prompt；用于本地 Markdown 交付，不生成视频或调用外部视频服务。
---

# Video Prompt Producer

为 `episodes/<episode-id>/brief.md` 产出唯一核心文件 `outputs/<episode-id>/video-prompt.md`。详细规则由 `.doc/` 统一维护，本 Skill 只负责把任务路由到正确资料。

## 执行

1. 读取 [.doc 文档地图](../../../.doc/README.md)，再依序读取其指向的项目背景、生成规则、工作流程和输出模板。
2. 根据工作流程读取目标 brief 与它引用的系列资料，生成或修订目标输出文件。
3. 按工作流程运行 `node scripts/validate-video-prompt.mjs outputs/<episode-id>/video-prompt.md`，修复校验错误后交付。

规则和模板的唯一位置：[`.doc/`](../../../.doc/README.md)。
