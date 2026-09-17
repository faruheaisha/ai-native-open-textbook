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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-query-result-modelusage-field.md"
sourceRel: "system-prompts/data-sdk-query-result-modelusage-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-query-result-modelusage-field.md"
sourceSha256: "e49903e3fb3443eb07bb682191f5323c5c34752c6afbc6109c5b13d1bc23a30a"
pageSha256: "e49903e3fb3443eb07bb682191f5323c5c34752c6afbc6109c5b13d1bc23a30a"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Per-model totals for every model call made through the query pipeline during this query() call — main loop, Task subagents, sidechains, and internal calls such as compaction and Workflow agents. Cumulative across turns in streaming-input sessions: each result carries the running total so far, so read the latest result rather than summing across results. Internal helper calls outside the query pipeline (e.g. the permission classifier, token-count probes) are excluded; crash/startup-error results may carry zeroed usage, resumed sessions start fresh, and a mid-session /clear resets the running total. The correct field for token/cost accounting; treat it as an estimate, not a billing statement.
