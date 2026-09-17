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
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "fc68c48a45e353323bcea7b9e2b6f7effe2cae3fdc074364bad49a3af4384d24"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Cache Creation Usage

- `BetaManagedAgentsCacheCreationUsage object`

  Prompt-cache creation token usage broken down by cache lifetime.

  - `ephemeral_1h_input_tokens: optional number`

    Tokens used to create 1-hour ephemeral cache entries.

    format: int32

  - `ephemeral_5m_input_tokens: optional number`

    Tokens used to create 5-minute ephemeral cache entries.

    format: int32
