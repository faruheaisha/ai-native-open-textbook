---
title: "Git Worktree Setup"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.claude/commands/worktree.md"
sourceRel: ".claude/commands/worktree.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.claude/commands/worktree.md"
sourceSha256: "a2e583973e3b7533171ea99ce799ee270033486954e97f118889865b0c01bdae"
pageSha256: "a2e583973e3b7533171ea99ce799ee270033486954e97f118889865b0c01bdae"
contentMode: "local-full"
zh: ""
---

# Git Worktree Setup

Create an isolated git worktree for a feature or fix branch.

**Note**: This is a documentation-only repo (no node_modules, no type check). Setup is instant.

## Usage

```bash
/worktree feature/pr-9-skill-improvements   # Create worktree from main
/worktree fix/typo-in-guide                 # Fix branch
/worktree feat/new-section --fast           # Skip gitignore check
```

**Naming convention**: Always use `prefix/description` format.
- Branch: `feature/pr-9-skill-improvements`
- Directory: `.worktrees/feature-pr-9-skill-improvements`

## Implementation

Execute this script with branch name from `$ARGUMENTS`:

```bash
#!/bin/bash
set -euo pipefail

# Parse flags
RAW_ARGS="${ARGUMENTS:-}"
BRANCH_NAME="$RAW_ARGS"
SKIP_CHECK=false

if [[ "$RAW_ARGS" == *"--fast"* ]]; then
  SKIP_CHECK=true
  BRANCH_NAME="${BRANCH_NAME// --fast/}"
fi

# Validate branch name
if [ -z "$BRANCH_NAME" ]; then
