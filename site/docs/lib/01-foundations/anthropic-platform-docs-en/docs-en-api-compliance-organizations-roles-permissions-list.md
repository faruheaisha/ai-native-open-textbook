---
title: "List Compliance Role Permissions"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/compliance/organizations/roles/permissions/list.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/organizations/roles/permissions/list.md"
sourceSha256: "0bfc5613a67c7e5e4c2946a82925a6a0a166feeaf3df508d1264645bc2983afe"
pageSha256: "0bfc5613a67c7e5e4c2946a82925a6a0a166feeaf3df508d1264645bc2983afe"
contentMode: "local-full"
zh: ""
---

# List Compliance Role Permissions

**GET** `/v1/compliance/organizations/\{org_uuid\}/roles/\{role_id\}/permissions`

List Compliance Role Permissions

## Path parameters

- `org_uuid: string`

  The organization UUID

- `role_id: string`

  The role ID (tagged ID, e.g., rbac_role_abc123)

## Query parameters

- `limit: optional number`

  Maximum results (default: 500, max: 1000)

  default: 500, maximum: 1000, minimum: 1

- `page: optional string`

  Opaque pagination token from a previous response's `next_page` field. Pass this to retrieve the next page of results. Clients should treat this value as an opaque string and not attempt to parse or interpret its contents, as the format may change without notice.

## Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

## Returns

- `data: array of object`

  List of permissions

  - `action: string`

    Action permitted on the resource

  - `resource_id: string`

    Identifier of the resource the permission applies to

  - `resource_type: string`

    Type of resource the permission applies to

- `has_more: boolean`

  Whether more records exist beyond the current result set

- `next_page: string or null`

  Token to retrieve the next page. Use this as the 'page' parameter in your next request

## Example

```bash
curl https://api.anthropic.com/v1/compliance/organizations/$ORG_UUID/roles/$ROLE_ID/permissions \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

### Response (200)

```json
{
  "data": [
    {
      "action": "claude_code",
      "resource_id": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
      "resource_type": "organization"
    }
  ],
  "has_more": true,
  "next_page": "cGFnZV90b2tlbl9leGFtcGxlXzE3MzQ1Njc4OTA="
}
```
