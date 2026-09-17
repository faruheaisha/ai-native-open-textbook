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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-schedule-recurring-cron-and-run-immediately.md"
sourceRel: "system-prompts/skill-schedule-recurring-cron-and-run-immediately.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-schedule-recurring-cron-and-run-immediately.md"
sourceSha256: "34501356cce0e909b7a112bdc687179bade8a2850b91f5f95de2ffeb9e822d36"
pageSha256: "34501356cce0e909b7a112bdc687179bade8a2850b91f5f95de2ffeb9e822d36"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

${PREAMBLE}

## Action

1. Convert `${INTERVAL\}` to a 5-field cron expression. Supported suffixes: `s` → ceil to nearest minute, `m` (minutes), `h` (hours), `d` (days). Examples: `5m` → `*/5 * * * *`, `1h` → `0 * * * *`, `1d` → `0 0 * * *`. If the interval doesn't cleanly divide its unit, round to the nearest clean interval and tell the user what you rounded to.
2. Call ${CRON_CREATE_TOOL_NAME} with:
   - `cron`: the expression from step 1
   - `prompt`: the literal string `${SCHEDULED_PROMPT\}` — ${PROMPT_DESCRIPTION}
   - `recurring`: `true`
3. Briefly confirm: ${CONFIRMATION_MESSAGE\}
4. **Then immediately run ${IMMEDIATE_RUN_REFERENCE} now**, following the instructions inlined below. Don't wait for the first cron fire.

${INLINE_TASK_INSTRUCTIONS\}

$\{ADDITIONAL_CONTEXT\}
