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
pageSha256: "ddb588e3dfa3280042217950c32fff25847c1e0b5b162a8824da4cf19f79e946"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Start Event Preview

- `BetaManagedAgentsStartEventPreview = BetaManagedAgentsAgentMessagePreview or BetaManagedAgentsAgentThinkingPreview`

  - `BetaManagedAgentsAgentMessagePreview object`

    - `type: "agent.message"`

    - `id: string`

      The id the buffered agent.message will carry if it is emitted. Matches the event_id on this preview's event_delta events.

  - `BetaManagedAgentsAgentThinkingPreview object`

    - `type: "agent.thinking"`

    - `id: string`

      The id the buffered agent.thinking will carry if it is emitted. Start-only — no event_delta events follow.
