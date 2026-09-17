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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/agentic-no-tools.md"
sourceRel: "src/core/rules/agentic-no-tools.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/agentic-no-tools.md"
sourceSha256: "70c3a113a48432c7b96268abb475fbb4f71cacd9518b1c010d2739c0f232b1d1"
pageSha256: "70c3a113a48432c7b96268abb475fbb4f71cacd9518b1c010d2739c0f232b1d1"
contentMode: "local-full"
zh: ""
---

# Description
Detects agentic requests that used no tools, reducing the effectiveness of agent mode.

# When Triggered
&#123;&#123;count&#125;&#125; agentic requests used no tools. Agent mode is most effective when tools are enabled.

# How to Improve
Ensure tools are enabled in agent mode for file search, terminal access, and web search capabilities.

# Examples
&#123;&#123;extra.agentName&#125;&#125;: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: requests
match: (agentMode == "agent" OR agentName != "") AND toolsUsed.length == 0
aggregate: count
check: count > thresholds.minSample
examples: "{{messageText | truncate:60}}"
```
