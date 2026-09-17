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
pageSha256: "ddeba7e026da9d16f4940fafd3fc71af315ba7d01d0960baff2f423d625948f7"
contentMode: "local-full"
zh: ""
---

#### `user_message_uuids`

The `uuid`s of every message you sent that Claude Code answered in this turn. When you send several messages close together, Claude Code can merge them into one turn, and `user_message_uuid` then names only the last of them. To match the reply to any of the merged messages, look for that message's `uuid` anywhere in this list. Requires Agent SDK v0.3.259 or later.

Claude Code sets the list together with `user_message_uuid` on each reply frame that carries that field and on the result. For the full set of frames that carry `user_message_uuid`, and the version each requires, see [`user_message_uuid`](#user_message_uuid). The list always contains `user_message_uuid` and holds at most 64 entries.

When Claude Code picks up a regular message you sent while a turn was running, it adds that message's `uuid` to the result's list.

When a first reply or result carries `user_message_uuid` without the list, it came from an earlier Claude Code version, so fall back to the single field.
