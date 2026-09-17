---
title: "Delete Invite"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/invites/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/invites/delete.md"
sourceSha256: "e4a65f30f052eef4cbbeb0a64853a2cdbad375eac7dc12b6b169803b66653881"
pageSha256: "e4a65f30f052eef4cbbeb0a64853a2cdbad375eac7dc12b6b169803b66653881"
contentMode: "local-full"
zh: ""
---

# Delete Invite

**DELETE** `/v1/organizations/invites/\{invite_id\}`

Delete a pending invite.

## Path parameters

- `invite_id: string`

  ID of the Invite.

## Returns

- `type: "invite_deleted"`

  Deleted object type.

  For Invites, this is always `"invite_deleted"`.

  default: invite_deleted

- `id: string`

  ID of the Invite.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/invites/$INVITE_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "invite_015gWxCN9Hfg2QhZwTK7Mdeu",
  "type": "invite_deleted"
}
```
