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
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/loop-start.md"
sourceRel: "commands/loop-start.md"
rawUrl: "/raw/09-harness/ecc/commands/loop-start.md"
sourceSha256: "fa36f7396f07e70e9110e9f5920f9229aa87d7f0a122190b3d85d031aa3bc29e"
pageSha256: "fa36f7396f07e70e9110e9f5920f9229aa87d7f0a122190b3d85d031aa3bc29e"
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
