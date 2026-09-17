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
pageSha256: "b27d1e458e89cfa6d7c9a1efc14eae830e9310dcf89e1fac8a312ccdb9c0acf3"
contentMode: "local-full"
zh: ""
---

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

## Compliance API › Apps › Chats › Generated Files

### Get Claude-generated file metadata

**GET** `/v1/compliance/apps/chats/generated-files/\{claude_gen_file_id\}`

Returns metadata for a file the assistant created via tool use.

Use the sibling `/content` endpoint to download the bytes.

#### Path parameters

- `claude_gen_file_id: string`

  The generated-file id (e.g., 'claude_gen_file_abc123') as returned in `chat_messages[].generated_files[].id` from GET /apps/chats/\{claude_chat_id\}/messages.

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Returns

- `id: string`

  Opaque generated-file id, e.g. 'claude_gen_file_abc123'.

- `claude_chat_id: string`

  The chat this generated file belongs to

- `created_at: string or null`

  File creation timestamp, when available

  format: date-time

- `filename: string`

  Display name of the generated file

- `md5: string or null`

  Lowercase hex MD5 of the stored file. Null when no stored hash is available. The sibling `/content` endpoint also sets a `Content-MD5` header (base64 per RFC 1864) computed over the exact served bytes.

- `mime_type: string or null`

  MIME type of the stored file, when available

- `size_bytes: number or null`

  Size in bytes of the stored file, when available

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/generated-files/$CLAUDE_GEN_FILE_ID \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
