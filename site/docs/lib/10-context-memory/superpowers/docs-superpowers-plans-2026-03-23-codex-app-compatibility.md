---
title: "Codex App Compatibility Implementation Plan"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/README.md"
zh: ""
---

# Codex App Compatibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `using-git-worktrees`, `finishing-a-development-branch`, and related skills work in the Codex App's sandboxed worktree environment without breaking existing behavior.

**Architecture:** Read-only environment detection (`git-dir` vs `git-common-dir`) at the start of two skills. If already in a linked worktree, skip creation. If on detached HEAD, emit a handoff payload instead of the 4-option menu. Sandbox fallback catches permission errors during worktree creation.

**Tech Stack:** Git, Markdown (skill files are instruction documents, not executable code)

**Spec:** `docs/superpowers/specs/2026-03-23-codex-app-compatibility-design.md`

---

## File Structure

| File | Responsibility | Action |
|---|---|---|
| `skills/using-git-worktrees/SKILL.md` | Worktree creation + isolation | Add Step 0 detection + sandbox fallback |
| `skills/finishing-a-development-branch/SKILL.md` | Branch finishing workflow | Add Step 1.5 detection + cleanup guard |
| `skills/subagent-driven-development/SKILL.md` | Plan execution with subagents | Update Integration description |
| `skills/executing-plans/SKILL.md` | Plan execution inline | Update Integration description |
| `skills/using-superpowers/references/codex-tools.md` | Codex platform reference | Add detection + finishing docs |

---

### Task 1: Add Step 0 to `using-git-worktrees`

**Files:**
- Modify: `skills/using-git-worktrees/SKILL.md:14-15` (insert after Overview, before Directory Selection Process)

- [ ] **Step 1: Read the current skill file**

Read `skills/using-git-worktrees/SKILL.md` in full. Identify the exact insertion point: after the "Announce at start" line (line 14) and before "## Directory Selection Process" (line 16).

- [ ] **Step 2: Insert Step 0 section**

Insert the following between the Overview section and "## Directory Selection Process":

```markdown
## Step 0: Check if Already in an Isolated Workspace

Before creating a worktree, check if one already exists:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

**If `GIT_DIR` differs from `GIT_COMMON`:** You are already inside a linked worktree (created by the Codex App, Claude Code's Agent tool, a previous skill run, or the user). Do NOT create another worktree. Instead:

1. Run project setup (auto-detect package manager as in "Run Project Setup" below)
2. Verify clean baseline (run tests as in "Verify Clean Baseline" below)
3. Report with branch state:
   - On a branch: "Already in an isolated workspace at `<path>` on branch `<name>`. Tests passing. Ready to implement."
   - Detached HEAD: "Already in an isolated workspace at `<path>` (detached HEAD, externally managed). Tests passing. Note: branch creation needed at finish time. Ready to implement."

After reporting, STOP. Do not continue to Directory Selection or Creation Steps.

**If `GIT_DIR` equals `GIT_COMMON`:** Proceed with the full worktree creation flow below.

**Sandbox fallback:** If you proceed to Creation Steps but `git worktree add -b` fails with a permission error (e.g., "Operation not permitted"), treat this as a late-detected restricted environment. Fall back to the behavior above — run setup and baseline tests in the current directory, report accordingly, and STOP.
```

- [ ] **Step 3: Verify the insertion**

Read the file again. Confirm:
- Step 0 appears between Overview and Directory Selection Process
- The rest of the file (Directory Selection, Safety Verification, Creation Steps, etc.) is unchanged
- No duplicate sections or broken markdown

- [ ] **Step 4: Commit**

```bash
git add skills/using-git-worktrees/SKILL.md
git commit -m "feat(using-git-worktrees): add Step 0 environment detection (PRI-823)

Skip worktree creation when already in a linked worktree. Includes
sandbox fallback for permission errors on git worktree add."
```

---

### Task 2: Update `using-git-worktrees` Integration section

**Files:**
- Modify: `skills/using-git-worktrees/SKILL.md:211-215` (Integration > Called by)

- [ ] **Step 1: Update the three "Called by" entries**

Change lines 212-214 from:

```markdown
- **brainstorming** (Phase 4) - REQUIRED when design is approved and implementation follows
- **subagent-driven-development** - REQUIRED before executing any tasks
- **executing-plans** - REQUIRED before executing any tasks
```

To:

```markdown
- **brainstorming** - REQUIRED: Ensures isolated workspace (creates one or verifies existing)
- **subagent-driven-development** - REQUIRED: Ensures isolated workspace (creates one or verifies existing)
- **executing-plans** - REQUIRED: Ensures isolated workspace (creates one or verifies existing)
```

- [ ] **Step 2: Verify the Integration section**

Read the Integration section. Confirm all three entries are updated, "Pairs with" is unchanged.

- [ ] **Step 3: Commit**

```bash
git add skills/using-git-worktrees/SKILL.md
git commit -m "docs(using-git-worktrees): update Integration descriptions (PRI-823)

Clarify that skill ensures a workspace exists, not that it always creates one."
```

---

### Task 3: Add Step 1.5 to `finishing-a-development-branch`

**Files:**
- Modify: `skills/finishing-a-development-branch/SKILL.md:38` (insert after Step 1, before Step 2)

- [ ] **Step 1: Read the current skill file**

Read `skills/finishing-a-development-branch/SKILL.md` in full. Identify the insertion point: after "**If tests pass:** Continue to Step 2." (line 38) and before "### Step 2: Determine Base Branch" (line 40).

- [ ] **Step 2: Insert Step 1.5 section**

Insert the following between Step 1 and Step 2:

```markdown
### Step 1.5: Detect Environment

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

**Path A — `GIT_DIR` differs from `GIT_COMMON` AND `BRANCH` is empty (externally managed worktree, detached HEAD):**

First, ensure all work is staged and committed (`git add` + `git commit`).

Then present this to the user (do NOT present the 4-option menu):

```
Implementation complete. All tests passing.
