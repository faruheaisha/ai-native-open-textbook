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
pageSha256: "d1644f9d0cf23531f115d7d35ee0e010638f008c606a52f79dd7866ec5a33d0f"
contentMode: "local-full"
zh: ""
---

## Envelope Contract

This example is the normative V1 shape. Values and optional artifact
rows are illustrative. Exact object fields are enforced and unknown fields are
rejected. It intentionally illustrates a findings-only report anchor; the two
selection artifacts are supporting anchors, not report artifacts.

```json
{
  "kind": "HarnessCheckpointV1",
  "schemaVersion": 1,
  "checkpointId": "hcpt_0123456789abcdef0123456789abcdef",
  "createdAt": "2026-08-10T00:00:00.000Z",
  "state": "sealed",
  "scope": {
    "platform": "qoder",
    "topologyContract": { "name": "better-harness.workspace-topology", "version": 1 },
    "topologyRootRef": "hws:local:sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "targetRef": "hwt:local:sha256:1123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    "target": {
      "kind": "workspace-member",
      "route": "packages/app",
      "memberRoute": "packages/app",
      "memberMatch": "exact"
    }
  },
  "run": {
    "runRef": "workspace:.qoder/better-harness/2026-08-10/080000-project"
  },
  "summary": {
    "findingCount": 2,
    "interventionCount": 1,
    "artifactCount": 3,
    "availableAnchorCount": 3
  },
  "artifacts": [
    {
      "kind": "findings",
      "artifactRef": "workspace:.qoder/better-harness/2026-08-10/080000-project/findings.json",
      "mediaType": "application/json",
      "sizeBytes": 4096,
      "byteDigest": "sha256:0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "contract": { "name": "agent-work-loop-v4", "version": 26 }
    },
    {
      "kind": "session-selection-profile",
      "artifactRef": "workspace:.qoder/better-harness/state/selection-profile.json",
      "mediaType": "application/json",
      "sizeBytes": 1024,
      "byteDigest": "sha256:1123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "contract": { "name": "session-selection-profile", "version": 1 }
    },
    {
      "kind": "session-selection-snapshot",
      "artifactRef": "workspace:.qoder/better-harness/state/selection-snapshot.json",
      "mediaType": "application/json",
      "sizeBytes": 2048,
      "byteDigest": "sha256:2123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
      "contract": { "name": "session-selection-fact-snapshot", "version": 1 }
    }
  ],
  "anchors": [
    {
      "kind": "report",
      "state": "available",
      "artifactKinds": ["findings"],
      "access": "inspect-only",
      "continuityPolicy": "none"
    },
    {
      "kind": "learning-capture",
      "state": "available",
      "artifactKinds": ["findings"],
      "access": "resume-context",
      "continuityPolicy": "validated-field-only",
      "selector": "/summary/learningCapture/interventions",
      "projectionContract": { "name": "intervention-ledger", "version": 1 },
      "stateDigest": "sha256:3123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
    },
    {
      "kind": "component-state",
      "state": "unavailable",
      "artifactKinds": [],
      "access": "none",
      "continuityPolicy": "none",
      "reason": "artifact-not-supplied"
    },
    {
      "kind": "session-selection",
      "state": "available",
      "artifactKinds": ["session-selection-profile", "session-selection-snapshot"],
      "access": "inspect-only",
      "continuityPolicy": "none",
      "nativeDigests": {
        "profileDigest": "0123456789abcdef",
        "snapshotDigest": "1123456789abcdef"
      }
    }
  ],
  "capabilities": {
    "resumeContext": ["learning-capture"],
    "mutationAuthorized": false,
    "restoreWorkspace": false
  },
  "checkpointDigest": "sha256:4123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
}
```

### Derived fields

The adapter derives these values after native validation; create callers cannot
supply them, and validate recomputes them from the referenced artifacts and
anchor rows.

| Field | Normative derivation |
| --- | --- |
| `summary.findingCount` | Parsed `findings.findings.length` |
| `summary.interventionCount` | Projected intervention-array length when `learning-capture` is available; otherwise `0` |
| `summary.artifactCount` | `artifacts.length` |
| `summary.availableAnchorCount` | Number of anchor rows whose `state` is `available` |
| `capabilities.resumeContext` | Available anchor kinds whose `access` is `resume-context`, preserving anchor order |
| `capabilities.mutationAuthorized` | Always `false` |
| `capabilities.restoreWorkspace` | Always `false` |
| List row `artifactKinds` | Artifact kinds from the sealed array, preserving intake order |
| List row `availableAnchors` | Available anchor kinds, preserving the four-row anchor order |
| List `status` / `nextCursor` | Catalog scan is `complete`/null only at offset zero without diagnostics; otherwise `partial`/the next earlier fixed-record offset |

The adapter is the single derivation owner for `findingCount`,
`interventionCount`, artifact native contracts, and anchor rows. The substrate
is the single derivation owner for `artifactCount`, `availableAnchorCount`, the
capabilities object, id/time, and envelope digest. During validation, each owner
recomputes only its own fields; the other layer compares the resulting frozen
values and never maintains a second derivation algorithm.

### Identifiers and digests

- `checkpointId` is `hcpt_` plus 32 lowercase random hexadecimal characters
  from 16 cryptographically random bytes. It is not a timestamp, content
  address, Git object, or run id.
- Lists follow descending catalog commit offset. `createdAt` and the opaque id
  do not determine order.
- `topologyRootRef` hashes the normalized canonical topology-root path with the
  algorithm below. It exposes no raw path and is intentionally local. Moving a
  checkout causes `CHECKPOINT_WORKSPACE_MISMATCH`; the supported response is to
  create a fresh checkpoint, never edit the old reference.
- `targetRef` hashes the topology-root ref plus the exact public topology target
  projection (`kind`, `route`, `memberRoute`, `memberMatch`). Two members in one
  Git root therefore have distinct continuity/store scopes.
- `byteDigest` is SHA-256 of the exact bytes read once during creation. Native
  semantic digests never substitute for byte integrity.
- `stateDigest` and `checkpointDigest` use the canonical encoding and distinct
  domain prefixes below. `checkpointDigest` covers every field except itself.
- Summary counts and `capabilities.resumeContext` are derived and validated,
  not caller-authored. Both mutation fields are always false.

### Canonical encoding

`scripts/harness-checkpoint/contract.mjs` owns one `canonicalJson(value)`
implementation and all three domain-separated digest helpers. It accepts only
JSON values: null, booleans, strings, finite numbers, arrays without holes, and
plain objects. It rejects `undefined`, non-finite numbers, bigint, cycles,
non-plain objects, and unpaired Unicode surrogates. Strings and finite numbers
use ECMAScript `JSON.stringify` encoding; object keys sort ascending by Unicode
code point; array order is preserved; no insignificant whitespace is emitted.
All hash inputs are UTF-8 bytes and include the shown NUL byte (`\0`):

```text
topologyRootRef = "hws:local:sha256:" + sha256(
  "better-harness:workspace-ref:v1\0" + normalizedCanonicalWorkspace
)
targetRef = "hwt:local:sha256:" + sha256(
  "better-harness:target-ref:v1\0" + canonicalJson({ topologyRootRef, target })
)
stateDigest = "sha256:" + sha256(
  "better-harness:state:v1\0" + canonicalJson(selectedValue)
)
checkpointDigest = "sha256:" + sha256(
  "better-harness:checkpoint:v1\0" + canonicalJson(envelopeWithoutCheckpointDigest)
)
```

`normalizedCanonicalWorkspace` is the resolved topology-root identity. It starts
from `node:fs.realpathSync.native(path.resolve(topologyRoot))`; it falls back to
`realpathSync` only when `.native` is unavailable, never when native resolution
fails. It maps `\\?\C:\...` to `C:\...` and
`\\?\UNC\server\share\...` to `\\server\share\...`, applies NFC normalization,
converts separators to `/`, and removes a trailing separator except for a
filesystem root. On Windows it lowercases the complete normalized path,
matching the repository's existing filesystem-path identity convention. On
macOS/Linux it preserves the native realpath case: native realpath supplies the
on-disk spelling on case-insensitive macOS volumes, while distinct paths remain
distinct on case-sensitive volumes. The implementation fixtures include these
golden vectors (hex digest only):

| Input after domain prefix | SHA-256 |
| --- | --- |
| workspace `/workspace/demo` | `2d1595ed152363ba65867ad6b465639c4e02fd16fd2b4c76380552d0e604316f` |
| Windows workspace normalized from `C:\Users\ALICE\Demo` to `c:/users/alice/demo` | `869aa663e67a888bcad3bb106a48f4c262bf0bc24d9438c5ad1b732d3d8b7860` |
| case-preserving POSIX workspace `/Users/Alice/Demo` | `399b28208461f461b1c24bc1919b7cd7d16262c27fe6cca4d81b9db69306826a` |
| state `\{"a":1,"b":["x",true]\}` | `ace4cb866f47a3e12db918d5aeabffc4cdce10732bd5b501170a76874cc12860` |
| checkpoint `\{"kind":"HarnessCheckpointV1","schemaVersion":1\}` | `9497144b285361db56ddc4bda56ba13dcab4fe5f5fb7e172eae2cc9b583ac630` |

### Artifact-reference safety

`workspace:` references are relative to the canonical topology root and use
normalized, percent-encoded, forward-slash path
segments. They reject absolute paths, drive and UNC prefixes, NUL, empty routes,
`.` segments, and `..` segments. Creation and artifact validation resolve the
workspace and artifact through the filesystem and reject symlink or junction
escape; lexical containment alone is insufficient.

The requested target must resolve to the topology target recorded in scope. The
run must be a real directory under the topology root. Every artifact must be a
regular file under that same root. Better Harness state home is outside the
root and can never be an artifact. External temp files, host-home files, raw
transcripts, prompts, credentials, and user-global assets cannot be indexed.
