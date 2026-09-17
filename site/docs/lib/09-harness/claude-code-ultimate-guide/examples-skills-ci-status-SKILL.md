---
title: "/ci:status: Pipeline status"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ci-status/SKILL.md"
sourceRel: "examples/skills/ci-status/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ci-status/SKILL.md"
sourceSha256: "7ca1a937b406da9bd8894c3d887e56fa658148da0048172c1d84d1e48cc0fbd5"
pageSha256: "7ca1a937b406da9bd8894c3d887e56fa658148da0048172c1d84d1e48cc0fbd5"
contentMode: "local-full"
zh: ""
---

# /ci:status: Pipeline status

Quick snapshot of the CI pipeline on the current branch.

## Process

```bash
# 1. Current branch
BRANCH=$(git branch --show-current)
echo "Branch: $BRANCH"

# 2. Last commits
git log -3 --oneline
```

## GitLab CI

```bash
# With glab CLI (recommended)
if command -v glab &>/dev/null; then
  glab ci status --branch "$BRANCH"
else
  # Fallback: show URL
  REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
  if [ -n "$REMOTE" ]; then
    WEB_URL=$(echo "$REMOTE" | sed 's/git@gitlab\.com:/https:\/\/gitlab.com\//' | sed 's/\.git$//')
    echo "Pipeline: $WEB_URL/-/pipelines?ref=$BRANCH"
  fi
fi

# If MR number provided
if [ -n "$ARGUMENTS" ] && command -v glab &>/dev/null; then
  glab mr view "$ARGUMENTS"
fi
```

## GitHub Actions

```bash
# With gh CLI (recommended)
if command -v gh &>/dev/null; then
  gh run list --branch "$BRANCH" --limit 5
else
  # Fallback: show URL
  REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
  if [ -n "$REMOTE" ]; then
    WEB_URL=$(echo "$REMOTE" | sed 's/git@github\.com:/https:\/\/github.com\//' | sed 's/\.git$//')
    echo "Actions: $WEB_URL/actions?query=branch%3A$BRANCH"
  fi
fi

# If PR number provided
if [ -n "$ARGUMENTS" ] && command -v gh &>/dev/null; then
  gh pr checks "$ARGUMENTS"
fi
```

## Expected output

```
Branch: feat/add-payment-retry

Last commits:
  a1b2c3d feat(payments): add retry logic with exponential backoff
  e4f5g6h test(payments): add Vitest coverage on retry scenarios
  i7j8k9l chore: update pnpm lockfile

Pipeline: running
  ✅ lint          30s
  ✅ typecheck     45s
  ⏳ test          running...
  ⏸️  deploy        waiting

URL: https://gitlab.com/org/my-app/-/pipelines?ref=feat/add-payment-retry
```

## Usage

```
/ci:status
/ci:status 42    # MR or PR number 42
```

Target: $ARGUMENTS
