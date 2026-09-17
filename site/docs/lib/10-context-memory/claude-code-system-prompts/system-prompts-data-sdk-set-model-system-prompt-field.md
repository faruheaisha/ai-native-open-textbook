---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-set-model-system-prompt-field.md"
sourceRel: "system-prompts/data-sdk-set-model-system-prompt-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-set-model-system-prompt-field.md"
sourceSha256: "7ffec5e47e4855e6a777d500a7e96991c4eceea38fdf0e5ae70e692ae52bd9fc"
pageSha256: "7ffec5e47e4855e6a777d500a7e96991c4eceea38fdf0e5ae70e692ae52bd9fc"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Replaces the custom system prompt (the --system-prompt / initialize systemPrompt slot). With the system prompt recorded (the default) it takes effect at the next render point (compaction), or from the next turn under systemPromptSnapshot: false. Applied only when the model request is accepted; must be non-empty (there is no revert-to-built-in form); re-send the current model for a prompt-only update. The CLAUDE_CODE_SYSTEM_PROMPT_GB_FEATURE per-turn read, where configured, still wins. Transports that do not implement it, and older builds, ack success without applying it.
