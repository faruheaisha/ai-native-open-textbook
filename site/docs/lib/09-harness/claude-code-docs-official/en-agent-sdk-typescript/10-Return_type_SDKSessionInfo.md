---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "193517ffc51fecf724eef820c48072e27f87b6f786c60af006a08b5aca08f6b6"
contentMode: "local-full"
zh: ""
---

#### Return type: `SDKSessionInfo`

| Property       | Type                  | Description                                                                 |
| :------------- | :-------------------- | :-------------------------------------------------------------------------- |
| `sessionId`    | `string`              | Unique session identifier (UUID)                                            |
| `summary`      | `string`              | Display title: custom title, auto-generated summary, or first prompt        |
| `lastModified` | `number`              | Last modified time in milliseconds since epoch                              |
| `fileSize`     | `number \| undefined` | Session file size in bytes. Only populated for local JSONL storage          |
| `customTitle`  | `string \| undefined` | User-set session title (via `/rename`)                                      |
| `firstPrompt`  | `string \| undefined` | First meaningful user prompt in the session                                 |
| `gitBranch`    | `string \| undefined` | Git branch at the end of the session                                        |
| `cwd`          | `string \| undefined` | Working directory for the session                                           |
| `tag`          | `string \| undefined` | User-set session tag (see [`tagSession()`](#tagsession))                    |
| `createdAt`    | `number \| undefined` | Creation time in milliseconds since epoch, from the first entry's timestamp |
