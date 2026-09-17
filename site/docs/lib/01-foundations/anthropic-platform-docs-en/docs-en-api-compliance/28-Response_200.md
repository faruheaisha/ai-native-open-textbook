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
sourceRel: "docs/en/api/compliance.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance.md"
sourceSha256: "8af66acb3141be9f44ca167f0bc76f30e333a12e3a466766363c4f330e5eed7d"
pageSha256: "d2dccbc6aadc5a338512e29460b4b84c3e2569966d57ba09e4a99b4a402ed4de"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "data": [
    {
      "id": "clsm_eyJ2IjoxLCJsIjoi…",
      "content": [
        {
          "text": "text",
          "truncated": true,
          "type": "text"
        }
      ],
      "created_at": "2025-03-12T18:22:41.123456Z",
      "model": "claude-opus-5",
      "provenance": {
        "reason": "not_captured",
        "type": "content_unavailable"
      },
      "role": "assistant",
      "type": "compliance_local_session_message"
    }
  ],
  "next_page": "page_eyJ2IjoxLCJmIjoibSIs…",
  "session": {
    "id": "clls_eyJ2IjoxLCJvIjoiOWEx…",
    "created_at": "2025-03-12T18:22:41.123456Z",
    "organization_uuid": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
    "product_surface": "cowork",
    "truncated": true,
    "type": "compliance_local_session",
    "updated_at": "2025-03-12T18:22:41.123456Z",
    "user": {
      "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
      "email_address": "jane.doe@example.com"
    },
    "workspace_id": "wrkspc_01SvYKoWVRVHoEbwESNvzYdR"
  }
}
```

## Compliance API › Apps › Sessions › Remote

### List remote sessions

**GET** `/v1/compliance/apps/sessions/remote`

List remote sessions (Cowork sessions that run in Anthropic-managed
cloud environments) across the organizations the key may read.

Each entry carries session metadata only; retrieve a session's
transcript from the messages endpoint. By default the list spans every
such organization; pass up to 500 `organization_ids[]` values to
narrow it. Pass 1 to 10 `user_ids[]` values to scope the
list to specific users: that filter matches the session's owning user,
so agent-owned sessions are excluded whenever it is set. Bound results
in time with the `created_at` range parameters (`created_at.gte`,
`created_at.gt`, `created_at.lt`, `created_at.lte`; RFC 3339). There
is no `updated_at` filter.

Results are sorted newest first by `created_at`, with at most `limit`
sessions per page (default 100, maximum 500). Pagination is
forward-only: pass the response's `next_page` value back as `page` to
retrieve the next page, and stop when `next_page` is null.

#### Query parameters

- `created_at: optional object`

  - `gt: optional string`

    Filter remote sessions created after this time (RFC 3339 format)

    format: date-time

  - `gte: optional string`

    Filter remote sessions created at or after this time (RFC 3339 format)

    format: date-time

  - `lt: optional string`

    Filter remote sessions created before this time (RFC 3339 format)

    format: date-time

  - `lte: optional string`

    Filter remote sessions created at or before this time (RFC 3339 format)

    format: date-time

- `limit: optional number`

  Maximum results (default: 100, max: 500)

  default: 100, maximum: 500, minimum: 1

- `organization_ids: optional array of string`

  Filter to specific child organization identifiers. Omit to enumerate every child organization the key may read.

  maxItems: 500

- `page: optional string`

  Opaque pagination token from a previous response's `next_page` field. Pass this to retrieve the next page of results. Clients should treat this value as an opaque string and not attempt to parse or interpret its contents, as the format may change without notice.

- `user_ids: optional array of string`

  Filter to sessions owned by specific users (max 10 per request). Agent-owned sessions are excluded when this filter is set.

  maxItems: 10

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `data: array of object`

  - `id: string`

    Remote session identifier

  - `agent_id: string or null`

    Identifier of the automated agent that owns the session. Null for user-owned sessions. At most one of `user` and `agent_id` is set.

  - `claude_project_id: string or null`

    ID of the project the session is bound to. Null when the session has no project binding.

  - `created_at: string`

    When the session was created (RFC 3339, UTC)

    format: date-time

  - `organization_uuid: string`

    UUID of the organization the session belongs to

  - `product_surface: string or null`

    The Claude product the session was created from. Currently `cowork_remote`, for Cowork sessions started on claude.ai web or mobile. More values will appear as other surfaces launch, so treat any unrecognized value as an unclassified surface rather than an error. Null for sessions created before this field was recorded, for surfaces that do not stamp it, and for unrecognized tag values.

  - `started_by_user: object or null`

    A user associated with a remote session.

    - `id: string`

      User identifier

    - `email_address: string or null`

      User's email address. Null when the user is no longer a member of an organization the key may read — `id` remains set so attribution is preserved. The messages endpoint does not resolve email addresses; this field is always null there.

  - `status: string`

    Session lifecycle state. One of `active`, `paused`, `archived`, or `failed` — the lifecycle states the owning product surface exposes — plus `pending`, a brief transient state that resolves before any transcript content exists. The list endpoint includes `pending`; the messages endpoint returns 404 for it. Deleted sessions are not returned on either endpoint. Treat unrecognized values as an unknown state rather than an error.

  - `updated_at: string`

    When the session was last modified (RFC 3339, UTC)

    format: date-time

  - `user: object or null`

    A user associated with a remote session.

    - `id: string`

      User identifier

    - `email_address: string or null`

      User's email address. Null when the user is no longer a member of an organization the key may read — `id` remains set so attribution is preserved. The messages endpoint does not resolve email addresses; this field is always null there.

- `next_page: string or null`

  Opaque page token; pass as `page` to retrieve the next page. Null when no rows exist after this page. Treat this value as opaque; do not parse or store it long-term, as the format may change without notice.

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/sessions/remote \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
