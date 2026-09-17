---
title: "What is Groq?"
sourceId: "10-context-memory/prompt-engineering-guide"
sourceTitle: "Prompt Engineering Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide"
entryUrl: "https://github.com/dair-ai/Prompt-Engineering-Guide/blob/57673726396dd94acb23bdb1e67f27c78ee85a8e/pages/research/groq.en.mdx"
sourceRel: "pages/research/groq.en.mdx"
rawUrl: "/raw/10-context-memory/prompt-engineering-guide/pages/research/groq.en.mdx"
sourceSha256: "f8de82816526f6290ff24be478c40919af50d39488c160c8deb37a6470369981"
pageSha256: "f8de82816526f6290ff24be478c40919af50d39488c160c8deb37a6470369981"
contentMode: "local-full"
zh: ""
---

# What is Groq?

[Groq](https://groq.com/) recently made a lot of headlines as one of the fastest LLM inference solutions available today. There is a lot of interest from LLM practitioners to reduce the latency in LLM responses. Latency is an important metric to optimize and enable real-time AI applications. There are many companies now in the space competing around LLM inference. 

Groq is one of those LLM inference companies that claim, at the time of writing this post, 18x faster inference performance on [Anyscale's LLMPerf Leaderboard](https://github.com/ray-project/llmperf-leaderboard) compared to other top cloud-based providers. Groq currently makes available models like Meta AI's Llama 2 70B and Mixtral 8x7B via their APIs. These models are powered by Groq LPU™ Inference Engine which is built with their own custom hardware designed for running LLMs called language processing units (LPUs).

According to to Groq's FAQs, LPU helps to reduce the amount of time per word calculated, enabling faster text sequence generation. You can read more about the technical details of LPU and its benefits in their ISCA-awarded [2020](https://wow.groq.com/groq-isca-paper-2020/) and [2022](https://wow.groq.com/isca-2022-paper/) papers. 

Here is a chart with the speed and pricing for their models:

!["Groq pricing"](/mirror/86/865eeb1d3feb2cbd34e70858041f18bc765c82bf.png)

The chart below compares the output tokens throughput (tokens/s) which is the average number of output tokens returned per second. The numbers in the chart correspond to the mean output tokens throughput (based on 150 requests) of the LLM inference providers on the Llama 2 70B model.

!["LLMPerf Leaderboard"](https://github.com/ray-project/llmperf-leaderboard/blob/main/.assets/output_tokens_per_s.jpg?raw=true)

Another important factor of LLM inference, especially for streaming applications, is called time to first token (TTFT) which corresponds to the duration of time that the LLM returns the first token. Below is a chart showing how different LLM inference providers perform:

!["time to first token (seconds)"](https://github.com/ray-project/llmperf-leaderboard/blob/main/.assets/ttft.jpg?raw=true)

You can read more about Groq's LLM inference performance on Anyscale’s LLMPerf Leaderboard [here](https://wow.groq.com/groq-lpu-inference-engine-crushes-first-public-llm-benchmark/).
