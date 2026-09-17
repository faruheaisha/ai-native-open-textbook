---
title: "Project Harness Evidence"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/skills/better-harness/references/project-harness.md"
sourceRel: "skills/better-harness/references/project-harness.md"
rawUrl: "/raw/09-harness/better-harness/skills/better-harness/references/project-harness.md"
sourceSha256: "59b2b076bbfabb034ea601efe907189d3d0bc7abd7e10c0693260155a6f532d4"
pageSha256: "59b2b076bbfabb034ea601efe907189d3d0bc7abd7e10c0693260155a6f532d4"
contentMode: "local-full"
zh: ""
---

# Project Harness Evidence

Inspect repository-owned execution and delivery capability, then return
independent finding candidates. The lead owns joins, severity, scores,
recommendations, and report copy. The canonical
[Software Fluency model](https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/models/software-fluency.md) owns the full
L1-L5 ladder; keep all five dimensions below without reproducing that ladder.

## Boundary

- Inspect only the target project, scoped history, and lead-supplied
  `core-change-watch evidence-pack` envelope.
- Do not inspect Session facts, user Memory, prior reports, scanner conclusions,
  or another agent's brief. Agent Customize owns configured asset quality.
- Open at most three project owners in quick mode or five in normal mode. Use
  source and tests to verify history/scanner leads.
- Static declarations prove intent or presence, not runnable behavior, current
  health, enforcement, delivery, or ownership.

## Preserve the Five Evaluation Dimensions

Inspect every applicable dimension. Do not replace this model with churn,
testing, or observability alone, and do not silently omit unavailable evidence.

| Dimension | Core question | Original submetrics to preserve |
|---|---|---|
| **Context Map** | Can an agent reach the right context, boundary, risk, and next step? | Task Entrypoint; Context & Boundary Map; Risk & Next-Step Route |
| **Environment Readiness** | Can it enter a versioned, bounded, diagnosable environment and run/reset resources without guessing? | Environment Readiness Entry; Run & Doctor Command Surface; State Reset & Isolation |
| **Fast Feedback** | Do affected checks return timely, actionable behavior evidence? | Validation Signal Layers; Signal Speed & Actionability; Affected Check Routing |
| **Quality Gates** | Are relevant rules mechanically checked and repairable? | Rule Coverage; Enforcement Gate Strength; Rule Repair Path |
| **Change Safety** | Are agent changes bounded, accepted through evidence, and recoverable? | Agent Lifecycle Guardrails; Merge Acceptance Path; Side-Effect, Permission & Recovery Boundary |

Calibrate each applicable submetric against the canonical model: absent or
unusable evidence; partial/declarative evidence; a runnable baseline;
integrated, affected, or enforced behavior; then observed, auditable, adaptive
behavior. Preserve `Unavailable` or `Not applicable` with a reason. Do not emit
a standalone Software Fluency score.

## Start With Core Change Risk

Infer the smallest core candidate from the 30/90/180-day history, current diff,
and responsibility map.
Prioritize frequently changed files and responsibility-heavy or long methods,
then inspect:

1. the trigger, boundary/decision, failure or recovery, and result path;
2. focused tests mapped to that path, including negative and recovery cases;
3. whether the path is understandable or concentrates unrelated decisions;
4. whether relevant architecture, schema, security, generated-artifact,
   migration, or acceptance gates constrain changes.

Churn and method length are risk leads, not defects. Use them to choose where
to exercise the five dimensions, not as replacement dimensions.

## Inspect the AI Debug Route

For the most material core/failure path, read
[Observability for AI Debugging](/lib/09-harness/better-harness/references-project-harness-observability)
and inspect one bounded scenario. Determine whether the real route is
discoverable, runnable, readable, correlatable, verifiable, and
`safe and reversible`.

Observability is cross-cutting evidence, not a sixth dimension. Map each result
to the affected Context Map, Environment Readiness, Fast Feedback, Quality
Gates, or Change Safety submetric. Logger imports, dependencies, and log-call
counts are only search leads; do not invent a command, port, sink, topology, or
production claim.

## Inspect the Supporting Loop

Cover the original dimensions around the named risk:

- route from instructions and architecture to the correct owner and check;
- setup, supported runtime, start, reset, isolation, and doctor behavior;
- fast/full test, lint, type, contract, integration, E2E, browser, and runtime
  smoke layers, including affected-check routing and failure artifacts;
- mechanical architecture, security, schema, migration, generated-drift, and
  design gates, plus their repair paths;
- lifecycle controls, permissions, side effects, acceptance/merge evidence,
  rollback, recovery, and escalation.

If a material core path lacks a dependable change-review trigger, assess the
packaged `scripts/review-trigger/` route as a possible existing owner. Mention
it only when its trigger, runtime, inputs, output sink, and verifier fit the
project. Its presence alone is not a recommendation or proof of enforcement.

## Return

Write a compact Markdown brief in the user's language. Include scope/history
boundary, evidence across all five dimensions, strongest capabilities, core
risks, test and observability coverage, owner references, missing evidence, and
normally three to five potential findings (up to three in quick mode).

Express potential findings naturally; no fixed fields or JSON schema are
required. Each must make its consequence, evidence, owner boundary, and
uncertainty understandable. Return fewer when evidence is weak and never fill
a quota. Do not assign final severity, score, repair, or recommendation. End
with the claims the lead must not make from this evidence.
