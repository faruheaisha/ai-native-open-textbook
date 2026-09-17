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
sourceRel: "docs/en/api/compliance/apps.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/apps.md"
sourceSha256: "a1cd117638678f7433ec5b214714cfa319b66be6278fd0a4040290f540500ebb"
pageSha256: "9257c0a030656cae7b14b787d65d0da76ffccf4b7316652cca5ae57b72fd00ef"
contentMode: "local-full"
zh: ""
---

## Apps › Projects

### List projects

**GET** `/v1/compliance/apps/projects`

Lists project metadata with filtering capabilities. Results
are sorted chronologically (time ascending) by created_at.

#### Query parameters

- `created_at: optional object`

  - `gt: optional string`

    Filter projects created after this time (RFC 3339 format)

    format: date-time

  - `gte: optional string`

    Filter projects created at or after this time (RFC 3339 format)

    format: date-time

  - `lt: optional string`

    Filter projects created before this time (RFC 3339 format)

    format: date-time

  - `lte: optional string`

    Filter projects created at or before this time (RFC 3339 format)

    format: date-time

- `limit: optional number`

  Maximum results (default: 20, max: 100)

  default: 20, maximum: 100, minimum: 1

- `organization_ids: optional array of string`

  Filter by organization IDs (accepts `org_...` or organization UUID). Enumerate IDs via `GET /v1/compliance/organizations`.

- `page: optional string`

  Opaque pagination token from a previous response's `next_page` field. Pass this to retrieve the next page of results. Clients should treat this value as an opaque string and not attempt to parse or interpret its contents, as the format may change without notice.

- `updated_at: optional object`

  - `gt: optional string`

    Filter projects updated after this time (RFC 3339 format)

    format: date-time

  - `gte: optional string`

    Filter projects updated at or after this time (RFC 3339 format)

    format: date-time

  - `lt: optional string`

    Filter projects updated before this time (RFC 3339 format)

    format: date-time

  - `lte: optional string`

    Filter projects updated at or before this time (RFC 3339 format)

    format: date-time

- `user_ids: optional array of string`

  Filter by user IDs. Enumerate IDs via `GET /v1/compliance/organizations/\{org_uuid\}/users`.

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `data: array of object`

  List of projects sorted by creation date ascending

  - `id: string`

    Project identifier (tagged ID)

  - `created_at: string`

    Project creation timestamp

    format: date-time

  - `deleted_at: string or null`

    Timestamp when the project was deleted by an end user, or null otherwise

    format: date-time

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

- `has_more: boolean`

  Whether more records exist beyond the current result set

- `next_page: string or null`

  Token to retrieve the next page. Use this as the 'page' parameter in your next request

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/projects \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

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

##### Response (200)

```json
{
  "id": "claude_proj_01Nm7PqRsTuVwXyZaBcDeFgH",
  "attachments_count": 3,
  "chats_count": 14,
  "created_at": "2025-03-12T18:22:41.123456Z",
  "deleted_at": "2019-12-27T18:11:19.117Z",
  "description": "Planning and research for the Q3 launch",
  "instructions": "Focus on concise, actionable answers.",
  "is_private": true,
  "name": "Q3 Product Launch",
  "organization_id": "org_015eofRkKpogX7uDKUyvBTph",
  "organization_uuid": "a1b2c3d4-e5f6-4789-a012-3456789abcde",
  "updated_at": "2025-03-14T09:05:17.456789Z",
  "user": {
    "id": "user_01WCz1FkmYMm4gnmykNKUu3Q",
    "email_address": "jane.doe@example.com"
  }
}
```

### Delete project

**DELETE** `/v1/compliance/apps/projects/\{project_id\}`

Delete a project for compliance purposes.

Hard-deletes the project and all its associated data including:

- All project documents and files
- All role assignments
- Knowledge base (if RAG is enabled)
- Sync sources

Project must have no attached chats - returns 409 if chats exist.

#### Path parameters

- `project_id: string`

  The project ID (tagged ID, e.g., claude_proj_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `type: optional "claude_project_deleted"`

  Constant string confirming deletion.

  default: claude_project_deleted

- `id: string`

  The ID of the Claude project that was deleted

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/projects/$PROJECT_ID \
    -X DELETE \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

##### Response (200)

```json
{
  "id": "id",
  "type": "claude_project_deleted"
}
```
