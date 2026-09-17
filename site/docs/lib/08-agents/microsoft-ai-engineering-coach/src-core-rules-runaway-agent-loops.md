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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/runaway-agent-loops.md"
sourceRel: "src/core/rules/runaway-agent-loops.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/runaway-agent-loops.md"
sourceSha256: "58dc21cc1d3d4040c2c7d549ac2f2f6f8efa932b35bf512f3dfeb20d96904a63"
pageSha256: "58dc21cc1d3d4040c2c7d549ac2f2f6f8efa932b35bf512f3dfeb20d96904a63"
contentMode: "local-full"
zh: ""
---

# Description
Detects agentic requests that use an excessive number of tools per request, indicating the agent may be spinning on failing approaches.

# When Triggered
&#123;&#123;count&#125;&#125; agentic requests used &#123;&#123;extra.minToolsPerReq&#125;&#125;+ tools each (avg &#123;&#123;extra.avgTools&#125;&#125;). The agent may be spinning on failing approaches.

# How to Improve
Break complex tasks into smaller, focused requests. If the agent is looping, cancel and rephrase with clearer constraints.

# Examples
&#123;&#123;extra.toolCount&#125;&#125; tools: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: requests
match: toolsUsed.length >= thresholds.minToolsPerReq AND (agentMode == "agent" OR agentName != "")
aggregate: count
totalTools: flatCount(matched, "toolsUsed")
avgTools: round(totalTools / count)
check: count >= thresholds.minReqs
examples: {{toolsUsed.length}} tools: "{{messageText | truncate:60}}"
```
