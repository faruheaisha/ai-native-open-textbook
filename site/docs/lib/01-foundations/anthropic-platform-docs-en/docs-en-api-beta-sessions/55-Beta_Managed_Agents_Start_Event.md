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
pageSha256: "047d3f274249394390f6012a61ff3f8e2c59e25425e39ead3329134e4850a6d2"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Start Event

- `BetaManagedAgentsStartEvent object`

  Opens a preview of a buffered event. Carries the previewed event's type and id only. Followed by zero or more event_delta events with the same event id, normally concluded by the buffered event carrying that id. If the producing model request ends without that event (an error or interrupt mid-stream), its terminal span.model_request_end closes the preview. Only sent on stream connections that opt in via event_deltas; never appears in event history.

  - `type: "event_start"`

  - `event: BetaManagedAgentsStartEventPreview`

    The previewed event's type and id. The event type determines which delta types the preview's event_delta events carry: agent.message events stream content_delta fragments; agent.thinking previews are start-only — no deltas follow, and the buffered agent.thinking with the same id concludes them.

    - `BetaManagedAgentsAgentMessagePreview object`

      - `type: "agent.message"`

      - `id: string`

        The id the buffered agent.message will carry if it is emitted. Matches the event_id on this preview's event_delta events.

    - `BetaManagedAgentsAgentThinkingPreview object`

      - `type: "agent.thinking"`

      - `id: string`

        The id the buffered agent.thinking will carry if it is emitted. Start-only — no event_delta events follow.
