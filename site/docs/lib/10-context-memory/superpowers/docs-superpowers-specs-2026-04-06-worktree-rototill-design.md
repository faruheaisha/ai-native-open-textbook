---
title: "Worktree Rototill: Detect-and-Defer"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/specs/2026-04-06-worktree-rototill-design.md"
sourceRel: "docs/superpowers/specs/2026-04-06-worktree-rototill-design.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/specs/2026-04-06-worktree-rototill-design.md"
sourceSha256: "757ce61bbcd16dcb8f61fa69778ca7a3b1d26f7a11a0fcea3d302fd99a52ebae"
pageSha256: "757ce61bbcd16dcb8f61fa69778ca7a3b1d26f7a11a0fcea3d302fd99a52ebae"
contentMode: "local-full"
zh: ""
---

# Worktree Rototill: Detect-and-Defer

**Date:** 2026-04-06
**Status:** Draft
**Ticket:** PRI-974
**Subsumes:** PRI-823 (Codex App compatibility)

## Problem

Superpowers is opinionated about worktree management — specific paths (`.worktrees/<branch>`), specific commands (`git worktree add`), specific cleanup (`git worktree remove`). Meanwhile, Claude Code, Codex App, Gemini CLI, and Cursor all provide native worktree support with their own paths, lifecycle management, and cleanup.

This creates three failure modes:

1. **Duplication** — on Claude Code, the skill does what `EnterWorktree`/`ExitWorktree` already does
2. **Conflict** — on Codex App, the skill tries to create worktrees inside an already-managed worktree
3. **Phantom state** — skill-created worktrees at `.worktrees/` are invisible to the harness; harness-created worktrees at `.claude/worktrees/` are invisible to the skill

For harnesses without native support (Codex CLI, OpenCode, Copilot standalone), superpowers fills a real gap. The skill shouldn't go away — it should get out of the way when native support exists.

## Goals

1. Defer to native harness worktree systems when they exist
2. Continue providing worktree support for harnesses that lack it
3. Fix three known bugs in finishing-a-development-branch (#940, #999, #238)
4. Make worktree creation opt-in rather than mandatory (#991)
5. Replace hardcoded `CLAUDE.md` references with platform-neutral language (#1049)

## Non-Goals

- Per-worktree environment conventions (`.worktree-env.sh`, port offsetting) — Phase 4
- PreToolUse hooks for path enforcement — Phase 4
- Multi-repo worktree documentation — Phase 4
- Brainstorming checklist changes for worktrees — Phase 4
- `.superpowers-session.json` metadata tracking (interesting PR #997 idea, not needed for v1)
- Hooks symlinking into worktrees (PR #965 idea, separate concern)

## Design Principles

### Detect state, not platform

Use `GIT_DIR != GIT_COMMON` to determine "am I already in a worktree?" rather than sniffing environment variables to identify the harness. This is a stable git primitive (since git 2.5, 2015), works universally across all harnesses, and requires zero maintenance as new harnesses appear.

### Declarative intent, prescriptive fallback

The skill describes the goal ("ensure work happens in an isolated workspace") and defers to native tools when available. It prescribes specific git commands only as a fallback for harnesses without native worktree support. Step 1a comes first and names native tools explicitly (`EnterWorktree`, `WorktreeCreate`, `/worktree`, `--worktree`); Step 1b comes second with the git fallback. The original spec kept Step 1a abstract ("you know your own toolkit"), but TDD proved that agents anchor on Step 1b's concrete commands when Step 1a is too vague. Explicit tool naming and a consent-authorization bridge were required to make the preference reliable.

### Provenance-based ownership

Whoever creates the worktree owns its cleanup. If the harness created it, superpowers doesn't touch it. If superpowers created it (via git fallback), superpowers cleans it up. The heuristic: if the worktree lives under `.worktrees/` or `worktrees/`, superpowers owns it. Anything else (`.claude/worktrees/`, `~/.codex/worktrees/`, `.gemini/worktrees/`, or old user-global Superpowers paths) belongs to the harness or user and is left alone.

## Design

### 1. `using-git-worktrees` SKILL.md Rewrite

The skill gains three new steps before creation and simplifies the creation flow.

#### Step 0: Detect Existing Isolation

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
BRANCH=$(git branch --show-current)
```

Three outcomes:

| Condition | Meaning | Action |
|-----------|---------|--------|
| `GIT_DIR == GIT_COMMON` | Normal repo checkout | Proceed to Step 0.5 |
| `GIT_DIR != GIT_COMMON`, named branch | Already in a linked worktree | Skip to Step 3 (project setup). Report: "Already in isolated workspace at `<path>` on branch `<name>`." |
| `GIT_DIR != GIT_COMMON`, detached HEAD | Externally managed worktree (e.g., Codex App sandbox) | Skip to Step 3. Report: "Already in isolated workspace at `<path>` (detached HEAD, externally managed)." |

Step 0 does not care who created the worktree or which harness is running. A worktree is a worktree regardless of origin.

**Submodule guard:** `GIT_DIR != GIT_COMMON` is also true inside git submodules. Before concluding "already in a worktree," check that we're not in a submodule:

```bash
# If this returns a path, we're in a submodule, not a worktree
git rev-parse --show-superproject-working-tree 2>/dev/null
```

If in a submodule, treat as `GIT_DIR == GIT_COMMON` (proceed to Step 0.5).

#### Step 0.5: Consent

When Step 0 finds no existing isolation (`GIT_DIR == GIT_COMMON`), ask before creating:

> "Would you like me to set up an isolated worktree? This protects your current branch from changes. (y/n)"

If yes, proceed to Step 1. If no, work in place — skip to Step 3 with no worktree.

This step is skipped entirely when Step 0 detects existing isolation (no point asking about what already exists).

#### Step 1a: Native Tools (preferred)

> The user has asked for an isolated workspace (Step 0 consent). Check your available tools — do you have `EnterWorktree`, `WorktreeCreate`, a `/worktree` command, or a `--worktree` flag? If YES: the user's consent to create a worktree is your authorization to use it. Use it now and skip to Step 3.

After using a native tool, skip to Step 3 (project setup).

**Design note — TDD revision:** The original spec used a deliberately short, abstract Step 1a ("You know your own toolkit — the skill does not need to name specific tools"). TDD validation disproved this: agents anchored on Step 1b's concrete git commands and ignored the abstract guidance (2/6 pass rate). Three changes fixed it (50/50 pass rate across GREEN and PRESSURE tests):

1. **Explicit tool naming** — listing `EnterWorktree`, `WorktreeCreate`, `/worktree`, `--worktree` by name transforms the decision from interpretation ("do I have a native tool?") into factual lookup ("is `EnterWorktree` in my tool list?"). Agents on platforms without these tools simply check, find nothing, and fall through to Step 1b. No false positives observed.
2. **Consent bridge** — "the user's consent to create a worktree is your authorization to use it" directly addresses `EnterWorktree`'s tool-level guardrail ("ONLY when user explicitly asks"). Tool descriptions override skill instructions (Claude Code #29950), so the skill must frame user consent as the authorization the tool requires.
3. **Red Flag entry** — naming the specific anti-pattern ("Use `git worktree add` when you have a native worktree tool — this is the #1 mistake") in the Red Flags section.

File splitting (Step 1b in a separate skill) was tested and proven unnecessary. The anchoring problem is solved by the quality of Step 1a's text, not by physical separation of git commands. Control tests with the full 240-line skill (all git commands visible) passed 20/20.

#### Step 1b: Git Worktree Fallback

When no native tool is available, create a worktree manually.

**Directory selection** (priority order):
1. Check the project's agent instruction file (CLAUDE.md, GEMINI.md, AGENTS.md, .cursorrules, or equivalent) for a worktree directory preference.
2. Check for existing `.worktrees/` or `worktrees/` directory — if found, use it. If both exist, `.worktrees/` wins.
3. Default to `.worktrees/`.

No interactive directory selection prompt. Old user-global Superpowers worktree paths are not detected or offered; new manual worktrees are project-local unless the user explicitly specifies another location.

**Safety verification** (project-local directories only):

```bash
git check-ignore -q .worktrees 2>/dev/null
```

If not ignored, add to `.gitignore` and commit before proceeding.

**Create:**

```bash
git worktree add "$path" -b "$BRANCH_NAME"
cd "$path"
```

**Hooks awareness:** Git worktrees do not inherit the parent repo's hooks directory. After creating a worktree via 1b, symlink the hooks directory from the main repo if one exists:

```bash
if [ -d "$MAIN_ROOT/.git/hooks" ]; then
    ln -sf "$MAIN_ROOT/.git/hooks" "$path/.git/hooks"
fi
```

This prevents pre-commit checks, linters, and other hooks from silently stopping when work moves to a worktree. (Idea from PR #965.)

**Sandbox fallback:** If `git worktree add` fails with a permission error, treat as a restricted environment. Skip creation, work in current directory, proceed to Step 3.

**Step numbering note:** The current skill has Steps 1-4 as a flat list. This redesign uses 0, 0.5, 1a, 1b, 3, 4. There is no Step 2 — it was the old monolithic "Create Isolated Workspace" which is now split into the 1a/1b structure. The implementation should renumber cleanly (e.g., 0 → "Step 0: Detect", 0.5 → within Step 0's flow, 1a/1b → "Step 1", 3 → "Step 2", 4 → "Step 3") or keep the current numbering with a note. Implementer's choice.

#### Steps 3-4: Project Setup and Baseline Tests (unchanged)

Regardless of which path created the workspace (Step 0 detected existing, Step 1a native tool, Step 1b git fallback, or no worktree at all), execution converges:

- **Step 3:** Auto-detect and run project setup (`npm install`, `cargo build`, `pip install`, `go mod download`, etc.)
- **Step 4:** Run the test suite. If tests fail, report failures and ask whether to proceed.

### 2. `finishing-a-development-branch` SKILL.md Rewrite

The finishing skill gains environment detection and fixes three bugs.

#### Step 1: Verify Tests (unchanged)

Run the project's test suite. If tests fail, stop. Don't offer completion options.

#### Step 1.5: Detect Environment (new)

Re-run the same detection as Step 0 in creation:

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
```

Three paths:

| State | Menu | Cleanup |
|-------|------|---------|
| `GIT_DIR == GIT_COMMON` (normal repo) | Standard 4 options | No worktree to clean up |
| `GIT_DIR != GIT_COMMON`, named branch | Standard 4 options | Provenance-based (see Step 5) |
| `GIT_DIR != GIT_COMMON`, detached HEAD | Reduced menu: push as new branch + PR, keep as-is, discard | No merge options (can't merge from detached HEAD) |

#### Step 2: Determine Base Branch (unchanged)

#### Step 3: Present Options

**Normal repo and named-branch worktree:**
