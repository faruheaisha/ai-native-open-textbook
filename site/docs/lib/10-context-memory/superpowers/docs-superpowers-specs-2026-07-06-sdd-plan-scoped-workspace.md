---
title: "SDD plan-scoped workspace — design"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/specs/2026-07-06-sdd-plan-scoped-workspace.md"
sourceRel: "docs/superpowers/specs/2026-07-06-sdd-plan-scoped-workspace.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/specs/2026-07-06-sdd-plan-scoped-workspace.md"
sourceSha256: "301328cb8dec833dc35e05e90b4c10a6e67ebd915b33a3a5d34f83927094815d"
pageSha256: "301328cb8dec833dc35e05e90b4c10a6e67ebd915b33a3a5d34f83927094815d"
contentMode: "local-full"
zh: ""
---

# SDD plan-scoped workspace — design

- **Date:** 2026-07-06
- **Status:** approved direction (Jesse, 2026-07-06); this spec captures the investigation's recommended fix
- **Problem owner:** subagent-driven-development skill (`skills/subagent-driven-development/`)

## Problem

SDD's durable-progress workspace (`.superpowers/sdd/`, introduced v6.0.0/v6.0.3) has
no plan identity and no end-of-life. Every artifact is keyed by bare task number
(`progress.md`, `task-N-brief.md`, `task-N-report.md`), and SKILL.md instructs a
starting controller to treat whatever ledger it finds as its own progress:

> At skill start, check for a ledger:
> `cat "$(git rev-parse --show-toplevel)/.superpowers/sdd/progress.md"`. Tasks listed there
> as complete are DONE — do not re-dispatch them; resume at the first task
> not marked complete.

A fresh session executing a **follow-up plan** in the same worktree reads the
previous plan's ledger as its own. A straight-line reading of the skill tells it
to skip tasks. Nothing ever deletes the workspace, so the stale state persists
indefinitely and accumulates.

### Observed failures (serf repo, 2026-06-22 → 2026-07-05)

- **Cross-plan collisions, worked around ad hoc:** `cc-plugin-marketplaces`
  worktree accumulated 68 files across three plans. The P2 controller had to
  invent `progress-p2.md` and `p2-task-N-report.md` to dodge P1's ledger; P2's
  briefs silently overwrote P1's at the default paths; an abandoned
  `progress-p3.md` stub remains.
- **Git contamination, three times over:** SDD scratch was committed and needed
  two cleanup commits (`8305e340d`, `c966261a5`); three artifacts are tracked on
  serf main today, including a report authored on a different machine that now
  materializes in every fresh worktree. A follow-up plan's task-1 report
  overwrote an unrelated tracked one, leaving permanent `git status` noise.
- The self-ignoring `.gitignore` is written only when a script runs. Controllers
  that hand-append the ledger (observed) never create it, and gitignore is
  powerless once a file is tracked.

### Root cause

Identity lives nowhere in the data; correctness relies on cleanup that has no
trigger. Any fix that relies on end-of-plan cleanup alone fails exactly in the
crash/compaction cases the ledger exists to survive. Identity must be
structural.

## Design

### 1. Per-plan workspace directory (structural identity)
