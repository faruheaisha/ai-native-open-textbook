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
pageSha256: "88c7366fdfc275705a96d19cb4621695600b493bdf41a8dbabfb8249e90fd699"
contentMode: "local-full"
zh: ""
---

## Core primitives

- **Thread**: A conversation between a user and the Codex agent. Threads contain turns.
- **Turn**: A single user request and the agent work that follows. Turns contain items and stream incremental updates.
- **Item**: A unit of input or output (user message, agent message, command runs, file change, tool call, and more).

Use the thread APIs to create, list, or archive conversations. Drive a conversation with turn APIs and stream progress via turn notifications.
