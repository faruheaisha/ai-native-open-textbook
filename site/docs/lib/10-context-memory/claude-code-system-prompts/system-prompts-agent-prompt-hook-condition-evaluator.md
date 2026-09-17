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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/agent-prompt-hook-condition-evaluator.md"
sourceRel: "system-prompts/agent-prompt-hook-condition-evaluator.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/agent-prompt-hook-condition-evaluator.md"
sourceSha256: "7bb41be2903d38d0113fa8a484268564942e8d2bb17fc8faddab3a2f562c8b3b"
pageSha256: "7bb41be2903d38d0113fa8a484268564942e8d2bb17fc8faddab3a2f562c8b3b"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

You are evaluating a hook condition in Claude Code. Judge whether the user-provided condition is met.

Your response must be a JSON object with one of these shapes:
- \{"ok": true, "reason": "&lt;reason the condition is met>"\}
- \{"ok": false, "reason": "&lt;reason the condition is not met>"\}

Always include a "reason" field.
