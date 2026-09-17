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
pageSha256: "6a261bd9c737e346651bfbebd334573c75541716dacfaf1c974a5b88f2566627"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Session Status Idle Event

- `BetaManagedAgentsSessionStatusIdleEvent object`

  Indicates the agent has paused and is awaiting user input.

  - `type: "session.status_idle"`

  - `id: string`

    Unique identifier for this event.

  - `processed_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `stop_reason: BetaManagedAgentsSessionEndTurn or BetaManagedAgentsSessionRequiresAction or BetaManagedAgentsSessionRetriesExhausted or BetaManagedAgentsSessionBudgetReached`

    The agent completed its turn naturally and is ready for the next user message.

    - `BetaManagedAgentsSessionEndTurn object`

      The agent completed its turn naturally and is ready for the next user message.

      - `type: "end_turn"`

    - `BetaManagedAgentsSessionRequiresAction object`

      The agent is idle waiting on one or more blocking user-input events (tool confirmation, custom tool result, etc.). Resolving all of them transitions the session back to running.

      - `type: "requires_action"`

      - `event_ids: array of string`

        The ids of events the agent is blocked on. Resolving fewer than all re-emits `session.status_idle` with the remainder.

    - `BetaManagedAgentsSessionRetriesExhausted object`

      The turn ended because repeated errors exhausted the retry budget or an error escalated to `retry_status: 'exhausted'`.

      - `type: "retries_exhausted"`

    - `BetaManagedAgentsSessionBudgetReached object`

      The agent stopped because the session's tracked list cost reached its budget, or because its usage includes a model with no list price (which the budget cannot measure). Raise the budget to continue — or, if raising is rejected because a model has no list price, remove the budget.

      - `type: "budget_reached"`
