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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/excessive-file-context.md"
sourceRel: "src/core/rules/excessive-file-context.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/excessive-file-context.md"
sourceSha256: "36782609486995222a2359f2e808ec067a671993ae64af1edbe5491be7f78581"
pageSha256: "36782609486995222a2359f2e808ec067a671993ae64af1edbe5491be7f78581"
contentMode: "local-full"
zh: ""
---

# Description
Detects outlier requests that attach a very large number of files to the prompt. Each referenced file expands the input context — and the agent rarely reads all of them. Bulk-attaching files is a common pattern when the user isn't sure which files are relevant; it works, but pays for context that's mostly never used.

# When Triggered
&#123;&#123;count&#125;&#125; request(s) attached ≥&#123;&#123;thresholds.minFiles&#125;&#125; files to the prompt (largest: &#123;&#123;extra.maxFiles&#125;&#125; files). The model only reads a fraction of large attachments — the rest is paid-for context that contributes nothing.

# How to Improve
Be selective: attach only the 3–5 files most relevant to the task. Use `#codebase` or `#file:<glob>` patterns to let the model search on demand. For exploration tasks, ask the agent to `grep` first and read results into context only as needed.

# Examples
&#123;&#123;length(referencedFiles)&#125;&#125; files: "&#123;&#123;messageText | truncate:60&#125;&#125;"

# Detection Logic
```detect
scan: requests
match: length(referencedFiles) >= thresholds.minFiles
aggregate: ratio
stats: excessFileContextStats(allReqs, thresholds.minFiles)
maxFiles: stats.maxFiles
p95Files: stats.p95Files
emitCount: stats.outlierCount
emitTotal: stats.totalReqs
check: stats.outlierCount >= thresholds.minOutliers AND stats.ratio >= thresholds.maxRatio
examples: {{length(referencedFiles)}} files: "{{messageText | truncate:60}}"
```
