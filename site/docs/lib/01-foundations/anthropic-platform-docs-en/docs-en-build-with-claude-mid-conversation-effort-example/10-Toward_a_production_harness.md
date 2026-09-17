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
sourceRel: "docs/en/build-with-claude/mid-conversation-effort-example.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/mid-conversation-effort-example.md"
sourceSha256: "88a2fa6d07b354b90d37bbab7c6c1f65502776a31e4be76eaefe73d788798fbd"
pageSha256: "d1f9a31549a517098adb6e45a52d73e6b81cd5927ec69ceaa8c20a64916a9a15"
contentMode: "local-full"
zh: ""
---

## Toward a production harness

This example is deliberately small. A harness meant for real workloads would typically add:

* **Sandboxed orchestration scripts:** let the model emit a short orchestration program (branching, loops, and reduce steps) and run it inside an isolated interpreter, rather than accepting only a flat list of subtask strings.
* **Durable journaling:** replace the local JSON file with a store that survives process restarts and is safe under concurrent writers across machines.
* **Budget enforcement:** track total subagents launched across the whole session, not just per Workflow call, and refuse to exceed a hard cap so a runaway plan cannot exhaust your quota.

The patterns in this example (the mode reminders, standing consent in the tool description, journaling, and a verification wave) carry over unchanged; only the execution substrate around them gets more robust.
