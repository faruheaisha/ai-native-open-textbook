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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/auto-approve-terminal.md"
sourceRel: "src/core/rules/auto-approve-terminal.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/auto-approve-terminal.md"
sourceSha256: "93569d2c642ea4f4c33be080dc9eb48c4d25cac50ac61d02f72928f0e90f76b5"
pageSha256: "93569d2c642ea4f4c33be080dc9eb48c4d25cac50ac61d02f72928f0e90f76b5"
contentMode: "local-full"
zh: ""
---

# Description
Detects terminal commands that were auto-approved without review, which can be risky for destructive operations.

# When Triggered
&#123;&#123;count&#125;&#125; terminal commands were auto-approved. Blindly running AI-generated commands can be risky.

# How to Improve
Review terminal commands before execution, especially destructive ones (rm, git push --force, DROP TABLE). Use session-scoped approval cautiously.

# Examples
$ &#123;&#123;extra.command&#125;&#125;

# Detection Logic
```detect
scan: requests
match: toolConfirmations.length > 0
aggregate: count
stats: autoApproveStats(matched)
emitCount: stats.terminalAutoApproved
emitTotal: stats.withConfirmations
check: stats.terminalAutoApproved > thresholds.minTerminalAutoApprove AND stats.autoApprovedTotal > thresholds.minAutoApprove
```
