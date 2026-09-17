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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-query-result-pending-command-count.md"
sourceRel: "system-prompts/data-query-result-pending-command-count.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-query-result-pending-command-count.md"
sourceSha256: "a5c06305db7216897eefe1592a2da6fb791d1848efe136aae550776207ba679d"
pageSha256: "a5c06305db7216897eefe1592a2da6fb791d1848efe136aae550776207ba679d"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

User-initiated sends still waiting in the command queue when this result was produced. Greater than 0 means at least one more user turn (and result) follows without further input, barring cancellation; 0 means none is pending, or the session is ending (end_session or a shutdown latched mid-turn discards the backlog). Queued sends may coalesce into fewer turns, so this counts pending sends, not remaining results. System-generated queue entries are not counted. Absent on fatal startup results and on surfaces without a command queue.
