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
pageSha256: "cabfc356e9fad0ee0196af3ea8ef63ea14c02f535bc9801df731a63ed5e3b1b8"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents System Message Event

- `BetaManagedAgentsSystemMessageEvent object`

  A mid-conversation system message event. Carries system-role content that is appended to the session as a `role: "system"` turn.

  - `type: "system.message"`

  - `id: string`

    Unique identifier for this event.

  - `content: array of BetaManagedAgentsSystemContentBlock`

    System content blocks. Text-only.

    - `type: "text"`

    - `text: string`

      The text content.

      minLength: 1

  - `processed_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time
