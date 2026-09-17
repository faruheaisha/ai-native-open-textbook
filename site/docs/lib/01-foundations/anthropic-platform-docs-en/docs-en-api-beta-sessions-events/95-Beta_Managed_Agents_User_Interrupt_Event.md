---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/sessions/events.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions/events.md"
sourceSha256: "f0e0c20f4abb8b0c003df5a7b79ed32e56eaa3f30efeb7e3c91931c3e4e1cb51"
pageSha256: "78f8eacd6a2fdf488c1cd6e7902bc022b782d2ee8d8fd1b8cb755c600bec080e"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents User Interrupt Event Params

- `BetaManagedAgentsUserInterruptEventParams object`

  Parameters for sending an interrupt to pause the agent.

  - `type: "user.interrupt"`

  - `session_thread_id: optional string or null`

    If absent, interrupts every non-archived thread in a multiagent session (or the primary alone in a single-agent session). If present, interrupts only the named thread.
