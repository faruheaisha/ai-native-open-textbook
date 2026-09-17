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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/premium-for-lookup-questions.md"
sourceRel: "src/core/rules/premium-for-lookup-questions.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/premium-for-lookup-questions.md"
sourceSha256: "9bec7a883287c08a539a7e90df559a6dda6c4dfed9b6e3cd22ca15eb0f83bf26"
pageSha256: "9bec7a883287c08a539a7e90df559a6dda6c4dfed9b6e3cd22ca15eb0f83bf26"
contentMode: "local-full"
zh: ""
---

# Description
Detects "lookup-style" questions ("what is X?", "where is Y?", "how do I Z?", "explain Y") that get routed to a premium model. These factual one-shot questions rarely need top-tier reasoning — `auto` or a base model usually returns the same answer for a fraction of the cost.

# When Triggered
&#123;&#123;count&#125;&#125; lookup-style questions (&#123;&#123;pct&#125;&#125;) used a premium model. Short factual questions almost never benefit from premium reasoning — they overpay on every request.

# How to Improve
Switch the default model to `auto` so lightweight questions are routed cheaply. Reserve premium models for tasks that need actual reasoning: planning, debugging, multi-step refactors. Custom-instruct your IDE to "use the cheapest model that can answer this" for short prompts.

# Examples
&#123;&#123;normalizeModel(modelId)&#125;&#125;: "&#123;&#123;messageText | truncate:60&#125;&#125;"

# Detection Logic
```detect
scan: requests
match: modelTier(modelId) >= 1 AND messageLength > 0 AND messageLength < thresholds.maxMessageLength AND length(aiCode) == 0 AND length(toolsUsed) == 0 AND matches(messageText, "(?i)^\\s*(what(?:'s| is| are)|where(?:'s| is| are)|how do (?:i|you)|explain|why (?:does|is|are)|when (?:should|do)|which|tell me about|define)\\b")
aggregate: ratio
check: ratio > thresholds.maxRatio AND count > thresholds.minSample
examples: {{normalizeModel(modelId)}}: "{{messageText | truncate:60}}"
```
