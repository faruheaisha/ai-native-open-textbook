---
title: "Plan-PRD Pattern: Markdown-Staged Planning Flow"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/PLAN-PRD-PATTERN.md"
sourceRel: "docs/PLAN-PRD-PATTERN.md"
rawUrl: "/raw/09-harness/ecc/docs/PLAN-PRD-PATTERN.md"
sourceSha256: "b090c665bcfd989cb9547e641cd4284f4bf294f2a9ea94a95548b69461cbc290"
pageSha256: "b090c665bcfd989cb9547e641cd4284f4bf294f2a9ea94a95548b69461cbc290"
contentMode: "local-full"
zh: ""
---

# Plan-PRD Pattern: Markdown-Staged Planning Flow

A lightweight, SDLC-aligned planning workflow where each phase of the lifecycle produces a committable markdown **staging file** that the next command consumes.

> Short version: `/plan-prd` writes a PRD, `/plan` writes a plan, the `tdd-workflow` skill implements it, and `/pr` ships it. Each arrow is a file on disk, not a conversation in memory.

## Feature: Markdown Staging Files

Every planning artifact is a plain `.md` file under `.claude/`:

```
.claude/
  prds/      # Product Requirements Documents from /plan-prd
  plans/     # Implementation plans from /plan
  reviews/   # Code review artifacts from /code-review
```

These files are:

- **Plain markdown** — readable by humans, diffable in PRs, grep-able at CLI.
- **Committable** — check them in alongside code so the intent travels with the implementation.
- **Composable** — each command accepts the previous stage's file as its `$ARGUMENTS`, so the toolchain composes via paths rather than in-context state.
- **Resumable** — close the session, open a new one tomorrow, pass the file path back in.

## Flow

```
┌───────────────────────────┐
│ /plan-prd "<idea>"        │  Requirements phase
│  → .claude/prds/X.prd.md  │   Problem · Users · Hypothesis · Scope
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
