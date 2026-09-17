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
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-10-harness-run-checkpoints.md"
sourceRel: "docs/specs/2026-08-10-harness-run-checkpoints.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-10-harness-run-checkpoints.md"
sourceSha256: "f7811fdcad2c22c4a893a1eef7e44f5a3bdc9dc613727ba7fc5f0559e5bfadbb"
pageSha256: "527167c60122bd7e164439c9a60a2c105563910a6418888ad1ddf10bacf46b9d"
contentMode: "local-full"
zh: ""
---

## Consumer Integration

### Learning capture

`loadPriorLearningCaptureState` gains `platform = "qoder"` and
`previousCheckpoint`; `task-loop-source.mjs` adds
`--previous-checkpoint <id>` beside its existing `--previous-findings`. Its
already-resolved `platform` value is passed to the loader.

1. `--previous-checkpoint` and `--previous-findings` are mutually exclusive.
2. An explicit checkpoint must match the freshly resolved topology-root ref,
   exact target ref/object, and platform provenance; pass findings validation;
   expose learning capture; match the selected-state digest; and pass
   `validateInterventionLedger`. `summary.projectName` remains a display label
   and is not a checkpoint-scope binding. Two members sharing one Git root
   cannot load each other's checkpoint context.
3. Explicit-checkpoint failure is a hard error and never falls through to a
   newer findings file.
4. With neither explicit option, the current implicit findings scan remains a
   compatibility fallback. To preserve no-option behavior, its root remains the
   literal `<workspace>/.qoder/better-harness` even when the loader receives a
   different `platform`; `platform` affects only explicit checkpoint store
   resolution in V1.
5. The loader preserves its existing return shape
   `\{ interventionLedger, evidenceRef, warning \}`. Non-empty checkpoint success
   returns `warning: null` and
   `\{ kind: "prior-harness-report", id: checkpointId, label: "N validated prior intervention(s)" \}`.
   A valid empty ledger returns `[]`, `evidenceRef: null`, and `warning: null`.
   Failure throws and therefore has no warning return. The whole findings
   document is never returned.

`evidenceRef.id` is opaque to downstream report/render code. The legacy
findings path retains its current fixed id; checkpoint loading uses the safe
checkpoint id. No consumer may branch on the literal id.

The literal Qoder fallback is a documented V1 compatibility limitation, not a
claim of multi-host implicit continuity. A non-Qoder caller that wants
platform-scoped continuity must pass `previousCheckpoint` (or the legacy
explicit findings path). A future V2 may remove implicit scanning or make its
root explicit, but must not silently change the no-option search root inside
V1.

`learning-capture-state.mjs` exports the single constant
`LEGACY_QODER_LEARNING_ROOT = ".qoder/better-harness"`; all compatibility scans
use it. V2 either replaces that one symbol with an explicit parameterized root
contract or removes implicit scanning, never copies one literal per host.

`harness analyze` pass-through may land only if its no-default-write behavior
remains unchanged.

### Selection and component state

At create and each validate call, V1 reads each referenced selection file once,
hashes/parses that buffer, invokes both new public value validators, re-checks
profile/snapshot binding, and compares native digests with the recorded anchor.
This proves the frozen artifacts are intact;
it does not rediscover the host's current eligible population and therefore
makes no live drift claim. V1 exposes no selection resume or population-compare
API. A later design must include a normalized plan or private selected-id result
and explicit current-population input; that requires V2 under the closed
version rule.

Component snapshot behavior does not change. The checkpoint calls its public
validator and records its native digest. Existing diff/resolve owners continue
to interpret it, and resolve stays `mutationAuthorized: false`.

All native digest strings (component and selection) are copied verbatim from
their owner contracts and compared verbatim; checkpoint code never adds,
removes, or normalizes a digest prefix.
