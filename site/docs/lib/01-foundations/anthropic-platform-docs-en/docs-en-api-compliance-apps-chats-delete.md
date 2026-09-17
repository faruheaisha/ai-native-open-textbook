---
title: "Delete chat"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/compliance/apps/chats/delete.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/apps/chats/delete.md"
sourceSha256: "5d86490a838f3753ab33a7347f457a4095f372268ff63befab54c175fe84e9bc"
pageSha256: "5d86490a838f3753ab33a7347f457a4095f372268ff63befab54c175fe84e9bc"
contentMode: "local-full"
zh: ""
---

# Delete chat

**DELETE** `/v1/compliance/apps/chats/\{claude_chat_id\}`

Permanently deletes a chat and all associated messages and
files. This is a destructive operation that cannot be undone.

## Path parameters

- `claude_chat_id: string`

  The chat ID (tagged ID, e.g., claude_chat_abc123)

## Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

## Returns

- `type: optional "claude_chat_deleted"`

  Constant string confirming deletion

  default: claude_chat_deleted

- `id: string`

  The ID of the Claude chat that was deleted

## Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/$CLAUDE_CHAT_ID \
    -X DELETE \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```

### Response (200)

```json
{
  "id": "claude_chat_abc123",
  "type": "claude_chat_deleted"
}
```
