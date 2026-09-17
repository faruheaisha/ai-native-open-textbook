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
pageSha256: "28d9f1a0d3030968bafe59cc51bd4d3abbf87eb9924b61a3a61305f5f90df9ec"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "data": [
    {
      "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
      "created_at": "2025-03-12T18:22:41.123456Z",
      "email": "jane.doe@example.com",
      "full_name": "Jane Doe",
      "organization_role": "admin"
    }
  ],
  "has_more": true,
  "next_page": "cGFnZV90b2tlbl9leGFtcGxlXzE3MzQ1Njc4OTA="
}
```

## Compliance API › Organizations › Roles

### List Compliance Roles

**GET** `/v1/compliance/organizations/\{org_uuid\}/roles`

List Compliance Roles

#### Path parameters

- `org_uuid: string`

  The organization UUID

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

  List of roles

  - `id: string`

    Role identifier (tagged ID)

  - `created_at: string or null`

    Role creation timestamp (RFC 3339)

    format: date-time

  - `description: string`

    Role description

  - `name: string`

    Role name

  - `updated_at: string or null`

    Role last-updated timestamp (RFC 3339)

    format: date-time

- `has_more: boolean`

  Whether more records exist beyond the current result set

- `next_page: string or null`

  Token to retrieve the next page. Use this as the 'page' parameter in your next request

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/organizations/$ORG_UUID/roles \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
