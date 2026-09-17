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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-dynamic-pacing-loop-execution.md"
sourceRel: "system-prompts/skill-dynamic-pacing-loop-execution.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-dynamic-pacing-loop-execution.md"
sourceSha256: "e7357ed78947f87279ce27ccfb0519b43ca359750b3039aa3d84e1eb87e4cc9f"
pageSha256: "e7357ed78947f87279ce27ccfb0519b43ca359750b3039aa3d84e1eb87e4cc9f"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

1. **Run ${TASK_RUN_LABEL} now**, following the instructions inlined below.
2. **If the next tick is gated on an event** (CI finishing, a PR comment, a log line) and no ${MONITOR_TOOL_NAME\} is already running for it: arm one now with `persistent: true`. Its events wake this loop immediately — you do not wait for the ${SCHEDULE_WAKEUP_TOOL_NAME} deadline. Arm once; on later ticks call ${TASK_LIST_TOOL_NAME\} first and skip if a monitor is already running.
3. **Briefly confirm**: ${CONFIRMATION_MESSAGE}, whether a ${MONITOR_TOOL_NAME\} is the primary wake signal, and what fallback delay you're about to pick. Write this as text *before* calling ${SCHEDULE_WAKEUP_TOOL_NAME} — the turn ends as soon as that tool returns.
4. **Then, as the last action of this turn, decide whether the loop continues.** If the next check is worth running, call ${SCHEDULE_WAKEUP_TOOL_NAME\} with:
   - `delaySeconds`: with a ${MONITOR_TOOL_NAME} armed this is the fallback heartbeat (lean 1200–1800s). Without one, pick based on what you observed this turn — quiet branch? wait longer. Lots in flight? wait shorter. Read the tool's own description for cache-aware delay guidance.
   - `reason`: one short sentence on why you picked that delay.
   - `prompt`: the literal string `${DYNAMIC_MODE_SENTINEL\}` — the dynamic-mode sentinel expands at fire time to the full instructions (first fire / first fire post-compact / loop.md edited) or a dynamic-pacing-specific short reminder (subsequent fires). Do not pass the full instructions; that is handled automatically.
   - `noop`: `true` if this tick changed nothing ("still waiting", "quiet hold"); `false` if it did something worth keeping. Consecutive `noop: true` ticks collapse in the terminal.
   If it isn't, stop instead (step 6) — re-arming is a per-turn choice, not a default.
