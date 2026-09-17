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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/model-overreliance.md"
sourceRel: "src/core/rules/model-overreliance.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/model-overreliance.md"
sourceSha256: "533a6d23ae1d1b69001d9838ce0f3d13fb6d466af891ff55e555a9da001f5847"
pageSha256: "533a6d23ae1d1b69001d9838ce0f3d13fb6d466af891ff55e555a9da001f5847"
contentMode: "local-full"
zh: ""
---

# Description
Detects when the vast majority of requests use a single model, missing opportunities to use lighter models for simple tasks.

# When Triggered
&#123;&#123;pct&#125;&#125; of requests use &#123;&#123;extra.topModel&#125;&#125;. Different tasks benefit from different models.

# How to Improve
Use lighter models (gpt-4.1-mini, gemini-flash) for simple tasks to save premium quota and get faster responses.

# Examples
&#123;&#123;extra.model&#125;&#125;: &#123;&#123;extra.reqCount&#125;&#125; requests

# Detection Logic
```detect
scan: requests
match: true
aggregate: count
models: modelStats(allReqs)
emitCount: models.topCount
emitTotal: models.total
topModel: models.topModel
check: models.topShare > thresholds.maxTopModelRate AND models.modelCount < thresholds.minModels AND models.total > thresholds.minSample
```
