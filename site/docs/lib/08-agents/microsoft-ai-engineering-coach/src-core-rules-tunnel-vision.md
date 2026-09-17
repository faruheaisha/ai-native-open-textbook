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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/tunnel-vision.md"
sourceRel: "src/core/rules/tunnel-vision.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/tunnel-vision.md"
sourceSha256: "05016d5aa4536ef8c3c1c8bf7c435d538d7ddbfec5abb2e37fa5e49615629c5d"
pageSha256: "05016d5aa4536ef8c3c1c8bf7c435d538d7ddbfec5abb2e37fa5e49615629c5d"
contentMode: "local-full"
zh: ""
---

# Description
Detects when the vast majority of requests are concentrated in a single workspace, missing opportunities to use AI across projects.

# When Triggered
&#123;&#123;pct&#125;&#125; of all requests (&#123;&#123;count&#125;&#125;/&#123;&#123;total&#125;&#125;) are in "&#123;&#123;extra.topWorkspace&#125;&#125;". Copilot can help across all your projects.

# How to Improve
Try using Copilot in other workspaces too. It can help with documentation, testing, DevOps, and exploratory coding across your entire workflow.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: &#123;&#123;extra.reqCount&#125;&#125; requests (&#123;&#123;extra.reqPct&#125;&#125;%)

# Detection Logic
```detect
scan: sessions
match: true
aggregate: count
top: groupTopBySum(allSessions, "workspaceName", "requestCount")
reqTotal: sumField(allSessions, "requestCount")
emitCount: top.sum
emitTotal: reqTotal
topWorkspace: top.key
check: top.share > thresholds.maxTopRate AND top.sum >= thresholds.minReqs AND top.count >= thresholds.minWorkspaces
```
