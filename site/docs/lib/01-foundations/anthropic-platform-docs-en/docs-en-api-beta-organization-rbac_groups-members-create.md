---
title: "Add RBAC Group Member"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/rbac_groups/members/create.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/rbac_groups/members/create.md"
sourceSha256: "7548ee05139378c7bb1bef1a0e96ac74814bfd9f5479fd09c2175a4609546aaa"
pageSha256: "7548ee05139378c7bb1bef1a0e96ac74814bfd9f5479fd09c2175a4609546aaa"
contentMode: "local-full"
zh: ""
---

# Add RBAC Group Member

**POST** `/v1/organizations/rbac_groups/\{group_id\}/members`

Add a User to an RBAC Group. Membership of groups provisioned by an identity provider (source type `"scim"`) cannot be modified via the API while an organization in the tenant uses SCIM provisioning.

The RBAC Groups API is available to Claude Enterprise organizations only.

## Path parameters

- `group_id: string`

  ID of the RBAC Group.

## Body parameters

- `user_id: string`

  ID of the User.

## Returns

- `BetaRBACGroupMember object`

  - `type: "rbac_group_member"`

    Object type.

    For RBAC Group Members, this is always `"rbac_group_member"`.

    default: rbac_group_member

  - `created_at: string`

    RFC 3339 timestamp of when the User was added to the RBAC Group.

    format: date-time

  - `email: string`

    Email of the User.

  - `group_id: string`

    ID of the RBAC Group.

  - `user_id: string`

    ID of the User.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/rbac_groups/$GROUP_ID/members \
    -H 'Content-Type: application/json' \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-user-management-2026-07-13' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY" \
    -d '{
          "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
        }'
```

### Response (200)

```json
{
  "created_at": "2024-10-30T23:58:27.427722Z",
  "email": "user@emaildomain.com",
  "group_id": "rbac_group_012rppKaSVsmTo6NqRDXQXNF",
  "type": "rbac_group_member",
  "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
}
```
