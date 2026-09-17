---
title: "利用 RAG 降低结构化输出中的虚假信息"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/rag_hallucinations.zh.mdx"
sourceRel: "pages/research/rag_hallucinations.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/rag_hallucinations.zh.mdx"
sourceSha256: "c8031c971b63472c5bbde761a489da07f2c333c7dd6923304cee221dd14d6785"
pageSha256: "c8031c971b63472c5bbde761a489da07f2c333c7dd6923304cee221dd14d6785"
contentMode: "local-full"
zh: ""
---

# 利用 RAG 降低结构化输出中的虚假信息

ServiceNow 的研究人员发表了一篇[新论文](https://arxiv.org/abs/2404.08189)，探讨了如何为结构化输出任务高效部署 RAG 系统。

!["RAG Hallucination"](/mirror/21/21ca5ec237becb45c45364a7f847634a638a6f2d.png)

RAG 系统整合了小型语言模型和极小型检索器。研究表明，RAG 使得在资源受限的环境下部署强大的 LLM 驱动的系统成为可能，同时减轻了虚假信息问题并提升了输出的可靠性。

论文讨论了一种极具实用价值的企业应用，即将自然语言需求转换为工作流程（以 JSON 格式）。这项任务能够极大提升生产力，尽管还有许多优化空间（例如，采用推测性解码或使用 YAML 代替 JSON）。

论文提供了关于如何在现实世界中有效开发 RAG 系统的宝贵见解和实用建议。
