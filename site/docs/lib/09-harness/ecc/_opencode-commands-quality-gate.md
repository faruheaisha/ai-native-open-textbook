---
title: "Quality Gate Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/quality-gate.md"
sourceRel: ".opencode/commands/quality-gate.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/quality-gate.md"
sourceSha256: "826bbb000043b1401fb8c73cff9cace55cfd38d7f6c7b006efbd43c8ce9cb754"
pageSha256: "826bbb000043b1401fb8c73cff9cace55cfd38d7f6c7b006efbd43c8ce9cb754"
contentMode: "local-full"
zh: ""
---

# Quality Gate Command

Run the ECC quality pipeline on demand for a file or project scope.

## Usage

`/quality-gate [path|.] [--fix] [--strict]`

- default target: current directory (`.`)
- `--fix`: allow auto-format/fix where configured
- `--strict`: fail on warnings where supported

## Pipeline

1. Detect language/tooling for target.
2. Run formatter checks.
3. Run lint/type checks when available.
4. Produce a concise remediation list.

## Notes

This command mirrors hook behavior but is operator-invoked.

## Arguments

$ARGUMENTS:
- `[path|.]` optional target path
- `--fix` optional
- `--strict` optional
