---
title: "Tools Regression Tests"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/_shared/vally/tools/tests/README.md"
sourceRel: "tests/scenarios/_shared/vally/tools/tests/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/_shared/vally/tools/tests/README.md"
sourceSha256: "d767a4850c0302adda853d98815032b3af8545dafb6c96bd563400a1fef5b260"
pageSha256: "d767a4850c0302adda853d98815032b3af8545dafb6c96bd563400a1fef5b260"
contentMode: "local-full"
zh: ""
---

# Tools Regression Tests

This directory contains integration tests for every script in `tools/`.

## What Is Covered

- `check-async-runtime.rs`
- `check-token-credential.rs`
- `check-no-secrets.rs`
- `check-azure-crates.rs` (including semver-compatible latest-version checks)

## Run

From the repository root:

```powershell
node tests/scenarios/_shared/vally/tools/tests/run-tools-tests.mjs
```

## Notes

- The `check-azure-crates.rs` tests call crates.io to get current latest Azure crate versions.
- The suite is fixture-based for deterministic pass/fail scenarios across the other tools.
