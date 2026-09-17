---
title: "openai-codex-docs-official"
sourceId: "09-harness/openai-codex-docs-official"
sourceTitle: "openai-codex-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://learn.chatgpt.com/docs"
entryUrl: "https://learn.chatgpt.com/docs"
sourceRel: "docs/app-server.md"
rawUrl: "/raw/09-harness/openai-codex-docs-official/docs/app-server.md"
sourceSha256: "a72a5c88ab05ab9737ec28b432708f2776f696be48eae09ee39c02dd2f9480e0"
pageSha256: "123587bef6b58e1e1fd35a3d6f4c9d39aa2409b4d97965449a9e6a11ad8fee35"
contentMode: "local-full"
zh: ""
---

## Message schema

Requests include `method`, `params`, and `id`:

```json
{ "method": "thread/start", "id": 10, "params": { "model": "gpt-5.6-terra" } }
```

Responses echo the `id` with either `result` or `error`:

```json
{ "id": 10, "result": { "thread": { "id": "thr_123" } } }
```

```json
{ "id": 10, "error": { "code": 123, "message": "Something went wrong" } }
```

Notifications omit `id` and use only `method` and `params`:

```json
{ "method": "turn/started", "params": { "turn": { "id": "turn_456" } } }
```

You can generate a TypeScript schema or a JSON Schema bundle from the CLI. Each output is specific to the Codex version you ran, so the generated artifacts match that version exactly:

```bash
codex app-server generate-ts --out ./schemas
codex app-server generate-json-schema --out ./schemas
```
