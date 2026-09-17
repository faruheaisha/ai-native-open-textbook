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
pageSha256: "bab67bb94ca9cf7ef4f9c0356dc501f7153ff61fe6bdeba1f214fcb096951be6"
contentMode: "local-full"
zh: ""
---

Preserved thinking is a property of newer Claude models that guards against distillation. It decides whether the model can use a thinking block that you send back from an earlier turn. Starting with Claude Fable 5.1, when a `thinking` or `redacted_thinking` block comes back in a request, the API checks the block's `signature` for two things:

* **The model is the one that produced the block, or a newer one.** A model reads its own thinking blocks and those of earlier models. Claude Fable 5.1 reads blocks from Claude Opus 5, but Claude Opus 5 can't read blocks from Claude Fable 5.1. If the current model can't read a block, the API drops it from that request without an error. See [Switching models mid-conversation](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#switching-models).
* **Nothing before the thinking block has changed.** The top-level `system` prompt, `tools`, and `messages` before the block are its prefix. If the prefix differs from what you sent when the block was produced, that block and every later thinking block are invalid, and the API rejects the request with a 400 error or drops the invalid blocks, whichever you choose. See [Keeping the prefix unchanged](https://platform.claude.com/docs/en/build-with-claude/preserved-thinking#prefix-check).

The model check applies to every account. The API enforces the prefix check by default for accounts created on or after August 31, 2026, 00:00 UTC. On older accounts, it enforces the prefix check only on requests that set `thinking.block_binding.prefix_mismatch_behavior`. **Later models will enforce the prefix check for all accounts**, so make your integration append-only now.

## 本篇目录

- [Switching models mid-conversation](https://platform.claude.com/docs)
- [Keeping the prefix unchanged](https://platform.claude.com/docs)
- [Make changes without editing the prefix](https://platform.claude.com/docs)
- [FAQ](https://platform.claude.com/docs)
- [Next steps](https://platform.claude.com/docs)
