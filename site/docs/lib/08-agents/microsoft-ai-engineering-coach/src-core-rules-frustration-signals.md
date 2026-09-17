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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/frustration-signals.md"
sourceRel: "src/core/rules/frustration-signals.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/frustration-signals.md"
sourceSha256: "a1fdd0f8716e73d36ff307b0abc40a47713620f83a47a92f04a4c73a592bdcf5"
pageSha256: "a1fdd0f8716e73d36ff307b0abc40a47713620f83a47a92f04a4c73a592bdcf5"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests showing frustration indicators like excessive punctuation (!!!?, ???) or ALL CAPS writing.

# When Triggered
&#123;&#123;count&#125;&#125; requests show frustration indicators (excessive punctuation, ALL CAPS). This usually means the approach isn't working.

# How to Improve
When frustrated, step back and change strategy. Start a new session, rephrase the problem, or break it into smaller pieces instead of escalating the same prompt.

# Examples
"&#123;&#123;message&#125;&#125;"

# Detection Logic
```detect
scan: requests
match: messageLength >= 10 AND (matchesAny(messageText, patterns.frustration) OR capsWordRatio(messageText, thresholds.minWords) >= thresholds.capsRate)
aggregate: count
check: count >= thresholds.minReqs
examples: "{{messageText | truncate:80}}"
```

# Tests
```test
{messageText: "WHY WONT THIS WORK???!!!", messageLength: 25} -> triggered
{messageText: "Please refactor the auth module", messageLength: 31} -> clean
{messageText: "THIS IS SO BROKEN FIX IT NOW", messageLength: 28} -> triggered
{messageText: "Add error handling to the API endpoint", messageLength: 38} -> clean
```
