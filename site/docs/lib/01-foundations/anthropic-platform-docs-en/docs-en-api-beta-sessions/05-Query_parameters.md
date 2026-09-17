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
pageSha256: "fc4a767042d25c0b9beeaa5caea75fa7a067bf2a4b8194bc14227d9ee2aa1e97"
contentMode: "local-full"
zh: ""
---

### Query parameters

- `agent_id: optional string`

  Filter sessions created with this agent ID.

- `agent_version: optional number`

  Filter by agent version. Only applies when `agent_id` is also set.

  format: int32

- `"created_at[gt]": optional string`

  Return sessions created after this time (exclusive).

  format: date-time

- `"created_at[gte]": optional string`

  Return sessions created at or after this time (inclusive).

  format: date-time

- `"created_at[lt]": optional string`

  Return sessions created before this time (exclusive).

  format: date-time

- `"created_at[lte]": optional string`

  Return sessions created at or before this time (inclusive).

  format: date-time

- `deployment_id: optional string`

  Filter sessions created by this deployment ID.

- `include_archived: optional boolean`

  When true, includes archived sessions. Default: false (exclude archived).

- `limit: optional number`

  Maximum number of results to return.

  format: int32

- `memory_store_id: optional string`

  Filter sessions whose resources contain a `memory_store` with this memory store ID.

- `order: optional "asc" or "desc"`

  Sort direction for results, ordered by `created_at`. Defaults to `desc` (newest first).

  - `"asc"`

  - `"desc"`

- `page: optional string`

  Opaque pagination cursor from a previous response.

- `statuses: optional array of "rescheduling" or "running" or "idle" or "terminated"`

  Filter by session status. Repeat the parameter to match any of multiple statuses.

  - `"rescheduling"`

  - `"running"`

  - `"idle"`

  - `"terminated"`
