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
sourceRel: "docs/en/build-with-claude/thinking.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/thinking.md"
sourceSha256: "9baa0fba3a60b873c42b66b2ab09b9b42ec60b2d7d45aa79f9500646e562eadd"
pageSha256: "df7ed2a822b784ce29b0181cb85df4277f63d2edad29fbaab8f8e8fb442cb750"
contentMode: "local-full"
zh: ""
---

## Preserved thinking

[Preserved thinking](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking) decides whether the model can use a thinking block that you send back from an earlier turn. Starting with Claude Fable 5.1, the API checks the `signature` of every `thinking` or `redacted_thinking` block in a request for two things:

* **The model that produced it.** A model reads its own thinking blocks and those of earlier models, never those of a newer model. Claude Fable 5.1 reads blocks from Claude Opus 5, but Claude Opus 5 can't read blocks from Claude Fable 5.1. The API drops a block the current model can't read, without an error and without billing it. See [Switching models mid-conversation](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#switching-models).
* **Everything sent before it.** A block stays valid only while the top-level `system` prompt, the `tools`, and the messages before it are unchanged. If any of them changes, that block and every later thinking block are invalid, and the API rejects the request with a 400 error or drops the invalid blocks, whichever you choose. See [Keeping the prefix unchanged](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#prefix-check).

The model check applies to every account. The API enforces the prefix check by default for accounts created on or after August 31, 2026, 00:00 UTC. On older accounts it enforces the check only on requests that set `thinking.block_binding.prefix_mismatch_behavior`. Later models will enforce it for all accounts, so make your integration append-only now.

To keep thinking valid, send every assistant turn back exactly as you received it and add new messages only at the end of `messages`. If your code builds the `messages` array itself, the Preserved thinking page covers:

* [What counts as an edit](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#what-counts-as-an-edit), and [how to check whether your code makes one](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#how-to-tell-whether-your-integration-is-impacted).
* [The API feature that replaces each common edit](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#replace-prefix-edits): mid-conversation system messages for new instructions and per-turn reminders, `tool_addition` and `tool_removal` blocks for tool changes, per-message `output_config` for effort changes, and server-side compaction and context editing for trimming.
* [Client-side compaction](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#custom-compaction-on-the-client): which patterns keep thinking valid and which don't.
* [The `thinking-binding-controls-2026-08-01` beta header](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#preserved-thinking-controls). It adds an `input_transformations` array to every response that lists the blocks the API dropped, and a `block_binding.prefix_mismatch_behavior` field on the thinking configuration that accepts `"error"` or `"drop_block"`.
