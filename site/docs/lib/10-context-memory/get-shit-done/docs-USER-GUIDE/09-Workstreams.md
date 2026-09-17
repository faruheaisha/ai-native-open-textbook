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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "ca9e6cc43b4cb02405fe0df773f6130e86a1ce3dcacc367228da75e0af7b16e6"
contentMode: "local-full"
zh: ""
---

## Workstreams

Workstreams let you work on multiple milestone areas concurrently without state collisions. Each workstream gets its own isolated `.planning/` state, so switching between them doesn't clobber progress.

**When to use:** You're working on milestone features that span different concern areas (e.g., backend API and frontend dashboard) and want to plan, execute, or discuss them independently without context bleed.

### Commands

| Command                            | Purpose                                              |
| ---------------------------------- | ---------------------------------------------------- |
| `/gsd-workstreams create <name>`   | Create a new workstream with isolated planning state |
| `/gsd-workstreams switch <name>`   | Switch active context to a different workstream      |
| `/gsd-workstreams list`            | Show all workstreams and which is active             |
| `/gsd-workstreams complete <name>` | Mark a workstream as done and archive its state      |

### How It Works

Each workstream maintains its own `.planning/` directory subtree. When you switch workstreams, GSD swaps the active planning context so that `/gsd-progress`, `/gsd-discuss-phase`, `/gsd-plan-phase`, and other commands operate on that workstream's state. Active context is session-scoped when the runtime exposes a stable session identifier, which prevents one terminal or AI instance from repointing another instance's `STATE.md`.

This is lighter weight than `/gsd-workspace --new` (which creates separate repo worktrees). Workstreams share the same codebase and git history but isolate planning artifacts.
