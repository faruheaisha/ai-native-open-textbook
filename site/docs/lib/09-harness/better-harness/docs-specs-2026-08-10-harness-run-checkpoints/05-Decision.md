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
pageSha256: "1edb00c12c7dda1a1a9d9cf75192ff474e0edc985fc0a92ad06b8453a2b70623"
contentMode: "local-full"
zh: ""
---

## Decision

`HarnessCheckpointV1` is an immutable envelope that records:

1. a pseudonymous topology-root, canonical target identity, and platform
   provenance scope;
2. one topology-root-relative artifact-run reference;
3. bounded list/show facts;
4. typed topology-root-relative artifact references and exact-byte digests;
5. four semantic anchor rows with explicit availability and access; and
6. a digest over the complete envelope.

Creating a checkpoint proves only that the envelope and referenced artifacts
were readable, topology-root-contained, and valid at creation time. It does not
prove report quality beyond the validators actually run and does not retain
old artifact bytes.

### Mapping from Entire CLI

| Entire CLI | Better Harness |
| --- | --- |
| Session | One analysis lifecycle that may publish an artifact run |
| Checkpoint | One sealed post-run state anchor |
| Ephemeral checkpoint | Existing process or caller-owned scratch; not persisted by the MVP |
| Persistent checkpoint | Local `HarnessCheckpointV1` envelope under Better Harness user state |
| Summary | Bounded envelope summary read without opening run artifacts |
| Session content | Typed artifact references plus digests; bodies are not copied |
| Resume | Validated loading of an allowlisted analysis-context projection |
| Rewind/restore | Unsupported; no worktree, Git, config, or native-session mutation |

### Rejected alternatives

1. **Clone Entire's shadow branches and Git refs.** Better Harness anchors
   analysis evidence; it does not intercept commits or preserve code state.
2. **Make component snapshot the checkpoint owner.** Component snapshot owns
   one evidence class. A checkpoint references it without absorbing its schema,
   diff behavior, or non-authorizing rollback contract.
3. **Inline every artifact body.** Reports and private selection snapshots can
   be large or sensitive. V1 remains a bounded index.
4. **Call profile and snapshot digests selection resume.** Reproducing the
   selected subset also needs the normalized plan or a private selected-id
   result. V1 records only the identity of the frozen population artifacts.
5. **Auto-create after `harness analyze`.** Analyze is intentionally read-only
   and often has no durable run directory.
6. **Put the store in a host namespace or accept a per-command store.** Host
   directories can dirty the worktree and turn a partial host slice into a
   checkpoint claim; arbitrary stores become undiscoverable. V1 uses one
   Better Harness state-home resolver, with a process-wide environment override
   for tests/admin policy, while custom run directories remain supported.
