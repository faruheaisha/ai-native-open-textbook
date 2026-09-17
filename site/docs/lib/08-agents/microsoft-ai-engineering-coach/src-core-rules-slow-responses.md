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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/slow-responses.md"
sourceRel: "src/core/rules/slow-responses.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/slow-responses.md"
sourceSha256: "e258eab33d42479cdcbccf1d4c7e8b4bd04c7418514ef3f7880557f840416d93"
pageSha256: "e258eab33d42479cdcbccf1d4c7e8b4bd04c7418514ef3f7880557f840416d93"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests with unusually long response times, which may indicate overly broad or complex prompts.

# When Triggered
&#123;&#123;count&#125;&#125; requests took over 30 seconds (avg &#123;&#123;extra.avgSec&#125;&#125;s). May indicate overly broad prompts.

# How to Improve
Break complex tasks into smaller, focused requests. Use lighter models for simple questions.

# Examples
&#123;&#123;extra.elapsedSec&#125;&#125;s: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: requests
match: totalElapsed > thresholds.slowMs AND totalElapsed > 0
aggregate: count
avgSec: round(avgField(matched, "totalElapsed") / 1000)
check: count > thresholds.minCount
examples: "{{messageText | truncate:50}}"
```
