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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/abandon-sessions.md"
sourceRel: "src/core/rules/abandon-sessions.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/abandon-sessions.md"
sourceSha256: "c9ed9acec310b434ebe436dd0052559f077b90b7d11b63f909c6d342ee78c59e"
pageSha256: "c9ed9acec310b434ebe436dd0052559f077b90b7d11b63f909c6d342ee78c59e"
contentMode: "local-full"
zh: ""
---

# Description
Detects sessions with only a single message, indicating missed refinement opportunities.

# When Triggered
&#123;&#123;count&#125;&#125; sessions (&#123;&#123;pct&#125;&#125;) have only 1 message. You may be missing refinement opportunities.

# How to Improve
Use follow-up messages to refine Copilot's responses. Iterating produces much better results than one-shot prompts.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: sessions
match: requestCount == 1
aggregate: ratio
check: ratio > thresholds.maxAbandonRate AND count > thresholds.minSample
examples: {{workspaceName}}: abandoned after 1 message
```
