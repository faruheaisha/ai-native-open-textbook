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
pageSha256: "1b42776fc84a4a8379e6da63a0f86b53aad68a42c442fc7cb1bfba4c5117929f"
contentMode: "local-full"
zh: ""
---

## Apps › Chats › Files

### Get file metadata

**GET** `/v1/compliance/apps/chats/files/\{claude_file_id\}`

Retrieves metadata for a file referenced in chat messages, without
downloading the file content. Use the sibling `/content` endpoint to
download the bytes.

#### Path parameters

- `claude_file_id: string`

  The file ID (tagged ID, e.g., claude_file_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `id: string`

  File ID

- `claude_chat_ids: array of string`

  Chats this file is attached to. A file can be referenced by messages across multiple chats.

- `created_at: string`

  File creation timestamp

  format: date-time

- `filename: string or null`

  Display name of the file, if set

- `md5: string or null`

  Lowercase hex MD5 of the file's preferred downloadable variant, as recorded at upload time. Null when no stored hash is available. The sibling `/content` endpoint also sets a `Content-MD5` header (base64 per RFC 1864) computed over the exact served bytes; when the two disagree, the header is authoritative.

- `message_ids: array of string`

  Chat message IDs this file is attached to. A file can be referenced by multiple messages.

- `mime_type: string or null`

  MIME type of the file's preferred downloadable variant (e.g. 'application/pdf'). May be null for files with no downloadable content (e.g. code-interpreter outputs).

- `size_bytes: number or null`

  Size in bytes of the file's preferred downloadable variant, if known

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/files/$CLAUDE_FILE_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

##### Response (200)

```json
{
  "id": "claude_file_xyz789",
  "filename": "quarterly_report.pdf",
  "mime_type": "application/pdf",
  "size_bytes": 1048576,
  "md5": "5d41402abc4b2a76b9719d911017c592",
  "created_at": "2024-01-15T10:30:00Z",
  "message_ids": [
    "claude_chat_msg_abc123"
  ],
  "claude_chat_ids": [
    "claude_chat_def456"
  ]
}
```

### Delete file

**DELETE** `/v1/compliance/apps/chats/files/\{claude_file_id\}`

Permanently deletes a specific file. This is a destructive
operation that cannot be undone.

#### Path parameters

- `claude_file_id: string`

  The file ID (tagged ID, e.g., claude_file_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `type: optional "claude_file_deleted"`

  Constant string confirming deletion

  default: claude_file_deleted

- `id: string`

  The ID of the file that was deleted

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/files/$CLAUDE_FILE_ID \
    -X DELETE \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

##### Response (200)

```json
{
  "id": "claude_file_xyz789",
  "type": "claude_file_deleted"
}
```

### Download file content

**GET** `/v1/compliance/apps/chats/files/\{claude_file_id\}/content`

Downloads the binary content of a file referenced in chat messages.

#### Path parameters

- `claude_file_id: string`

  The file ID (tagged ID, e.g., claude_file_abc123)

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/files/$CLAUDE_FILE_ID/content \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
