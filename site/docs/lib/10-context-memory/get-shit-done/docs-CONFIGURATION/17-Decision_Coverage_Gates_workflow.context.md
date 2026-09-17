---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "361206e61884037abe5a9a555d513f62ab14c219046c792d02dd69dd5a663a07"
contentMode: "local-full"
zh: ""
---

## Decision Coverage Gates (`workflow.context_coverage_gate`)

When `discuss-phase` writes implementation decisions into CONTEXT.md
`<decisions>`, two gates ensure those decisions survive the trip into
plans and shipped code (issue #2492).

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `workflow.context_coverage_gate` | boolean | `true` | Toggle for both decision-coverage gates. When `false`, both the plan-phase translation gate and the verify-phase validation gate skip silently. |

### What the gates do

**Plan-phase translation gate (BLOCKING).** Runs immediately after the
existing requirements coverage gate, before plans are committed. For each
trackable decision in `<decisions>`, it checks that the decision id
(`D-NN`) or its text appears in at least one plan's `must_haves`,
`truths`, or body. A miss surfaces the missing decision by id and refuses
to mark the phase planned.

**Verify-phase validation gate (NON-BLOCKING).** Runs alongside the other
verify steps. Searches every shipped artifact (PLAN.md, SUMMARY.md, files
modified, recent commit subjects) for each trackable decision. Misses are
written to VERIFICATION.md as a warning section but do **not** flip the
overall verification status. The asymmetry is deliberate — by verify time
the work is done, and a fuzzy substring miss should not fail an otherwise
green phase.

### How to write decisions the gates accept

The discuss-phase template already produces `D-NN`-numbered decisions.
The gate is happiest when:

1. Every plan that implements a decision **cites the id** somewhere —
   `must_haves.truths: ["D-12: bit offsets exposed"]` or a `D-12:` mention
   in the plan body. Strict id match is the cheapest, deterministic path.
2. Soft phrase matching is a fallback for paraphrases — if a 6+-word slice
   of the decision text appears verbatim in a plan/summary, it counts.

### Opt-outs

A decision is **not** subject to the gates when any of the following
apply:

- It lives under the `### Claude's Discretion` heading inside `<decisions>`.
- It is tagged `[informational]`, `[folded]`, or `[deferred]` in its
  bullet (e.g., `- **D-08 [informational]:** Naming style for internal
  helpers`).

Use these escape hatches when a decision genuinely doesn't need plan
coverage — implementation discretion, future ideas captured for the
record, or items already deferred to a later phase.
