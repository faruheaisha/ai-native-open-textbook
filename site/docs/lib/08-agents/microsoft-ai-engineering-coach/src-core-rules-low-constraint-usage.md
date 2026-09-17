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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/low-constraint-usage.md"
sourceRel: "src/core/rules/low-constraint-usage.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/low-constraint-usage.md"
sourceSha256: "2b2665ce3193d35724ef45940482fb7efe753f73f939210587ccff6e53568942"
pageSha256: "2b2665ce3193d35724ef45940482fb7efe753f73f939210587ccff6e53568942"
contentMode: "local-full"
zh: ""
---

# Description
Detects prompts that lack constraint keywords (do not, must, avoid, only, etc.). Constraints narrow AI output, reduce hallucinations, and produce higher-quality code.

# When Triggered
Only &#123;&#123;extra.constraintPct&#125;&#125;% of prompts include constraints (&#123;&#123;extra.withConstraints&#125;&#125;/&#123;&#123;extra.substantialReqs&#125;&#125;). Constraints narrow AI output, reduce hallucinations, and produce higher-quality code.

# How to Improve
Add explicit constraints to prompts: "do not use class components", "only use async/await", "limit to 50 lines", "avoid external dependencies". Negative constraints force the model out of boilerplate patterns and into more precise solutions.

# Examples
"&#123;&#123;message&#125;&#125;..." (no constraints)

# Detection Logic
```detect
scan: requests
match: messageLength >= thresholds.minMessageLength AND NOT \
  matches(messageText, "(?i)\\b(do not|don't|must not|never|without|avoid|only|strictly|limit to|at most|at least|no more than|require|restrict|exclude|ensure|must|shall|should not)\\b")
aggregate: count
substantialTotal: countWhere(all, "messageLength", ">=", thresholds.minMessageLength)
withConstraints: substantialTotal - count
substantialReqs: substantialTotal
constraintPct: round((substantialTotal - count) / substantialTotal * 100)
check: substantialTotal >= thresholds.minReqs AND count / substantialTotal > (1 - thresholds.constraintRate)
examples: "{{messageText | truncate:80}}" (no constraints)
```
