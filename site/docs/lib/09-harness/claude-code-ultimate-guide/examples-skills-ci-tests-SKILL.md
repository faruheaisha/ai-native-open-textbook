---
title: "/ci:tests: Run tests"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/ci-tests/SKILL.md"
sourceRel: "examples/skills/ci-tests/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/ci-tests/SKILL.md"
sourceSha256: "98b968840d2ca3755274dfab0f8bfcb6d705e64802cd84a8c0eb027e634426d5"
pageSha256: "98b968840d2ca3755274dfab0f8bfcb6d705e64802cd84a8c0eb027e634426d5"
contentMode: "local-full"
zh: ""
---

# /ci:tests: Run tests

Detects the stack and runs tests with the right command.

## Stack detection

```bash
if [ -f "uv.lock" ]; then
  STACK="python"
elif [ -f "pnpm-lock.yaml" ] || [ -f "package.json" ]; then
  STACK="node"
elif [ -f "Cargo.toml" ]; then
  STACK="rust"
else
  STACK="unknown"
fi
```

## Commands by stack

### Python (uv + pytest)

```bash
# All tests
uv run pytest --tb=short -q $ARGUMENTS

# With coverage
uv run pytest --cov=src --cov-report=term-missing -q

# Specific file or folder
uv run pytest $ARGUMENTS -v
```

### Node (pnpm + vitest)

```bash
# All tests
pnpm vitest run $ARGUMENTS

# With coverage
pnpm vitest run --coverage

# Watch mode (dev)
pnpm vitest
```

### Node (npm + jest)

```bash
npm test -- --passWithNoTests $ARGUMENTS
```

### Rust (cargo)

```bash
cargo test --quiet $ARGUMENTS 2>&1
```

## Expected output

```
Tests: my-api (Python/pytest)
───────────────────────────────

uv run pytest --tb=short -q

[pytest output]

✅ 42 passed in 3.1s  →  Ready to push
```

On failure:
```
❌ 2 failed

FAILED tests/test_billing.py::TestInvoice::test_promo_expired
AssertionError: expected discount=0, got discount=10

→ Fix before pushing.
```

## Usage

```
/ci:tests
/ci:tests tests/test_orders.py
/ci:tests src/components/Button.test.tsx
```

Target: $ARGUMENTS
