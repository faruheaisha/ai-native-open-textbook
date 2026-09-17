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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/speed-accept.md"
sourceRel: "src/core/rules/speed-accept.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/speed-accept.md"
sourceSha256: "af1b29483068ff2520bf12db853d5d5ae3d3318ec15e42c9603296a8aef63dbd"
pageSha256: "af1b29483068ff2520bf12db853d5d5ae3d3318ec15e42c9603296a8aef63dbd"
contentMode: "local-full"
zh: ""
---

# Description
Detects instances where the next message was sent within seconds of receiving large AI code blocks, indicating no time for review.

# When Triggered
&#123;&#123;count&#125;&#125; times you sent the next message within &#123;&#123;extra.maxGapSec&#125;&#125;s of receiving &#123;&#123;extra.minAiLoc&#125;&#125;+ lines of AI code (avg &#123;&#123;extra.avgLoc&#125;&#125; LOC, avg &#123;&#123;extra.avgGap&#125;&#125;s gap). Not enough time to review.

# How to Improve
Take time to read AI-generated code before moving on. Review for correctness, security issues, and edge cases. A quick glance is not a review.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: &#123;&#123;extra.aiLoc&#125;&#125; AI LOC, &#123;&#123;extra.gapSec&#125;&#125;s gap -> "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: sessions
match: requestCount >= 2
aggregate: count
pairs: adjacentPairCount(allSessions, thresholds.minAiLoc, thresholds.maxGapMs)
emitCount: pairs.count
emitTotal: count
avgLoc: pairs.avgLoc
avgGap: pairs.avgGap
maxGapSec: round(thresholds.maxGapMs / 1000)
minAiLoc: thresholds.minAiLoc
check: pairs.count >= thresholds.minOccurrences
examples: {{workspaceName}}: speed-accept detected
```
