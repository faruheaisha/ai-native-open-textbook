---
title: "Build your own content fact-checker with OpenAI gpt-oss-120B, Cerebras, and Parallel"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/articles/gpt-oss/build-your-own-fact-checker-cerebras.md"
sourceSha256: "c23ee72ef44cd43583465f3b05986ec7af53affda1156cc299c50330f84b3efc"
pageSha256: "32e83075b0a2e255cd573aa3302654cbff5caf16d08291f64a7800af9c996699"
contentMode: "local-full"
zh: ""
---

# **Build your own content fact-checker with OpenAI gpt-oss-120B, Cerebras, and Parallel**

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

Ever read an article only to discover later that some of the “facts” were fabricated? As information becomes more abundant, verifying its accuracy has become increasingly challenging.

This guide provides a practical, automated way to assess factual accuracy at scale. It extracts claims from any text or URL, retrieves real-world evidence, and evaluates each claim using gpt-oss-120B powered by Cerebras ultra low latency inference.

See demo here: [Content Fact-Checker](https://oss.parallel.ai/agents/cerebras-fact-checker).

For this guide, set up the following accounts: 

- Cerebras API: the fastest inference provider, [get started for free here.](https://cloud.cerebras.ai/?utm_source=DevX&utm_campaign=parallel)

- Parallel API: The search engine for AI, [get started for free here.](https://platform.parallel.ai/)

Learn more about best practices of gpt-oss-120B [here](https://openai.com/index/introducing-gpt-oss/).

## 本篇目录

- [Step 1: Environment Setup (Colab or local)](https://developers.openai.com/cookbook)
- [Step 2: Set up the LLM](https://developers.openai.com/cookbook)
- [Step 3: Connect the LLM to the web](https://developers.openai.com/cookbook)
- [Step 4 – Organize and summarize web results](https://developers.openai.com/cookbook)
- [Step 5 – Find the claims to verify](https://developers.openai.com/cookbook)
- [Step 6 – Check claims against evidence (true / false / uncertain)](https://developers.openai.com/cookbook)
- [Step 7 - Fact-check an entire text](https://developers.openai.com/cookbook)
- [Step 8: Fact check directly from a URL](https://developers.openai.com/cookbook)
- [Examples](https://developers.openai.com/cookbook)
