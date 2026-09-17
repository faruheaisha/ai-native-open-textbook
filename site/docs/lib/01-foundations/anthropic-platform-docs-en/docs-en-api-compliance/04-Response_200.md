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
pageSha256: "a1269b97898fa4c577f42820a530a1e8593580020ef1fc30aabf2ba9cdce4bfb"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "data": [
    {
      "id": "rbac_role_01SGBg3kEnZrdsVR2QmyJbvD",
      "created_at": "2025-03-12T18:22:41.123456Z",
      "description": "Full administrative access to organization settings and members",
      "name": "Organization Admin",
      "updated_at": "2025-03-14T09:05:17.456789Z"
    }
  ],
  "has_more": true,
  "next_page": "cGFnZV90b2tlbl9leGFtcGxlXzE3MzQ1Njc4OTA="
}
```

### Get Compliance Role

**GET** `/v1/compliance/organizations/\{org_uuid\}/roles/\{role_id\}`

Get Compliance Role

#### Path parameters

- `org_uuid: string`

  The organization UUID

- `role_id: string`

  The role ID (tagged ID, e.g., rbac_role_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

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

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/organizations/$ORG_UUID/roles/$ROLE_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
