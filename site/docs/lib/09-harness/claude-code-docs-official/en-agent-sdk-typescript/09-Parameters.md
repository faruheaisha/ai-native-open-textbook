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
pageSha256: "c2821613a8dad5d5a692ec9e0a82abbe5485a0d527b3e2d376515999ec7bcb7a"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter                  | Type      | Default     | Description                                                                        |
| :------------------------- | :-------- | :---------- | :--------------------------------------------------------------------------------- |
| `options.dir`              | `string`  | `undefined` | Directory to list sessions for. When omitted, returns sessions across all projects |
| `options.limit`            | `number`  | `undefined` | Maximum number of sessions to return                                               |
| `options.includeWorktrees` | `boolean` | `true`      | When `dir` is inside a git repository, include sessions from all worktree paths    |
