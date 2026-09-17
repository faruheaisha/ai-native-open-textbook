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
pageSha256: "39739c2586cd4fb6ba389b5cc008c3eb02e59da995344001609d38c609bdd312"
contentMode: "local-full"
zh: ""
---

## Process execution

`process/*` is an experimental, explicit process-control API. It requires
`capabilities.experimentalApi = true` and runs outside Codex's sandbox. Use it
only when your client intentionally exposes local process control without a
sandbox.

Start a process with `process/spawn` and provide a `processHandle`, then use
that handle for stdin, resize, and kill requests. Output streams through
`process/outputDelta` notifications and completion streams through
`process/exited`.

```json
{ "method": "process/spawn", "id": 48, "params": {
  "command": ["python3", "-m", "pytest", "-q"],
  "processHandle": "pytest-1",
  "cwd": "/Users/me/project",
  "tty": true
} }
{ "id": 48, "result": {} }
{ "method": "process/outputDelta", "params": {
  "processHandle": "pytest-1",
  "stream": "stdout",
  "deltaBase64": "Li4u"
} }
{ "method": "process/exited", "params": {
  "processHandle": "pytest-1",
  "exitCode": 0
} }
```

Use `process/writeStdin` with `deltaBase64`, `closeStdin`, or both to send
input. Use `process/resizePty` for PTY resize events and `process/kill` to
terminate a running process.
