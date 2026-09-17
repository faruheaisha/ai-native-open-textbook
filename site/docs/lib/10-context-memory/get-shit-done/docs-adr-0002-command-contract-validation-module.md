---
title: "Command Contract Validation Module"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/adr/0002-command-contract-validation-module.md"
sourceRel: "docs/adr/0002-command-contract-validation-module.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/adr/0002-command-contract-validation-module.md"
sourceSha256: "44e89b05a6c98f4906e0a84195f7e746ceeecb5ace838cfbe2c3579856897040"
pageSha256: "44e89b05a6c98f4906e0a84195f7e746ceeecb5ace838cfbe2c3579856897040"
contentMode: "local-full"
zh: ""
---

# Command Contract Validation Module

- **Status:** Accepted
- **Date:** 2026-05-05

We decided to centralize the `commands/gsd/*.md` file contract into a single validation seam enforced at two layers: a fast lint script (`scripts/lint-command-contract.cjs`) that runs as a pre-test CI step, and a behavioral regression test (`tests/command-contract.test.cjs`) that validates the full contract against the live filesystem.

## Decision

The command file contract defines what makes a valid `commands/gsd/*.md`:

- `name:` field present, non-empty, matches `gsd:*` or `gsd-*` (ns- commands use `gsd-`)
- `description:` field present and non-empty
- `allowed-tools:` block present and non-empty, all entries from the canonical tool set
- Every `@`-reference inside `<execution_context>` blocks resolves to an existing file on disk
- `@`-references inside `<execution_context>` blocks appear on their own line (no trailing prose)

## Context

Before this ADR, the command contract was enforced inconsistently:
- `tests/enh-2790-skill-consolidation.test.cjs` checked existence and frontmatter of specific post-consolidation commands
- `tests/bug-3135-capture-backlog-workflow.test.cjs` checked `execution_context` @-ref resolution (added 2026-05-05)
- No test checked `allowed-tools` validity, `name:` convention, or `description:` non-emptiness across all commands simultaneously

This meant any PR touching a command file could break the contract without a single test catching it. The `add-backlog.md` gap (#3135) is a concrete example: the workflow file was missing for the full consolidation cycle before a targeted regression test was written.

Additionally, 40 of 65 command files contained redundant prose @-references — the same path appearing once in `<execution_context>` (which loads the file) and again in `<process>` body text (inert). This added ~900 tokens of dead weight per invocation and created a drift seam where prose refs could go stale independently of the executable `execution_context` ref.

The two largest commands (`debug.md`, `thread.md`) embedded their full implementation inline rather than delegating to workflow files, causing ~4,400 tokens of implementation detail to load as part of the skills index description on every session regardless of whether those commands are used.

## Consequences

- A single `lint-command-contract.cjs` script enforces frontmatter invariants across all 65 commands in milliseconds, runs before the test suite in CI
- `tests/command-contract.test.cjs` replaces the scattered contract coverage in `enh-2790` and `bug-3135`, becoming the authoritative behavioral contract test for the entire command surface
- Redundant prose @-refs removed from 40 command files (~900 tokens/invocation recovered)
- `debug.md` and `thread.md` refactored to the workflow-delegation pattern (~4,400 tokens removed from eager system-prompt load)
- `workflows/extract_learnings.md` renamed to `workflows/extract-learnings.md` to align with the hyphen convention used by all other workflow files
- The `execution_context` block is the single authoritative declaration of what a command loads — no duplication in prose
