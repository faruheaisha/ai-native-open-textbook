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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "665e30707eba6cf8d2782a525f28503d3cfbb034a0d039749b06b73277ef3433"
contentMode: "local-full"
zh: ""
---

## Workflow Diagrams

### Full Project Lifecycle

```
  ┌──────────────────────────────────────────────────┐
  │                   NEW PROJECT                    │
  │  /gsd-new-project                                │
  │  Questions -> Research -> Requirements -> Roadmap│
  └─────────────────────────┬────────────────────────┘
                            │
             ┌──────────────▼─────────────┐
             │      FOR EACH PHASE:       │
             │                            │
             │  ┌────────────────────┐    │
             │  │ /gsd-discuss-phase │    │  <- Lock in preferences
             │  └──────────┬─────────┘    │
             │             │              │
             │  ┌──────────▼─────────┐    │
             │  │ /gsd-ui-phase      │    │  <- Design contract (frontend)
             │  └──────────┬─────────┘    │
             │             │              │
             │  ┌──────────▼─────────┐    │
             │  │ /gsd-plan-phase    │    │  <- Research + Plan + Verify
             │  └──────────┬─────────┘    │
             │             │              │
             │  ┌──────────▼─────────┐    │
             │  │ /gsd-execute-phase │    │  <- Parallel execution
             │  └──────────┬─────────┘    │
             │             │              │
             │  ┌──────────▼─────────┐    │
             │  │ /gsd-verify-work   │    │  <- Manual UAT
             │  └──────────┬─────────┘    │
             │             │              │
             │  ┌──────────▼─────────┐    │
             │  │ /gsd-ship          │    │  <- Create PR (optional)
             │  └──────────┬─────────┘    │
             │             │              │
             │     Next Phase?────────────┘
             │             │ No
             └─────────────┼──────────────┘
                            │
            ┌───────────────▼──────────────┐
            │  /gsd-audit-milestone        │
            │  /gsd-complete-milestone     │
            └───────────────┬──────────────┘
                            │
                   Another milestone?
                       │          │
                      Yes         No -> Done!
                       │
               ┌───────▼──────────────┐
               │  /gsd-new-milestone  │
               └──────────────────────┘
```

### Planning Agent Coordination

```
  /gsd-plan-phase N
         │
         ├── Phase Researcher (x4 parallel)
         │     ├── Stack researcher
         │     ├── Features researcher
         │     ├── Architecture researcher
         │     └── Pitfalls researcher
         │           │
         │     ┌──────▼──────┐
         │     │ RESEARCH.md │
         │     └──────┬──────┘
         │            │
         │     ┌──────▼──────┐
         │     │   Planner   │  <- Reads PROJECT.md, REQUIREMENTS.md,
         │     │             │     CONTEXT.md, RESEARCH.md
         │     └──────┬──────┘
         │            │
         │     ┌──────▼───────────┐     ┌────────┐
         │     │   Plan Checker   │────>│ PASS?  │
         │     └──────────────────┘     └───┬────┘
         │                                  │
         │                             Yes  │  No
         │                              │   │   │
         │                              │   └───┘  (loop, up to 3x)
         │                              │
         │                        ┌─────▼──────┐
         │                        │ PLAN files │
         │                        └────────────┘
         └── Done
```

### Validation Architecture (Nyquist Layer)

During plan-phase research, GSD now maps automated test coverage to each phase
requirement before any code is written. This ensures that when Claude's executor
commits a task, a feedback mechanism already exists to verify it within seconds.

The researcher detects your existing test infrastructure, maps each requirement to
a specific test command, and identifies any test scaffolding that must be created
before implementation begins (Wave 0 tasks).

The plan-checker enforces this as an 8th verification dimension: plans where tasks
lack automated verify commands will not be approved.

**Output:** `\{phase\}-VALIDATION.md` -- the feedback contract for the phase.

**Disable:** Set `workflow.nyquist_validation: false` in `/gsd-settings` for
rapid prototyping phases where test infrastructure isn't the focus.

### Retroactive Validation (`/gsd-validate-phase`)

For phases executed before Nyquist validation existed, or for existing codebases
with only traditional test suites, retroactively audit and fill coverage gaps:

```
  /gsd-validate-phase N
         |
         +-- Detect state (VALIDATION.md exists? SUMMARY.md exists?)
         |
         +-- Discover: scan implementation, map requirements to tests
         |
         +-- Analyze gaps: which requirements lack automated verification?
         |
         +-- Present gap plan for approval
         |
         +-- Spawn auditor: generate tests, run, debug (max 3 attempts)
         |
         +-- Update VALIDATION.md
               |
               +-- COMPLIANT -> all requirements have automated checks
               +-- PARTIAL -> some gaps escalated to manual-only
```

The auditor never modifies implementation code — only test files and
VALIDATION.md. If a test reveals an implementation bug, it's flagged as an
escalation for you to address.

**When to use:** After executing phases that were planned before Nyquist was
enabled, or after `/gsd-audit-milestone` surfaces Nyquist compliance gaps.

### Assumptions Discussion Mode

By default, `/gsd-discuss-phase` asks open-ended questions about your implementation preferences. Assumptions mode inverts this: GSD reads your codebase first, surfaces structured assumptions about how it would build the phase, and asks only for corrections.

**Enable:** Set `workflow.discuss_mode` to `'assumptions'` via `/gsd-settings`.

**How it works:**

1. Reads PROJECT.md, codebase mapping, and existing conventions
2. Generates a structured list of assumptions (tech choices, patterns, file locations)
3. Presents assumptions for you to confirm, correct, or expand
4. Writes CONTEXT.md from confirmed assumptions

**When to use:**

- Experienced developers who already know their codebase well
- Rapid iteration where open-ended questions slow you down
- Projects where patterns are well-established and predictable

See [docs/workflow-discuss-mode.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/workflow-discuss-mode.md) for the full discuss-mode reference.

### Decision Coverage Gates

The discuss-phase captures implementation decisions in CONTEXT.md under a
`<decisions>` block as numbered bullets (`- **D-01:** …`). Two gates — added
for issue #2492 — ensure those decisions survive into plans and shipped
code.

**Plan-phase translation gate (blocking).** After planning, GSD refuses to
mark the phase planned until every trackable decision appears in at least
one plan's `must_haves`, `truths`, or body. The gate names each missed
decision by id (`D-07: …`) so you know exactly what to add, move, or
reclassify.

**Verify-phase validation gate (non-blocking).** During verification, GSD
searches plans, SUMMARY.md, modified files, and recent commit messages for
each trackable decision. Misses are logged to VERIFICATION.md as a warning
section; verification status is unchanged. The asymmetry is deliberate —
the blocking gate is cheap at plan time but hostile at verify time.

**Writing decisions the gate can match.** Two match modes:

1. **Strict id match (recommended).** Cite the decision id anywhere in a
   plan that implements it — `must_haves.truths: ["D-12: bit offsets
   exposed"]`, a bullet in the plan body, a frontmatter comment. This is
   deterministic and unambiguous.
2. **Soft phrase match (fallback).** If a 6+-word slice of the decision
   text appears verbatim in any plan or shipped artifact, it counts. This
   forgives paraphrasing but is less reliable.

**Opting a decision out.** If a decision genuinely should not be tracked —
an implementation-discretion note, an informational capture, a decision
already deferred — mark it one of these ways:

- Move it under the `### Claude's Discretion` heading inside `<decisions>`.
- Tag it in its bullet: `- **D-08 [informational]:** …`,
  `- **D-09 [folded]:** …`, `- **D-10 [deferred]:** …`.

**Disabling the gates.** Set
`workflow.context_coverage_gate: false` in `.planning/config.json` (or via
`/gsd-settings`) to skip both gates silently. Default is `true`.
