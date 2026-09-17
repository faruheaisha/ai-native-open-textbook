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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/vibe-coding.md"
sourceRel: "src/core/rules/vibe-coding.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/vibe-coding.md"
sourceSha256: "a17cc42070b367f1fb2a4fda7659035b94b85683a6df4135d37a1e41d69fadf0"
pageSha256: "a17cc42070b367f1fb2a4fda7659035b94b85683a6df4135d37a1e41d69fadf0"
contentMode: "local-full"
zh: ""
---

# Description
Detects sessions with high AI code output from minimal prompts with no specs, indicating velocity without understanding.

# When Triggered
&#123;&#123;count&#125;&#125; sessions show vibe-coding patterns: &#123;&#123;extra.totalVibeLoc&#125;&#125; AI LoC generated with minimal prompts, no specs, and minimal review. Velocity without understanding creates knowledge debt.

# How to Improve
Slow down. Write specs before coding. Review generated code line by line. Understand what the AI produced before moving on. High LoC output without comprehension is technical debt, not productivity.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: &#123;&#123;extra.aiLoc&#125;&#125; AI LoC in &#123;&#123;extra.messageCount&#125;&#125; messages -- "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: sessions
match: flatSumField(requests, "aiCode", "loc") >= thresholds.minAiLoc AND \
  requestCount <= thresholds.maxUserPrompts AND NOT (\
  matches(first(requests).messageText, "(?m)^[-*]\\s") OR \
  matches(first(requests).messageText, "(?m)^\\d+[.)]\\s") OR \
  matches(first(requests).messageText, "(?m)^#+\\s") OR \
  matches(first(requests).messageText, "(?i)\\b(requirements?|spec|acceptance criteria|user stories?|given|when|then|should|must)\\b") OR \
  lineCount(first(requests).messageText) >= 4)
aggregate: count
check: count >= thresholds.minSessions
examples: {{workspaceName}}: {{flatSumField(requests, "aiCode", "loc")}} AI LoC in {{requestCount}} messages
```
