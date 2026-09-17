---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/pause-work.md"
sourceRel: "commands/gsd/pause-work.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/pause-work.md"
sourceSha256: "82dedce26fd1af7ebd03cf2b432658ca45fc491b4c2a0a1e8dfa2c7fa136b62f"
pageSha256: "82dedce26fd1af7ebd03cf2b432658ca45fc491b4c2a0a1e8dfa2c7fa136b62f"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Create `.continue-here.md` handoff file to preserve complete work state across sessions.

Routes to the pause-work workflow which handles:
- Current phase detection from recent files
- Complete state gathering (position, completed work, remaining work, decisions, blockers)
- Handoff file creation with all context sections
- Git commit as WIP
- Resume instructions
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/pause-work.md
&lt;/execution_context>

&lt;context>
State and phase progress are gathered in-workflow with targeted reads.
&lt;/context>

&lt;process>
If `--report` is in $ARGUMENTS:
Read and execute `~/.claude/get-shit-done/workflows/session-report.md` end-to-end.

**Follow the pause-work workflow**.

The workflow handles all logic including:
1. Phase directory detection
2. State gathering with user clarifications
3. Handoff file writing with timestamp
4. Git commit
5. Confirmation with resume instructions
&lt;/process>
