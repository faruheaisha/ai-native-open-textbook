---
title: "OpenAI API 文档（英文）"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/structured-outputs.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/structured-outputs.md"
sourceSha256: "5aa9479e1f6b87ae01d05d8f478aee51c5b52996c52163ae0340c7da813adc8f"
pageSha256: "d58cb11ecdc1e7ab36c5bf9f9dc5a1392145c4237d49b1d38772085c96a4c00e"
contentMode: "local-full"
zh: ""
---

## Step 1: Define your schema

First you must design the JSON Schema that the model should be constrained to follow. See the [examples](https://developers.openai.com/api/docs/guides/structured-outputs#examples) at the top of this guide for reference.

While Structured Outputs supports much of JSON Schema, some features are unavailable either for performance or technical reasons. See [here](https://developers.openai.com/api/docs/guides/structured-outputs#supported-schemas) for more details.

#### Tips for your JSON Schema

To maximize the quality of model generations, we recommend the following:

- Name keys clearly and intuitively
- Create clear titles and descriptions for important keys in your structure
- Create and use evals to determine the structure that works best for your use case
