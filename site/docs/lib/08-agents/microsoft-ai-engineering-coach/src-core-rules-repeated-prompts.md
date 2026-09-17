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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/repeated-prompts.md"
sourceRel: "src/core/rules/repeated-prompts.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/repeated-prompts.md"
sourceSha256: "b3e6a436398af5206c162d978e378d3511c5fdf12c762291fc00a0d51b2b0f08"
pageSha256: "b3e6a436398af5206c162d978e378d3511c5fdf12c762291fc00a0d51b2b0f08"
contentMode: "local-full"
zh: ""
---

# Description
Detects near-duplicate prompts that waste quota without producing new results.

# When Triggered
&#123;&#123;count&#125;&#125; requests are near-duplicates across &#123;&#123;extra.distinctCount&#125;&#125; distinct prompts. This wastes quota without new results.

# How to Improve
If a prompt isn't working, rephrase it or provide more context instead of retrying the same message.

# Examples
"&#123;&#123;message&#125;&#125;..." (repeated &#123;&#123;extra.repeatCount&#125;&#125;x)

# Detection Logic
```detect
scan: requests
match: messageLength > 0
aggregate: count
dupes: duplicateGroups(matched, 10, thresholds.minDuplicates)
emitCount: dupes.totalDupes
emitTotal: total
distinctCount: dupes.distinctCount
check: dupes.totalDupes >= thresholds.minDuplicates
severity: dupes.totalDupes > thresholds.highThreshold
examples: "{{messageText | truncate:60}}"
```
