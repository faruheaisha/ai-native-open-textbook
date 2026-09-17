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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/debug.md"
sourceRel: "commands/gsd/debug.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/debug.md"
sourceSha256: "e7807b7411dadd80954b2461aa36e1bfee26fb9bb45557f648f20df38325c5e1"
pageSha256: "e7807b7411dadd80954b2461aa36e1bfee26fb9bb45557f648f20df38325c5e1"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Debug issues using scientific method with subagent isolation.

**Orchestrator role:** Gather symptoms, spawn gsd-debugger agent, handle checkpoints, spawn continuations.

**Flags:**
- `--diagnose` — Diagnose only. Returns a Root Cause Report without applying a fix.

**Subcommands:** `list` · `status <slug>` · `continue <slug>`
&lt;/objective>

&lt;available_agent_types>
Valid GSD subagent types (use exact names — do not fall back to 'general-purpose'):
- gsd-debug-session-manager — manages debug checkpoint/continuation loop in isolated context
- gsd-debugger — investigates bugs using scientific method
&lt;/available_agent_types>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/debug.md
&lt;/execution_context>

&lt;context>
User's input: $ARGUMENTS

Parse subcommands and flags from $ARGUMENTS BEFORE the active-session check:
- If $ARGUMENTS starts with "list": SUBCMD=list, no further args
- If $ARGUMENTS starts with "status ": SUBCMD=status, SLUG=remainder (trim whitespace)
- If $ARGUMENTS starts with "continue ": SUBCMD=continue, SLUG=remainder (trim whitespace)
- If $ARGUMENTS contains `--diagnose`: SUBCMD=debug, diagnose_only=true, strip `--diagnose` from description
- Otherwise: SUBCMD=debug, diagnose_only=false

Check for active sessions (used for non-list/status/continue flows):
```bash
ls .planning/debug/*.md 2>/dev/null | grep -v resolved | head -5
```
&lt;/context>

&lt;process>
Execute end-to-end.
&lt;/process>
