---
title: "Scheduled Tasks Implementation"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/claude-scheduled-tasks-implementation.md"
sourceRel: "implementation/claude-scheduled-tasks-implementation.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/implementation/claude-scheduled-tasks-implementation.md"
sourceSha256: "0da1d03fb29fee26d0536576fc89fb0e39679272f48bd67f32c5f271a49d226c"
pageSha256: "0da1d03fb29fee26d0536576fc89fb0e39679272f48bd67f32c5f271a49d226c"
contentMode: "local-full"
zh: ""
---

# Scheduled Tasks Implementation

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

<a href="#loop-demo"><img src="/mirror/40/40ff976a740fb4fcf55255dbc78bf034992e082b.svg" alt="Implemented"></a>

The `/loop` skill is used to schedule recurring tasks on a cron interval. Below is a demo of `/loop 1m "tell current time"` — a simple recurring task that fires every minute.

---

## Loop Demo

### 1. Scheduling the Task

  <img src="https://gh-proxy.com/https://raw.githubusercontent.com/shanraisshan/claude-code-best-practice/2d6ea151c0d7189c3eaf364809c5574bd210e545/implementation/assets/impl-loop-1.png" alt="/loop 1m tell current time — scheduling and cron setup" width="100%">

`/loop 1m "tell current time"` parses the interval (`1m` → every 1 minute), creates a cron job, and confirms the schedule. Key notes:

- Cron's minimum granularity is **1 minute** — `1m` maps to `*/1 * * * *`
- Recurring tasks **auto-expire after 3 days**
- Jobs are **session-scoped** — they live in memory only and stop when Claude exits
