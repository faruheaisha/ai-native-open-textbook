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
pageSha256: "c93480cd77bea6faf54f010e8030b5dccc5bf1cc1612e336178c9bddd60d41b0"
contentMode: "local-full"
zh: ""
---

## Storage and Lifecycle

### Store

`scripts/harness-checkpoint/state-root.mjs` owns one Git-neutral, provider-neutral
state home. Resolution occurs only for real commands, never help:

1. absolute `BETTER_HARNESS_STATE_HOME`, when set;
2. Windows: `%LOCALAPPDATA%/Better Harness`;
3. macOS: `$HOME/Library/Application Support/Better Harness`;
4. other platforms: `$XDG_STATE_HOME/better-harness` when absolute, otherwise
   `$HOME/.local/state/better-harness`.

Missing required environment/home values or a relative override fails with
`CHECKPOINT_STATE_ROOT_UNAVAILABLE`. The environment value is the process-wide
standard state home, not a per-command `--store` override: create/list/show use
the same resolver. Tests inject a private state home without touching real user
state. The resolved path and home path never enter an envelope or JSON output.

Platform admission lowercases the supplied id and calls
`getHostDescriptor(hostId)` over the full `HOST_DESCRIPTORS` registry. Only a
canonical descriptor id is accepted; display names and aliases are rejected.
No capability slice or host-local directory is required: platform is envelope
provenance and a list filter, not ownership of checkpoint storage. This keeps
partial/community host activation independent from the checkpoint capability.

The adapter resolves `--workspace` through `resolveWorkspaceTopology`, requires
a valid public topology contract, and derives:

- `topologyRootRef` from `gitRoot ?? requestedWorkspace`;
- the exact target projection and `targetRef`;
- topology-root-relative run/artifact references; and
- the state-store scope from the digest portions of both refs plus platform.

Both public topology statuses, `complete` and `partial`, are accepted because
the resolver preserves the requested target in either case. The exact target
projection is still sealed: if later, more complete discovery changes that
projection, validate and continuity fail with `CHECKPOINT_TARGET_MISMATCH`
instead of silently widening the target.

Before any state directory is created, the state-root resolver follows every
existing symlink/junction in the candidate's nearest existing ancestor and
projects the remaining segments from that canonical ancestor. It rejects a
candidate whose effective location is inside the canonical topology root. It
rechecks the created state root with native realpath before writing an envelope.
A relative, non-directory, unresolved, or topology-root-contained state home
fails with `CHECKPOINT_STATE_ROOT_UNSAFE`; directory creation must not be the
first operation that discovers the escape.

The only V1 envelope store is:

```text
