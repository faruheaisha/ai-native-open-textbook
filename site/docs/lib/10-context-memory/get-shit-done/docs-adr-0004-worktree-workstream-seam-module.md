---
title: "Planning Workspace Module as single seam for worktree and workstream state"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/adr/0004-worktree-workstream-seam-module.md"
sourceRel: "docs/adr/0004-worktree-workstream-seam-module.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/adr/0004-worktree-workstream-seam-module.md"
sourceSha256: "d2a1c2ef0301391bd20c2c6f347897c231dea3750b6c04016ee9d417fbc9fa91"
pageSha256: "d2a1c2ef0301391bd20c2c6f347897c231dea3750b6c04016ee9d417fbc9fa91"
contentMode: "local-full"
zh: ""
---

# Planning Workspace Module as single seam for worktree and workstream state

- **Status:** Accepted
- **Date:** 2026-05-08

We decided to treat planning/worktree behavior as one explicit Planning Workspace Module Interface rather than spread policy across ad-hoc call sites. The Module owns `.planning` path resolution, active workstream pointer policy, workstream-name invariants, and lock semantics, while a focused Worktree Root Resolution Adapter owns linked-worktree root mapping and metadata prune behavior. This raises depth at the seam, increases leverage for callers, and improves locality for bug fixes in the worktree/workstream loop.

## Decision

- The Planning Workspace Module Interface is authoritative for:
  - `planningDir` / `planningRoot` / `planningPaths`
  - active workstream pointer policy (`session-scoped > shared`)
  - pointer self-heal behavior (invalid/stale pointers clear to null)
  - planning lock semantics (`withPlanningLock`)
- Worktree root detection stays behind one Worktree Root Resolution Adapter (`resolveWorktreeRoot`), so callers do not re-derive git-dir/common-dir logic.
- Worktree metadata cleanup remains non-destructive by default: `pruneOrphanedWorktrees` runs `git worktree prune` only and does not remove linked worktree directories.
- Workstream naming is one invariant across create/migrate/set/get/env-pointer paths: values must be canonical slugs that remain addressable by all workstream commands.

## Consequences

- Tests can pin behavior through one Interface instead of source-grep fragments, improving regression quality for worktree/workstream bugs.
- Bug classes caused by contract drift (for example migration names accepted in one path but rejected in another) are fixed once in the Module and propagate to all callers.
- Callers become thin Adapters over a deeper seam; future policy changes (session identity strategy, lock recovery, worktree prune behavior) stay localized.
