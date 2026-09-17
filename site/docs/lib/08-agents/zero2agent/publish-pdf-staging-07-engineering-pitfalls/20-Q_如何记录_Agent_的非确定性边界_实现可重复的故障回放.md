---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/07-engineering-pitfalls.md"
sourceRel: "publish-pdf/staging/07-engineering-pitfalls.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/07-engineering-pitfalls.md"
sourceSha256: "7be5d79d7f9b134845ed49bebe8aa81acea85d81cc9c8aa99f6133ad085da81e"
pageSha256: "4f330df0661c465cf0145f306de479030606071f46be44d34f4972a8b92cc9ec"
contentMode: "local-full"
zh: ""
---

## Q：如何记录 Agent 的非确定性边界，实现可重复的故障回放？

> 来源：腾讯互娱全栈开发（AI）二面（2026-08-13）【字节火山引擎 Managed Agent 一面追问：记录耗时、Token、结果和失败路线】

**新手答**：“保存完整日志，回放时设置相同 temperature。”

**高手答**：确定性回放不要求模型再次生成相同文本，而是记录每个非确定性边界的请求哈希和结果：模型响应、检索快照、工具返回、随机种子、时间、配置和运行时版本。每轮还应写入 `run_id/step_id/parent_step_id`、开始结束时间、输入输出 Token、费用、状态、失败类型和下一条路线，让系统能重建时间线、成本和分支因果关系。回放默认注入历史结果，只重跑指定节点；有副作用的工具使用模拟器或只读影子环境。若请求哈希变化，应明确标记无法复用，而不是静默加载旧结果。

**差距在哪**：新手依赖随机种子，高手把外部世界和模型输出都变成可替换的事件记录。
