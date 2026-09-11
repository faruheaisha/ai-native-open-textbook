---
title: "AGENTS.md"
sourceId: "09-harness/awesome-harness-engineering-aiboost"
sourceTitle: "Awesome Harness Engineering（ai-boost）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/ai-boost/awesome-harness-engineering"
entryUrl: "https://github.com/ai-boost/awesome-harness-engineering/blob/6015473ad287575fc06d0ddd7835306250a66b9f/README.md"
zh: ""
---

# AGENTS.md

> Project-level instructions for AI agents working in this repository.
> Place this file at the repo root. Agents should read it before starting any task.

## Project overview

## Repository structure

```
src/          # Application code
tests/        # Test suite
docs/         # Documentation
scripts/      # Build and utility scripts
```

## Conventions

### Code style

### Naming

### Testing

```bash
# Run all tests
<command>

# Run a single test file
<command>
```

### Commits

## Tool permissions

Allowed:
- Read and edit files under `src/`, `tests/`, `docs/`
- Run `<test command>`
- Run `<lint/format command>`

Restricted (ask before proceeding):
- Modifying `<critical config files>`
- Running destructive commands (`rm -rf`, database drops, etc.)
- Pushing to `main` or creating releases

Not allowed:
- Modifying CI/CD pipeline configuration without explicit instruction
- Installing new dependencies without explicit instruction

## Known constraints

## Verification gates

Before marking any task complete, the agent must verify:

- [ ] Tests pass (`<command>`)
- [ ] Linter passes (`<command>`)
- [ ] No new warnings introduced
- [ ] Changed files are within the permitted scope above

## Contact / escalation

If the agent cannot proceed without a decision that falls outside its permitted scope, it should stop and describe the blocker clearly rather than making an assumption.
