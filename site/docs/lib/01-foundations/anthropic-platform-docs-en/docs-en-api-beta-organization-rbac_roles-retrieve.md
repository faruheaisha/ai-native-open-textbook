---
title: "Get RBAC Role"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/rbac_roles/retrieve.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/rbac_roles/retrieve.md"
sourceSha256: "67530207392fc9311c802ebe7546058568ab2c095899d41ea18f5c27c41d714b"
pageSha256: "67530207392fc9311c802ebe7546058568ab2c095899d41ea18f5c27c41d714b"
contentMode: "local-full"
zh: ""
---

# Get RBAC Role

**GET** `/v1/organizations/rbac_roles/\{role_id\}`

Retrieve an RBAC Role by ID.

The RBAC Roles API is available to Claude Enterprise organizations only.

## Path parameters

- `role_id: string`

  ID of the RBAC Role.

## Returns

- `BetaRBACRole object`

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

## Example

```bash
curl https://api.anthropic.com/v1/organizations/rbac_roles/$ROLE_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-user-management-2026-07-13' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "rbac_role_016J8xVtKpDq3Wy9ZmN2hR4s",
  "created_at": "2024-10-30T23:58:27.427722Z",
  "name": "Project Editor",
  "type": "rbac_role",
  "updated_at": "2024-10-30T23:58:27.427722Z"
}
```
