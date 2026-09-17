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
pageSha256: "3e45a83fbfbc60e9bef7907ca1d1062653610b8f08234d0cb28371dcdcfdc921"
contentMode: "local-full"
zh: ""
---

## Connect the CLI terminal UI

Remote terminal UI mode lets you run app-server on one machine and connect the
Codex CLI terminal interface from another. Start a WebSocket listener:

```bash
codex app-server --listen ws://127.0.0.1:4500
```

Then connect the terminal UI:

```bash
codex --remote ws://127.0.0.1:4500
```

For a non-local connection, configure WebSocket authentication and put the
connection behind TLS. Store the bearer token in an environment variable and
pass its name instead of putting the token on the command line:

```bash
export CODEX_REMOTE_TOKEN="$(cat "$HOME/.codex/app-server-token")"
codex --remote wss://remote-host:4500 \
  --remote-auth-token-env CODEX_REMOTE_TOKEN
```

The `--remote` option accepts `ws://`, `wss://`, `unix://`, and
`unix://PATH` endpoints. Use plain WebSockets only for localhost or an SSH
port-forwarded connection.
