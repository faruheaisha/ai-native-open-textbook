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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/caps-lock.md"
sourceRel: "src/core/rules/caps-lock.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/caps-lock.md"
sourceSha256: "8475910d1a30cc53b6bc164a6d7940b7c19e9922de99bc84678c646052834ba8"
pageSha256: "8475910d1a30cc53b6bc164a6d7940b7c19e9922de99bc84678c646052834ba8"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests written mostly or entirely in CAPS LOCK, indicating high frustration levels.

# When Triggered
&#123;&#123;count&#125;&#125; requests are written mostly or entirely in CAPS LOCK, indicating high frustration.

# How to Improve
All-caps messages signal frustration. Step away, take a breath, then return with a calm, structured prompt. Clear communication gets better AI responses.

# Examples
"&#123;&#123;message&#125;&#125;"

# Detection Logic
```detect
scan: requests
match: messageLength >= thresholds.minLength AND capsLetterRatio(messageText) >= thresholds.capsRate
aggregate: count
check: count >= thresholds.minReqs
examples: "{{messageText | truncate:80}}"
```
