---
title: "/ci:all: Full CI before PR"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ci-all/SKILL.md"
sourceRel: "examples/skills/ci-all/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ci-all/SKILL.md"
sourceSha256: "873b0b1fd6b56f06d2f600e420718351827b431329bbf040203cddbee6b735d9"
pageSha256: "873b0b1fd6b56f06d2f600e420718351827b431329bbf040203cddbee6b735d9"
contentMode: "local-full"
zh: ""
---

# /ci:all: Full CI before PR

Runs everything in order: local tests → type check → push → pipeline URL.

One `/ci:all` replaces: manual tests + git push + copying the pipeline URL.

## Stack detection

```bash
if [ -f "uv.lock" ]; then STACK="python"
elif [ -f "pnpm-lock.yaml" ]; then STACK="node"
elif [ -f "package-lock.json" ]; then STACK="node-npm"
elif [ -f "Cargo.toml" ]; then STACK="rust"
fi
```

## Step 1: Local tests (blocking)

**Python (uv/pytest):**
```bash
uv run pytest --tb=short -q
# Failure → STOP + print failing tests
```

**Node (pnpm/vitest):**
```bash
pnpm vitest run
pnpm tsc --noEmit
# Failure → STOP
```

**Rust:**
```bash
cargo test --quiet 2>&1
```

If `--skip-tests` is passed → skip to step 2.

## Step 2: Push + pipeline

```bash
BRANCH=$(git branch --show-current)

# Verify commits exist to push
AHEAD=$(git rev-list --count origin/$BRANCH..HEAD 2>/dev/null || echo "1")
if [ "$AHEAD" = "0" ]; then
  echo "Branch already up to date on origin."
else
  git push origin "$BRANCH"
fi
```

## Step 3: Pipeline URL

### GitLab CI

```bash
REMOTE=$(git remote get-url origin)
WEB_URL=$(echo "$REMOTE" | sed 's/git@gitlab\.com:/https:\/\/gitlab.com\//' | sed 's/\.git$//')
echo "Pipeline: $WEB_URL/-/pipelines?ref=$BRANCH"

# Optional: live status via glab CLI
if command -v glab &>/dev/null; then
  sleep 3
  glab ci status --branch "$BRANCH" 2>/dev/null || true
fi
```

### GitHub Actions

```bash
REMOTE=$(git remote get-url origin)
WEB_URL=$(echo "$REMOTE" | sed 's/git@github\.com:/https:\/\/github.com\//' | sed 's/\.git$//')
echo "Actions: $WEB_URL/actions?query=branch%3A$BRANCH"

# Optional: live status via gh CLI
if command -v gh &>/dev/null; then
  sleep 5
  gh run list --branch "$BRANCH" --limit 3 2>/dev/null || true
fi
```

## Expected output

```
CI: my-app (Node/Vitest)
──────────────────────────

① Local tests
  ✅ 47 passed in 8.2s

② Type check
  ✅ No errors

③ Push
  ✅ origin/feat/my-feature

④ Pipeline
  🔗 https://gitlab.com/org/my-app/-/pipelines?ref=feat/my-feature

Next step: open a PR with /pr or directly on GitLab/GitHub.
```

If tests fail:
```
CI: my-api (Python/pytest)
────────────────────────────

① Local tests
  ❌ 2 failed

  FAILED tests/test_orders.py::TestOrderService::test_refund_validation
  AssertionError: expected 400, got 500

→ Fix tests before pushing. Pipeline not triggered.
```

## Usage

```
/ci:all
/ci:all --skip-tests    # push without re-running tests
/ci:all --e2e           # include E2E tests (if configured)
```

Target: $ARGUMENTS
