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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "81516c047ee0a277112dac516792b4a5c9969696b7578c3565966fc4800280a4"
contentMode: "local-full"
zh: ""
---

## Responses seem lower quality than usual

If Claude's answers seem less capable than you expect but no error is shown, the cause is usually conversation state rather than the model itself. Claude Code doesn't silently change model versions. It can switch to a fallback model in three specific cases:

* A configured [`--fallback-model`](https://code.claude.com/docs/en/cli-reference#cli-flags) takes over after an availability error, for that turn only, with a notice in the transcript
* An Amazon Bedrock or Google Cloud's Agent Platform startup check finds your default model unavailable
* [Automatic model fallback](https://code.claude.com/docs/en/model-config#automatic-model-fallback) on Fable 5.1, Fable 5, and Opus 5 moves the session to the flagged category's fallback model, when that category has one, and shows a notice in the transcript

The Model selection check below catches the second and third cases; the first appears as a transcript notice rather than a `/model` change. [Model configuration](https://code.claude.com/docs/en/model-config) explains when each fallback applies.

Check these first:

* **Model selection**: run `/model` to confirm you are on the model you expect. A previous `/model` choice or an `ANTHROPIC_MODEL` environment variable may have you on a smaller model than you intended.
* **Effort level**: run `/effort` to check the current reasoning level and raise it for hard debugging or design work. Defaults vary by model, so check before assuming you are below the maximum. See [Adjust effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) for per-model defaults and the `ultrathink` shortcut.
* **Context pressure**: run `/context` to see how full the window is. If it is near capacity, run `/compact` at a natural breakpoint or `/clear` to start fresh. See [Explore the context window](https://code.claude.com/docs/en/context-window) for how auto-compact affects earlier turns.
* **Stale instructions**: large or outdated `CLAUDE.md` files and MCP tool definitions consume context and can steer responses. The `/doctor` checkup flags oversized memory files and unused extensions, and `/context` shows MCP tool token usage. Before v2.1.205, `/doctor` opened a diagnostics screen that flagged oversized memory files and subagent definitions.

When a response goes wrong, rewinding usually works better than replying with corrections. Press Esc twice or run `/rewind` to step back to before the bad turn, then rephrase the prompt with more specifics. Correcting in-thread keeps the wrong attempt in context, which can anchor later answers to it. See [Checkpointing](https://code.claude.com/docs/en/checkpointing).

If quality still seems off after checking the above, run `/feedback` and describe what you expected versus what you got. Feedback submitted this way includes the conversation transcript, which is the fastest way for Anthropic to diagnose a real regression. See [Report an error](#report-an-error) if `/feedback` is unavailable in your environment.

If Claude warns about a suspected prompt injection, or refuses a request because of a suspected injection, and the text the warning names is context Claude Code adds to the conversation automatically rather than file or web content, run `claude update` and retry. If the warning repeats after updating, [report it](#report-an-error) rather than pasting the flagged content back into the prompt. Before v2.1.201, Sonnet 5 refused some requests the same way.
