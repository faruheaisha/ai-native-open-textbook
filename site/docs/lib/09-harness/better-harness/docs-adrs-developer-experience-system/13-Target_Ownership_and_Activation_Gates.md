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
pageSha256: "18829424f8f1350510b0e315a1fb0e17cdfe26ce3d1766642f106f0159bab903"
contentMode: "local-full"
zh: ""
---

## Target Ownership and Activation Gates

Target paths describe intended owners, not currently active behavior. Their
creation must also satisfy the
[directory-structure ADR](/lib/09-harness/better-harness/docs-adrs-directory-structure).

ADR acceptance does not change the following edit routes. Before the activation
ledger exists, this table is the controlling baseline. A row with multiple
current surfaces describes known duplication to validate, not permission to
pick whichever copy is convenient.

| Fact or policy | Current edit route | Target owner | Initial authority state |
| --- | --- | --- | --- |
| DX core taxonomy, required fields, pillars, and removal rules | This ADR | This ADR | `authoritative` |
| DX operational journey instances and additive non-core journeys | This ADR's current routing matrix | Versioned catalog under `docs/dx/` | `planned`; the ADR retains core validation authority after cutover |
| Host-integrated product route | Canonical Skill/output contracts plus host-specific README and installation prose | Capability route contributions indexed with host-support profiles | `planned`; existing contracts and prose remain authoritative within their current scope |
| CLI product route and behavior | `scripts/better-harness-cli/`, delegated leaf parsers, and capability CLIs | Capability-owned typed command contracts; root registry indexes only | `planned`; existing command implementation remains authoritative |
| Source-contribution route | `CONTRIBUTING.md` and root `package.json` tasks | Same owners, validated as one route | `authoritative` |
| Host support facts | `docs/adapters/README.md`, capability provider sets, public matrices, and host manifests | `scripts/host-support/` for identity/profile facts; behavior stays with each capability | `planned` |
| Shared evidence envelope, class taxonomy, and official receipt index | No shared current owner; producer-specific formats | `scripts/evidence-contract/` with a projected schema under `schemas/` and official sanitized store under `docs/dx/evidence/` | `planned` |
| Native evidence payload | Provider/native smoke commands and recorded review evidence | `scripts/runtime-smoke/` producer using the shared evidence contract | `planned` |
| Privacy and data-use policy | Canonical Skill boundaries and troubleshooting guidance | `docs/privacy.md` policy, enforced by each capability contract | `planned` |
| Support lifecycle and public support route | Troubleshooting, issue forms, and host docs | Root `SUPPORT.md` plus projected public support facts | `planned` |
| Security disclosure | No repository-wide canonical policy | Root `SECURITY.md` and private disclosure configuration | `planned` |
| Accessibility minimums | Surface-specific implementation and the accepted documentation-DX spec | `docs/accessibility.md` policy; each affected surface owns conformance | `planned` |
| Support-bundle behavior | No current product capability | `scripts/support-bundle/` | `planned` |
| DX metric definitions and retrospective governance | No repository-wide canonical owner | `docs/dx/` metric definitions and review cadence; deterministic collectors remain capability-owned | `planned` |
| npm release plan and package verification | Root package manifest, `scripts/npm-package/`, and release workflow | `scripts/npm-package/` owns npm plan/artifact facts; workflow orchestrates protected apply | `planned` for plan/apply split; current package verification remains authoritative |

Once the `scripts/dx-contracts/` activation gate passes, its
`activation-ledger.json` records authority at fact, host, capability, and slice
granularity. The ledger is not a special bootstrap exemption and the target
directory is not created merely to hold it. Until that capability activates,
the controlling baseline table above performs the same fail-closed routing and
no target-owner cutover is allowed. Each ledger entry contains:

- stable fact id and scope;
- an `ownerBindings` array whose elements each contain an owner public path and
  independent `planned`, `shadow`, `authoritative`, `compatibility`, or
  `retired` state;
- implementation spec and contract version;
- projection consumers;
- parity and activation evidence references;
- cutover revision and date on every binding that changed authority;
- compatibility end condition for compatibility bindings;
- rollback binding and rollback action.

Exactly one binding may be `authoritative` for an activated fact slice. Before
activation, the controlling baseline remains authoritative and target bindings
are `planned` or `shadow`. `shadow` declarations
may be compared but may not drive public output. A cutover requires the named
spec, parity evidence, consumer updates, a reviewed ledger change, and a tested
rollback. `compatibility` owners may accept old input or expose a deprecated
path but may not define new truth.

The static table is a fallback only before ledger activation. After activation,
each validated ledger revision records a checksum-addressed last-known-good
snapshot. If the current ledger is missing, malformed, or conflicted, tools may
show that snapshot for read-only diagnosis but must block contributor routing,
projection regeneration, authority changes, and write guidance until the ledger
is repaired. They never fall back to the static table or resurrect a retired
binding. Existing checked projections may continue to serve their last
validated content without becoming editable truth.

| Target owner | Responsibility | Activation gate |
| --- | --- | --- |
| Human DX guidance and versioned journey catalog under `docs/dx/` | Operational journey instances, additive non-core journeys, product-route explanation, stable metric-id bindings, and improvement playbooks | Core-id validation against this ADR, first real guide, link routing, metric-binding resolution against the active metric-policy registry, explicit field ownership, and no duplication of invariant decision text |
| `scripts/dx-contracts/` | Catalog declaration locations, validate versions, compare projections, and report drift | Accepted implementation spec, at least two declaration kinds, public `index.mjs`, CLI help/schema, fixtures, and report-only default |
| `scripts/host-support/` | Own host identities, aliases, support slices, invocation, install/output facts, and promotion policy | Accepted host-support schema, migration parity against all current hosts, semantic projection tests, and no host behavior implementation in the registry |
| Capability-owned command contracts | Own typed options, effects, errors, and examples beside behavior | Shared contract only after two consumers; leaf-command conformance and compatibility tests in the first migration |
| `scripts/evidence-contract/` | Own the shared receipt envelope, evidence-class taxonomy, compatibility rules, validation, and redaction invariants | Two producer classes, versioned schema, cross-producer fixtures, privacy review, and no producer-specific success judgment |
| Official receipt store under `docs/dx/evidence/` | Retain sanitized attested receipts, append-only revocation/index facts, and immutable release references | Evidence-contract schema, trust review, package-boundary decision, retention policy, digest verification, and no raw logs |
| `scripts/harness-doctor/` | Read-only product and host diagnostics | Privacy threat review, bounded-time tests, redaction fixtures, human and JSON outputs, and no implicit network or mutation |
| `scripts/runtime-smoke/` | Execute isolated native checks and issue producer-specific payloads inside shared receipts | Per-host adapter boundary, evidence-contract conformance, isolated homes, redaction, deterministic fallback, timeout/cancellation, and advisory first rollout |
| `scripts/support-bundle/` | Plan, redact, persist, delete, and optionally hand off diagnostics | `SECURITY.md`, `SUPPORT.md`, privacy policy, plan/apply separation, deletion route, and non-disclosure tests |
| `docs/privacy.md`, `SECURITY.md`, and `SUPPORT.md` | Own repository privacy, disclosure, supported-version, and support-channel policy | Maintainer and security review, public routing, retention/deletion boundaries, and capability conformance checks |
| `docs/accessibility.md` | Own cross-surface minimums and evidence definitions | Web, CLI, and visual examples; automated plus bounded manual evidence; routes from contribution guidance |
| DX metric-policy registry under `docs/dx/` | Solely own metric ids, definitions, populations, numerators, denominators, sampling boundaries, privacy classes, decision consumers, lifecycle, and retrospective cadence | At least one measured journey, journey-binding resolution tests, denominator review, no default telemetry, and named decision consumer |
| `schemas/` | Versioned contracts consumed by multiple repository or packaged surfaces | Two real consumers, compatibility policy, fixtures, and package-boundary verification |

The DX system must not introduce these targets only for directory symmetry.
