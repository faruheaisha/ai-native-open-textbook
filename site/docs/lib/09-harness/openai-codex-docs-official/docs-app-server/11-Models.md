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
pageSha256: "b2d884838087e87baa5f6f7cdb3501faf190b985cf8ad23f9680381ed45ec7c8"
contentMode: "local-full"
zh: ""
---

## Models

### List models (`model/list`)

Call `model/list` to discover available models and their capabilities before rendering model or personality selectors.

```json
{ "method": "model/list", "id": 6, "params": { "limit": 20, "includeHidden": false } }
{ "id": 6, "result": {
  "data": [{
    "id": "gpt-5.6-sol",
    "model": "gpt-5.6-sol",
    "displayName": "GPT-5.6-Sol",
    "hidden": false,
    "defaultReasoningEffort": "low",
    "supportedReasoningEfforts": [{
      "reasoningEffort": "low",
      "description": "Fast responses with lighter reasoning"
    }],
    "inputModalities": ["text", "image"],
    "supportsPersonality": true,
    "isDefault": true
  }],
  "nextCursor": null
} }
```

Each model entry can include:

- `supportedReasoningEfforts` - supported effort options for the model.
- `defaultReasoningEffort` - suggested default effort for clients.
- `upgrade` - optional recommended upgrade model id for migration prompts in clients.
- `upgradeInfo` - optional upgrade metadata for migration prompts in clients.
- `hidden` - whether the model is hidden from the default picker list.
- `inputModalities` - supported input types for the model (for example `text`, `image`).
- `supportsPersonality` - whether the model supports personality-specific instructions such as `/personality`.
- `isDefault` - whether the model is the recommended default.

By default, `model/list` returns picker-visible models only. Set `includeHidden: true` if you need the full list and want to filter on the client side using `hidden`.

When `inputModalities` is missing (older model catalogs), treat it as `["text", "image"]` for backward compatibility.

### List experimental features (`experimentalFeature/list`)

Use this endpoint to discover feature flags with metadata and lifecycle stage:

```json
{ "method": "experimentalFeature/list", "id": 7, "params": { "limit": 20 } }
{ "id": 7, "result": {
  "data": [{
    "name": "unified_exec",
    "stage": "beta",
    "displayName": "Unified exec",
    "description": "Use the unified PTY-backed execution tool.",
    "announcement": "Beta rollout for improved command execution reliability.",
    "enabled": false,
    "defaultEnabled": false
  }],
  "nextCursor": null
} }
```

`stage` can be `beta`, `underDevelopment`, `stable`, `deprecated`, or `removed`. For non-beta flags, `displayName`, `description`, and `announcement` may be `null`.

### Inspect an execution environment (experimental)

Use `environment/info` to inspect a configured remote environment before
starting work there. The method requires `capabilities.experimentalApi = true`.

```json
{ "method": "environment/info", "id": 8, "params": { "environmentId": "devbox" } }
{ "id": 8, "result": {
  "shell": { "name": "zsh", "path": "/bin/zsh" },
  "cwd": "file:///workspace/project"
} }
```

`cwd` can be `null`. When present, it's a canonical `file:` URI that uses the
environment's native path syntax. Unknown environment IDs and connection or
protocol failures return request errors.
