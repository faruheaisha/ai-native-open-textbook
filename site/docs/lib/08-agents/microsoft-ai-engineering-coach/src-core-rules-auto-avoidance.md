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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/auto-avoidance.md"
sourceRel: "src/core/rules/auto-avoidance.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/auto-avoidance.md"
sourceSha256: "bc7645f65e36e8beea01ce5359bc4e0432582adf6d756775beed1f762dd85a55"
pageSha256: "bc7645f65e36e8beea01ce5359bc4e0432582adf6d756775beed1f762dd85a55"
contentMode: "local-full"
zh: ""
---

# Description
Detects users who pin a single premium model for every request and never let auto-routing pick a cheaper model when one would suffice. Auto routing handles many requests with smaller models for the same outcome.

# When Triggered
&#123;&#123;pct&#125;&#125; of requests use &#123;&#123;extra.topModel&#125;&#125; (a premium model) and no requests use auto routing. Pinning a top-tier model for every task overpays on simple work.

# How to Improve
Switch the default to "auto" or use the model picker. Reserve specific top-tier models (Claude Opus, GPT-5) for hard reasoning, planning, or large-context tasks. For routine edits and questions, the lighter model auto picks is usually enough.

# Examples
&#123;&#123;extra.topModel&#125;&#125;: &#123;&#123;extra.topCount&#125;&#125; requests (&#123;&#123;pct&#125;&#125;)

# Detection Logic
```detect
scan: requests
match: modelId != ""
aggregate: count
models: modelStats(matched)
topModel: models.topModel
topCount: models.topCount
hasAutoUsage: countWhere(matched, "modelId", "matches", "(?i)auto")
emitCount: models.topCount
emitTotal: models.total
check: models.topShare > thresholds.minTopShare AND modelTier(models.topModel) >= 1 AND hasAutoUsage == 0 AND models.total > thresholds.minSample
```
