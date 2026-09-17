---
title: "Delete Workspace Member"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/workspaces/members/remove.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/workspaces/members/remove.md"
sourceSha256: "d66b140abdb859dc7fcb24128c237930c80e91cff786fde9f3ae65da769d3270"
pageSha256: "d66b140abdb859dc7fcb24128c237930c80e91cff786fde9f3ae65da769d3270"
contentMode: "local-full"
zh: ""
---

# Delete Workspace Member

**DELETE** `/v1/organizations/workspaces/\{workspace_id\}/members/\{user_id\}`

Delete Workspace Member

## Path parameters

- `workspace_id: string`

  ID of the Workspace.

- `user_id: string`

  ID of the User.

## Returns

- `type: "workspace_member_deleted"`

  Deleted object type.

  For Workspace Members, this is always `"workspace_member_deleted"`.

  default: workspace_member_deleted

- `user_id: string`

  ID of the User.

- `workspace_id: string`

  ID of the Workspace.

## Example

```bash
curl https://api.anthropic.com/v1/organizations/workspaces/$WORKSPACE_ID/members/$USER_ID \
    -X DELETE \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "type": "workspace_member_deleted",
  "user_id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
  "workspace_id": "wrkspc_01JwQvzr7rXLA5AGx3HKfFUJ"
}
```
