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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/weekend-overwork.md"
sourceRel: "src/core/rules/weekend-overwork.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/weekend-overwork.md"
sourceSha256: "9b2ba1155a8e8c8491022c61e3fb80011f08a0baf79a351d17541e5d7f3b4e22"
pageSha256: "9b2ba1155a8e8c8491022c61e3fb80011f08a0baf79a351d17541e5d7f3b4e22"
contentMode: "local-full"
zh: ""
---

# Description
Detects a high proportion of requests happening on weekends, which may indicate work-life balance issues.

# When Triggered
&#123;&#123;count&#125;&#125; requests (&#123;&#123;pct&#125;&#125;) happen on weekends. This may indicate work-life balance issues.

# How to Improve
Consider maintaining boundaries between work and personal time. Sustained overwork leads to burnout and decreased productivity.

# Examples
&#123;&#123;extra.weekendReqs&#125;&#125; weekend requests vs &#123;&#123;extra.weekdayReqs&#125;&#125; weekday requests

# Detection Logic
```detect
scan: requests
match: timestamp > 0 AND (dayOfWeek(timestamp) == 0 OR dayOfWeek(timestamp) == 6)
aggregate: ratio
check: ratio > thresholds.maxWeekendRate AND count > thresholds.minWeekendReqs
examples: "{{messageText | truncate:50}}"
```
