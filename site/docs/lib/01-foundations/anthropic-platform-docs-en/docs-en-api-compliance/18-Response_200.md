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
pageSha256: "e6e5ae8630af2d380bba106025363c57c49e142b62444b2d36a9215d4cf812da"
contentMode: "local-full"
zh: ""
---

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
