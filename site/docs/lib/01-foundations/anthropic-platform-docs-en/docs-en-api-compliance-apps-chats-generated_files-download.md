---
title: "Download a Claude-generated file"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/compliance/apps/chats/generated_files/download.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/apps/chats/generated_files/download.md"
sourceSha256: "3c46be00b457cc059fe2de2304a18d5dcc4d6fd569c08b8efb50970643a1342f"
pageSha256: "3c46be00b457cc059fe2de2304a18d5dcc4d6fd569c08b8efb50970643a1342f"
contentMode: "local-full"
zh: ""
---

# Download a Claude-generated file

**GET** `/v1/compliance/apps/chats/generated-files/\{claude_gen_file_id\}/content`

Downloads the binary content of a file the assistant created via tool use.

## Path parameters

- `claude_gen_file_id: string`

  The generated-file id (e.g., 'claude_gen_file_abc123') as returned in `chat_messages[].generated_files[].id` from GET /apps/chats/\{claude_chat_id\}/messages.

## Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

## Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/generated-files/$CLAUDE_GEN_FILE_ID/content \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
