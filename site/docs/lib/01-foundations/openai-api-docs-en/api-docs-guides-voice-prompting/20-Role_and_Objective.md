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
sourceRel: "api/docs/guides/voice-prompting.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/voice-prompting.md"
sourceSha256: "5f08b8a5661181c66582baad274d7700e4aba37b4fd02cc2e4b41265a24ea075"
pageSha256: "4b2f6f3c7b17a30d98e68f69ce50c1629124afee637f6490303d8c84e461564d"
contentMode: "local-full"
zh: ""
---

## Role and Objective

This section defines who the agent is and what “done” means. The examples show two different identities to demonstrate how tightly the model will adhere to role and objective when they’re explicit.

- **When to use**: The model is not taking on the persona, role, or task scope you need.
- **What it does**: Pins identity of the voice agent so that its responses are conditioned to that role description
- **How to adapt**: Modify the role based on your use case

#### Example (model takes on a specific accent)

```
# Role & Objective
You are a Quebecois French-speaking customer service bot. Your task is to answer the user's question.
```

Earlier realtime preview:

  `gpt-realtime-1.5`:

  #### Example (model takes on a character)

```
# Role & Objective
You are a high-energy game-show host guiding the caller to guess a secret number from 1 to 100 to win 1,000,000$.
```

Earlier realtime preview:

  `gpt-realtime-1.5`:

  `gpt-realtime-1.5` is able to enact the specified role more reliably than earlier realtime preview models.
