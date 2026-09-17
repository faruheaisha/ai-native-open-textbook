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
sourceRel: "docs/en/api/beta/organization/analytics.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/analytics.md"
sourceSha256: "49f89bf4d259ecfd8ae75b156bab62a56d0656f36f80cd24dad753bff4d3db31"
pageSha256: "500ab14c85b4d4c583d1067ea496a44fc64982d0239b6b1e6648a9c2f288967b"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Activity Summary

- `BetaActivitySummary object`

  Response for GET /v1/organizations/analytics/summaries.

  - `summaries: array of object`

    - `assigned_seat_count: number or null`

      Number of seats currently assigned to members. Null when the response is scoped to an RBAC group — seat assignment is org-wide and has no per-group analogue.

    - `cowork_daily_active_user_count: number`

      Number of users with Cowork activity on the requested day

    - `cowork_monthly_active_user_count: number`

      Number of users with Cowork activity in the 30-day rolling window

    - `cowork_weekly_active_user_count: number`

      Number of users with Cowork activity in the 7-day rolling window

    - `daily_active_user_count: number`

      Number of users with token consumption on the requested day

    - `daily_adoption_rate: number or null`

      Percentage of assigned seats with activity on the requested day (`DAU / assigned_seat_count * 100`). Null when the response is scoped to an RBAC group.

    - `ending_at: string`

      End of the aggregation period (exclusive), UTC midnight in RFC 3339 format (e.g. `2026-01-16T00:00:00Z`).

      format: date-time

    - `monthly_active_user_count: number`

      Number of users with token consumption in the 30-day rolling window

    - `monthly_adoption_rate: number or null`

      Percentage of assigned seats with activity in the 30-day rolling window (`MAU / assigned_seat_count * 100`). Null when the response is scoped to an RBAC group.

    - `pending_invite_count: number or null`

      Number of pending invitations to join the organization. Null when the response is scoped to an RBAC group.

    - `starting_at: string`

      Start of the aggregation period (inclusive), UTC midnight in RFC 3339 format (e.g. `2026-01-15T00:00:00Z`).

      format: date-time

    - `weekly_active_user_count: number`

      Number of users with token consumption in the 7-day rolling window

    - `weekly_adoption_rate: number or null`

      Percentage of assigned seats with activity in the 7-day rolling window (`WAU / assigned_seat_count * 100`). Null when the response is scoped to an RBAC group.

    - `chat_daily_active_user_count: optional number or null`

      Number of users with claude.ai (chat) activity on the requested day. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `chat_monthly_active_user_count: optional number or null`

      Number of users with claude.ai (chat) activity in the 30-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `chat_weekly_active_user_count: optional number or null`

      Number of users with claude.ai (chat) activity in the 7-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `claude_code_daily_active_user_count: optional number or null`

      Number of users with Claude Code activity on the requested day. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `claude_code_monthly_active_user_count: optional number or null`

      Number of users with Claude Code activity in the 30-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `claude_code_weekly_active_user_count: optional number or null`

      Number of users with Claude Code activity in the 7-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `claude_design_daily_active_user_count: optional number or null`

      Number of users with Claude Design activity on the requested day. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `claude_design_monthly_active_user_count: optional number or null`

      Number of users with Claude Design activity in the 30-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `claude_design_weekly_active_user_count: optional number or null`

      Number of users with Claude Design activity in the 7-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `office_agent_daily_active_user_count: optional number or null`

      Number of users with Claude in Office activity on the requested day. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `office_agent_monthly_active_user_count: optional number or null`

      Number of users with Claude in Office activity in the 30-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `office_agent_weekly_active_user_count: optional number or null`

      Number of users with Claude in Office activity in the 7-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `science_daily_active_user_count: optional number or null`

      Number of users with Claude Science activity on the requested day. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `science_entitled_user_count: optional number or null`

      Number of users with a Claude Science seat entitlement (per-seat RBAC) at the time of the daily snapshot. The funnel top; independent of the org-level Claude Science toggle. Null when the response is scoped to an RBAC group — entitlement is org-wide and has no per-group analogue. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `science_monthly_active_user_count: optional number or null`

      Number of users with Claude Science activity in the 30-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

    - `science_weekly_active_user_count: optional number or null`

      Number of users with Claude Science activity in the 7-day rolling window. Omitted from the response while the per-product breakdown is not enabled for this organization.

### Beta Analytics User

- `BetaAnalyticsUser object`

  A user in the organization, identified by tagged id and email address.

  - `type: "user"`

    Object type. Always `user`.

    default: user

  - `id: string`

    Tagged user identifier (e.g. `user_...`)

  - `email_address: string`

    Email address of the user

### Beta Analytics User Actor

- `BetaAnalyticsUserActor object`

  - `type: "user_actor"`

    Actor type. Always `"user_actor"`.

  - `deleted: boolean`

    True when the account has been deleted, or when the user is no longer a member of the organization or its associated organizations (for example, their membership was removed or they were deprovisioned via your identity provider). `email` stays populated for removed users and is null when the account has been deleted. `name` follows the rules described on that field. The `user_id` is still populated for reconciliation.

  - `email: string or null`

    The user's email address, including for users who are no longer members of the organization or its associated organizations. Null when the account has been deleted (check `deleted`) and for system-minted service accounts, which have no person's mailbox behind them (check `name`).

  - `name: string or null`

    The user's full name. Null when the user has not set a name. Returns `"Deleted User"` when the account itself has been deleted, or when the user is no longer a member of the organization or its associated organizations and the organization has chosen to hide the names of removed users. Otherwise, the name stays populated for removed users. Rows for system-minted service accounts render the service name (for example, `"Claude Security"` for usage by Anthropic's security-patching service) or null.

  - `user_id: string`

    Tagged user ID.

### Beta Connector Office Product Metrics

- `BetaConnectorOfficeProductMetrics object`

  Office Agent activity metrics for a single connector on a given day within one Office product.

  - `distinct_session_connector_used_count: number or null`

    Number of distinct Office Agent sessions in which the connector was used. Approximate (HLL, typical error <2%) in date-range mode. Null on aggregated rows where a distinct count cannot be computed.

### Beta Office Product Metrics

- `BetaOfficeProductMetrics object`

  Office Agent activity metrics for a single user on a given day within one Office product.

  - `connectors_used_count: number`

    Number of MCP connector invocations

  - `distinct_connectors_used_count: number or null`

    Number of distinct MCP connectors used. Approximate (HLL, typical error <2%) in date-range mode. Null on aggregated rows where a distinct count cannot be computed.

  - `distinct_session_count: number or null`

    Number of distinct Office Agent sessions. Approximate (HLL, typical error <2%) in date-range mode. Null on aggregated rows where a distinct count cannot be computed.

  - `distinct_skills_used_count: number or null`

    Number of distinct skills used. Approximate (HLL, typical error <2%) in date-range mode. Null on aggregated rows where a distinct count cannot be computed.

  - `message_count: number`

    Number of messages sent

  - `skills_used_count: number`

    Number of skill invocations

### Beta Skill Office Product Metrics

- `BetaSkillOfficeProductMetrics object`

  Office Agent activity metrics for a single skill on a given day within one Office product.

  - `distinct_session_skill_used_count: number or null`

    Number of distinct Office Agent sessions in which the skill was used. A skill counts as used only when it is explicitly activated — the model (or the user, via the skill's slash command) invokes it, reading its instructions into context as part of that activation. Skills that are merely installed or listed as available, or whose content reaches the context without an activation (preloaded, hook-injected, or read as a plain file), are not counted. Approximate (HLL, typical error <2%) in date-range mode. Null on aggregated rows where a distinct count cannot be computed.

### Beta Tool Action Counts

- `BetaToolActionCounts object`

  Accepted/rejected counts for a single Claude Code tool type.

  - `accepted_count: number`

    Number of tool proposals accepted

  - `rejected_count: number`

    Number of tool proposals rejected
