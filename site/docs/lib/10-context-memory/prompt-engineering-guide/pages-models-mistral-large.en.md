---
title: "Mistral Large"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/models/mistral-large.en.mdx"
sourceRel: "pages/models/mistral-large.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/models/mistral-large.en.mdx"
sourceSha256: "58d23da1df5f1c3428b17b5eb9b6a2d3e58866b15c0a9d9e5b784c6247a85560"
pageSha256: "58d23da1df5f1c3428b17b5eb9b6a2d3e58866b15c0a9d9e5b784c6247a85560"
contentMode: "local-full"
zh: ""
---

# Mistral Large

Mistral AI releases Mistral, their most advanced large language model (LLM) with strong multilingual, reasoning, maths, and code generation capabilities. Mistral Large is made available through Mistral platform called la Plataforme and Microsoft Azure. It's also available to test in their new chat app, [le Chat](https://chat.mistral.ai/).

Below is a chart showing how Mistral Large compares with other powerful LLMs like GPT-4 and Gemini Pro. It ranks second next to GPT-4 on the MMLU benchmark with a score of 81.2%. 

!["Mistral Large Performance"](/mirror/78/78a2245bf1d6d3979bad0e48ad166d315fc1105b.png)

## Mistral Large Capabilities

Mistral Large's capabilities and strengths include:

- 32K tokens context window
- has native multilingual capacities (fluent in English, French, Spanish, German, and Italian)
- strong capabilities in reasoning, knowledge, maths, and coding benchmarks
- function calling and JSON format natively supported
- a low-latency model called Mistral Small was also released
- allows developers to design moderation policies with its precise instruction-following 

### Reasoning and Knowledge

The table below shows how Mistral Large performs on common reasoning and knowledge benchmarks. It largely falls behind GPT-4 but it's the superior model compared to other LLMs like Claude 2 and Gemini Pro 1.0.

!["Mistral Large Performance"](/mirror/a8/a8e3f72a7aa702c9b55225278db28987196cbfa8.png)

### Maths & Code Generation

The table below shows how Mistral Large performs on common maths and coding benchmarks. Mistral Large demonstrates strong performance on the Math and GSM8K benchmarks but it is significantly outperformed on coding benchmarks by models like Gemini Pro and GPT-4. 

!["Mistral Large Performance"](/mirror/21/218a201f1ef3bfa9a00cf453d2d9bcdcef7781ab.png)

### Multilinguality

The table below demonstrates Mistral Large performance on multilingual reasoning benchmarks. Mistral Large outperforms Mixtral 8x7B and Llama 2 70B in all languages, including French, German, Spanish, and Italian.

!["Mistral Large Performance"](/mirror/8f/8f7de9accd167d9ca58904b37e7f119693f86650.png)

## Mistral Small

In addition to the release of Mistral Large, a smaller model and optimized model called Mistral Small is also announced. Mistral Small is optimized for low-latency workloads and outperforms Mixtral 8x7B. Mistral AI reports that this model has strong capacities around RAG-enablement, function calling, and JSON format. 

## Mistral Endpoints and Model Selection

[Here](https://docs.mistral.ai/platform/endpoints/) is a list of all the endpoints provided by Mistral AI. 

Mistral AI has also published a comprehensive [guide](https://docs.mistral.ai/guides/model-selection/) on better model selection when considering performance and cost trade-offs.

*Figures source: https://mistral.ai/news/mistral-large/*
