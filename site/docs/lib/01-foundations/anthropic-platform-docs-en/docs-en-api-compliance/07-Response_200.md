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
pageSha256: "bd16786a0029cb91f6b62cedebcbbb86c5ba65a6cd1274063e8f45e7a0be3d61"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "api_keys": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "created_by_id": "created_by_id",
      "is_active": true,
      "name": "name",
      "scopes": [
        "string"
      ],
      "expires_at": "2019-12-27T18:11:19.117Z",
      "type": "compliance_api_key"
    }
  ],
  "organization_id": "organization_id",
  "settings": [
    {
      "name": "ai_powered_artifacts_enabled",
      "value": true,
      "type": "boolean"
    }
  ],
  "type": "effective_organization_settings"
}
```

## Compliance API › Groups

### List Compliance Groups

**GET** `/v1/compliance/groups`

List Compliance Groups

#### Query parameters

- `limit: optional number`

  Maximum results (default: 500, max: 1000)

  default: 500, maximum: 1000, minimum: 1

- `name_prefix: optional string`

  Filter groups by name prefix

  default: ""

- `page: optional string`

  Opaque pagination token from a previous response's `next_page` field. Pass this to retrieve the next page of results. Clients should treat this value as an opaque string and not attempt to parse or interpret its contents, as the format may change without notice.

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `data: array of object`

  List of groups

  - `id: string`

    Group identifier (tagged ID)

  - `created_at: string or null`

    Group creation timestamp (RFC 3339)

    format: date-time

  - `description: string`

    Group description

  - `name: string`

    Group name

  - `roles: array of string or null`

    Role IDs assigned to this group.

  - `source_type: string`

    How the group was created ('direct' or 'scim')

  - `updated_at: string or null`

    Group last-updated timestamp (RFC 3339)

    format: date-time

- `has_more: boolean`

  Whether more records exist beyond the current result set

- `next_page: string or null`

  Token to retrieve the next page. Use this as the 'page' parameter in your next request

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/groups \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
