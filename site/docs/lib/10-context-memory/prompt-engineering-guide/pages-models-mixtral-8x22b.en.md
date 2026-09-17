---
title: "Mixtral 8x22B"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/models/mixtral-8x22b.en.mdx"
sourceRel: "pages/models/mixtral-8x22b.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/models/mixtral-8x22b.en.mdx"
sourceSha256: "38fceb470ded3a7f28bb1ddaffb168c6718714ba59286f1e4e6be4ce3bb50acc"
pageSha256: "38fceb470ded3a7f28bb1ddaffb168c6718714ba59286f1e4e6be4ce3bb50acc"
contentMode: "local-full"
zh: ""
---

# Mixtral 8x22B

Mixtral 8x22B is a new open large language model (LLM) released by Mistral AI. Mixtral 8x22B is characterized as a sparse mixture-of-experts model with 39B active parameters out of a total of 141B parameters. 

## Capabilities

Mixtral 8x22B is trained to be a cost-efficient model with capabilities that include multilingual understanding, math reasoning, code generation, native function calling support,  and constrained output support. The model supports a context window size of 64K tokens which enables high-performing information recall on large documents. 

Mistral AI claims that Mixtral 8x22B delivers one of the best performance-to-cost ratio community models and it is significantly fast due to its sparse activations. 

!["Mixtral 8x22B Performance"](/mirror/99/99faa30fbec5787b36ddb6de62562ff9ed2d20ed.png)
*Source: [Mistral AI Blog](https://mistral.ai/news/mixtral-8x22b/)*

## Results

According to the [official reported results](https://mistral.ai/news/mixtral-8x22b/), Mixtral 8x22B (with 39B active parameters) outperforms state-of-the-art open models like Command R+ and Llama 2 70B on several reasoning and knowledge benchmarks like MMLU, HellaS, TriQA, NaturalQA, among others.

!["Mixtral 8x22B Reasoning and Knowledge Performance"](/mirror/dc/dcdcd69a7dca26df0a5f81af8a4b2d05ca806e4e.png)
*Source: [Mistral AI Blog](https://mistral.ai/news/mixtral-8x22b/)*

Mixtral 8x22B outperforms all open models on coding and math tasks when evaluated on benchmarks such as GSM8K, HumanEval, and Math. It's reported that Mixtral 8x22B Instruct achieves a score of 90% on GSM8K (maj@8).

!["Mixtral 8x22B Reasoning and Knowledge Performance"](/mirror/06/06896b2ab8fc062b0e31549756637b90ac2c9869.png)
*Source: [Mistral AI Blog](https://mistral.ai/news/mixtral-8x22b/)*

More information on Mixtral 8x22B and how to use it here: https://docs.mistral.ai/getting-started/open_weight_models/#operation/listModels

The model is released under an Apache 2.0 license.
