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
pageSha256: "6425f966270dc001c1ad1e3ac95bd5cf4860e72102b5d352cd255373e74e314b"
contentMode: "local-full"
zh: ""
---

#### Returns

Returns a [`Query`](#query-object) object that extends `AsyncGenerator<`[`SDKMessage`](#sdkmessage)`, void>` with additional methods.

### `startup()`

Pre-warms the CLI subprocess by spawning it and completing the initialize handshake before a prompt is available. The returned [`WarmQuery`](#warmquery) handle accepts a prompt later and writes it to an already-ready process, so the first `query()` call resolves without paying subprocess spawn and initialization cost inline.

```typescript theme={null}
function startup(params?: {
  options?: Options;
  initializeTimeoutMs?: number;
}): Promise<WarmQuery>;
```
