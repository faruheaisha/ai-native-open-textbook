---
title: "Codex App Compatibility: Worktree and Finishing Skill Adaptation"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/specs/2026-03-23-codex-app-compatibility-design.md"
sourceRel: "docs/superpowers/specs/2026-03-23-codex-app-compatibility-design.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/specs/2026-03-23-codex-app-compatibility-design.md"
sourceSha256: "f351216f0b8abb5f08a9209d71ec3c218c79b1ba9d6a1c68aec990ef00e31a53"
pageSha256: "f351216f0b8abb5f08a9209d71ec3c218c79b1ba9d6a1c68aec990ef00e31a53"
contentMode: "local-full"
zh: ""
---

# Codex App Compatibility: Worktree and Finishing Skill Adaptation

Make superpowers skills work in the Codex App's sandboxed worktree environment without breaking existing Claude Code or Codex CLI behavior.

**Ticket:** PRI-823

## Motivation

The Codex App runs agents inside git worktrees it manages — detached HEAD, located under `$CODEX_HOME/worktrees/`, with a Seatbelt sandbox that blocks `git checkout -b`, `git push`, and network access. Three superpowers skills assume unrestricted git access: `using-git-worktrees` creates manual worktrees with named branches, `finishing-a-development-branch` merges/pushes/PRs by branch name, and `subagent-driven-development` requires both.

The Codex CLI (open source terminal tool) does NOT have this conflict — it has no built-in worktree management. Our manual worktree approach fills an isolation gap there. The problem is specifically with the Codex App.

## Empirical Findings

Tested in the Codex App on 2026-03-23:

| Operation | workspace-write sandbox | Full access sandbox |
|---|---|---|
| `git add` | Works | Works |
| `git commit` | Works | Works |
| `git checkout -b` | **Blocked** (can't write `.git/refs/heads/`) | Works |
| `git push` | **Blocked** (network + `.git/refs/remotes/`) | Works |
| `gh pr create` | **Blocked** (network) | Works |
| `git status/diff/log` | Works | Works |

Additional findings:
- `spawn_agent` subagents **share** the parent thread's filesystem (confirmed via marker file test)
- "Create branch" button appears in the App header regardless of which branch the worktree was started from
- The App's native finishing flow: Create branch → Commit modal → Commit and push / Commit and create PR
- `network_access = true` config is silently broken on macOS (issue #10390)

## Design: Read-Only Environment Detection

Three read-only git commands detect the environment without side effects:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

Two signals derived:

- **IN_LINKED_WORKTREE:** `GIT_DIR != GIT_COMMON` — the agent is in a worktree created by something else (Codex App, Claude Code Agent tool, previous skill run, or the user)
- **ON_DETACHED_HEAD:** `BRANCH` is empty — no named branch exists

Why `git-dir != git-common-dir` instead of checking `show-toplevel`:
- In a normal repo, both resolve to the same `.git` directory
- In a linked worktree, `git-dir` is `.git/worktrees/<name>` while `git-common-dir` is `.git`
- In a submodule, both are equal — avoiding a false positive that `show-toplevel` would produce
- Resolving via `cd && pwd -P` handles the relative-path problem (`git-common-dir` returns `.git` relative in normal repos but absolute in worktrees) and symlinks (macOS `/tmp` → `/private/tmp`)

### Decision Matrix

| Linked Worktree? | Detached HEAD? | Environment | Action |
|---|---|---|---|
| No | No | Claude Code / Codex CLI / normal git | Full skill behavior (unchanged) |
| Yes | Yes | Codex App worktree (workspace-write) | Skip worktree creation; handoff payload at finish |
| Yes | No | Codex App (Full access) or manual worktree | Skip worktree creation; full finishing flow |
| No | Yes | Unusual (manual detached HEAD) | Create worktree normally; warn at finish |

## Changes

### 1. `using-git-worktrees/SKILL.md` — Add Step 0 (~12 lines)

New section between "Overview" and "Directory Selection Process":

**Step 0: Check if Already in an Isolated Workspace**

Run the detection commands. If `GIT_DIR != GIT_COMMON`, skip worktree creation entirely. Instead:
1. Skip to "Run Project Setup" subsection under Creation Steps — `npm install` etc. is idempotent, worth running for safety
2. Then "Verify Clean Baseline" — run tests
3. Report with branch state:
   - On a branch: "Already in an isolated workspace at `<path>` on branch `<name>`. Tests passing. Ready to implement."
   - Detached HEAD: "Already in an isolated workspace at `<path>` (detached HEAD, externally managed). Tests passing. Note: branch creation needed at finish time. Ready to implement."

If `GIT_DIR == GIT_COMMON`, proceed with the full worktree creation flow (unchanged).

Safety verification (.gitignore check) is skipped when Step 0 fires — irrelevant for externally-created worktrees.

Update the Integration section's "Called by" entries. Change the description on each from context-specific text to: "Ensures isolated workspace (creates one or verifies existing)". For example, the `subagent-driven-development` entry changes from "REQUIRED: Set up isolated workspace before starting" to "REQUIRED: Ensures isolated workspace (creates one or verifies existing)".

**Sandbox fallback:** If `GIT_DIR == GIT_COMMON` and the skill proceeds to Creation Steps, but `git worktree add -b` fails with a permission error (e.g., Seatbelt sandbox denial), treat this as a late-detected restricted environment. Fall back to the Step 0 "already in workspace" behavior — skip creation, run setup and baseline tests in the current directory, report accordingly.

After reporting in Step 0, STOP. Do not continue to Directory Selection or Creation Steps.

**Everything else unchanged:** Directory Selection, Safety Verification, Creation Steps, Project Setup, Baseline Tests, Quick Reference, Common Mistakes, Red Flags.

### 2. `finishing-a-development-branch/SKILL.md` — Add Step 1.5 + cleanup guard (~20 lines)

**Step 1.5: Detect Environment** (after Step 1 "Verify Tests", before Step 2 "Determine Base Branch")

Run the detection commands. Three paths:

- **Path A** skips Steps 2 and 3 entirely (no base branch or options needed).
- **Paths B and C** proceed through Step 2 (Determine Base Branch) and Step 3 (Present Options) as normal.

**Path A — Externally managed worktree + detached HEAD** (`GIT_DIR != GIT_COMMON` AND `BRANCH` empty):

First, ensure all work is staged and committed (`git add` + `git commit`). The Codex App's finishing controls operate on committed work.

Then present this to the user (do NOT present the 4-option menu):

```
Implementation complete. All tests passing.
