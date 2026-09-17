---
title: "Grok-1"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/models/grok-1.en.mdx"
sourceRel: "pages/models/grok-1.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/models/grok-1.en.mdx"
sourceSha256: "3e6272340858f0d771862b2be09eb0ab841f051a7f9b3bb1c93c683cea352bc2"
pageSha256: "3e6272340858f0d771862b2be09eb0ab841f051a7f9b3bb1c93c683cea352bc2"
contentMode: "local-full"
zh: ""
---

# Grok-1

Grok-1 is a mixture-of-experts (MoE) large language model (LLM) with 314B parameters which includes the open release of the base model weights and network architecture. 

Grok-1 is trained by xAI and consists of MoE model that activates 25% of the weights for a given token at inference time. The pretraining cutoff date for Grok-1 is October 2023.

As stated in the [official announcement](https://x.ai/blog/grok-os), Grok-1 is the raw base model checkpoint from the pre-training phase which means that it has not been fine-tuned for any specific application like conversational agents.

The model has been [released](https://github.com/xai-org/grok-1) under the Apache 2.0 license.

## Results and Capabilities

According to the initial [announcement](https://x.ai/blog/grok), Grok-1 demonstrated strong capabilities across reasoning and coding tasks. The last publicly available results show that Grok-1 achieves 63.2% on the HumanEval coding task and 73% on MMLU. It generally outperforms ChatGPT-3.5 and Inflection-1 but still falls behind improved models like GPT-4. 

!["Grok-1 Benchmark Results"](/mirror/0b/0bad23fb5a982c2ba1218372aa9d7e62ab6a585b.png)

Grok-1 was also reported to score a C (59%) compared to a B (68%) from GPT-4 on the Hungarian national high school finals in mathematics.

!["Grok-1 Benchmark Results"](/mirror/4c/4c1c2a542b0ea9bdc260c2e3a6c52ae1c6368946.png)

Check out the model here: https://github.com/xai-org/grok-1

Due to the size of Grok-1 (314B parameters), xAI recommends a multi-GPU machine to test the model.

## References

- [Open Release of Grok-1](https://x.ai/blog/grok-os)
- [Announcing Grok](https://x.ai/blog/grok)
