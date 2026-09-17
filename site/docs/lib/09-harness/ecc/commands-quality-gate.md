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
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/quality-gate.md"
sourceRel: "commands/quality-gate.md"
rawUrl: "/raw/09-harness/ecc/commands/quality-gate.md"
sourceSha256: "a3ed90f43a1cfc2cf9b85163ed22ddb6102c10f7ad4d02b76b4e2545e3330298"
pageSha256: "a3ed90f43a1cfc2cf9b85163ed22ddb6102c10f7ad4d02b76b4e2545e3330298"
contentMode: "local-full"
zh: ""
---

# Quality Gate Command

Operator entry point for the formatter quality gate that normally runs as the
`post:quality-gate` PostToolUse hook (`scripts/hooks/quality-gate.js`).

## How it actually works

The gate is a single-file formatter check driven by hook input, not CLI flags:

- The script reads the target from the hook's stdin JSON
  (`tool_input.file_path`); it does not take a path argument.
- Behavior toggles are environment variables:
  - `ECC_QUALITY_GATE_FIX=true` - apply formatting fixes instead of check-only
  - `ECC_QUALITY_GATE_STRICT=true` - log formatter failures as gate failures
- Coverage by file type:
  - `.ts/.tsx/.js/.jsx/.json/.md` - Biome `check` or Prettier `--check`,
    whichever the project ships (JS/TS under Biome is skipped here because
    `post-edit-format` already runs `biome check --write`)
  - `.go` - `gofmt`
  - `.py` - `ruff format`
- Lint and type checks are not part of this gate. Use the `verification-loop`
  skill or the language verification skills for lint/type/test pipelines.

## Usage

To run the gate manually against one file, pipe hook-style JSON into the
script (set the env toggles first if you want fix or strict behavior):

```bash
echo '{"tool_input":{"file_path":"src/example.ts"}}' \
  | ECC_QUALITY_GATE_FIX=true node scripts/hooks/quality-gate.js
```

Then report formatter findings and concrete remediation steps.

## Notes

Hook wiring enters through the async PostToolUse dispatcher in
`hooks/hooks.json`. Its internal registry preserves the `post:quality-gate`
ID and the `standard`/`strict` profiles.

## Arguments

$ARGUMENTS:

- `[path]` optional file to check. The script itself takes no CLI
  arguments - when a path is given, substitute it as `tool_input.file_path`
  in the stdin JSON shown above before running the command
