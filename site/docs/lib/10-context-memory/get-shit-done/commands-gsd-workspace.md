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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/workspace.md"
sourceRel: "commands/gsd/workspace.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/workspace.md"
sourceSha256: "09a2ce9cfefc8d6dade2946459d1a5b1a2c3dacaebf98cbdd6b88ce9915cfb5c"
pageSha256: "09a2ce9cfefc8d6dade2946459d1a5b1a2c3dacaebf98cbdd6b88ce9915cfb5c"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Manage GSD workspaces with a single consolidated command.

Mode routing:
- **--new**: Create an isolated workspace with repo copies and independent .planning/ → new-workspace workflow
- **--list**: List active GSD workspaces and their status → list-workspaces workflow
- **--remove**: Remove a GSD workspace and clean up worktrees → remove-workspace workflow
&lt;/objective>

&lt;routing>

| Flag | Action | Workflow |
|------|--------|----------|
| --new | Create workspace with worktree/clone strategy | new-workspace |
| --list | Scan ~/gsd-workspaces/, show summary table | list-workspaces |
| --remove | Confirm and remove workspace directory | remove-workspace |

&lt;/routing>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/new-workspace.md
@~/.claude/get-shit-done/workflows/list-workspaces.md
@~/.claude/get-shit-done/workflows/remove-workspace.md
@~/.claude/get-shit-done/references/ui-brand.md
&lt;/execution_context>

&lt;context>
Arguments: $ARGUMENTS

Parse the first token of $ARGUMENTS:
- If it is `--new`: strip the flag, pass remainder (--name, --repos, --path, --strategy, --branch, --auto flags) to new-workspace workflow
- If it is `--list`: execute list-workspaces workflow (no argument needed)
- If it is `--remove`: strip the flag, pass remainder (workspace-name) to remove-workspace workflow
- Otherwise (no flag): show usage — one of --new, --list, or --remove is required
&lt;/context>

&lt;process>
1. Parse the leading flag from $ARGUMENTS.
2. Load and execute the appropriate workflow end-to-end based on the routing table above.
3. Preserve all workflow gates from the target workflow (validation, approvals, commits, routing).
&lt;/process>
