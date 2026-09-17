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
sourceRel: "docs/en/build-with-claude/preserved-thinking.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/preserved-thinking.md"
sourceSha256: "24e105f4706c02664d4c6d281aa215750ea7e6a1accb398059f53594d20472c5"
pageSha256: "40a9878d58f5c3228ad11ffe19c6916d04d7bc5e7c6d510ccb84259917646824"
contentMode: "local-full"
zh: ""
---

## FAQ

    No. Send the `thinking-binding-controls-2026-08-01` beta header and set `thinking.block_binding.prefix_mismatch_behavior`. Setting the field opts that request into enforcement regardless of account age. `"error"` rejects an edited history with the same 400 a new account gets, and `"drop_block"` lets the request through and lists what was dropped in `input_transformations`. See [Check whether your code edits the prefix](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#how-to-tell-whether-your-integration-is-impacted).

    No. What fails is the thinking already in the history after the point you changed, and you choose what happens to it. With `prefix_mismatch_behavior: "drop_block"`, the API drops those blocks and the request succeeds: the model answers that turn without that reasoning, and the prompt cache restarts at the edit. With the default `"error"`, the API rejects the request with a 400 until you undo the edit or resend with `"drop_block"`. See [What the API does with an invalid block](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#mismatch-behavior). [What counts as an edit](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#what-counts-as-an-edit) lists which changes matter.

    No. `output_config.effort`, `max_tokens`, and the `thinking` configuration aren't part of the checked prefix, which covers only `system`, `tools`, and `messages`. A top-level effort change invalidates most of the prompt cache. On Claude Fable 5.1, a [per-message effort](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#effort-changes) change keeps the prompt cache and is used as the new effort level until changed again.

    Don't edit `tools`. Declare the full set at session start, mark tools that aren't available yet with `defer_loading: true`, and offer or withdraw them with `tool_addition` and `tool_removal` blocks. If you learn a tool's schema only mid-session, such as from an MCP server discovered at runtime, you can still append it to `tools` with `defer_loading: true` and offer it the same way. That's safe because an unreferenced deferred tool isn't part of the prefix. The `role: "system"` messages that carry these blocks join the prefix for later thinking, so don't move, reword, or delete them afterward. See [Add or remove tools with `tool_addition` and `tool_removal`](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#tool-changes).

    Not if the kept turns still carry their thinking: those blocks were produced against the history you replaced, so they fail the check. Strip `thinking` and `redacted_thinking` blocks from the turns you carry across and keep their `text` and `tool_use` blocks, or send `prefix_mismatch_behavior: "drop_block"` and let the API drop them. Simple compaction leaves no thinking behind to fail and is the recommended approach: one summary message plus the next user turn, with no earlier turns replayed. Server-side [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) and [context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) don't count as edits. See [Compact on the client](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#custom-compaction-on-the-client).

    Load them once at session start and keep the top-level `system` prompt and `tools` fixed. When a file changes, append the new version at that point in `messages` instead of editing the original. Use a [mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages) for instructions that come from you as the operator. For file text you treat as untrusted, which shouldn't carry system-prompt authority, put the content in the next `user` turn instead. See [Add instructions with a mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#new-instructions) and [Limitations](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages#limitations).

    Yes. A resumed session is an ordinary follow-up request: `system`, `tools`, and the earlier `messages` must match what you last sent byte-for-byte. Persist exactly what you sent and received, and replay that: the rendered system prompt, the tool definitions, and each assistant turn as returned. Don't re-render from inputs that might have changed since, such as the date, an updated instruction file, or a new tool version. Anything new goes in an appended message. See [Send assistant turns back exactly as returned](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#append-assistant-turns-exactly-as-returned).

    No, provided they're appended after the existing history and nothing earlier changes: an assistant message without thinking blocks is an appended message like any other. Send the other model's output as `text` and `tool_use` content.

    Not into a different conversation. A thinking block is usable only when it follows the exact `system`, `tools`, and `messages` it was produced from. A branch that replays that history unchanged up to the fork point keeps its thinking. A conversation that starts from anything else can't use it, so start that conversation from a summary of the task state, as in [simple compaction](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#custom-compaction-on-the-client): the goal, decisions made, files and results so far, and the next step.
