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
sourceRel: "en/remote-control.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/remote-control.md"
sourceSha256: "24ef9e60eeae3360065480ea2b2ba103f3bef9e6e470ada18c41fcd2be67bbbe"
pageSha256: "4c942107cab6a9fd0287ca2fda7dd3fd4160f6f2bad7b83eb590c25cd48fbb08"
contentMode: "local-full"
zh: ""
---

## Connection and security

Your local Claude Code session makes outbound HTTPS requests only and never opens inbound ports on your machine. When you start Remote Control, it registers with the Anthropic API and polls for work. When you connect from another device, the server routes messages between the web or mobile client and your local session over a streaming connection.

All traffic travels through the Anthropic API over TLS, the same transport security as any Claude Code session. The connection uses multiple short-lived credentials, each scoped to a single purpose and expiring independently. When a `claude remote-control` server's registration credential expires, the server registers with the Anthropic API again and keeps serving its sessions.

While Remote Control is connected, the session transcript, including your messages, Claude's responses, and tool activity, is stored on Anthropic servers. The stored transcript keeps the conversation in sync across your devices and lets the session reconnect after a network drop. Execution and filesystem access stay on your machine, and stored transcripts are retained under the [Data usage](https://code.claude.com/docs/en/data-usage) policy.

To turn Remote Control off entirely, use the [`disableRemoteControl`](https://code.claude.com/docs/en/settings-reference#disableremotecontrol) setting. Organizations with compliance requirements such as Zero Data Retention can't enable Remote Control.
