---
title: "Get User"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/organization/users/retrieve.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/organization/users/retrieve.md"
sourceSha256: "a8e7ce2598e82b2278e6655d3c1ab4b4510590b0c40e8d78dec0ac0112dde319"
pageSha256: "a8e7ce2598e82b2278e6655d3c1ab4b4510590b0c40e8d78dec0ac0112dde319"
contentMode: "local-full"
zh: ""
---

# Get User

**GET** `/v1/organizations/users/\{user_id\}`

Retrieve a member of the organization by user ID.

## Path parameters

- `user_id: string`

  ID of the User.

## Returns

- `BetaOrganizationUser object`

  - `type: "user"`

    Object type.

    For Users, this is always `"user"`.

    default: user

  - `id: string`

    ID of the User.

  - `added_at: string`

    RFC 3339 datetime string indicating when the User joined the Organization.

    format: date-time

  - `email: string`

    Email of the User.

  - `name: string`

    Name of the User.

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

## Example

```bash
curl https://api.anthropic.com/v1/organizations/users/$USER_ID \
    -H 'anthropic-version: 2023-06-01' \
    -H "X-Api-Key: $ANTHROPIC_API_KEY"
```

### Response (200)

```json
{
  "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
  "added_at": "2024-10-30T23:58:27.427722Z",
  "email": "user@emaildomain.com",
  "name": "Jane Doe",
  "role": "admin",
  "type": "user"
}
```
