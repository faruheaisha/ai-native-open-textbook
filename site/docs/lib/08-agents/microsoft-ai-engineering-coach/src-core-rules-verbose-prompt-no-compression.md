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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/verbose-prompt-no-compression.md"
sourceRel: "src/core/rules/verbose-prompt-no-compression.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/verbose-prompt-no-compression.md"
sourceSha256: "6a1f46cc47ea49153382f33cbdda5306d80e67f5a1663962bff274044e50569e"
pageSha256: "6a1f46cc47ea49153382f33cbdda5306d80e67f5a1663962bff274044e50569e"
contentMode: "local-full"
zh: ""
---

# Description
Detects user prompts that are unusually long and full of low-signal "fluff" words (please, kindly, thanks, basically, essentially, definitely, absolutely, simply, very, quite, somewhat, certainly). Long verbose prompts inflate input tokens on every turn — and where compression skills are available (e.g. caveman/cavecrew), the user is paying the verbosity tax twice (once on the user message, once on the system instructions).

# When Triggered
&#123;&#123;count&#125;&#125; verbose prompts (&#123;&#123;pct&#125;&#125;) of length ≥&#123;&#123;thresholds.minMessageLength&#125;&#125; chars contained 2+ filler words. These prompts could be rewritten to half the size with no loss of meaning.

# How to Improve
Be terse and structured. Replace "please could you kindly write a function that basically just adds two numbers" with "write add(a,b)". Use bullet points instead of paragraphs. Drop pleasantries — Copilot doesn't care, and you pay for every token. Consider installing a compression skill like `caveman/cavecrew` to compress sub-agent results.

# Examples
"&#123;&#123;messageText | truncate:80&#125;&#125;" (&#123;&#123;messageLength&#125;&#125; chars)

# Detection Logic
```detect
scan: requests
match: messageLength >= thresholds.minMessageLength AND matches(messageText, "(?i)\\b(please|kindly|thanks|thank you|basically|essentially|definitely|absolutely|simply|very|quite|somewhat|certainly|actually|literally)\\b.*\\b(please|kindly|thanks|thank you|basically|essentially|definitely|absolutely|simply|very|quite|somewhat|certainly|actually|literally)\\b") AND hasSkillByPattern(allReqs, "(?i)cavecrew|caveman|compress") == 0
aggregate: ratio
check: ratio > thresholds.maxRatio AND count > thresholds.minSample
examples: "{{messageText | truncate:80}}" ({{messageLength}} chars)
```
