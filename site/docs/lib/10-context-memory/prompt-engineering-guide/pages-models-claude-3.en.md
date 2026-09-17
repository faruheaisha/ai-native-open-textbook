---
title: "Claude 3"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/models/claude-3.en.mdx"
sourceRel: "pages/models/claude-3.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/models/claude-3.en.mdx"
sourceSha256: "92f9add819978b79d3de5211d5f860da40b2a02912648fd268301f9c15f4286b"
pageSha256: "92f9add819978b79d3de5211d5f860da40b2a02912648fd268301f9c15f4286b"
contentMode: "local-full"
zh: ""
---

# Claude 3

Anthropic announces Claude 3, their new family of models that include Claude 3 Haiku, Claude 3 Sonnet, and Claude 3 Opus. 

Claude 3 Opus (the strongest model) is reported to outperform GPT-4 and all other models on common benchmarks like MMLU and HumanEval.

## Results and Capabilities

Claude 3 capabilities include advanced reasoning, basic mathematics, analysis, data extraction, forecasting, content creation, code generation, and converting in non-English languages like Spanish, Japanese, and French. The table below demonstrates how Claude 3 compares with other models on several benchmarks with Claude 3 Opus outperforming all the mentioned models:

!["Claude 3 Benchmarks"](/mirror/dc/dcead692ef8eff0979154ef6db95ac1e9d6eb78d.png)

Claude 3 Haiku is the fastest and most cost-effective model of the series. Claude 3 Sonnet is 2x faster than previous iterations of Claude and Opus is as fast as Claude 2.1 with more superior capabilities.

The Claude 3 models offer support for 200K context windows but can be extended to 1M tokens to select customers. Claude 3 Opus achieved near-perfect recall on the Needle In A Haystack (NIAH) evaluation which measures the model's ability to recall information in a large corpus and effectively process long context prompts.

The models also have strong vision capabilities for processing formats like photos, charts, and graphs. 

!["Claude 3 Vision Capabilities"](/mirror/37/3799121b39b245a51846c79677b115997b5308b2.png)

Anthropic also claim that these models have a more nuanced understanding of requests and make fewer refusals. Opus also shows significant improvements in factual question answering in open-ended questions while reducing incorrect answers or hallucinations. Claude 3 models are also better than the Claude 2 models at producing structured outputs like JSON objects.

## References

- [Claude 3 Haiku, Claude 3 Sonnet, and Claude 3 Opus](https://www.anthropic.com/news/claude-3-family)
- [The Claude 3 Model Family: Opus, Sonnet, Haiku](https://www-cdn.anthropic.com/de8ba9b01c9ab7cbabf5c33b80b7bbc618857627/Model_Card_Claude_3.pdf)
