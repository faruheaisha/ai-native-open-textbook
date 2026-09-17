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
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "cd96105feb3e333ff56b5808a465a990d552acdc98543c1fde48ba75e1f6ca85"
contentMode: "local-full"
zh: ""
---

#### Return type: `SessionMessage`

| Property             | Type                    | Description                                                                                                                                                                                                                                                                   |
| :------------------- | :---------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`               | `"user" \| "assistant"` | Message role                                                                                                                                                                                                                                                                  |
| `uuid`               | `string`                | Unique message identifier                                                                                                                                                                                                                                                     |
| `session_id`         | `string`                | Session this message belongs to                                                                                                                                                                                                                                               |
| `message`            | `unknown`               | Raw message payload from the transcript                                                                                                                                                                                                                                       |
| `parent_tool_use_id` | `string \| null`        | For subagent messages, the `tool_use_id` of the spawning `Agent` tool call. `null` for main-session messages and older sessions                                                                                                                                               |
| `parent_agent_id`    | `string \| null`        | For messages from a [nested subagent](https://code.claude.com/docs/en/sub-agents#let-subagents-spawn-their-own-subagents), the `agentId` of the subagent that spawned it. `null` for main-session messages, messages from top-level subagents, and older sessions. Requires Claude Code v2.1.202 or later |
