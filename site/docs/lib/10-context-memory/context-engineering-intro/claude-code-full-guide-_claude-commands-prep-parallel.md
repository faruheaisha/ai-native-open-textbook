---
title: "Initialize parallel git worktree directories for parallel Claude Code agents"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/claude-code-full-guide/.claude/commands/prep-parallel.md"
sourceRel: "claude-code-full-guide/.claude/commands/prep-parallel.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/claude-code-full-guide/.claude/commands/prep-parallel.md"
sourceSha256: "2b63fed5ab0aa096476c86fa905f75b0451476104905204b811aca1e89707af3"
pageSha256: "2b63fed5ab0aa096476c86fa905f75b0451476104905204b811aca1e89707af3"
contentMode: "local-full"
zh: ""
---

# Initialize parallel git worktree directories for parallel Claude Code agents

## Variables
FEATURE_NAME: $ARGUMENTS
NUMBER_OF_PARALLEL_WORKTREES: $ARGUMENTS

## Execute these commands
> Execute the loop in parallel with the Batch and Task tool

- create a new dir `trees/`
- for i in NUMBER_OF_PARALLEL_WORKTREES
  - RUN `git worktree add -b FEATURE_NAME-i ./trees/FEATURE_NAME-i`
  - RUN `cd trees/FEATURE_NAME-i`, `git ls-files` to validate
- RUN `git worktree list` to verify all trees were created properly
