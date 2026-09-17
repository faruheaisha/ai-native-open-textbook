---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/compliance.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance.md"
sourceSha256: "8af66acb3141be9f44ca167f0bc76f30e333a12e3a466766363c4f330e5eed7d"
pageSha256: "a41731a613b2428c505fb9cc104a8d77beda18dc9e7cbbe606ec71921d6cb80a"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "data": [
    {
      "id": "claude_proj_abc123",
      "name": "Q4 Product Planning",
      "created_at": "2025-06-01T10:00:00Z",
      "updated_at": "2025-06-15T14:30:00Z",
      "is_private": true,
      "organization_id": "org_abc123",
      "organization_uuid": "abc12345-6789-0abc-def0-123456789abc",
      "user": {
        "id": "user_xyz456",
        "email_address": "user@example.com"
      }
    }
  ],
  "has_more": true,
  "next_page": "page_eyJjcmVhdGVkX2F0IjoiMjAyNS0wNi0wMVQxMDowMDowMFoiLCJ1dWlkIjoiYWJjMTIzIn0="
}
```

### Get project details

**GET** `/v1/compliance/apps/projects/\{project_id\}`

Get detailed information for a specific project.

#### Path parameters

- `project_id: string`

  The project ID (tagged ID, e.g., claude_proj_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `id: string`

  Project identifier (tagged ID)

- `attachments_count: number`

  Number of attachments contained within this project

- `chats_count: number`

  Number of chats contained within this project

- `created_at: string`

  Project creation timestamp

  format: date-time

- `deleted_at: string or null`

  Timestamp when the project was deleted by an end user, or null otherwise

  format: date-time

- `description: string`

  Project description

- `instructions: string`

  Project's custom instructions / prompt

- `is_private: boolean`

  If false, the project is visible to all organization members; if true the project is accessible only to the creator and specified collaborators

- `name: string`

  Project name

- `organization_uuid: string`

  Organization UUID this project belongs to

- `updated_at: string`

  Project last update timestamp

  format: date-time

- `user: object or null`

  The user who created a project or project document.

  Fields that reference this type are null when the creator's account has
  been deleted or the creator is no longer a member of an organization the
  key may read.

  - `id: string`

    User identifier (tagged ID)

  - `email_address: string`

    User's email address

- `organization_id: string`

  **Deprecated**

  Organization identifier (tagged ID)

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/projects/$PROJECT_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
