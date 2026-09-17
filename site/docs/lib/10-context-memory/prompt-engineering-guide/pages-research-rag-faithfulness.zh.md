---
title: "RAG 模型的忠实度如何？"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/rag-faithfulness.zh.mdx"
sourceRel: "pages/research/rag-faithfulness.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/rag-faithfulness.zh.mdx"
sourceSha256: "d9b16f6f94fe01104ad3be172b514d78d0cc71fb66f61ed7ea2bd5cc39cc9b4d"
pageSha256: "d9b16f6f94fe01104ad3be172b514d78d0cc71fb66f61ed7ea2bd5cc39cc9b4d"
contentMode: "local-full"
zh: ""
---

# RAG 模型的忠实度如何？

[Wu 等人（2024）的研究](https://arxiv.org/abs/2404.10198)旨在衡量 RAG 与 LLM 内部先验之间的角力。

研究重点分析了 GPT-4 和其他 LLMs 在问答任务上的表现。

研究发现，提供准确检索信息能显著减少模型错误，达到 94% 的准确率。

!["RAG Faithfulness"](/mirror/dd/dd92cd1f5b2fd38cf5fce8ee54d2be2a9e43e230.png)
*来源：[Wu et al. (2024)](https://arxiv.org/abs/2404.10198)*

当文档中的错误信息增多且 LLM 的内部先验较弱时，LLM 更倾向于重复错误信息。但是，当 LLM 拥有较强的先验时，它们对此类错误的抵抗力更强。

论文还指出，修改后的信息与模型先验的差异越大，模型选择这种信息的可能性就越小。

由于许多开发者和公司已经在生产环境中使用 RAG 系统，这项工作强调了在使用大型语言模型时，评估上下文信息中的支持性、矛盾性和错误性内容的重要性。
