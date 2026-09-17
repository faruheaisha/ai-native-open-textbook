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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/01-architecture-design.md"
sourceRel: "publish-pdf/staging/01-architecture-design.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/01-architecture-design.md"
sourceSha256: "5392c35240d8ade29e7a3bd3d16f639416d4d44c3540bc40d195968737985cc6"
pageSha256: "69d3d4b9a64a6eb0bae8a5422500cb34f67d6123fbf7dae75b56f1cbc6d2d397"
contentMode: "local-full"
zh: ""
---

## Q：设计一个内部的多源文档问答 AI，架构设计是什么？

> 来源：百度/AI智能体开发一面

**新手答**：“用 RAG 就行，把文档切块建索引。”

**高手答**：

这是一道场景设计题，核心约束在“多源”二字——不同来源的文档格式、权限、时效性各不相同，不是单纯的 RAG 能解决的。

**整体架构分五层**：

**1. 数据接入层**：对接多种文档源（Confluence、飞书文档、内部 Wiki、PDF、代码仓库），每种源一个 connector，统一输出标准化文档格式。

**2. 文档处理层**：解析（PDF→文本、表格→markdown）→ 切块（语义切分，保持章节完整性）→ 元数据提取（来源、更新时间、权限标签、作者）。

**3. 索引层**：双路索引（向量索引 + BM25 倒排索引），附带权限标签索引（用于检索时过滤无权限文档）。

**4. 检索增强层**：Query 改写 → 多路召回 → Rerank → 权限过滤 → 时效性加权（近期文档分数 boost）。

**5. 生成层**：检索结果 + System Prompt + 引用要求 → LLM 生成答案（带来源标注）。

**多源场景的特殊挑战及解法**：

| 挑战 | 解法 |
|------|------|
| 权限隔离 | 每个文档块带 ACL 标签，检索时按用户身份过滤——不能让 A 部门的人看到 B 部门的机密文档 |
| 信息冲突 | 同一主题多个源说法不同 → 生成时标注每个观点的来源，让用户自行判断 |
| 时效性 | 文档有新旧版本 → 旧版本降权但不删除（可能有“当时为什么这么决定”的查询需求） |
| 增量更新 | 各源更新频率不同 → webhook/轮询混合策略，增量重建索引而非全量 |

**差距在哪**：新手只说了“用 RAG”，把问题简化成了单一数据源的检索生成。高手的回答展示了完整的五层架构，且重点解决了多源场景特有的四个挑战——权限隔离、信息冲突、时效性、增量更新。面试官考的是系统设计能力——不只是 RAG 本身，而是“如何将 RAG 嵌入到一个有权限控制、多数据源、增量更新的企业级系统中”。
