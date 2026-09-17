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
pageSha256: "a092bafe39fd7c1ae44d205bdf5363871efcaefee5fa8d20d01d910be0bbba6b"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "id": "rbac_group_012rppKaSVsmTo6NqRDXQXNF",
  "created_at": "2025-03-12T18:22:41.123456Z",
  "description": "All members of the engineering organization",
  "name": "Engineering Team",
  "roles": [
    "rbac_role_01SGBg3kEnZrdsVR2QmyJbvD",
    "rbac_role_01HtCd4mFoAseWS3RnzKcwE7"
  ],
  "source_type": "scim",
  "updated_at": "2025-03-14T09:05:17.456789Z"
}
```

## Compliance API › Groups › Members

### List Compliance Group Members

**GET** `/v1/compliance/groups/\{group_id\}/members`

List Compliance Group Members

#### Path parameters

- `group_id: string`

  The group ID (tagged ID, e.g., rbac_group_abc123)

#### Query parameters

- `limit: optional number`

  Maximum results (default: 500, max: 1000)

  default: 500, maximum: 1000, minimum: 1

- `page: optional string`

  Opaque pagination token from a previous response's `next_page` field. Pass this to retrieve the next page of results. Clients should treat this value as an opaque string and not attempt to parse or interpret its contents, as the format may change without notice.

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `data: array of object`

  List of group members

  - `created_at: string or null`

    Membership creation timestamp (RFC 3339)

    format: date-time

  - `email: string`

    Member email address

  - `updated_at: string or null`

    Membership last-updated timestamp (RFC 3339)

    format: date-time

  - `user_id: string`

    Member user identifier (tagged ID)

- `has_more: boolean`

  Whether more records exist beyond the current result set

- `next_page: string or null`

  Token to retrieve the next page. Use this as the 'page' parameter in your next request

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/groups/$GROUP_ID/members \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
