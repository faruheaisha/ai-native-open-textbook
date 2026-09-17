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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-per-task-stop-affordance-field.md"
sourceRel: "system-prompts/data-sdk-per-task-stop-affordance-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-per-task-stop-affordance-field.md"
sourceSha256: "e7642da88983361bce5759aa69518df33914ee6b50b03d6fd320c0ba6900eb46"
pageSha256: "e7642da88983361bce5759aa69518df33914ee6b50b03d6fd320c0ba6900eb46"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Declares that this consumer renders a per-task stop control wired to the `stop_task` control request, so the user can stop an individual background task. When declared, an interrupt on an open-input (interactive stream-json) session spares running background agents/workflows (Stop only aborts the turn). Closed-input exception: a one-shot run (string prompt / -p closes stdin) still kills hold-back tasks at the held-result release regardless of the declaration — with stdin closed, a stop_task control could never be delivered, so the fail-closed kill stands. ABSENCE also fails closed: the interrupt kills background tasks, since the user would otherwise have no way to stop a runaway one. First-attached-client-wins on multi-client sessions; later initializes do not change it.
