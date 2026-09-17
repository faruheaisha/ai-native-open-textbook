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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/reasoning-effort-overuse.md"
sourceRel: "src/core/rules/reasoning-effort-overuse.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/reasoning-effort-overuse.md"
sourceSha256: "8b3b23c73d8c29cfaf7aa7b8403d60e99562f34b33e458ed9e23d645379f4bef"
pageSha256: "8b3b23c73d8c29cfaf7aa7b8403d60e99562f34b33e458ed9e23d645379f4bef"
contentMode: "local-full"
zh: ""
---

# Description
Detects sessions where high or maximum reasoning effort is used for the majority of requests on reasoning-capable models. Higher reasoning levels generate many extra "thinking" tokens — every `-high` or `-xhigh` request typically costs 2–4× more output tokens than `-medium` or default for the same answer.

# When Triggered
&#123;&#123;extra.premiumCount&#125;&#125; of &#123;&#123;extra.totalKnown&#125;&#125; requests with a known reasoning level (&#123;&#123;pct&#125;&#125;) ran at `high` or `max` effort. These extra thinking tokens are billed even when the task doesn't need deep reasoning.

# How to Improve
Default to `medium` effort and only escalate when the task actually benefits from extra reasoning (complex algorithms, ambiguous spec, multi-step planning). For routine edits, refactors, or factual questions, lower effort delivers the same result for a fraction of the output tokens.

# Examples
&#123;&#123;normalizeModel(modelId)&#125;&#125; · effort: &#123;&#123;reasoningEffort&#125;&#125;

# Detection Logic
```detect
scan: requests
match: reasoningEffort == "high" OR reasoningEffort == "max"
aggregate: count
stats: reasoningEffortStats(allReqs, "high")
emitCount: stats.premiumCount
emitTotal: stats.totalKnown
premiumCount: stats.premiumCount
totalKnown: stats.totalKnown
check: stats.totalKnown > thresholds.minSample AND stats.ratio > thresholds.maxRatio
examples: {{normalizeModel(modelId)}} · effort: {{reasoningEffort}}
```
