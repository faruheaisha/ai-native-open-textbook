---
title: "CI Commands"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/commands/ci/README.md"
sourceRel: "examples/commands/ci/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/commands/ci/README.md"
sourceSha256: "d6de4bcd7d7653af02c6d7ca6e343b59e499d2c3acb9c3b0f69f4c18b7a7d924"
pageSha256: "d6de4bcd7d7653af02c6d7ca6e343b59e499d2c3acb9c3b0f69f4c18b7a7d924"
contentMode: "local-full"
zh: ""
---

# CI Commands

Slash commands for CI/CD workflows. Auto-detect stack (Python/Node/Rust) and support both GitLab CI and GitHub Actions.

## Commands

| Command | Description |
|---------|-------------|
| `/ci:all` | Full pipeline: tests + type check + push + pipeline URL. The only command you need before a PR. |
| `/ci:tests` | Run the test suite. Auto-detects pytest, vitest, cargo test. |
| `/ci:pipeline` | Push current branch and return the pipeline tracking URL. |
| `/ci:status` | Show current pipeline status for the active branch. |

## Usage pattern

```
# Before every PR:
/ci:all

# Run only tests:
/ci:tests
/ci:tests tests/test_billing.py   # specific file

# Check pipeline after push:
/ci:status
/ci:status 42   # specific MR/PR number

# Push without re-running tests (e.g. doc-only change):
/ci:all --skip-tests
```

## Stack support

| Stack | Test command | Type check |
|-------|-------------|------------|
| Python + uv | `uv run pytest --tb=short -q` | mypy (optional) |
| Node + pnpm | `pnpm vitest run` | `pnpm tsc --noEmit` |
| Node + npm | `npm test` | `npx tsc --noEmit` |
| Rust | `cargo test --quiet` | `cargo clippy` |

## CI platform support

Both commands support **GitLab CI** (via `glab` CLI) and **GitHub Actions** (via `gh` CLI).
If neither CLI is installed, the commands fall back to showing the pipeline URL.
