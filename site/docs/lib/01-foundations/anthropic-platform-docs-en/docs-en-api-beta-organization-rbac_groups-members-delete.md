---
title: "Remove RBAC Group Member"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/rbac_groups/members/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/rbac_groups/members/delete.md"
sourceSha256: "5605ceb4d6e158bbe236b530ff9a6fce444537df0d976c0bacf6058589e3c945"
pageSha256: "5605ceb4d6e158bbe236b530ff9a6fce444537df0d976c0bacf6058589e3c945"
contentMode: "local-full"
zh: ""
---

# Remove RBAC Group Member

**DELETE** `/v1/organizations/rbac_groups/\{group_id\}/members/\{user_id\}`

Remove a User from an RBAC Group. Membership of groups provisioned by an identity provider (source type `"scim"`) cannot be modified via the API while an organization in the tenant uses SCIM provisioning.

The RBAC Groups API is available to Claude Enterprise organizations only.

## Path parameters

- `group_id: string`

  ID of the RBAC Group.

- `user_id: string`

  ID of the User.

## Returns

- `BetaRBACGroupMemberDeleted object`

  - `type: "rbac_group_member_deleted"`

    Deleted object type. For RBAC Group Members, this is always `"rbac_group_member_deleted"`.

    default: rbac_group_member_deleted

  - `group_id: string`

    ID of the RBAC Group.

  - `user_id: string`

    ID of the User.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/rbac_groups/$GROUP_ID/members/$USER_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H 'anthropic-beta: ce-user-management-2026-07-13' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "group_id": "rbac_group_012rppKaSVsmTo6NqRDXQXNF",
  "type": "rbac_group_member_deleted",
  "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q"
}
```
