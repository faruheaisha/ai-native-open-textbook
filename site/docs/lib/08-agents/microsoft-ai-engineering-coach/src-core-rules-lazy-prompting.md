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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/lazy-prompting.md"
sourceRel: "src/core/rules/lazy-prompting.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/lazy-prompting.md"
sourceSha256: "6f7d42bb5923dc656ec3d49d93f4d66523365af263d546d9e4f8c19c7316d67f"
pageSha256: "6f7d42bb5923dc656ec3d49d93f4d66523365af263d546d9e4f8c19c7316d67f"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests with very short prompts that lack sufficient context for the AI to produce quality results.

# When Triggered
&#123;&#123;count&#125;&#125; requests (&#123;&#123;pct&#125;&#125;) are under &#123;&#123;extra.minChars&#125;&#125; characters. Very short prompts often produce poor results.

# How to Improve
Provide more context in your prompts: describe the intent, constraints, and expected output format.

# Examples
"&#123;&#123;message&#125;&#125;" (&#123;&#123;extra.charCount&#125;&#125; chars)

# Detection Logic
```detect
scan: requests
match: messageLength < thresholds.minChars AND messageLength > 0
aggregate: ratio
check: ratio > thresholds.maxRatio AND count > thresholds.minSample
examples: "{{messageText | truncate:80}}" ({{messageLength}} chars)
```

# Tests
```test
{messageText: "fix bug", messageLength: 7} -> triggered
{messageText: "Refactor the authentication middleware to use JWT tokens and add refresh token rotation", messageLength: 88} -> clean
{messageText: "", messageLength: 0} -> clean
```
