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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-slash-commands.md"
sourceRel: "src/core/rules/no-slash-commands.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-slash-commands.md"
sourceSha256: "495cb00b3162b425a40e93f6b81603ded5af6764f2ab5e78b13ff8c3dbfdb9ac"
pageSha256: "495cb00b3162b425a40e93f6b81603ded5af6764f2ab5e78b13ff8c3dbfdb9ac"
contentMode: "local-full"
zh: ""
---

# Description
Detects low usage of slash commands, which produce more targeted responses than freeform prompts.

# When Triggered
Only &#123;&#123;extra.withSlash&#125;&#125; of &#123;&#123;total&#125;&#125; requests use slash commands. Slash commands produce more targeted responses.

# How to Improve
Try /fix for bugs, /explain for understanding code, /tests for test generation, /doc for documentation.

# Examples
/fix - Fix bugs in selected code
/explain - Explain how code works
/tests - Generate unit tests

# Detection Logic
```detect
scan: requests
match: slashCommand == ""
aggregate: count
usageRate: (total - count) / total
withSlash: total - count
check: usageRate < thresholds.minRate AND total > thresholds.minReqs
```
