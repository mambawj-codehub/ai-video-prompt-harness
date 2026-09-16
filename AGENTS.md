# AI 视频 Prompt 生产约定

本仓库的唯一交付物是 `outputs/<episode-id>/video-prompt.md`。这是一个供 Codex harness 读取并执行项目内容的本地工作流，不是软件产品：不得新增 SDK、API 服务、网页、数据库、视频模型适配器或视频生成调用。

## 生成流程

当用户要求生成或修改某集视频 Prompt 时：

1. 读取 `.agents/skills/video-prompt-producer/SKILL.md`，再按其指引读取模板与参考资料。
2. 读取对应 `episodes/<episode-id>/brief.md` 和相关 `series/` 资料；单集 brief 的明确要求优先于系列资料。
3. 只在 `outputs/<episode-id>/video-prompt.md` 写入该集最终产物，保持现有其他集输出不变。
4. 运行 `node scripts/validate-video-prompt.mjs outputs/<episode-id>/video-prompt.md`，修复所有错误后才交付。

## 内容底线

- 用中文写作；时间使用 `MM:SS-MM:SS`，相邻分镜首尾必须连续。
- 逐段分镜必须明确：场景、角色、画面构图、角色动作、摄影机运动、对白和旁白、连续性要求。
- 事实数字、角色、品牌与参考资产不得凭空编造。缺失时写为“待确认”，并让画面仍可执行。
- 视觉描述必须服务叙事与连续性，避免只写抽象形容词或模型参数堆砌。
- 不覆盖无关文件；不要把校验通过误称为事实或审美审核通过。
