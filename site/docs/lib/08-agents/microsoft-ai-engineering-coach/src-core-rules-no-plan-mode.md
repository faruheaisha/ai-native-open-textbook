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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-plan-mode.md"
sourceRel: "src/core/rules/no-plan-mode.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-plan-mode.md"
sourceSha256: "bd178345023c13f25b6b71e5f5ac8304ed07ce1c0a0e9fb1b8679155065b0ec8"
pageSha256: "bd178345023c13f25b6b71e5f5ac8304ed07ce1c0a0e9fb1b8679155065b0ec8"
contentMode: "local-full"
zh: ""
---

# Description
Detects heavy agentic usage with no use of plan mode, which helps the agent understand scope before implementation.

# When Triggered
&#123;&#123;extra.agenticReqs&#125;&#125; agentic requests but no use of plan mode. Jumping straight to implementation often leads to wrong approaches.

# How to Improve
Use plan mode (or /plan) before complex tasks. Planning helps the agent understand scope, break down work, and avoid wasted iterations.

# Examples
Switch to Plan mode in the mode picker before starting large features
Use /plan to outline an approach before coding
Plan first, then switch to Agent mode to execute

# Detection Logic
```detect
scan: requests
match: agentMode == "agent" OR agentName != ""
aggregate: count
agentRatio: count / total
planUsage: someWhere(all, "slashCommand", "plan") OR \
  someWhere(all, "agentMode", "matches", "(?i)plan"slashCommand", "plan") OR \
  someWhere(all, "agentMode", "matches", "(?i)plan")
agenticReqs: count
check: planUsage == 0 AND total >= thresholds.minReqs AND agentRatio >= thresholds.agentRate
```
