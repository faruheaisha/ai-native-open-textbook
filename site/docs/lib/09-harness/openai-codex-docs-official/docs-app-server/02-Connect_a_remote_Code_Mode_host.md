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
pageSha256: "a8f7a770e6e2f298879adcb4f27b4b724333c9177589fa8d660c54428249ebf9"
contentMode: "local-full"
zh: ""
---

## Connect a remote Code Mode host

By default, app-server starts a local Code Mode host. To use a remote host
instead, pass its secure WebSocket URL:

```bash
codex app-server --code-mode-host wss://code-mode.example.com/host
```

`--code-mode-host` controls the outbound connection from app-server to its Code
Mode host. It doesn't change `--listen`, which controls how clients connect to
app-server. Every thread in the same app-server process shares the selected
Code Mode host connection.

Use `wss://` for a remote host. Use `ws://` only for a localhost or
SSH-forwarded connection. The app-server command and WebSocket transport are
experimental and aren't supported for production workloads.
