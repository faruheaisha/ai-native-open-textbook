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
sourceRel: "docs/en/api/beta/agents.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/agents.md"
sourceSha256: "2701c99a56aa4313e4c59f6eb788100b1488b7b05d3135e992270e808de5849c"
pageSha256: "f305507417962712643737ac3ef633aa105f9583d8db4d0825e764eb3636b05c"
contentMode: "local-full"
zh: ""
---

### Query parameters

- `"created_at[gte]": optional string`

  Return agents created at or after this time (inclusive).

  format: date-time

- `"created_at[lte]": optional string`

  Return agents created at or before this time (inclusive).

  format: date-time

- `include_archived: optional boolean`

  Include archived agents in results. Defaults to false.

- `limit: optional number`

  Maximum results per page. Default 20, maximum 100.

  format: int32

- `page: optional string`

  Opaque pagination cursor from a previous response.
