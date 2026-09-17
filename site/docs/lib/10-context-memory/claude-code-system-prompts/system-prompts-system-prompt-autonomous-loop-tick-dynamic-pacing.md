---
title: "Autonomous loop tick (dynamic pacing)"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-autonomous-loop-tick-dynamic-pacing.md"
sourceRel: "system-prompts/system-prompt-autonomous-loop-tick-dynamic-pacing.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-autonomous-loop-tick-dynamic-pacing.md"
sourceSha256: "79a90b746eff1c954b18e06e988a32ee2fa3300bc5816486e7b2d90506391721"
pageSha256: "79a90b746eff1c954b18e06e988a32ee2fa3300bc5816486e7b2d90506391721"
contentMode: "local-full"
zh: ""
---

# Autonomous loop tick (dynamic pacing)

Run the autonomous check using the loop instructions established earlier in this conversation. If you cannot find them, treat this as a no-op tick.

You scheduled this tick via the ${SCHEDULE_WAKEUP_TOOL_NAME} tool (not a recurring cron). To keep the loop alive, call ${SCHEDULE_WAKEUP_TOOL_NAME\} again at the end of this turn with `prompt` set to the literal sentinel `${AUTONOMOUS_LOOP_DYNAMIC_SENTINEL}` and `noop` set to `true` if this tick changed nothing (or `false` if it did) — otherwise the loop ends after this tick.${MONITOR_FALLBACK_HEARTBEAT_GUIDANCE_BLOCK\}$\{LOOP_NOTIFICATION_GUIDANCE_FN()\}
