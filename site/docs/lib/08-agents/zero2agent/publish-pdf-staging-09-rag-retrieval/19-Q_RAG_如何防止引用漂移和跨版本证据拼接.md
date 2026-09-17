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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/09-rag-retrieval.md"
sourceRel: "publish-pdf/staging/09-rag-retrieval.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/09-rag-retrieval.md"
sourceSha256: "485baf2769b08dc4dbf6e4e54a35aeaaaf17f440f97e08141fd1a36f491b9f46"
pageSha256: "0812d4636d049dd880d33e2c9f1dd0ba54e42a0b04918facdb9fad88193c4d80"
contentMode: "local-full"
zh: ""
---

## Q：RAG 如何防止引用漂移和跨版本证据拼接？

> 来源：腾讯互娱全栈开发（AI）二面（2026-08-13）

**新手答**：“让模型输出引用编号，生成后检查编号存在。”

**高手答**：证据块携带稳定 citation ID、文档/版本、章节区间、内容哈希和 ACL；模型只能选择本次允许的 ID。合并相邻块前验证版本、连续位置和权限一致，生成后逐 claim 检查引用是否真正支持结论。无法映射的断言删除、降级为不确定或触发补检索，不能只验证“编号存在”。

**差距在哪**：新手验证格式，高手验证证据身份、连续性和语义支撑。
