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
pageSha256: "20c286fb9189ca03fd461de597470017bf048cd4f8e1ef7f5afef75347031477"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Status Terminated Event

- `BetaManagedAgentsSessionStatusTerminatedEvent object`

  Indicates the session has terminated, either due to an error or completion.

  - `type: "session.status_terminated"`

  - `id: string`

    Unique identifier for this event.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time
