---
title: "/ci:pipeline: Push and trigger pipeline"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ci-pipeline/SKILL.md"
sourceRel: "examples/skills/ci-pipeline/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ci-pipeline/SKILL.md"
sourceSha256: "2f1bd3cf6d17d5da18728f19366c39343c3497baaba01698c2b92d0420d66f12"
pageSha256: "2f1bd3cf6d17d5da18728f19366c39343c3497baaba01698c2b92d0420d66f12"
contentMode: "local-full"
zh: ""
---

# /ci:pipeline: Push and trigger pipeline

Pushes the current branch and returns the pipeline tracking link.

## Process

```bash
BRANCH=$(git branch --show-current)

# 1. Safety checks
if echo "$BRANCH" | grep -qE "^(main|master|production)$"; then
  echo "❌ Direct push to $BRANCH is not allowed. Create a feature/fix branch."
  exit 1
fi

# 2. Check for uncommitted changes
UNCOMMITTED=$(git status --porcelain | wc -l | tr -d ' ')
if [ "$UNCOMMITTED" -gt 0 ]; then
  echo "⚠️  $UNCOMMITTED uncommitted file(s):"
  git status --short
  echo ""
  echo "Commit first with /commit or git add + git commit"
  exit 0
fi

# 3. Push
echo "Pushing → origin/$BRANCH"
git push origin "$BRANCH" 2>&1
```

## Pipeline URL

### GitLab CI

```bash
REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
WEB_URL=$(echo "$REMOTE" | sed 's/git@gitlab\.com:/https:\/\/gitlab.com\//' | sed 's/\.git$//')
echo ""
echo "✅ Push OK"
echo "   Pipeline: $WEB_URL/-/pipelines?ref=$BRANCH"

# Live status via glab (if installed)
if command -v glab &>/dev/null; then
  sleep 3
  glab ci status --branch "$BRANCH" 2>/dev/null || true
fi
```

### GitHub Actions

```bash
REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
WEB_URL=$(echo "$REMOTE" | sed 's/git@github\.com:/https:\/\/github.com\//' | sed 's/\.git$//')
echo ""
echo "✅ Push OK"
echo "   Actions: $WEB_URL/actions?query=branch%3A$BRANCH"

# Live status via gh (if installed)
if command -v gh &>/dev/null; then
  sleep 5
  gh run list --branch "$BRANCH" --limit 3 2>/dev/null || true
fi
```

## Expected output

```
Pushing → origin/feat/add-payment-retry

Enumerating objects: 12, done.
...

✅ Push OK
   Pipeline: https://gitlab.com/org/my-app/-/pipelines?ref=feat/add-payment-retry

Pipeline status (after 3s):
  ⏳ lint       running
  ⏸️  test       waiting
  ⏸️  deploy     waiting
```

## Usage

```
/ci:pipeline
```

Target: $ARGUMENTS
