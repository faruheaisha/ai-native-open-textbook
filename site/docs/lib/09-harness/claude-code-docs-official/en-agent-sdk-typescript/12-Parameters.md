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
pageSha256: "b5f2af982c7d0b47f98c5928882c71ae47a405b0844816d5a0690f5cbe2c84bb"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter        | Type     | Default     | Description                                                                   |
| :--------------- | :------- | :---------- | :---------------------------------------------------------------------------- |
| `sessionId`      | `string` | required    | Session UUID to read (see `listSessions()`)                                   |
| `options.dir`    | `string` | `undefined` | Project directory to find the session in. When omitted, searches all projects |
| `options.limit`  | `number` | `undefined` | Maximum number of messages to return                                          |
| `options.offset` | `number` | `undefined` | Number of messages to skip from the start                                     |
