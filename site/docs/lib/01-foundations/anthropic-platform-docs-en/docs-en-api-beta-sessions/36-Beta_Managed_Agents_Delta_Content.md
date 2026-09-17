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
pageSha256: "ecb85e559c6002e8680e584fa0dce03ee02f131eb3d05eb2d36c363d27cf0a8e"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Delta Content

- `BetaManagedAgentsDeltaContent object`

  - `type: "content_delta"`

  - `content: BetaManagedAgentsTextBlock`

    Regular text content.

    - `type: "text"`

    - `text: string`

      The text content.

      minLength: 1

  - `index: optional number`

    Which entry in the previewed event's content array this fragment lands in. Insert content as that entry when the index is new; append to the existing entry otherwise.

    format: uint32
