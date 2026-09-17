---
title: "Remove User"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/users/remove.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/users/remove.md"
sourceSha256: "caf1c1af87705e9d04335b28f78184f7851e8f7f59b3b39509225f230600b4e5"
pageSha256: "caf1c1af87705e9d04335b28f78184f7851e8f7f59b3b39509225f230600b4e5"
contentMode: "local-full"
zh: ""
---

# Remove User

**DELETE** `/v1/organizations/users/\{user_id\}`

Remove a member from the organization.

## Path parameters

- `user_id: string`

  ID of the User.

## Returns

- `type: "user_deleted"`

  Deleted object type.

  For Users, this is always `"user_deleted"`.

  default: user_deleted

- `id: string`

  ID of the User.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/users/$USER_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
  "type": "user_deleted"
}
```
