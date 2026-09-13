---
title: "Worktree Rototill Implementation Plan"
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

# Worktree Rototill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make superpowers defer to native harness worktree systems when available, fall back to manual git worktrees when not, and fix three known finishing bugs.

**Architecture:** Two skill files are rewritten (`using-git-worktrees`, `finishing-a-development-branch`), three files get one-line integration updates (`executing-plans`, `subagent-driven-development`, `writing-plans`). The core change is adding detection (`GIT_DIR != GIT_COMMON`) and a native-tool-first creation path. These are markdown skill instruction files, not application code — "tests" are agent behavior tests using the testing-skills-with-subagents TDD framework.

**Tech Stack:** Markdown (skill files), bash (test scripts), Claude Code CLI (`claude -p` for headless testing)

**Spec:** `docs/superpowers/specs/2026-04-06-worktree-rototill-design.md`

---

### Task 1: GATE — TDD Validation of Step 1a (Native Tool Preference)

Step 1a is the load-bearing assumption of the entire design. If agents don't prefer native worktree tools over `git worktree add`, the spec fails. Validate this FIRST, before touching any skill files.

**Files:**
- Create: `tests/claude-code/test-worktree-native-preference.sh`
- Read: `skills/using-git-worktrees/SKILL.md` (current version, for RED baseline)
- Read: `tests/claude-code/test-helpers.sh` (for `run_claude`, `assert_contains`, etc.)
- Read: `skills/writing-skills/testing-skills-with-subagents.md` (TDD framework)

**This task is a gate.** If the GREEN phase fails after 2 REFACTOR iterations, STOP. Do not proceed to Task 2. Report back — the creation approach needs redesign.

- [ ] **Step 1: Write the RED baseline test script**

Create the test script that will run scenarios both WITHOUT and WITH the updated skill text. The RED phase runs against the current skill (which has no Step 1a).

```bash
#!/usr/bin/env bash
# Test: Does the agent prefer native worktree tools (EnterWorktree) over git worktree add?
# Framework: RED-GREEN-REFACTOR per testing-skills-with-subagents.md
#
# RED:   Current skill has no native tool preference. Agent should use git worktree add.
# GREEN: Updated skill has Step 1a. Agent should use EnterWorktree on Claude Code.

set -euo pipefail
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
source "$SCRIPT_DIR/test-helpers.sh"

# Pressure scenario: realistic implementation task where agent needs isolation
SCENARIO='IMPORTANT: This is a real task. Choose and act.

You need to implement a small feature (add a "version" field to package.json).
This should be done in an isolated workspace to protect the main branch.

You have the using-git-worktrees skill available. Set up the isolated workspace now.
Do NOT actually implement the feature — just set up the workspace and report what you did.

Respond with EXACTLY what tool/command you used to create the workspace.'

echo "=== Worktree Native Preference Test ==="
echo ""

# Phase selection
PHASE="${1:-red}"

if [ "$PHASE" = "red" ]; then
    echo "--- RED PHASE: Running WITHOUT Step 1a (current skill) ---"
    echo "Expected: Agent uses 'git worktree add' (no native tool awareness)"
    echo ""

    test_dir=$(create_test_project)
    cd "$test_dir"
    git init && git commit --allow-empty -m "init"
    mkdir -p .worktrees

    output=$(run_claude "$SCENARIO" 120)

    echo "Agent output:"
    echo "$output"
    echo ""

    # RED expectation: agent uses git worktree add (current behavior)
    if echo "$output" | grep -qi "EnterWorktree"; then
        echo "[UNEXPECTED] Agent used EnterWorktree WITHOUT Step 1a — skill may not be needed"
        echo "Investigate: is Claude Code's default behavior already correct?"
    else
        echo "[RED CONFIRMED] Agent did NOT use EnterWorktree"
        assert_contains "$output" "git worktree" "Agent used git worktree (expected in RED)"
    fi

    cleanup_test_project "$test_dir"

elif [ "$PHASE" = "green" ]; then
    echo "--- GREEN PHASE: Running WITH Step 1a (updated skill) ---"
    echo "Expected: Agent uses EnterWorktree instead of git worktree add"
    echo ""

    test_dir=$(create_test_project)
    cd "$test_dir"
    git init && git commit --allow-empty -m "init"

    output=$(run_claude "$SCENARIO" 120)

    echo "Agent output:"
    echo "$output"
    echo ""

    # GREEN expectation: agent uses EnterWorktree
    assert_contains "$output" "EnterWorktree" "Agent used native EnterWorktree tool"
    assert_not_contains "$output" "git worktree add" "Agent did NOT fall back to git worktree add"

    cleanup_test_project "$test_dir"

elif [ "$PHASE" = "pressure" ]; then
    echo "--- PRESSURE PHASE: Multiple pressures to skip native tools ---"
    echo ""

    PRESSURE_SCENARIO='IMPORTANT: This is a real task. Choose and act.

You need to set up an isolated workspace URGENTLY. Production is impacted and
the fix needs to go in a worktree. You know git worktree add works reliably.
The .worktrees/ directory already exists and is gitignored.

You have the using-git-worktrees skill. Set up the workspace NOW.
Speed matters. Report EXACTLY what tool/command you used.'

    test_dir=$(create_test_project)
    cd "$test_dir"
    git init && git commit --allow-empty -m "init"
    mkdir -p .worktrees
    echo ".worktrees/" >> .gitignore

    output=$(run_claude "$PRESSURE_SCENARIO" 120)

    echo "Agent output:"
    echo "$output"
    echo ""

    # Should STILL use EnterWorktree even under pressure
    assert_contains "$output" "EnterWorktree" "Agent used native tool even under time pressure"
    assert_not_contains "$output" "git worktree add" "Agent resisted falling back to git despite pressure"

    cleanup_test_project "$test_dir"
fi

echo ""
echo "=== Test Complete ==="
```

- [ ] **Step 2: Run RED phase — confirm agent uses git worktree add today**

Run: `cd tests/claude-code && bash test-worktree-native-preference.sh red`

Expected: `[RED CONFIRMED] Agent did NOT use EnterWorktree` — agent uses `git worktree add` because current skill has no native tool preference.

Document the agent's exact output and any rationalizations verbatim. This is the baseline failure the skill must fix.

- [ ] **Step 3: If RED confirmed, proceed. Write the Step 1a skill text.**

Create a temporary test version of the skill with ONLY the Step 1a addition (minimal change to isolate the variable). Add this section to the top of the skill's creation instructions, BEFORE the existing directory selection process:

```markdown
## Step 1: Create Isolated Workspace

**You have two mechanisms. Try them in this order.**

### 1a. Native Worktree Tools (preferred)

If your platform provides a worktree or workspace-isolation tool, use it. You know your own toolkit — the skill does not need to name specific tools. Native tools handle directory placement, branch creation, and cleanup automatically.

After using a native tool, skip to Step 3 (Project Setup).

### 1b. Git Worktree Fallback

If no native tool is available, create a worktree manually using git.
```

- [ ] **Step 4: Run GREEN phase — confirm agent now uses EnterWorktree**

Run: `cd tests/claude-code && bash test-worktree-native-preference.sh green`

Expected: `[PASS] Agent used native EnterWorktree tool`

If FAIL: Document the agent's exact output and rationalizations. This is a REFACTOR signal — the Step 1a text needs revision. Try up to 2 REFACTOR iterations. If still failing after 2 iterations, STOP and report back.

- [ ] **Step 5: Run PRESSURE phase — confirm agent resists fallback under pressure**

Run: `cd tests/claude-code && bash test-worktree-native-preference.sh pressure`

Expected: `[PASS] Agent used native tool even under time pressure`

If FAIL: Document rationalizations verbatim. Add explicit counters to Step 1a text (e.g., a Red Flag entry: "Never use git worktree add when your platform provides a native worktree tool"). Re-run.

- [ ] **Step 6: Commit test script**

```bash
git add tests/claude-code/test-worktree-native-preference.sh
git commit -m "test: add RED/GREEN validation for native worktree preference (PRI-974)

Gate test for Step 1a — validates agents prefer EnterWorktree over
git worktree add on Claude Code. Must pass before skill rewrite."
```

---

### Task 2: Rewrite `using-git-worktrees` SKILL.md

Full rewrite of the creation skill. Replaces the existing file entirely.

**Files:**
- Modify: `skills/using-git-worktrees/SKILL.md` (full rewrite, 219 lines → ~210 lines)

**Depends on:** Task 1 GREEN passing.

- [ ] **Step 1: Write the complete new SKILL.md**

Replace the entire contents of `skills/using-git-worktrees/SKILL.md` with:

```markdown
---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from current workspace or before executing implementation plans - ensures an isolated workspace exists via native tools or git worktree fallback
---

# Using Git Worktrees

## Overview

Ensure work happens in an isolated workspace. Prefer your platform's native worktree tools. Fall back to manual git worktrees only when no native tool is available.

**Core principle:** Detect existing isolation first. Then use native tools. Then fall back to git. Never fight the harness.

**Announce at start:** "I'm using the using-git-worktrees skill to set up an isolated workspace."

## Step 0: Detect Existing Isolation

**Before creating anything, check if you are already in an isolated workspace.**

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

**Submodule guard:** `GIT_DIR != GIT_COMMON` is also true inside git submodules. Before concluding "already in a worktree," verify you are not in a submodule:

```bash
# If this returns a path, you're in a submodule, not a worktree — proceed to Step 1
git rev-parse --show-superproject-working-tree 2>/dev/null
```

**If `GIT_DIR != GIT_COMMON` (and not a submodule):** You are already in a linked worktree. Skip to Step 3 (Project Setup). Do NOT create another worktree.

Report with branch state:
- On a branch: "Already in isolated workspace at `<path>` on branch `<name>`."
- Detached HEAD: "Already in isolated workspace at `<path>` (detached HEAD, externally managed). Branch creation needed at finish time."

**If `GIT_DIR == GIT_COMMON` (or in a submodule):** You are in a normal repo checkout.

Has the user already indicated their worktree preference in your instructions? If not, ask for consent before creating a worktree:

> "Would you like me to set up an isolated worktree? It protects your current branch from changes."

Honor any existing declared preference without asking. If the user declines consent, work in place and skip to Step 3.

## Step 1: Create Isolated Workspace

**You have two mechanisms. Try them in this order.**

### 1a. Native Worktree Tools (preferred)

If your platform provides a worktree or workspace-isolation tool, use it. You know your own toolkit — the skill does not need to name specific tools. Native tools handle directory placement, branch creation, and cleanup automatically.

After using a native tool, skip to Step 3 (Project Setup).

### 1b. Git Worktree Fallback

If no native tool is available, create a worktree manually using git.

#### Directory Selection

Follow this priority order:

1. **Check your instructions for a worktree directory preference.** If specified, use it without asking.

2. **Check existing project-local directories:**
   ```bash
   ls -d .worktrees 2>/dev/null     # Preferred (hidden)
   ls -d worktrees 2>/dev/null      # Alternative
   ```
   If found, use that directory. If both exist, `.worktrees` wins.

3. **Default to `.worktrees/`.**

#### Safety Verification (project-local directories only)

**MUST verify directory is ignored before creating worktree:**

```bash
git check-ignore -q .worktrees 2>/dev/null || git check-ignore -q worktrees 2>/dev/null
```

**If NOT ignored:** Add to .gitignore, commit the change, then proceed.

**Why critical:** Prevents accidentally committing worktree contents to repository.

#### Create the Worktree

```bash
# Determine path based on chosen location
path="$LOCATION/$BRANCH_NAME"

git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

#### Hooks Awareness

Git worktrees do not inherit the parent repo's hooks directory. After creating the worktree, symlink hooks from the main repo if they exist:

```bash
MAIN_ROOT=$(git -C "$(git rev-parse --git-common-dir)/.." rev-parse --show-toplevel)
if [ -d "$MAIN_ROOT/.git/hooks" ]; then
    ln -sf "$MAIN_ROOT/.git/hooks" "$path/.git/hooks"
fi
```

This prevents pre-commit checks, linters, and other hooks from silently stopping when work moves to a worktree.

**Sandbox fallback:** If `git worktree add` fails with a permission error (sandbox denial), treat this as a restricted environment. Skip creation, run setup and baseline tests in the current directory, report accordingly.

## Step 3: Project Setup

Auto-detect and run appropriate setup:

```bash
# Node.js
if [ -f package.json ]; then npm install; fi

# Rust
if [ -f Cargo.toml ]; then cargo build; fi

# Python
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f pyproject.toml ]; then poetry install; fi

# Go
if [ -f go.mod ]; then go mod download; fi
```

## Step 4: Verify Clean Baseline

Run tests to ensure workspace starts clean:

```bash
# Use project-appropriate command
npm test / cargo test / pytest / go test ./...
```

**If tests fail:** Report failures, ask whether to proceed or investigate.

**If tests pass:** Report ready.

### Report

```
