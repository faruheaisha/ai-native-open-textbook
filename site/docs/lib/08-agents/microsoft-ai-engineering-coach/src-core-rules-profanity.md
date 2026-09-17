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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/profanity.md"
sourceRel: "src/core/rules/profanity.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/profanity.md"
sourceSha256: "d8430c59b0f63f108b39cd93dbf78b6002591780d03ef9d94fc296e37a4da5d1"
pageSha256: "d8430c59b0f63f108b39cd93dbf78b6002591780d03ef9d94fc296e37a4da5d1"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests containing profanity or hostile language, which usually signals deep frustration with the tool.

# When Triggered
&#123;&#123;count&#125;&#125; requests contain profanity or hostile language. This usually signals deep frustration with the tool.

# How to Improve
When you catch yourself using hostile language, take a break. Start a fresh session, rephrase the problem from scratch, or switch to a different approach entirely.

# Examples
&#123;&#123;extra.highlighted&#125;&#125; in: "&#123;&#123;message&#125;&#125;"

# Detection Logic
```detect
scan: requests
match: messageLength > 0 AND hasProfanity(messageText)
aggregate: count
check: count >= thresholds.minReqs
examples: "{{messageText | truncate:60}}"
```
