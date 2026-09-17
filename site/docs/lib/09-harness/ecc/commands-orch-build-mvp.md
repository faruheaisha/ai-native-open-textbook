---
title: "/orch-build-mvp"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/orch-build-mvp.md"
sourceRel: "commands/orch-build-mvp.md"
rawUrl: "/raw/09-harness/ecc/commands/orch-build-mvp.md"
sourceSha256: "2180c00649cd6c73e2e1a204f0039b317c192e9ca4dbb69d1cfae88aa23543b5"
pageSha256: "2180c00649cd6c73e2e1a204f0039b317c192e9ca4dbb69d1cfae88aa23543b5"
contentMode: "local-full"
zh: ""
---

# /orch-build-mvp

Manually launch the **orch-build-mvp** orchestrator: turn an SDD/PRD/system-design
document into a running vertical slice.

## Usage

```
/orch-build-mvp <path to design/spec doc>
```

Examples:

```
/orch-build-mvp civicpulse/docs/SDD-v0.6.md
```

## What It Does

Invoke the `orch-build-mvp` skill with `$ARGUMENTS` as the doc path. The skill
(via the shared `orch-pipeline` engine, full pipeline incl. Scaffold) will:

1. Read the spec; extract scope, locked decisions, and a feature list ordered as
**thin vertical slices** (one end-to-end path first). → **GATE 1** (approve slice plan).
2. Scaffold the first end-to-end slice.
3. Reuse the GAN harness: translate the SDD into `gan-harness/spec.md` +
   `eval-rubric.md`, then drive `/gan-build "<brief>" --skip-planner`
   (generator → evaluator loop) until the score passes or plateaus.
4. `code-reviewer` (+ `security-reviewer` on any security-trigger slice), then
   commit the scaffold and each slice as separate `feat:` commits. → **GATE 2**.

If `$ARGUMENTS` is empty, ask the user for the path to the design/spec doc.
