---
title: "高效处理无限长文本的Transformer模型"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/infini-attention.zh.mdx"
sourceRel: "pages/research/infini-attention.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/infini-attention.zh.mdx"
sourceSha256: "151117f0ceaaffddf97d5fb6968d0d5b8827cbe118a52c3ef1b7965c03704803"
pageSha256: "151117f0ceaaffddf97d5fb6968d0d5b8827cbe118a52c3ef1b7965c03704803"
contentMode: "local-full"
zh: ""
---

# 高效处理无限长文本的Transformer模型

Google的[最新研究](https://arxiv.org/abs/2404.07143)在标准的点积注意力机制中整合了压缩内存技术。

这项技术的目标是让Transformer大语言模型能够使用有限的内存足迹和计算资源，有效地处理长度几乎无限的输入数据。

研究团队提出了一种名为Infini-attention的新型注意力技术，它将一个压缩内存模块融入到了标准的注意力机制中。

!["Infini-Attention"](/mirror/ac/ac04954561d48ac479a9ada95b4afcc2b974c603.png)

Infini-attention技术在单个Transformer模块中结合了局部掩蔽注意力和长期线性注意力，这使得Infini-Transformer模型能够高效地同时处理长距离和短距离的上下文依赖。

使用这种技术，模型在处理长文本的语言建模任务中，性能超越了现有的标准模型，内存使用量压缩了114倍。

研究还表明，一个拥有100亿参数的大语言模型可以轻松处理长度为100万的数据序列，而一个拥有800亿参数的模型在处理50万字符长度的书籍摘要任务上，取得了当前最佳的成绩。

随着处理长文本的大型语言模型变得越来越重要，通过高效的内存系统，这些模型将能更好地进行推理、规划和持续学习，展现出更加强大的问题处理能力。
