---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/messages/count_tokens.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/messages/count_tokens.md"
sourceSha256: "647ab0f66c46fa5edc201b4db022f9fd7b559ce944f6440a44855731f4a90de9"
pageSha256: "889d3e067497a9bcf69ffa01a8f4c46981561843c98f3d2e793dee2cd096219c"
contentMode: "local-full"
zh: ""
---

## Returns

- `BetaMessageTokensCount object`

  - `context_management: BetaCountTokensContextManagementResponse or null`

    Information about context management applied to the message.

    - `original_input_tokens: number`

      The original token count before context management was applied

  - `input_tokens: number`

    The total number of tokens across the provided list of messages, system prompt, and tools.
