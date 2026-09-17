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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-skills.md"
sourceRel: "src/core/rules/no-skills.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-skills.md"
sourceSha256: "3c0ecad3128e108f2c2162840e96d0215dbc1e36c3a370a321beacad9df76ccc"
pageSha256: "3c0ecad3128e108f2c2162840e96d0215dbc1e36c3a370a321beacad9df76ccc"
contentMode: "local-full"
zh: ""
---

# Description
Detects when no requests use Copilot skills, missing out on specialized domain knowledge.

# When Triggered
No requests use Copilot skills. Skills provide specialized domain knowledge beyond general coding.

# How to Improve
Explore available skills in your IDE. Skills can help with specific frameworks, cloud providers, and development workflows.

# Examples
Skills extend Copilot with domain expertise
Check VS Code extensions for available skills

# Detection Logic
```detect
scan: requests
match: skillsUsed.length == 0
aggregate: count
check: count == total AND total > thresholds.minReqs
```
