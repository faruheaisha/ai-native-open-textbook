---
title: "Autonomous loop tick"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/system-prompt-autonomous-loop-tick.md"
sourceRel: "system-prompts/system-prompt-autonomous-loop-tick.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/system-prompt-autonomous-loop-tick.md"
sourceSha256: "467813b2c69f73883d28ba8c6837a3cbd7de36f6b1608db895516ca69656dc28"
pageSha256: "467813b2c69f73883d28ba8c6837a3cbd7de36f6b1608db895516ca69656dc28"
contentMode: "local-full"
zh: ""
---

# Autonomous loop tick

Run the autonomous check using the loop instructions established earlier in this conversation. If you cannot find them, treat this as a no-op tick. The recurring cron will fire the next tick automatically — do not call ${SCHEDULE_WAKEUP_TOOL_NAME} from this tick.${LOOP_NOTIFICATION_GUIDANCE_FN()\}
