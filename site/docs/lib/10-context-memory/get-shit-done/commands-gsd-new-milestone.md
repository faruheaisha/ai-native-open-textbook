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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/new-milestone.md"
sourceRel: "commands/gsd/new-milestone.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/new-milestone.md"
sourceSha256: "524d1503692122397399caaff69e576be7497772e19838e7c9a2c08cc5a2f39a"
pageSha256: "524d1503692122397399caaff69e576be7497772e19838e7c9a2c08cc5a2f39a"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Start a new milestone: questioning → research (optional) → requirements → roadmap.

Brownfield equivalent of new-project. Project exists, PROJECT.md has history. Gathers "what's next", updates PROJECT.md, then runs requirements → roadmap cycle.

**Creates/Updates:**
- `.planning/PROJECT.md` — updated with new milestone goals
- `.planning/research/` — domain research (optional, NEW features only)
- `.planning/REQUIREMENTS.md` — scoped requirements for this milestone
- `.planning/ROADMAP.md` — phase structure (continues numbering)
- `.planning/STATE.md` — reset for new milestone

**After:** `/gsd:plan-phase [N]` to start execution.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/new-milestone.md
@~/.claude/get-shit-done/references/questioning.md
@~/.claude/get-shit-done/references/ui-brand.md
@~/.claude/get-shit-done/templates/project.md
@~/.claude/get-shit-done/templates/requirements.md
&lt;/execution_context>

&lt;context>
Milestone name: $ARGUMENTS (optional - will prompt if not provided)

Project and milestone context files are resolved inside the workflow (`init new-milestone`) and delegated via `<files_to_read>` blocks where subagents are used.
&lt;/context>

&lt;process>
Execute end-to-end.
Preserve all workflow gates (validation, questioning, research, requirements, roadmap approval, commits).
&lt;/process>
