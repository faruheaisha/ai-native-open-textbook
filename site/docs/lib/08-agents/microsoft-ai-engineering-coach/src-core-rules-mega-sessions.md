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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/mega-sessions.md"
sourceRel: "src/core/rules/mega-sessions.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/mega-sessions.md"
sourceSha256: "52410669bf3a9a53e40f955a17ff92faac81dcefec695a5e865428de88c2a1ea"
pageSha256: "52410669bf3a9a53e40f955a17ff92faac81dcefec695a5e865428de88c2a1ea"
contentMode: "local-full"
zh: ""
---

# Description
Detects sessions with an excessive number of messages. Long sessions degrade context quality and response accuracy.

# When Triggered
&#123;&#123;count&#125;&#125; session(s) have &#123;&#123;extra.maxMessages&#125;&#125;+ messages. Long sessions degrade context quality and response accuracy.

# How to Improve
Start new sessions periodically. Break large tasks into focused conversations of 15-25 messages.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: &#123;&#123;extra.messageCount&#125;&#125; messages

# Detection Logic
```detect
scan: sessions
match: requestCount >= thresholds.maxMessages
aggregate: count
check: count > 0
examples: {{workspaceName}}: {{requestCount}} messages
```
