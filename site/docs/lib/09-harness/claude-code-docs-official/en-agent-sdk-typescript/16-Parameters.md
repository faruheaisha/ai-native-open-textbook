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
pageSha256: "a13f943ece9e170f92406ccb31cb465b6a51683b1303eee3e0f82dcaa6d59e41"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter     | Type     | Default     | Description                                                            |
| :------------ | :------- | :---------- | :--------------------------------------------------------------------- |
| `sessionId`   | `string` | required    | UUID of the session to rename                                          |
| `title`       | `string` | required    | New title. Must be non-empty after trimming whitespace                 |
| `options.dir` | `string` | `undefined` | Project directory path. When omitted, searches all project directories |

### `tagSession()`

Tags a session. Pass `null` to clear the tag. Repeated calls are safe; the most recent tag wins.

```typescript theme={null}
function tagSession(
  sessionId: string,
  tag: string | null,
  options?: SessionMutationOptions
): Promise<void>;
```
