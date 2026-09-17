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
pageSha256: "f5393847e84f6f96ca419bb6a94828658b721871900038bb6eb881feb740d029"
contentMode: "local-full"
zh: ""
---

## Public Surface and Errors

The dependency direction is one-way:

```text
harness-analysis/checkpoint-adapter
  -> harness-checkpoint (sealed-envelope substrate)
  -> host-support, workspace-topology, report-source, session-analysis, component-snapshot
```

`scripts/harness-checkpoint/` imports only Node built-ins and its own private
modules. It never imports `harness-analysis`, `host-support`, session analysis,
or component snapshot. Its `index.mjs` exposes envelope/reference/digest/store
primitives to the adapter:

```text
validateHarnessCheckpointEnvelope(value) -> frozen envelope
sealHarnessCheckpoint({
  stateRoot, scope, runRef, artifactRecords, anchorRows, semanticCounts
}) -> frozen envelope
readHarnessCheckpointAtStore({ stateRoot, topologyRootRef, targetRef, platform, checkpointId })
  -> frozen envelope
listHarnessCheckpointsAtStore({
  stateRoot, topologyRootRef, targetRef, platform, limit, cursor, scanLimit
}) -> { status, checkpoints, diagnostics, nextCursor }
verifyHarnessCheckpointArtifacts(checkpoint, { topologyRoot, target }, consumeVerifiedArtifacts)
  -> { byteFacts, consumerValue }
```

`scripts/harness-analysis/checkpoint-adapter.mjs` is the application behavioral
surface. It resolves topology/target scope and state home, owns intake and native validation, constructs
anchors, and delegates sealing/storage to the substrate. It exports:

```text
validateCheckpointFindingsDocument(value) -> { contract, representation, findings }
createHarnessAnalysisCheckpoint(options) -> frozen envelope
readHarnessAnalysisCheckpoint({ workspace, platform, checkpointId }) -> frozen envelope
listHarnessAnalysisCheckpoints({ workspace, platform, limit, cursor, scanLimit })
  -> { status, checkpoints, diagnostics, nextCursor }
validateHarnessAnalysisCheckpoint(checkpoint, { workspace }) -> frozen envelope
resolveHarnessAnalysisCheckpointLearningCapture({ workspace, platform, checkpointId })
  -> { checkpointId, interventionLedger, evidenceRef }
```

List returns bounded projections, never full envelopes. These JSON shapes are
closed; nullable diagnostic fields are present as `null`, not omitted:

```json
{
  "status": "complete",
  "checkpoints": [
    {
      "checkpointId": "hcpt_0123456789abcdef0123456789abcdef",
      "createdAt": "2026-08-10T00:00:00.000Z",
      "state": "sealed",
      "platform": "qoder",
      "targetRef": "hwt:local:sha256:1123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "target": {
        "kind": "workspace-member",
        "route": "packages/app",
        "memberRoute": "packages/app",
        "memberMatch": "exact"
      },
      "runRef": "workspace:.qoder/better-harness/2026-08-10/080000-project",
      "summary": {
        "findingCount": 2,
        "interventionCount": 1,
        "artifactCount": 3,
        "availableAnchorCount": 3
      },
      "artifactKinds": ["findings", "session-selection-profile", "session-selection-snapshot"],
      "availableAnchors": ["report", "learning-capture", "session-selection"]
    }
  ],
  "diagnostics": [],
  "nextCursor": null
}
```

A partial entry is exactly:

```json
{
  "code": "CHECKPOINT_DIGEST_MISMATCH",
  "checkpointId": "hcpt_0123456789abcdef0123456789abcdef",
  "platform": "qoder",
  "targetRef": "hwt:local:sha256:1123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  "field": null,
  "catalogOffset": null
}
```

The verification primitive first reads and byte-verifies every sealed artifact
in order. Only after all byte checks succeed does it invoke
`consumeVerifiedArtifacts` exactly once with the ordered in-memory
`[\{ record, bytes \}]` rows. The analysis adapter parses and native-validates
those buffers and returns its reconstruction as `consumerValue`; raw bytes are
never returned through the CLI or retained by the substrate. The closed
`byteFacts` result is:

```json
{
  "checkpointId": "hcpt_0123456789abcdef0123456789abcdef",
  "topologyRootRef": "hws:local:sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
  "artifacts": [
    {
      "kind": "findings",
      "sizeBytes": 4096,
      "byteDigest": "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "status": "verified"
    }
  ]
}
```

Byte-fact artifacts preserve sealed intake order. Root `validate --json` wraps
the full envelope as
`\{ "artifactVerification": "verified", "checkpoint": <envelope> \}`; `show
--json` uses the same wrapper with `artifactVerification: "not-run"`. Neither
exposes the internal byte-facts object separately.

The primary write API has this closed options contract:

| Option | Requirement | Rule |
| --- | --- | --- |
| `workspace` | Required | Requested analysis target; resolved through public workspace topology before artifact reads |
| `platform` | Required | Canonical host id accepted by host-support; no alias is stored |
| `runDir` | Required | Existing topology-root-contained directory with required `findings.json` |
| `source` | Optional | Topology-root-contained report-source file |
| `componentSnapshot` | Optional | Topology-root-contained component snapshot file |
| `selectionProfile` | Optional paired | Topology-root-contained; must appear with `selectionSnapshot` |
| `selectionSnapshot` | Optional paired | Topology-root-contained; must appear with `selectionProfile` |

There are no caller options for id, time, state home, media type, contract,
summary, anchors, capabilities, or digests. The CLI flags are the kebab-case
forms in the intake table. Test-only clock/random injection is private to the
substrate and is not part of this API.

On create, the adapter resolves/freeze-validates the public workspace topology,
reads each artifact into one immutable buffer exactly once, hashes that buffer,
parses that same buffer, and invokes value-level native validators. It supplies
only scope, ordered `artifactRecords`, exact `anchorRows`, and semantic
`\{ findingCount, interventionCount \}` to `sealHarnessCheckpoint`. The substrate
generates id/time, derives artifact/available-anchor counts and capabilities,
checks structural cross-field invariants, computes the envelope digest, and
writes it. It never accepts a prebuilt summary or capabilities object.

On validate, the substrate first checks the closed envelope, digest, freshly
resolved topology scope, ordered artifact references/bytes, and structurally
derived counts/capabilities. After every byte check succeeds, the adapter's
single consume callback reruns every native validator over those same buffers,
reconstructs artifact records, anchors, and semantic counts, and requires exact
equality with the envelope. Any derived or native mismatch is
`INVALID_CHECKPOINT`, except byte/contract failures that use their more specific
codes.

The exact validation sequence is:

| Step | Owner / export | Recompute / compare | Failure |
| --- | --- | --- | --- |
| 1 | Substrate / `validateHarnessCheckpointEnvelope` | Parse closed kind/schema/field enums and artifact/anchor order | `UNSUPPORTED_CHECKPOINT_VERSION` or `INVALID_CHECKPOINT` |
| 2 | Substrate / `validateHarnessCheckpointEnvelope` | Recompute envelope digest without `checkpointDigest` | `CHECKPOINT_DIGEST_MISMATCH` |
| 3 | Substrate / `verifyHarnessCheckpointArtifacts` | Recompute canonical topology-root ref from disk plus target ref from the adapter's freshly resolved target, then validate every `workspace:` reference | `CHECKPOINT_WORKSPACE_MISMATCH`, `CHECKPOINT_TARGET_MISMATCH`, or `UNSAFE_CHECKPOINT_ARTIFACT_REF` |
| 4 | Substrate / `verifyHarnessCheckpointArtifacts` | Read exact bytes once in sealed order; compare size and byte digest for all rows before invoking the consume callback | `CHECKPOINT_ARTIFACT_MISSING` or `CHECKPOINT_ARTIFACT_DIGEST_MISMATCH` |
| 5 | Substrate / `validateHarnessCheckpointEnvelope` | Derive `artifactCount`, `availableAnchorCount`, and capabilities from sealed structural rows | `INVALID_CHECKPOINT` |
| 6 | Adapter / `validateHarnessAnalysisCheckpoint` | Parse each once-read buffer, native-validate its value, and reconstruct media/contract records | `CHECKPOINT_ARTIFACT_CONTRACT_INVALID` or `INVALID_CHECKPOINT` for record mismatch |
| 7 | Adapter / `validateHarnessAnalysisCheckpoint` | Reconstruct anchor rows, `findingCount`, and `interventionCount` from validated values | `INVALID_CHECKPOINT` |
| 8 | Adapter / `validateHarnessAnalysisCheckpoint` | Return the frozen validated envelope; write nothing | No additional failure class |

The Derived fields table defines the same ownership; this sequence defines
comparison order and error precedence.

The split intentionally pays a small derivation/comparison cost to keep the
sealed-envelope substrate free of native report and host imports. Contributors
must not collapse native semantics into `scripts/harness-checkpoint/` merely to
remove that boundary.

Only the analysis adapter imports the checkpoint index. Other analysis modules
import the adapter, never checkpoint private modules. The adapter imports
workspace-topology, report-source, session-analysis, and component-snapshot through their public
indices; its same-capability findings/ledger imports are exact named exports
from `task-loop-report.mjs`, `intervention-ledger.mjs`, and
`fluency-dimensions.mjs`. The adapter imports owner constants and must not copy
their literals. The planned refactor contract test asserts that no file under
`scripts/harness-checkpoint/` imports from another capability and that consumers
do not bypass either public surface.

To make the one-read rule implementable, `session-analysis/index.mjs` adds and
owns public I/O-free exports
`validateSessionSelectionProfile(value)`,
`validateSessionSelectionSnapshot(value)`, and
`assertSessionSelectionProfileSnapshotBinding(profile, snapshot)`. Existing
file-reading helpers delegate to these exports. The pair-binding function checks
profile digest, scope, and eligible count only; it does not rediscover or read
current sessions. Re-declaring those rules in the checkpoint adapter is
forbidden.

Stable operational codes are:

- `CHECKPOINT_NOT_FOUND`;
- `INVALID_CHECKPOINT`;
- `UNSUPPORTED_CHECKPOINT_VERSION`;
- `CHECKPOINT_DIGEST_MISMATCH`;
- `CHECKPOINT_WORKSPACE_MISMATCH`;
- `CHECKPOINT_TARGET_MISMATCH`;
- `UNSAFE_CHECKPOINT_ARTIFACT_REF`;
- `CHECKPOINT_ARTIFACT_MISSING`;
- `CHECKPOINT_ARTIFACT_DIGEST_MISMATCH`;
- `CHECKPOINT_ARTIFACT_CONTRACT_INVALID`;
- `CHECKPOINT_ANCHOR_UNAVAILABLE`;
- `CHECKPOINT_CONTINUITY_UNSUPPORTED`;
- `CHECKPOINT_STATE_ROOT_UNAVAILABLE`;
- `CHECKPOINT_STATE_ROOT_UNSAFE`;
- `CHECKPOINT_CATALOG_APPEND_FAILED`; and
- `CHECKPOINT_CATALOG_CORRUPT`.

The error precedence and caller surfaces are normative. Envelope/version/digest
checks precede workspace and artifact checks; a specific safety, missing,
byte-digest, or native-contract code takes precedence over
`INVALID_CHECKPOINT`. Safe payload fields are an allowlist; messages never add
absolute paths or artifact bodies.

| Code | Surfaces / phase | Trigger | Safe payload fields |
| --- | --- | --- | --- |
| `CHECKPOINT_NOT_FOUND` | show, id-validate, continuity | No envelope at the selected topology/target/platform/id | `checkpointId`, `platform`, `targetRef` |
| `INVALID_CHECKPOINT` | create, list diagnostic, show, validate | Closed-shape, order, derived-field, reconstructed-anchor, or semantic-count mismatch without a more specific code | `checkpointId?`, `field?` |
| `UNSUPPORTED_CHECKPOINT_VERSION` | list diagnostic, show, validate | Kind/schema does not match the selected version reader | `checkpointId?`, `kind?`, `schemaVersion?` |
| `CHECKPOINT_DIGEST_MISMATCH` | list diagnostic, show, validate, continuity | Envelope digest differs before artifact access | `checkpointId` |
| `CHECKPOINT_WORKSPACE_MISMATCH` | file/id-validate, continuity | Recomputed topology-root ref differs | `checkpointId`, `platform` |
| `CHECKPOINT_TARGET_MISMATCH` | create, validate, continuity | Recomputed public topology target/ref differs | `checkpointId?`, `targetRef` |
| `UNSAFE_CHECKPOINT_ARTIFACT_REF` | create, validate, continuity | Reference parse, topology containment, type, or symlink/junction rule fails | `checkpointId?`, `artifactKind` |
| `CHECKPOINT_ARTIFACT_MISSING` | create, validate, continuity | Required referenced regular file is absent | `checkpointId?`, `artifactKind` |
| `CHECKPOINT_ARTIFACT_DIGEST_MISMATCH` | validate, continuity | Exact current bytes differ from the sealed digest | `checkpointId`, `artifactKind` |
| `CHECKPOINT_ARTIFACT_CONTRACT_INVALID` | create, validate, continuity | JSON/native contract or present learning ledger is invalid | `checkpointId?`, `artifactKind` |
| `CHECKPOINT_ANCHOR_UNAVAILABLE` | continuity | Requested learning anchor is unavailable | `checkpointId`, `anchorKind`, `reason` |
| `CHECKPOINT_CONTINUITY_UNSUPPORTED` | adapter misuse | A non-resume anchor is requested as continuity | `checkpointId`, `anchorKind` |
| `CHECKPOINT_STATE_ROOT_UNAVAILABLE` | create, list, show, id-validate | Standard user-state home cannot be resolved safely | `platform` |
| `CHECKPOINT_STATE_ROOT_UNSAFE` | create, list, show, id-validate | State-home path is relative, non-directory, unresolved, or canonically inside the topology root | `platform`, `targetRef` |
| `CHECKPOINT_CATALOG_APPEND_FAILED` | create | Catalog append or durability confirmation failed; publication may be indeterminate only after a complete record write | `checkpointId`, `platform`, `targetRef`, `publication` |
| `CHECKPOINT_CATALOG_CORRUPT` | list diagnostic | Fixed record/torn suffix is invalid or its envelope digest disagrees | `platform`, `targetRef`, `catalogOffset` |

Every list diagnostic uses the closed projection shown above, so the selected
`platform`/`targetRef` context and nullable `field`/`catalogOffset` are allowed
even when the exception row lists fewer code-specific fields. Diagnostics never
include artifact bodies or absolute paths. `publication` is the closed string
`not-committed` or `indeterminate` and appears only on create failure.
