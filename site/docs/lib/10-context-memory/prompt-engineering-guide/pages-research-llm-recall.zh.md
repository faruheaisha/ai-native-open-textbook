---
title: "大型语言模型的上下文记忆受提示影响"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/llm-recall.zh.mdx"
sourceRel: "pages/research/llm-recall.zh.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/llm-recall.zh.mdx"
sourceSha256: "ca3d5d30cb580c83023e3e61906fe645d08b328a0335efc4bcf23e2e77479e22"
pageSha256: "ca3d5d30cb580c83023e3e61906fe645d08b328a0335efc4bcf23e2e77479e22"
contentMode: "local-full"
zh: ""
---

# 大型语言模型的上下文记忆受提示影响

[Machlab 和 Battle（2024）的新研究](https://arxiv.org/abs/2404.08865)分析了不同大型语言模型在“大海捞针”测试中的上下文记忆性能。

研究表明，各种大型语言模型回忆事实的长度和位置各不相同，且模型回忆性能对提示的微小变化非常敏感。

!["Needle In the HayStack Performance"](/mirror/f5/f597c3fcca711160070a7178942c6f13092b290b.png)
*来源：[Machlab and Battle (2024)](https://arxiv.org/abs/2404.08865)*

此外，提示内容与训练数据之间的相互作用可能会降低回答的质量。

模型的回忆能力可以通过增加模型大小、增强注意力机制、尝试不同的训练策略和进行微调来提高。

论文提供了一个重要的实用建议：“通过持续的评估，可以更好地了解不同LLM在特定用例中的表现，从而做出更明智的选择，以最大化它们在实际应用中的影响力和效率。随着技术的不断发展，这种评估和选择过程将变得更加重要和有效。”

研究的结论是，谨慎设计提示、建立持续的评估协议，并测试不同的模型改进策略对于提高记忆和实用性至关重要。
