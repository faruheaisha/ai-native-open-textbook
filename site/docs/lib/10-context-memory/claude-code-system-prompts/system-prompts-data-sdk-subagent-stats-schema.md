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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-subagent-stats-schema.md"
sourceRel: "system-prompts/data-sdk-subagent-stats-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-subagent-stats-schema.md"
sourceSha256: "db1ab5cb3285b5844867431a03ec84f5b96a3486c479f23b47fbf210bd2ae3f6"
pageSha256: "db1ab5cb3285b5844867431a03ec84f5b96a3486c479f23b47fbf210bd2ae3f6"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Subagents started through the Agent tool in this session, as running totals (forked skills, workflows, teammates and other internal agents are not counted; two sessions in one process keep separate counts). Cumulative like modelUsage: read the latest result rather than summing across results; a resumed session starts fresh and a mid-session /clear zeroes it, though a background subagent that outlives the /clear still records its outcome, so completed, failed and killed can then exceed spawned. A result that was held back while background subagents finished carries the counts as of when it is written to the stream, as do its total_cost_usd, duration_api_ms and modelUsage (and usage where that is a running total; a per-turn main-loop usage keeps its turn-end value). Omitted by hosts without a local Agent tool and on crash/startup-error results; all zeros until the Agent tool starts or refuses a subagent. A remote (isolation: remote) launch counts as spawned but never reports an outcome. Per-subagent detail is on the task_started / task_notification events.
