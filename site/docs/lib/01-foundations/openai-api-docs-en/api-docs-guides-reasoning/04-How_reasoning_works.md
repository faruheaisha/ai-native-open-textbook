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
sourceRel: "api/docs/guides/reasoning.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/reasoning.md"
sourceSha256: "cf636c88ee3feaf7cad399534f49fe70ca853728f4bd2f387c6295206c10e93d"
pageSha256: "f38965c253fd752f240940859d230ab4aeb85be616c1a499303eef8703040d99"
contentMode: "local-full"
zh: ""
---

## How reasoning works

Reasoning models introduce **reasoning tokens** in addition to input and output tokens. The models use these reasoning tokens to "think," breaking down the prompt and considering multiple approaches to generating a response. Our reasoning models like `gpt-5.5` and `gpt-5.4` support interleaved thinking, where the model is able to generate visible output tokens before and in between thinking, and is able to think in between tool calls.

For models released before GPT-5.6, the default behavior in a multi-step conversation is to carry over input and output tokens from each step without rendering reasoning from earlier turns into the next sample. GPT-5.6 models instead default to rendering available reasoning from earlier turns. Use `reasoning.context` to select either behavior on supported models.

![Reasoning tokens with current-turn context](https://cdn.openai.com/API/docs/images/context-window.png)

While reasoning tokens are not visible via the API, they still occupy space in
  the model's context window and are billed as [output
  tokens](https://openai.com/api/pricing).
