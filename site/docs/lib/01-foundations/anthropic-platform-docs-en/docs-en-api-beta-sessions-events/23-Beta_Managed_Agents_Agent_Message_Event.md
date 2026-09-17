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
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "98ac46a86803cc9174cfe42ab71c818395ae2ca7c04d33124f09af2108e7c483"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Agent Message Event

- `BetaManagedAgentsAgentMessageEvent object`

  An agent response event in the session conversation.

  - `type: "agent.message"`

  - `id: string`

    Unique identifier for this event.

  - `content: array of BetaManagedAgentsTextBlock or BetaManagedAgentsRedactedBlock`

    Array of text blocks comprising the agent response.

    - `BetaManagedAgentsTextBlock object`

      Regular text content.

      - `type: "text"`

      - `text: string`

        The text content.

        minLength: 1

    - `BetaManagedAgentsRedactedBlock object`

      Placeholder for content withheld by Anthropic model policy.

      - `type: "redacted"`

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
