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
sourceRel: "api/docs/guides/latest-model/gpt-4.1.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/latest-model/gpt-4.1.md"
sourceSha256: "8c8acb1acca9f74ad15e1a8511c1fbb2aa64c651fc879d448557779115c2d7d8"
pageSha256: "7dd9f756f83d181b6e733f9100587b64675eeedb2d4aadfd049f78e67d58cf05"
contentMode: "local-full"
zh: ""
---

## Migration quickstart

- Update the model slug to `gpt-4.1`.
- Use either the Responses API or Chat Completions API, depending on your integration.
- Remove reasoning-specific parameters; GPT-4.1 is a non-reasoning model.
- Pass tool schemas through the API `tools` field instead of injecting tool definitions into the prompt.
- Review prompts for literal instruction following, add explicit persistence and tool-use rules where needed, and validate changes with evals.
