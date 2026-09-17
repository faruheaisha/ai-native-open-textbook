---
title: "Description"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/broken-flow-state.md"
sourceRel: "src/core/rules/broken-flow-state.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/broken-flow-state.md"
sourceSha256: "8dc7d8813f7fbcdc42e760970cf9a059ccd817537662dfdade2b8c0c14e3d2df"
pageSha256: "8dc7d8813f7fbcdc42e760970cf9a059ccd817537662dfdade2b8c0c14e3d2df"
contentMode: "local-full"
zh: ""
---

# Description
Detects fragmented coding flow with long pauses between prompts, indicating frequent context switches, interruptions, or multitasking.

# When Triggered
&#123;&#123;count&#125;&#125;/&#123;&#123;extra.totalDays&#125;&#125; days (&#123;&#123;pct&#125;&#125;) show fragmented flow -- long pauses between prompts, short scattered work blocks.
Average flow score: &#123;&#123;extra.avgScore&#125;&#125;/100.
This anti-pattern indicates frequent context switches, interruptions, or multitasking that prevent deep coding flow.

# How to Improve
Block 2+ hour uninterrupted time slots for AI-assisted coding.
Close Slack / email / notifications during coding sessions.
Pre-plan your next prompt while the agent works on the current one.
Batch meetings to protect contiguous coding blocks.
Use the Flow State page to find your most productive hours.

# Examples
&#123;&#123;extra.date&#125;&#125;: avg flow score &#123;&#123;extra.flowScore&#125;&#125;/100

# Detection Logic
```detect
scan: sessions
match: requestCount >= thresholds.sessionMinReqs
aggregate: count
flow: flowScoreStats(allSessions, thresholds.sessionMinReqs, thresholds.rapidFollowupSec * 1000)
emitCount: flow.fragmentedDays
emitTotal: flow.totalDays
totalDays: flow.totalDays
avgScore: flow.avgScore
check: flow.lowScoreRate > thresholds.lowScoreRate AND flow.totalDays >= thresholds.minDays
severity: flow.lowScoreRate > 0.8
examples: {{workspaceName}}: flow disruption detected
```
