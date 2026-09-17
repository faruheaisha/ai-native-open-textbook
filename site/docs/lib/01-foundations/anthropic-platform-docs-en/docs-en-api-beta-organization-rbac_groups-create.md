---
title: "Create RBAC Group"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/rbac_groups/create.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/rbac_groups/create.md"
sourceSha256: "79ac29c5b12c09258cb8d877512a2db2b551aaf6b58d295f36abdd529bbdab4b"
pageSha256: "79ac29c5b12c09258cb8d877512a2db2b551aaf6b58d295f36abdd529bbdab4b"
contentMode: "local-full"
zh: ""
---

# Create RBAC Group

**POST** `/v1/organizations/rbac_groups`

Create an RBAC Group in the Claude Enterprise tenant. Groups created via the API have source type `"direct"`.

The RBAC Groups API is available to Claude Enterprise organizations only.

## Body parameters

- `name: string`

  Name of the RBAC Group. Not uniqueness-enforced.

  maxLength: 255, minLength: 1

## Returns

- `BetaRBACGroup object`

  - `type: "rbac_group"`

    Object type.

    For RBAC Groups, this is always `"rbac_group"`.

    default: rbac_group

  - `id: string`

    ID of the RBAC Group.

  - `created_at: string`

    RFC 3339 timestamp of when the RBAC Group was created.

    format: date-time

  - `name: string`

    Name of the RBAC Group. Not uniqueness-enforced.

  - `roles: array of string or null`

    RBAC Role IDs attached to this RBAC Group. Role attachment is managed in the admin settings and is read-only on this API. `null` means role data was temporarily unavailable — retry to distinguish from an empty list.

  - `source_type: "direct" or "scim"`

    How the RBAC Group was created: `"direct"` for groups created directly (for example, in the organization's admin settings), `"scim"` for groups provisioned by the identity provider.

    - `"direct"`

    - `"scim"`

  - `updated_at: string`

    RFC 3339 timestamp of when the RBAC Group was last updated.

    format: date-time

## Example

```bash
curl https://api.anthropic.com/v1/organizations/rbac_groups \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-user-management-2026-07-13' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "name": "Engineering"
        }'
```

### Response (200)

```json
{
  "id": "rbac_group_012rppKaSVsmTo6NqRDXQXNF",
  "created_at": "2024-10-30T23:58:27.427722Z",
  "name": "Engineering",
  "roles": [
    "rbac_role_016J8xVtKpDq3Wy9ZmN2hR4s"
  ],
  "source_type": "direct",
  "type": "rbac_group",
  "updated_at": "2024-10-30T23:58:27.427722Z"
}
```
