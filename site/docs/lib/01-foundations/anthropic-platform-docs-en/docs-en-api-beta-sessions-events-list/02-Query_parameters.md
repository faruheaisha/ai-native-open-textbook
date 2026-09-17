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
sourceRel: "docs/en/api/beta/sessions/events/list.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events/list.md"
sourceSha256: "0a1a46d384687aa5f3203c95e97bf65ed82165f2abdbd9db26e72ceecf10fdf9"
pageSha256: "a34771933d042b963739f0a5f769257f75b94e5f469873a948f8a0a4c1120cd3"
contentMode: "local-full"
zh: ""
---

## Query parameters

- `"created_at[gt]": optional string`

  Return events created after this time (exclusive). Compared against the event's `processed_at` value.

  format: date-time

- `"created_at[gte]": optional string`

  Return events created at or after this time (inclusive). Compared against the event's `processed_at` value.

  format: date-time

- `"created_at[lt]": optional string`

  Return events created before this time (exclusive). Compared against the event's `processed_at` value.

  format: date-time

- `"created_at[lte]": optional string`

  Return events created at or before this time (inclusive). Compared against the event's `processed_at` value.

  format: date-time

- `limit: optional number`

  Query parameter for limit

  format: int32

- `order: optional "asc" or "desc"`

  Sort direction for results, ordered by the event's `processed_at`. Defaults to `asc` (chronological).

  - `"asc"`

  - `"desc"`

- `page: optional string`

  Opaque pagination cursor from a previous response's `next_page`.

- `types: optional array of string`

  Filter by event type. Values match the `type` field on returned events (for example, `user.message` or `agent.tool_use`). Omit to return all event types.
