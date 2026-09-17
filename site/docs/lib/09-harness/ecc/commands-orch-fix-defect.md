---
title: "/orch-fix-defect"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/orch-fix-defect.md"
sourceRel: "commands/orch-fix-defect.md"
rawUrl: "/raw/09-harness/ecc/commands/orch-fix-defect.md"
sourceSha256: "9f1269a9103f49425fa24303b82846a170093e2ddf32d95b4dc12b14690652a0"
pageSha256: "9f1269a9103f49425fa24303b82846a170093e2ddf32d95b4dc12b14690652a0"
contentMode: "local-full"
zh: ""
---

# /orch-fix-defect

Manually launch the **orch-fix-defect** orchestrator: prove the bug with a red
test, then fix to green.

## Usage

```
/orch-fix-defect <what is broken>
```

Examples:

```
/orch-fix-defect poller crashes on empty NWS response
/orch-fix-defect login returns 500 when email has a plus sign
```

## What It Does

Invoke the `orch-fix-defect` skill with `$ARGUMENTS` as the request. The skill
(via the shared `orch-pipeline` engine) will:

1. Classify size (default floor: small, often trivial); scope root cause with
   `code-explorer` if unclear.
2. **Write a new failing regression test** reproducing the bug, then fix until
   it goes green. (Proving the bug first is what makes this a fix, not a tweak.)
3. `code-reviewer` (+ `security-reviewer` if the defect sits in a sensitive path).
4. Commit as a conventional `fix:` commit. → **GATE 2** (confirm before commit).

Use this only when behavior is **broken/wrong** — not for intentional changes
(`/orch-change-feature`) or new capability (`/orch-add-feature`).

If `$ARGUMENTS` is empty, ask the user to describe the defect.
