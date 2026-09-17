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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/git-worktree/SKILL.md"
sourceRel: "examples/skills/git-worktree/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/git-worktree/SKILL.md"
sourceSha256: "295c61051befeb394957342e23439c077a8b70265bf233ed3220ffc843a76be0"
pageSha256: "295c61051befeb394957342e23439c077a8b70265bf233ed3220ffc843a76be0"
contentMode: "local-full"
zh: ""
---

# Git Worktree Setup

Create isolated git worktrees for feature development without switching branches.

**Core principle:** Smart directory selection + symlink optimization + background verification = fast, reliable isolation.

**Requires:** Git 2.5.0+ (July 2015)

**Companion commands:** [`/git-worktree-status`](/lib/09-harness/claude-code-ultimate-guide/examples-commands-git-worktree-status) | [`/git-worktree-remove`](/lib/09-harness/claude-code-ultimate-guide/examples-commands-git-worktree-remove) | [`/git-worktree-clean`](/lib/09-harness/claude-code-ultimate-guide/examples-commands-git-worktree-clean)

## Process

1. **Validate Branch Name**: Check naming convention and conflicts
2. **Check Existing Directories**: `.worktrees/` or `worktrees/`
3. **Verify .gitignore**: Ensure worktree dir is ignored
4. **Create Worktree**: `git worktree add`
5. **Symlink Dependencies**: Reuse `node_modules/` from main worktree
6. **Detect Database Provider**: Check for DB branching capability
7. **Install Dependencies**: Auto-detect package manager (if not symlinking)
8. **Run Background Verification**: Type check + tests in background
9. **Report Location**: Confirm ready with status

## Flags

| Flag | Effect |
|------|--------|
| `--fast` | Skip dependency install and baseline tests |
| `--isolated` | Fresh `node_modules` install (no symlink) |
| `--skip-install` | Skip dependency install, keep baseline tests |

## Branch Name Validation

```bash
# Auto-prefix based on naming convention
# "auth" → "feat/auth" (default prefix)
# "fix/login-bug" → kept as-is
# "refactor/db-layer" → kept as-is

# Accepted prefixes: feat/, fix/, refactor/, chore/, docs/, test/, perf/
# If no prefix → default to feat/

# Reject invalid characters
echo "$BRANCH_NAME" | grep -qE '^[a-zA-Z0-9/_-]+$' || exit 1

# Check branch doesn't already exist
git show-ref --verify --quiet "refs/heads/$BRANCH_NAME" && echo "Branch already exists" && exit 1
```

## Directory Selection

### Priority Order

```bash
# 1. Check existing directories
ls -d .worktrees 2>/dev/null     # Preferred (hidden)
ls -d worktrees 2>/dev/null      # Alternative

# 2. Check CLAUDE.md for preference
grep -i "worktree.*director" CLAUDE.md 2>/dev/null

# 3. Ask user if neither exists
```

**If both exist:** `.worktrees/` wins.

## Safety Verification

**For project-local directories:**

```bash
# Check if directory in .gitignore
grep -q "^\.worktrees/$" .gitignore || grep -q "^worktrees/$" .gitignore
```

**If NOT in .gitignore:**
1. Add line to .gitignore
2. Commit the change
3. Proceed with worktree creation

**Why critical:** Prevents accidentally committing worktree contents.

## Creation Steps

```bash
# 1. Detect project name
project=$(basename "$(git rev-parse --show-toplevel)")

# 2. Create worktree with new branch
git worktree add .worktrees/$BRANCH_NAME -b $BRANCH_NAME

# 3. Navigate
cd .worktrees/$BRANCH_NAME
```

## Dependency Optimization (Node.js)

**Default behavior:** Symlink `node_modules` from main worktree to avoid duplicate installs (~30s saved).

```bash
# Symlink node_modules (default, unless --isolated)
if [ -d "../../node_modules" ] && [ ! "$ISOLATED" = true ]; then
  ln -s "$(cd ../.. && pwd)/node_modules" node_modules
  echo "Symlinked node_modules from main worktree"
fi

# With --isolated: fresh install
if [ "$ISOLATED" = true ]; then
  pnpm install   # or npm/yarn based on lockfile detection
fi
```

**When to use `--isolated`:**
- Schema changes requiring different package versions
- Testing dependency upgrades
- Debugging `node_modules` issues

## Auto-Detect Setup (Multi-Stack)

```bash
# Node.js (if not symlinked)
if [ -f package.json ] && [ ! -L node_modules ]; then
  pnpm install   # Detect from lockfile: pnpm-lock.yaml / yarn.lock / package-lock.json
fi

# Rust
if [ -f Cargo.toml ]; then cargo build; fi

# Python
if [ -f requirements.txt ]; then pip install -r requirements.txt; fi
if [ -f pyproject.toml ]; then poetry install; fi

# Go
if [ -f go.mod ]; then go mod download; fi
```

## Background Verification

**Instead of blocking on full test suite, run verification in background:**

```bash
# Create log directory
mkdir -p .worktree-logs

# Background type check (Node.js)
if [ -f tsconfig.json ]; then
  npx tsc --noEmit > .worktree-logs/typecheck.log 2>&1 &
  echo "Type check running in background (check with /git-worktree-status)"
fi

# Background test run
if [ -f package.json ]; then
  npx vitest run --reporter=json > .worktree-logs/tests.log 2>&1 &
  echo "Tests running in background (check with /git-worktree-status)"
fi
```

**With `--fast`:** Skip all verification.

## Final Report

```
