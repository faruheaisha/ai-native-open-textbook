---
title: "Get Invite"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/invites/retrieve.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/invites/retrieve.md"
sourceSha256: "7a2899de1829e78fab7448ad7b93ccf467af4db087eb6a8463de0d12406f0cd5"
pageSha256: "7a2899de1829e78fab7448ad7b93ccf467af4db087eb6a8463de0d12406f0cd5"
contentMode: "local-full"
zh: ""
---

# Get Invite

**GET** `/v1/organizations/invites/\{invite_id\}`

Retrieve an invite by ID.

## Path parameters

- `invite_id: string`

  ID of the Invite.

## Returns

- `BetaOrganizationInvite object`

  - `type: "invite"`

    Object type.

    For Invites, this is always `"invite"`.

    default: invite

  - `id: string`

    ID of the Invite.

  - `accepted_at: string or null`

    RFC 3339 datetime string indicating when the Invite was accepted, or null.

    format: date-time

  - `email: string`

    Email of the User being invited.

  - `expires_at: string`

    RFC 3339 datetime string indicating when the Invite expires.

    format: date-time

  - `invited_at: string`

    RFC 3339 datetime string indicating when the Invite was created.

    format: date-time

  - `rbac_group_ids: array of string`

    RBAC group IDs recorded on the Invite (Claude Enterprise organizations), to be assigned to the User when the Invite is accepted. `[]` when none.

  - `role: BetaOrganizationRole`

    Organization role of the User.

    - `"admin"`

    - `"billing"`

    - `"claude_code_user"`

    - `"developer"`

    - `"managed"`

    - `"membership_admin"`

    - `"owner"`

    - `"primary_owner"`

    - `"user"`

  - `status: "accepted" or "deleted" or "expired" or "pending"`

    Status of the Invite.

    - `"accepted"`

    - `"deleted"`

    - `"expired"`

    - `"pending"`

## Example

```bash
curl https://api.anthropic.com/v1/organizations/invites/$INVITE_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "invite_015gWxCN9Hfg2QhZwTK7Mdeu",
  "accepted_at": "2019-12-27T18:11:19.117Z",
  "email": "user@emaildomain.com",
  "expires_at": "2024-11-20T23:58:27.427722Z",
  "invited_at": "2024-10-30T23:58:27.427722Z",
  "rbac_group_ids": [
    "string"
  ],
  "role": "admin",
  "status": "pending",
  "type": "invite"
}
```
