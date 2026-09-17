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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-spec-structure.md"
sourceRel: "src/core/rules/no-spec-structure.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-spec-structure.md"
sourceSha256: "0e5a614cb7d24371c3ed428ef6a225968c8c5d4ca5721a3fd0920d378967e8a4"
pageSha256: "0e5a614cb7d24371c3ed428ef6a225968c8c5d4ca5721a3fd0920d378967e8a4"
contentMode: "local-full"
zh: ""
---

# Description
Detects agentic sessions that start with vague, unstructured prompts lacking bullet points, requirements, or acceptance criteria.

# When Triggered
&#123;&#123;count&#125;&#125; of &#123;&#123;extra.agentSessions&#125;&#125; agentic sessions start with vague, unstructured prompts. No bullet points, requirements, or acceptance criteria.

# How to Improve
Start agentic sessions with structured specs: use bullet points, numbered requirements, or acceptance criteria. The more specific the first prompt, the better the result.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: sessions
match: requestCount >= 3 AND someWhere(requests, "agentMode", "agent") AND NOT (\
  matches(first(requests).messageText, "(?m)^[-*]\\s") OR \
  matches(first(requests).messageText, "(?m)^\\d+[.)]\\s") OR \
  matches(first(requests).messageText, "(?m)^#+\\s") OR \
  matches(first(requests).messageText, "(?i)\\b(requirements?|spec|acceptance criteria|user stories?|given|when|then|should|must)\\b") OR \
  lineCount(first(requests).messageText) >= 4)
aggregate: count
agentSessionTotal: countWhere(all, "requestCount", ">=", 3)
agentSessions: agentSessionTotal
check: agentSessionTotal >= thresholds.minAgentSessions AND count / agentSessionTotal > (1 - thresholds.structuredRate)
examples: {{workspaceName}}: unstructured first prompt
```
