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
sourceRel: "en/context-window.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/context-window.md"
sourceSha256: "aed34268947d9ad8e5eaee057f7428eeb913b72da1a8e34ab105fd5558424a06"
pageSha256: "dfb8cb488f859ce116261da616e10bf2b27478787d04bb053edca91196ed035d"
contentMode: "local-full"
zh: ""
---

## When your context fills up

Claude Code compacts automatically as you approach the limit, so a full context window doesn't end your session. The automatic pass works the same way as the `/compact` step in the timeline. See [When context fills up](https://code.claude.com/docs/en/how-claude-code-works#when-context-fills-up) for what it preserves.

You can also act before the automatic pass runs:

* **Compact with a focus**: run `/compact` with instructions, like `/compact focus on the auth bug fix`, before starting a long new task. The summary keeps what you choose instead of what the automatic pass guesses is important.
* **Compact part of the conversation**: run `/rewind`, select a message, and choose **Summarize from here** or **Summarize up to here**. See [Rewind and summarize](https://code.claude.com/docs/en/checkpointing#rewind-and-summarize) for what each option keeps and how to guide the summary.
* **Compact earlier**: run [`/autocompact`](https://code.claude.com/docs/en/commands#all-commands) with a token count, like `/autocompact 500k`, to set how full the context window gets before the automatic pass runs. See [Set the auto-compact window](https://code.claude.com/docs/en/model-config#set-the-auto-compact-window) for accepted values and overrides.
* **Clear between tasks**: run `/clear` when switching to unrelated work. Old conversation crowds out the files you need next and costs tokens on every message.
* **Delegate large reads**: send research to a [subagent](https://code.claude.com/docs/en/sub-agents) so the file contents stay in its context window, not yours.

If you need a larger window rather than a smaller conversation, Fable models, Sonnet 5, Opus 4.6 and later, and Sonnet 4.6 support a 1 million token context window. See [Extended context](https://code.claude.com/docs/en/model-config#extended-context) for availability by plan and how to select a `[1m]` model variant. Compaction works the same way at the larger limit.

Sonnet 5 runs with the 1M context window and has no `[1m]` variant to select. See [Sonnet 5 context window](https://code.claude.com/docs/en/model-config#sonnet-5-context-window) for its auto-compaction thresholds and the LLM gateway exception.

The point where automatic compaction runs depends on your model and configuration. See [Default auto-compact thresholds](https://code.claude.com/docs/en/model-config#default-auto-compact-thresholds) for the boundaries per model, and [Correct the window for a gateway or custom model ID](https://code.claude.com/docs/en/model-config#correct-the-window-for-a-gateway-or-custom-model-id) if Claude Code assumes the wrong window for your model ID, such as an [LLM gateway](https://code.claude.com/docs/en/llm-gateway) alias.
