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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/copy-paste-blindness.md"
sourceRel: "src/core/rules/copy-paste-blindness.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/copy-paste-blindness.md"
sourceSha256: "5ef28722eb2da27bb25cfa50beac859f9db70db71f9ecb9841e8288ee5721dc8"
pageSha256: "5ef28722eb2da27bb25cfa50beac859f9db70db71f9ecb9841e8288ee5721dc8"
contentMode: "local-full"
zh: ""
---

# Description
Detects sessions with large AI-generated code blocks that have no follow-up refinement, suggesting code is accepted without review.

# When Triggered
&#123;&#123;count&#125;&#125; sessions have large AI-generated code blocks with no follow-up refinement. Code may be accepted without review.

# How to Improve
Always review AI-generated code before accepting. Ask follow-up questions to refine, test, and understand the output.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: &#123;&#123;extra.aiLoc&#125;&#125; AI LOC, &#123;&#123;extra.messageCount&#125;&#125; messages, no refinement

# Detection Logic
```detect
scan: sessions
match: requestCount >= 2 AND flatSumField(requests, "aiCode", "loc") >= thresholds.minAiLoc AND NOT (\
  anyWhere(slice(requests, 1), "messageText", "matches", "(?i)\\b(change|fix|modify|update|refactor|wrong|instead|actually|revert|redo|try again)\\b") OR \
  someWhere(slice(requests, 1), "editedFiles.length", ">", 0))
aggregate: count
check: count >= thresholds.minSessions
examples: {{workspaceName}}: {{flatSumField(requests, "aiCode", "loc")}} AI LoC, no refinement
```
