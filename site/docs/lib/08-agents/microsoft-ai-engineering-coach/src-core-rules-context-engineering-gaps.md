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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/context-engineering-gaps.md"
sourceRel: "src/core/rules/context-engineering-gaps.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/context-engineering-gaps.md"
sourceSha256: "5f43b408495c1a5ce9acd5012941f9322efa14c83854d659b4ca17978cd89470"
pageSha256: "5f43b408495c1a5ce9acd5012941f9322efa14c83854d659b4ca17978cd89470"
contentMode: "local-full"
zh: ""
---

# Description
Audits your context engineering setup: custom agents, skills, MCP tools, file references, and custom instructions. Missing components limit AI effectiveness.

# When Triggered
&#123;&#123;count&#125;&#125; of 5 context engineering signals missing. Your AI lacks the context to be maximally effective.

# How to Improve
Level up your context engineering: create AGENTS.md for custom agents, SKILL.md for domain knowledge, connect MCP tools, use #file references, and add .instructions.md with project conventions.

# Examples
&#123;&#123;extra.gapCount&#125;&#125; of 5 context engineering signals missing

# Detection Logic
```detect
scan: requests
match: true
aggregate: count
reqCount: count
hasSubAgents: someWhere(allReqs, "agentName", "!=", "") AND \
  someWhere(allReqs, "agentName", "!=", "copilot") AND \
  someWhere(allReqs, "agentMode", "agent")
hasSkills: flatCount(allReqs, "skillsUsed") > 0
hasMcp: flatSomeWhere(allReqs, "toolsUsed", ".", "mcp_", "startsWith")
fileRefRate: countWhere(allReqs, "referencedFiles.length", ">", 0) / reqCount
instrRate: countWhere(allReqs, "customInstructions.length", ">", 0) / reqCount
gap1: hasSubAgents == 0
gap2: hasSkills == 0
gap3: hasMcp == 0
gap4: fileRefRate < thresholds.fileRefMinRate
gap5: instrRate < thresholds.instructionMinRate
gapCount: gap1 + gap2 + gap3 + gap4 + gap5
emitCount: gapCount
emitTotal: 5
check: gapCount > 0 AND reqCount >= thresholds.minReqs
severity: gapCount >= 4
```
