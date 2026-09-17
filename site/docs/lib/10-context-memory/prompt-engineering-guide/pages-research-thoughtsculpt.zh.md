---
title: "大语言模型的中间修订与搜索推理"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/thoughtsculpt.zh.mdx"
sourceRel: "pages/research/thoughtsculpt.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/thoughtsculpt.zh.mdx"
sourceSha256: "92b9074aba24612b7e714205652394e616716fbd495a6ca28dffe34e5db8f665"
pageSha256: "92b9074aba24612b7e714205652394e616716fbd495a6ca28dffe34e5db8f665"
contentMode: "local-full"
zh: ""
---

# 大语言模型的中间修订与搜索推理

[Chi 等人（2024）的研究](https://arxiv.org/abs/2404.05966))提出了一种用于可分解为组件的任务的通用推理和搜索方法。

他们提出的基于图的框架——THOUGHTSCULPT，融入了迭代自我修正的能力，允许大语言模型构建一个交织的思维网络。

与 Tree-of-thoughts 这样使用树形结构塑造推理过程的方法不同，这个新方法结合了蒙特卡洛树搜索（MCTS）来高效地导航搜索空间。

这个新方法使用了一个由大语言模型驱动的思维评估器来对候选的部分输出提供反馈。然后一个思维生成器组件产生可能的解决方案。思维评估器和思维生成器组成了扩展阶段，这一阶段有助于改进当前的解决方案。

!["ThoughtSculpt"](/mirror/8e/8ef8dd75a72fa09ad80ce6722d60062978426f3c.png)

最后，决策模拟器（作为 MCTS 过程的一部分）模拟连续的思维线索来评估一条路径的潜在价值。

由于其能够持续迭代思维，THOUGHTSCULPT 特别适合于诸如开放式生成、多步骤推理和创造性构思等任务。

我们可能会看到更多使用类似概念和搜索算法的先进方法，以提高大语言模型的推理能力，并增强处理需要复杂推理和规划的问题的能力。这是一篇跟踪这一研究趋势的好论文。
