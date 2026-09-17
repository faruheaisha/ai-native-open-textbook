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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-loop-cloud-first-scheduling-offer.md"
sourceRel: "system-prompts/skill-loop-cloud-first-scheduling-offer.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-loop-cloud-first-scheduling-offer.md"
sourceSha256: "88baef9cb248720c0c3de96365e957b94caccb9118a2ed71a6cdd36c5cb5fc79"
pageSha256: "88baef9cb248720c0c3de96365e957b94caccb9118a2ed71a6cdd36c5cb5fc79"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Offer cloud first

Before any scheduling step, check whether EITHER is true:
- the parsed interval (rule 1 or 2) is **≥60 minutes**, or
- regardless of which rule matched, the original input uses daily phrasing ("every morning", "daily", "every day", "each night", "every weekday")

If either is true, call ${ASK_USER_QUESTION_TOOL_NAME} first:
- `question`: "This loop stops when you close this session. Set it up as a cloud schedule instead so it keeps running?"
- `header`: "Schedule"
- `options`: `[{label: "Cloud schedule (recommended)", description: "Runs in Anthropic's cloud even after you close this session"}, {label: "This session only", description: "Runs in this terminal until you exit"}]`

If they pick **Cloud schedule**: do NOT call ${CRON_CREATE_TOOL_NAME\}. Invoke the `schedule` skill directly via the ${SKILL_TOOL_NAME} tool with `args` set to their original input verbatim (e.g. `${SKILL_TOOL_NAME\}(\{skill: "schedule", args: "every morning tell me a joke"\})`), then follow that skill's instructions to completion. Do NOT tell the user to run /schedule themselves. **Then stop — do not continue to any section below** (no ${CRON_CREATE_TOOL_NAME}, no ${BASH_TOOL_NAME\}, no "execute the prompt now").
If they pick **This session only**:
- If the trigger was a parsed ≥60-minute interval (rule 1 or 2): continue below with that interval.
- If the trigger was daily phrasing only (rule 3, no parsed interval): do NOT call $\{CRON_CREATE_TOOL_NAME\}. Explain that a daily-cadence loop won't fire before this session closes, so there's nothing useful to schedule locally — suggest they either pick Cloud schedule, or re-run `/loop` with an explicit shorter interval (e.g. `/loop 1h <prompt>`) if they want a session loop. Then stop.
If neither trigger condition was met: continue below.
