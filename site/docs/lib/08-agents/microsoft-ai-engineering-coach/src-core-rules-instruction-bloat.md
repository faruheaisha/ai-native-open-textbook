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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/instruction-bloat.md"
sourceRel: "src/core/rules/instruction-bloat.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/instruction-bloat.md"
sourceSha256: "61f097e35b999e28654d4255de685f25be846a0547b55ef7f0294a1453a0261c"
pageSha256: "61f097e35b999e28654d4255de685f25be846a0547b55ef7f0294a1453a0261c"
contentMode: "local-full"
zh: ""
---

# Description
Detects oversized `.github/copilot-instructions.md` (or equivalent) files. Custom instructions are prepended to **every** request's system prompt — large files inflate input tokens on every turn, often by thousands of tokens that are never relevant to the current task.

# When Triggered
&#123;&#123;extra.bloatedSessions&#125;&#125; workspace(s) have custom-instruction files larger than &#123;&#123;thresholds.maxBytes&#125;&#125; bytes (largest: &#123;&#123;extra.maxBytes&#125;&#125; bytes). Every request in those workspaces pays the bloat cost on input tokens.

# How to Improve
Trim `.github/copilot-instructions.md` to the essentials: language/framework conventions, code style, "do not" rules, and pointers to longer docs. Move long examples and rationale into separate files referenced via `#file:`. Keep the always-on payload under ~4 KB.

# Examples
&#123;&#123;extra.maxBytes&#125;&#125; bytes — largest custom-instructions file across &#123;&#123;extra.totalSessions&#125;&#125; workspace(s)

# Detection Logic
```detect
scan: sessions
match: true
aggregate: count
stats: instructionBloatStats(allSessions, thresholds.maxBytes)
bloatedSessions: stats.bloatedSessions
maxBytes: stats.maxBytes
totalSessions: stats.totalSessions
withInstructionsCount: stats.withInstructionsCount
emitCount: stats.bloatedSessions
emitTotal: stats.totalSessions
check: stats.bloatedSessions >= thresholds.minBloated
examples: {{maxBytes}} bytes (workspace-level)
```
