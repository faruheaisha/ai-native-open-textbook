---
title: "List RBAC Roles"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/rbac_roles/list.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/rbac_roles/list.md"
sourceSha256: "50891d233049bd745d68b5af67aa594e78f46f6081ea0241214ee384813db712"
pageSha256: "50891d233049bd745d68b5af67aa594e78f46f6081ea0241214ee384813db712"
contentMode: "local-full"
zh: ""
---

# List RBAC Roles

**GET** `/v1/organizations/rbac_roles`

List RBAC Roles in the organization.

The RBAC Roles API is available to Claude Enterprise organizations only.

## Query parameters

- `limit: optional number`

  Number of items to return per page.

  Defaults to `20`. Ranges from `1` to `1000`.

  default: 20, maximum: 1000, minimum: 1

- `page: optional string`

  Optionally set to the `next_page` token from the previous response.

## Returns

- `data: array of BetaRBACRole`

  - `type: "rbac_role"`

    Object type.

    For RBAC Roles, this is always `"rbac_role"`.

    default: rbac_role

  - `id: string`

    ID of the RBAC Role.

  - `created_at: string`

    RFC 3339 datetime string indicating when the RBAC Role was created.

    format: date-time

  - `name: string`

    Name of the RBAC Role.

  - `updated_at: string`

    RFC 3339 datetime string indicating when the RBAC Role was last updated.

    format: date-time

- `has_more: boolean`

  Indicates whether there are more results beyond this page.

- `next_page: string or null`

  Opaque cursor for the next page. Pass as the `page` parameter on the next
  request.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/rbac_roles \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-user-management-2026-07-13' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "data": [
    {
      "id": "rbac_role_016J8xVtKpDq3Wy9ZmN2hR4s",
      "created_at": "2024-10-30T23:58:27.427722Z",
      "name": "Project Editor",
      "type": "rbac_role",
      "updated_at": "2024-10-30T23:58:27.427722Z"
    }
  ],
  "has_more": true,
  "next_page": "eyJjdXJzb3IiOiAicmJhY19yb2xlXzAxIn0"
}
```
