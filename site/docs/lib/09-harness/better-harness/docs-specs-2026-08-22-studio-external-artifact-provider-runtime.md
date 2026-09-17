---
title: "Implement external Artifact providers in Harness Studio"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-22-studio-external-artifact-provider-runtime.md"
sourceRel: "docs/specs/2026-08-22-studio-external-artifact-provider-runtime.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-22-studio-external-artifact-provider-runtime.md"
sourceSha256: "b940fa477c14c13ff8c6b0d6eace609ab2d1f1ed0b377e025bf97acc6a710ac5"
pageSha256: "b940fa477c14c13ff8c6b0d6eace609ab2d1f1ed0b377e025bf97acc6a710ac5"
contentMode: "local-full"
zh: ""
---

# Implement external Artifact providers in Harness Studio

## Traceability

- Spec ID: studio-external-artifact-provider-runtime
- Status: Implemented
- ADR: [Harness Studio Artifact runtime and provider architecture](/lib/09-harness/better-harness/docs-adrs-studio-artifact-runtime-and-providers)

## Intent

Implement the immediately actionable provider migration from ADR-0007 without
expanding its evidence-bounded future lanes. Harness Studio should resolve
built-in and third-party Artifact capabilities through one server composition
root, mount hosted output through one generic surface protocol, and treat Qoder
Canvas and GPT Walnut as external providers with honest receipts, activation,
support, and trust boundaries.

Qoder keeps its V2 browser wire compatibility while losing its special fields
inside the common plugin binding. Walnut becomes observable as a
receipt-verified, locally derived provider with zero contributions; no private
Walnut invocation is inferred or executed.

## Acceptance Scenarios

- **AC-1:** The common server contract exposes plugin bindings, surface
  bindings, provider bindings, external providers, contributions, receipts, and
  hosted-runtime operations without importing `CanvasViewer`. One immutable
  composition root resolves an Artifact; common callers no longer pass
  `qoderCanvasViewers` or read `qoderViewer`.
- **AC-2:** Authored TSX/JSX runtimes resolve before every external lane and
  cannot be claimed by a Provider. SVG and Mermaid remain Studio-owned defaults,
  but an explicitly activated, fingerprint-bound external override may replace
  their virtual runtimes. Eligible data formats resolve in the order external
  override, Studio built-in, external fallback, unavailable.
  Same-lane conflicts fail closed rather than using discovery order.
- **AC-3:** Each ready Qoder viewer is translated into a receipt-covered
  external provider contribution. Its fingerprint covers the normalized
  manifest, renderer, optional sidecar, relevant static resources, and selected
  Canvas SDK/runtime assets. The binding reports
  `adapterExecutionProfile: trusted-local-process`, contribution support
  `experimental-local`, and hosted surface security profile `opaque-web-v1`.
- **AC-4:** Qoder provider migration preserves V2
  `renderer.type: qoder-canvas`, `payload.kind: qoder-canvas/v1`, and
