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
pageSha256: "2983e5a47b91fc9741424b45a0e9cb85913dabf1f6223f64f1c5382cd9fdfbca"
contentMode: "local-full"
zh: ""
---

#### Parameters

| Parameter     | Type     | Default     | Description                                                            |
| :------------ | :------- | :---------- | :--------------------------------------------------------------------- |
| `sessionId`   | `string` | required    | UUID of the session to look up                                         |
| `options.dir` | `string` | `undefined` | Project directory path. When omitted, searches all project directories |

Returns [`SDKSessionInfo`](#return-type-sdksessioninfo), or `undefined` if the session is not found.

### `renameSession()`

Renames a session by appending a custom-title entry. Repeated calls are safe; the most recent title wins.

```typescript theme={null}
function renameSession(
  sessionId: string,
  title: string,
  options?: SessionMutationOptions
): Promise<void>;
```
