---
title: "Loop Start Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/loop-start.md"
sourceRel: ".opencode/commands/loop-start.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/loop-start.md"
sourceSha256: "3ad109a9f69cfd2ae041d3fe09aff963e00ba0a63408a1fa5fb2ff408085d69b"
pageSha256: "3ad109a9f69cfd2ae041d3fe09aff963e00ba0a63408a1fa5fb2ff408085d69b"
contentMode: "local-full"
zh: ""
---

# Loop Start Command

Start a managed autonomous loop pattern with safety defaults.

## Usage

`/loop-start [pattern] [--mode safe|fast]`

- `pattern`: `sequential`, `continuous-pr`, `rfc-dag`, `infinite`
- `--mode`:
  - `safe` (default): strict quality gates and checkpoints
  - `fast`: reduced gates for speed

## Flow

1. Confirm repository state and branch strategy.
2. Select loop pattern and model tier strategy.
3. Enable required hooks/profile for the chosen mode.
4. Create loop plan and write runbook under `.claude/plans/`.
5. Print commands to start and monitor the loop.

## Required Safety Checks

- Verify tests pass before first loop iteration.
- Ensure `ECC_HOOK_PROFILE` is not disabled globally.
- Ensure loop has explicit stop condition.

## Arguments

$ARGUMENTS:
- `<pattern>` optional (`sequential|continuous-pr|rfc-dag|infinite`)
- `--mode safe|fast` optional
