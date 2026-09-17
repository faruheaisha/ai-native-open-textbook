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
pageSha256: "55eae71e268f5cbba711a0811ccec1a1d5470fc9fe8f19e6048493e786227c8e"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "data": [
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
  ],
  "has_more": true,
  "next_page": "cGFnZV90b2tlbl9leGFtcGxlXzE3MzQ1Njc4OTA="
}
```

### Get Compliance Group

**GET** `/v1/compliance/groups/\{group_id\}`

Get Compliance Group

#### Path parameters

- `group_id: string`

  The group ID (tagged ID, e.g., rbac_group_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

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

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/groups/$GROUP_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
