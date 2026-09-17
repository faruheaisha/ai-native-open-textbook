---
title: "Remove Worktree"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.claude/commands/remove-worktree.md"
sourceRel: ".claude/commands/remove-worktree.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.claude/commands/remove-worktree.md"
sourceSha256: "69f80559fdf63d75e623fc3b1577dc7dec9ccb8b22b9a176876ca77486b89833"
pageSha256: "69f80559fdf63d75e623fc3b1577dc7dec9ccb8b22b9a176876ca77486b89833"
contentMode: "local-full"
zh: ""
---

# Remove Worktree

Remove a specific worktree: directory, git reference, and local branch.

## Usage

```bash
/remove-worktree feature/pr-9-skill-improvements
/remove-worktree fix/typo-in-guide
```

## Implementation

Execute this script with branch name from `$ARGUMENTS`:

```bash
#!/bin/bash
set -euo pipefail

BRANCH_NAME="${ARGUMENTS:-}"

if [ -z "$BRANCH_NAME" ]; then
