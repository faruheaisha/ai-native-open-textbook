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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/session-drift.md"
sourceRel: "src/core/rules/session-drift.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/session-drift.md"
sourceSha256: "74295bc09afc51ad93861506877bdf1ec05c8341710195844d6c926d4865f6f0"
pageSha256: "74295bc09afc51ad93861506877bdf1ec05c8341710195844d6c926d4865f6f0"
contentMode: "local-full"
zh: ""
---

# Description
Detects sessions that cover too many different task types, confusing the AI context window.

# When Triggered
&#123;&#123;count&#125;&#125; sessions cover &#123;&#123;extra.maxWorkTypes&#125;&#125;+ different task types. Mixed-purpose sessions confuse the AI context.

# How to Improve
Start a new session when switching task types (bug fix to feature, docs to testing, etc.). Focused sessions get better responses.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: &#123;&#123;extra.workTypes&#125;&#125;

# Detection Logic
```detect
scan: sessions
match: requestCount >= thresholds.minReqsPerSession AND workTypeCount(requests) >= thresholds.maxWorkTypes
aggregate: count
check: count > thresholds.minSessions
examples: {{workspaceName}}: {{workTypeCount(requests)}} work types in one session
```
