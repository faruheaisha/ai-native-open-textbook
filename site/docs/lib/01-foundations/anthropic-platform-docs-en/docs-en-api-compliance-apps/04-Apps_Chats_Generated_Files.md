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
pageSha256: "0d6715b165044877a9e775d9388d24a3ef216e93845cdba089c068e8dba9360c"
contentMode: "local-full"
zh: ""
---

## Apps › Chats › Generated Files

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

##### Response (200)

```json
{
  "id": "id",
  "claude_chat_id": "claude_chat_id",
  "created_at": "2019-12-27T18:11:19.117Z",
  "filename": "filename",
  "md5": "md5",
  "mime_type": "mime_type",
  "size_bytes": 0
}
```

### Download a Claude-generated file

**GET** `/v1/compliance/apps/chats/generated-files/\{claude_gen_file_id\}/content`

Downloads the binary content of a file the assistant created via tool use.

#### Path parameters

- `claude_gen_file_id: string`

  The generated-file id (e.g., 'claude_gen_file_abc123') as returned in `chat_messages[].generated_files[].id` from GET /apps/chats/\{claude_chat_id\}/messages.

#### Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

#### Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/generated-files/$CLAUDE_GEN_FILE_ID/content \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
