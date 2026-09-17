---
title: "Better Harness（QoderAI）"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adrs/developer-experience-system.md"
sourceRel: "docs/adrs/developer-experience-system.md"
rawUrl: "/raw/09-harness/better-harness/docs/adrs/developer-experience-system.md"
sourceSha256: "9b9c3c71dc8a49c147885497857e99bfe5eae866c09b264ca76e9decb808950f"
pageSha256: "54142345f713be32f3215d52f63e28fe3db4e384c18ee798cee73b89e441a006"
contentMode: "local-full"
zh: ""
---

## Decision Layers and Change Authority

This ADR deliberately separates durable invariants from versioned contracts and
operating policy. Accepting the ADR makes only the invariant column normative.
It does not activate a target path or freeze every illustrative v1 field.

| Area | Durable ADR invariant | Delegated versioned contract or policy | Change authority |
| --- | --- | --- | --- |
| Ownership | Product judgment remains with business capabilities; the DX catalog is judgment-free | Declaration discovery and activation-ledger formats | Compatible changes use a dated implementation spec; moving judgment requires an ADR revision |
| Journeys | Experience is evaluated by persona, the `DX-J1` through `DX-J9` core taxonomy, required journey fields, and all five DX pillars | Versioned operational instances, additive non-core journeys, review cadence, and individual target values under `docs/dx/` | Operational/additive changes use a dated spec; reusing/removing a core id, changing its completion meaning, removing a required field, or removing a pillar requires an ADR revision |
| Commands | One typed owner drives parser, help, schema, effects, diagnostics, and conformance; recognized machine mode returns one parser-safe versioned envelope for every outcome | `command-contract.v1`, diagnostic taxonomy, field nullability, numeric exit mapping, and machine-envelope versions | Compatible fields use a spec; breaking versions require a migration spec; changing stdout cardinality, weakening strictness/effect disclosure, or moving recognized machine failures out of the envelope requires an ADR revision |
| Host support | Support is slice-based, evidence-backed, freshness-aware, and automatically demoted | `host-support.v1`, profile predicates, and per-host freshness policies | Slice and predicate evolution uses versioned policy plus migration; accepting synthetic evidence as native evidence requires an ADR revision |
| Evidence | Evidence classes do not substitute for one another; receipts are immutable and privacy-bounded | `evidence-receipt.v1`, class taxonomy, producer payloads, and redaction profiles | Compatible fields use a spec; taxonomy or privacy-invariant breaks require an ADR revision or successor |
| Documentation and accessibility | Curated prose remains author-owned; structured facts are projected; every public surface owns accessibility | Projection formats, locale parity checks, and accessibility test profiles | Surface implementations use dated specs; generated prose or removal of accessibility ownership requires an ADR revision |
| Privacy and support | Default operation is local-first, telemetry-free, bounded, and explicit before persistence or network send | Privacy, support-version, retention, and support-bundle policies | Tighter compatible policy uses review; new default network collection or telemetry requires a separate ADR |
| Release | Publication is planned from a protected immutable revision, applied without plan mutation, and verified from the real distribution surface | Release manifest, required checks, provenance format, and evidence freshness policy | Workflow evolution uses a release spec; arbitrary-ref publishing requires an ADR revision |
| Measurement | Journey outcomes retain failures and unobserved coverage; no single score approves release | Metric definitions, populations, targets, and retrospective cadence | Metric changes use reviewed policy; default remote measurement requires a separate ADR |

The durable-invariant column is the only normative authority created by ADR
acceptance. Later sections either explain those invariants or label proposed v1
details delegated to a versioned contract; they do not silently create another
authority tier.

Versioned contracts may evolve inside these invariants. A backward-compatible
minor revision requires its owning implementation spec, fixtures, and consumer
evidence. A breaking major revision also requires a migration and compatibility
window. Any change that contradicts an invariant, transfers business judgment
to the catalog, weakens privacy or evidence classes, or changes default network
behavior requires an explicit revision of this ADR or a superseding ADR.

Target-owner activation is orthogonal to both ADR acceptance and contract
publication. Each fact slice moves only through `planned`, `shadow`,
`authoritative`, `compatibility`, and `retired` states in the activation ledger.
