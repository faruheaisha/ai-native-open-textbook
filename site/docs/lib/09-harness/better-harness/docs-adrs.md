---
title: "Architecture Decision Records"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/README.md"
zh: ""
---

# Architecture Decision Records

This directory contains repository-wide architecture decisions that refine the
accepted principles in [Architecture Principles](/lib/09-harness/better-harness/docs-ARCHITECTURE). Filenames
remain descriptive, lowercase, and stable. ADR IDs are stable navigation labels;
adding an ID does not rename an existing file or change its acceptance status.

The status in each ADR is canonical. This index is a discovery surface and must
be updated in the same change when an ADR is added, accepted, superseded, or
deprecated.

| ID | Decision | Status | Decision date | Scope |
| --- | --- | --- | --- | --- |
| `ADR-0001` | [AI-Optimized Directory Structure](/lib/09-harness/better-harness/docs-adrs-directory-structure) | Proposed | 2026-07-16 | Directory ownership, artifact routing, migration gates, and target-directory activation |
| `ADR-0002` | [Developer Experience System](/lib/09-harness/better-harness/docs-adrs-developer-experience-system) | Proposed | 2026-07-31 | Journeys, federated contracts, projections, native evidence, governance, support, and DX measurement |
| `ADR-0003` | [Harness Run Evidence Bridge](/lib/09-harness/better-harness/docs-adrs-harness-run-evidence-bridge) | Proposed | 2026-08-15 | Harness revision and run evidence ingestion into the Inspector normalization chain |
| `ADR-0004` | [Harness Checkpoint Experiment Compare](/lib/09-harness/better-harness/docs-adrs-harness-checkpoint-experiment-compare) | Proposed | 2026-08-17 | Checkpoint-anchored mixed-origin experiments, derived treatment axes, per-contrast verdicts, and the Studio experiment lifecycle |
| `ADR-0005` | [Checkpoint-backed Compare Sources and Materialization](/lib/09-harness/better-harness/docs-adrs-checkpoint-backed-compare-sources) | Proposed | 2026-08-17 | Source-neutral checkpoint discovery, request provenance, adapter projections, and per-lane materialization |
| `ADR-0006` | [Session Notebook Trace and Outcome Projection](/lib/09-harness/better-harness/docs-adrs-session-notebook-evidence-projection) | Proposed | 2026-08-18 | Ordered Turn evidence, response availability, evidence-bounded outcomes, and session-scoped patch requirements |
| `ADR-0007` | [Harness Studio Artifact Runtime and Provider Architecture](/lib/09-harness/better-harness/docs-adrs-studio-artifact-runtime-and-providers) | Proposed | 2026-08-22 | Revision-bound data and code lifecycles, renderer surfaces, external providers, and retained trace boundaries |
| `ADR-0008` | [Memory 范围、导航与分析](/lib/09-harness/better-harness/docs-adrs-memory-navigation-and-analysis) | Proposed | 2026-09-09 | Global Memory entry, secondary navigation, content scope, and on-demand AI analysis |
| `ADR-0009` | [Ontology Language Analysis Runtime](/lib/09-harness/better-harness/docs-adrs-ontology-language-runtime) | Proposed | 2026-09-09 | Rust + tree-sitter sidecar for Studio's memories Ontology module, native vs. WASM grammar loading, and the cross-file relationship boundary |

## Lifecycle

- **Proposed:** complete enough for architecture review, but not yet an accepted
  repository rule.
- **Accepted:** explicitly approved after the ADR's validation gate passes.
- **Superseded:** replaced by another named ADR; historical context and links
  remain available.
- **Deprecated:** retained for context but no longer governs new work.

Implementation does not happen merely because an ADR is Accepted. Non-trivial
implementation slices still require the dated Spec, acceptance scenarios, test
evidence, risk review, and activation gates required by `AGENTS.md`.
