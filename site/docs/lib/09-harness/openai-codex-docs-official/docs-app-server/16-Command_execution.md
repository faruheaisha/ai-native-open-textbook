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
pageSha256: "7f0f29e266cfaf096eb5882584cf459dd9bd769f59a4d4979e919339842d48af"
contentMode: "local-full"
zh: ""
---

## Command execution

`command/exec` runs a single command (`argv` array) under the server sandbox without creating a thread.

```json
{ "method": "command/exec", "id": 50, "params": {
  "command": ["ls", "-la"],
  "cwd": "/Users/me/project",
  "sandboxPolicy": { "type": "workspaceWrite" },
  "timeoutMs": 10000
} }
{ "id": 50, "result": { "exitCode": 0, "stdout": "...", "stderr": "" } }
```

Use `sandboxPolicy.type = "externalSandbox"` if you already sandbox the server process and want Codex to skip its own sandbox enforcement. For external sandbox mode, set `networkAccess` to `restricted` (default) or `enabled`. For `readOnly` and `workspaceWrite`, use the same optional `access` / `readOnlyAccess` structure shown above.

Notes:

- The server rejects empty `command` arrays.
- `sandboxPolicy` accepts the same shape used by `turn/start` (for example, `dangerFullAccess`, `readOnly`, `workspaceWrite`, `externalSandbox`).
- When omitted, `timeoutMs` falls back to the server default.
- Set `tty: true` for PTY-backed sessions, and use `processId` when you plan to follow up with `command/exec/write`, `command/exec/resize`, or `command/exec/terminate`.
- Set `streamStdoutStderr: true` to receive `command/exec/outputDelta` notifications while the command is running.

### Read admin requirements (`configRequirements/read`)

Use `configRequirements/read` to inspect the effective admin requirements loaded from `requirements.toml` and/or MDM.

```json
{ "method": "configRequirements/read", "id": 52, "params": {} }
{ "id": 52, "result": {
  "requirements": {
    "allowedApprovalPolicies": ["onRequest", "unlessTrusted"],
    "allowedSandboxModes": ["readOnly", "workspaceWrite"],
    "featureRequirements": {
      "personality": true,
      "unified_exec": false
    },
    "network": {
      "enabled": true,
      "allowedDomains": ["api.openai.com"],
      "allowUnixSockets": ["/tmp/example.sock"],
      "dangerouslyAllowAllUnixSockets": false
    }
  }
} }
```

`result.requirements` is `null` when no requirements are configured. See the docs on [`requirements.toml`](https://learn.chatgpt.com/docs/config-file/config-reference#requirementstoml) for details on supported keys and values.

### Windows sandbox setup (`windowsSandbox/setupStart`)

Custom Windows clients can trigger sandbox setup asynchronously instead of blocking on startup checks.

```json
{ "method": "windowsSandbox/setupStart", "id": 53, "params": { "mode": "elevated" } }
{ "id": 53, "result": { "started": true } }
```

App-server starts setup in the background and later emits a completion notification:

```json
{
  "method": "windowsSandbox/setupCompleted",
  "params": { "mode": "elevated", "success": true, "error": null }
}
```

Modes:

- `elevated` - run the elevated Windows sandbox setup path.
- `unelevated` - run the legacy setup/preflight path.
