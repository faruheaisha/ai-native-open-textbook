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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-custom-instructions.md"
sourceRel: "src/core/rules/no-custom-instructions.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-custom-instructions.md"
sourceSha256: "524eece18624e00a559c6ef0f712d67540cc851b024f324c0edfdd10aabfe6fd"
pageSha256: "524eece18624e00a559c6ef0f712d67540cc851b024f324c0edfdd10aabfe6fd"
contentMode: "local-full"
zh: ""
---

# Description
Detects when very few requests use custom instructions, missing out on personalized and project-specific responses.

# When Triggered
Only &#123;&#123;extra.usagePct&#125;&#125;% of requests use custom instructions (&#123;&#123;extra.withInstructions&#125;&#125;/&#123;&#123;total&#125;&#125;). Missing out on personalized responses.

# How to Improve
Create a .github/copilot-instructions.md or .instructions.md file in your workspace to give Copilot persistent context about your project conventions, stack, and coding style.

# Examples
&#123;&#123;extra.withInstructions&#125;&#125; of &#123;&#123;total&#125;&#125; requests had custom instructions

# Detection Logic
```detect
scan: requests
match: customInstructions.length == 0
aggregate: count
usageRate: (total - count) / total
withInstructions: total - count
usagePct: round(usageRate * 100)
check: usageRate < thresholds.minRate AND total > thresholds.minReqs
```
