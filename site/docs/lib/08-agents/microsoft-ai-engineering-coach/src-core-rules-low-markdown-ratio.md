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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/low-markdown-ratio.md"
sourceRel: "src/core/rules/low-markdown-ratio.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/low-markdown-ratio.md"
sourceSha256: "8daa6a048b0359988bb60c987b94f5b8539445ba968a4613a7c5bc733803fbc4"
pageSha256: "8daa6a048b0359988bb60c987b94f5b8539445ba968a4613a7c5bc733803fbc4"
contentMode: "local-full"
zh: ""
---

# Description
Detects workspaces that produce almost no markdown output, suggesting specs, plans, and documentation are skipped before coding.

# When Triggered
&#123;&#123;count&#125;&#125; workspace(s) produce almost no markdown (&#123;&#123;extra.overallPct&#125;&#125;% of AI output). &#123;&#123;extra.totalCodeLoc&#125;&#125; LoC of code vs &#123;&#123;extra.totalMdLoc&#125;&#125; LoC of markdown. This suggests you skip writing specs, plans, and documentation before coding.

# How to Improve
Adopt spec-driven development: ask Copilot to draft a spec, plan, or design doc before writing code. Even a short markdown outline dramatically improves code quality and reduces iteration cycles. Try starting sessions with "Write a brief spec for..." or "Draft an implementation plan for...".

# Examples
&#123;&#123;extra.workspace&#125;&#125;: &#123;&#123;extra.codeLoc&#125;&#125; code LoC, &#123;&#123;extra.mdLoc&#125;&#125; markdown LoC (&#123;&#123;extra.ratioPct&#125;&#125;%)

# Detection Logic
```detect
scan: sessions
match: true
aggregate: count
md: mdRatioByWorkspace(allSessions, thresholds.minTotalLoc, ["markdown", "md"])
emitCount: md.lowCount
emitTotal: md.totalWorkspaces
overallPct: round(md.overallRatio * 100)
totalCodeLoc: md.totalCodeLoc
totalMdLoc: md.totalMdLoc
workspaces: md.workspaces
check: md.lowCount >= thresholds.minWorkspaces
severity: md.overallRatio < 0.02
```
