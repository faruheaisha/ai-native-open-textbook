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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/new-project.md"
sourceRel: "commands/gsd/new-project.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/new-project.md"
sourceSha256: "0d2665fcfd02b50dc3850405829380ff2e4b81ea6a0aa944d4bab6df7e1952c3"
pageSha256: "0d2665fcfd02b50dc3850405829380ff2e4b81ea6a0aa944d4bab6df7e1952c3"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;runtime_note>
**Copilot (VS Code):** Use `vscode_askquestions` wherever this workflow calls `AskUserQuestion`. They are equivalent — `vscode_askquestions` is the VS Code Copilot implementation of the same interactive question API.
&lt;/runtime_note>

&lt;context>
**Flags:**
- `--auto` — Automatic mode. After config questions, runs research → requirements → roadmap without further interaction. Expects idea document via @ reference.
&lt;/context>

&lt;objective>
Initialize a new project through unified flow: questioning → research (optional) → requirements → roadmap.

**Creates:**
- `.planning/PROJECT.md` — project context
- `.planning/config.json` — workflow preferences
- `.planning/research/` — domain research (optional)
- `.planning/REQUIREMENTS.md` — scoped requirements
- `.planning/ROADMAP.md` — phase structure
- `.planning/STATE.md` — project memory

**After this command:** Run `/gsd:plan-phase 1` to start execution.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/new-project.md
@~/.claude/get-shit-done/references/questioning.md
@~/.claude/get-shit-done/references/ui-brand.md
@~/.claude/get-shit-done/templates/project.md
@~/.claude/get-shit-done/templates/requirements.md
&lt;/execution_context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (validation, approvals, commits, routing).
&lt;/process>
