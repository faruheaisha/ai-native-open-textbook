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
pageSha256: "80c29c1f58dab25f11bfeaf63371bfeddf2d38fb1d1eb3c1264a3705c4347ddb"
contentMode: "local-full"
zh: ""
---

## Switching models mid-conversation

Claude Fable 5.1 and Claude Mythos 5.1 read thinking blocks produced by each other and by earlier Claude models. No earlier model reads thinking blocks from Claude Fable 5.1 or Claude Mythos 5.1.

* **A conversation that moves up to Claude Fable 5.1 keeps its reasoning.** The earlier model's thinking blocks stay readable, so the model thinks as usual from the first turn after the switch.
* **A conversation that moves down to an earlier model loses Claude Fable 5.1's reasoning for that request.** This happens when a router sends a turn to a cheaper model, after a [classifier refusal fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback), or during a [server-side fallback](https://platform.claude.com/docs/en/build-with-claude/refusals-and-fallback#server-side-fallback). The API removes the unreadable blocks before the prompt reaches the model. They aren't billed and don't count toward `input_tokens`.

Keep sending the full history on every request, thinking blocks included, and let the API drop what the current model can't read. The API never edits your `messages` array, so the dropped blocks stay in your history. When the same history goes back to Claude Fable 5.1, its blocks are readable again, along with the earlier model's thinking. The reasoning is lost for good only if your client removes the blocks itself, for example a harness that strips thinking on a model switch or rebuilds the history from what each model used.

![Animation: switching to Claude Opus skips Claude Fable 5.1's thinking for that turn; switching back, everything is read again](https://platform.claude.com/docs/images/preserved-thinking-model-switch.gif)

With the `thinking-binding-controls-2026-08-01` [beta header](https://platform.claude.com/docs/en/api/beta-headers), the response lists each dropped block in a top-level `input_transformations` array with `reason: "model_binding_mismatch"`:

```json
{
  "input_transformations": [
    {
      "type": "thinking_dropped",
      "path": "messages.3.content.0",
      "reason": "model_binding_mismatch"
    }
  ]
}
```

Without the header, the drop is silent. This entry isn't a bug in your integration, and `prefix_mismatch_behavior` has no effect on it: a block the current model can't read is always dropped.
