---
title: "Loop Status Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/loop-status.md"
sourceRel: ".opencode/commands/loop-status.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/loop-status.md"
sourceSha256: "24181d1392154e6b7a3aedd1691e021a43de2a9c0969074accfff7ccb800967e"
pageSha256: "24181d1392154e6b7a3aedd1691e021a43de2a9c0969074accfff7ccb800967e"
contentMode: "local-full"
zh: ""
---

# Loop Status Command

Inspect active loop state, progress, and failure signals.

## Usage

`/loop-status [--watch]`

## What to Report

- active loop pattern
- current phase and last successful checkpoint
- failing checks (if any)
- estimated time/cost drift
- recommended intervention (continue/pause/stop)

## Watch Mode

When `--watch` is present, refresh status periodically and surface state changes.

## Arguments

$ARGUMENTS:
- `--watch` optional
