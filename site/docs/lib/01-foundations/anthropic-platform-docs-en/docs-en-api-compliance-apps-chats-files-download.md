---
title: "Download file content"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/compliance/apps/chats/files/download.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/compliance/apps/chats/files/download.md"
sourceSha256: "2c1caa8fd6e911d665e76ad871c0da357c6858e3a09b81be5edf322e140872d2"
pageSha256: "2c1caa8fd6e911d665e76ad871c0da357c6858e3a09b81be5edf322e140872d2"
contentMode: "local-full"
zh: ""
---

# Download file content

**GET** `/v1/compliance/apps/chats/files/\{claude_file_id\}/content`

Downloads the binary content of a file referenced in chat messages.

## Path parameters

- `claude_file_id: string`

  The file ID (tagged ID, e.g., claude_file_abc123)

## Headers

- `"anthropic-version": optional string`

  The version of the Claude API you want to use.

  Read more about versioning and our version history [here](https://platform.claude.com/docs/en/api/versioning).

- `"x-api-key": optional string`

## Example

```bash
curl https://api.anthropic.com/v1/compliance/apps/chats/files/$CLAUDE_FILE_ID/content \
    -H "Authorization: Bearer $ANTHROPIC_COMPLIANCE_API_KEY"
```
