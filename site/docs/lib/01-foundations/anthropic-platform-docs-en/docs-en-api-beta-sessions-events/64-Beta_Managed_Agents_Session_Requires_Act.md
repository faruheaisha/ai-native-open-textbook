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
pageSha256: "3ca72ae70f7f55ce073f417d4eb290b1a395867382ba0a91b991e11641373939"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Requires Action

- `BetaManagedAgentsSessionRequiresAction object`

  The agent is idle waiting on one or more blocking user-input events (tool confirmation, custom tool result, etc.). Resolving all of them transitions the session back to running.

  - `type: "requires_action"`

  - `event_ids: array of string`

    The ids of events the agent is blocked on. Resolving fewer than all re-emits `session.status_idle` with the remainder.
