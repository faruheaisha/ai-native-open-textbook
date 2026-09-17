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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/10-training-and-data.md"
sourceRel: "publish-pdf/staging/10-training-and-data.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/10-training-and-data.md"
sourceSha256: "72b8ac45ccf488f6af62cdf704acc8a12a82f64f686774cbef90d5410e88bd0d"
pageSha256: "d1a9c21edd8294b99082168f4eda956a6058c26d3f1bdda0e49ba6426cd90f36"
contentMode: "local-full"
zh: ""
---

## BERT 与 GPT 架构对比

### Q：BERT 和 GPT 架构的区别是什么？

> 来源：同程Agent开发实习一面

**新手答**：“BERT 是双向的，GPT 是单向的。”

**高手答**：

核心区别不只是“方向”，而是**预训练目标不同导致能力偏好不同**。

| 维度 | BERT | GPT |
|------|------|-----|
| 架构 | Transformer Encoder（双向注意力） | Transformer Decoder（因果注意力/单向遮蔽） |
| 预训练目标 | MLM（完形填空）+ NSP | 自回归（预测下一个 token） |
| 核心能力 | 理解、分类、匹配 | 生成、推理、续写 |
| 注意力模式 | 每个 token 能看到前后所有 token | 每个 token 只能看到前面的 token |
| 典型应用 | 文本分类、NER、语义相似度、Rerank | 对话生成、代码生成、Agent 推理 |
| 推理方式 | 一次前向得到所有位置的表示 | 逐 token 自回归生成 |

**在 Agent/RAG 系统中的角色分工：**

- **BERT 系列**（包括 RoBERTa、DeBERTa）→ 做 Embedding、Rerank、意图分类。因为双向注意力对“理解文本含义”更强
- **GPT 系列**（包括 LLaMA、Qwen）→ 做生成、推理、规划。因为自回归天然适合“产出新内容”

**常见误区澄清：**
1. “BERT 比 GPT 弱”——不对。在分类和匹配任务上 BERT 类模型通常比同参数 GPT 更好
2. “GPT 不能做理解”——不对。足够大的 GPT 在理解任务上也很强，但用 Decoder 做 Embedding 效率更低
3. “BERT 过时了”——不对。2026 年的 Rerank 模型、Cross-Encoder、Embedding 模型大量基于 BERT 架构

**差距在哪**：面试官问这个基础题是为了看你对 Transformer 的理解是否扎实。只说“双向/单向”是背书，能说出预训练目标的差异如何决定能力偏好，以及在实际 Agent/RAG 系统中的角色分工，说明你理解的是架构设计的“为什么”而非“是什么”。
