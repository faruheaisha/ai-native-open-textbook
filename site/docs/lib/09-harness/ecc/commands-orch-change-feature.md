---
title: "/orch-change-feature"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/orch-change-feature.md"
sourceRel: "commands/orch-change-feature.md"
rawUrl: "/raw/09-harness/ecc/commands/orch-change-feature.md"
sourceSha256: "9315a445ddeeb50410e5a3893f930a2db3a19ca14ec5121b3071fe4b834375e8"
pageSha256: "9315a445ddeeb50410e5a3893f930a2db3a19ca14ec5121b3071fe4b834375e8"
contentMode: "local-full"
zh: ""
---

# /orch-change-feature

Manually launch the **orch-change-feature** orchestrator: change behavior that
already works to a new desired spec, tests-first.

## Usage

```
/orch-change-feature <the new desired behavior>
```

Examples:

```
/orch-change-feature make nws-poller alert at 2 warnings instead of 3
/orch-change-feature instead of sorting by date, sort by priority
```

## What It Does

Invoke the `orch-change-feature` skill with `$ARGUMENTS` as the request. The skill
(via the shared `orch-pipeline` engine) will:

1. Classify size (default floor: small) and state the tier.
2. Light plan only if the new behavior needs research. → **GATE 1** (approve changed-test plan).
3. **Update the existing tests** to express the new behavior, then change the
   implementation until green. (Changing the tests first is what makes this a
   tweak, not a fix.)
4. `code-reviewer` (+ `security-reviewer` on a security trigger), then commit. → **GATE 2**.

Use this only when the feature **works** but should behave differently — not for
bugs (`/orch-fix-defect`) or net-new capability (`/orch-add-feature`).

If `$ARGUMENTS` is empty, ask the user what behavior should change.
