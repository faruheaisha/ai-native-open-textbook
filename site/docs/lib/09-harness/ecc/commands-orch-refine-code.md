---
title: "/orch-refine-code"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/orch-refine-code.md"
sourceRel: "commands/orch-refine-code.md"
rawUrl: "/raw/09-harness/ecc/commands/orch-refine-code.md"
sourceSha256: "2f282b49d84b15cfcd5a0c75c31d03f7f30a8ba4936bac1029ad246402d94af8"
pageSha256: "2f282b49d84b15cfcd5a0c75c31d03f7f30a8ba4936bac1029ad246402d94af8"
contentMode: "local-full"
zh: ""
---

# /orch-refine-code

Manually launch the **orch-refine-code** orchestrator: improve structure while
behavior stays identical, with the existing test suite as the safety net.

## Usage

```
/orch-refine-code <what to restructure>
```

Examples:

```
/orch-refine-code extract the NWS HTTP client out of poller.py
/orch-refine-code remove dead code and duplication in the dashboard module
```

## What It Does

Invoke the `orch-refine-code` skill with `$ARGUMENTS` as the request. The skill
(via the shared `orch-pipeline` engine) will:

1. Classify size (default floor: standard — restructures touch multiple files).
2. Confirm the relevant tests exist and are **green before** touching code; add
   characterization tests first if coverage is thin. Plan the restructure. → **GATE 1**.
3. Restructure in small steps, re-running tests after each (no new behavior
   tests — the existing suite proves behavior is unchanged). Dead-code/dup sweeps
   delegate to `refactor-cleaner`.
4. `code-reviewer`, then commit as `refactor:` (the diff must be behavior-neutral). → **GATE 2**.

Use this only when behavior must **not** change. If behavior should change at
all, use `/orch-change-feature` or `/orch-fix-defect`.

If `$ARGUMENTS` is empty, ask the user what to refine.
