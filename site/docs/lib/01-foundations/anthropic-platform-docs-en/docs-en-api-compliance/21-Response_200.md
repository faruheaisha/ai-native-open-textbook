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
pageSha256: "e126836bcc997d30c4f7a87c687feaa694842768d2a853d21c2e5acde70921e6"
contentMode: "local-full"
zh: ""
---

##### Response (200)

```json
{
  "data": [
    {
      "granted_at": "2019-12-27T18:11:19.117Z",
      "role": "admin",
      "type": "user",
      "user_id": "user_id"
    }
  ],
  "has_more": true,
  "next_page": "next_page"
}
```

## Compliance API › Apps › Projects › Documents

### Get project document content

**GET** `/v1/compliance/apps/projects/documents/\{document_id\}`

Get detailed information for a specific project document.

#### Path parameters

- `document_id: string`

  The document ID (tagged ID, e.g., claude_proj_doc_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `id: string`

  Project document identifier (tagged ID)

- `content: string`

  Document text content

- `created_at: string`

  Document creation timestamp

  format: date-time

- `filename: string`

  Document filename

- `user: object or null`

  The user who created a project or project document.

  Fields that reference this type are null when the creator's account has
  been deleted or the creator is no longer a member of an organization the
  key may read.

  - `id: string`

    User identifier (tagged ID)

  - `email_address: string`

    User's email address

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/projects/documents/$DOCUMENT_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
