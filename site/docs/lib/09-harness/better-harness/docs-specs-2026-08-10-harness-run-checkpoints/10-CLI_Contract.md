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
pageSha256: "3db91ea9dcb118f136076cd050252d2f092b3f38c688c2053416d059672e18b8"
contentMode: "local-full"
zh: ""
---

## CLI Contract

The root registry adds one `advanced` leaf, `harness checkpoint`, backed by
`scripts/harness-analysis/checkpoint-cli.mjs`:

```text
better-harness harness checkpoint create --workspace <dir> --platform <host> --run-dir <dir> [--source <file>] [--component-snapshot <file>] [--selection-profile <file> --selection-snapshot <file>] [--json]
better-harness harness checkpoint list --workspace <dir> --platform <host> [--limit <n>] [--cursor <opaque>] [--scan-limit <n>] [--json]
better-harness harness checkpoint show <id> --workspace <dir> --platform <host> [--json]
better-harness harness checkpoint validate <id> --workspace <dir> --platform <host> [--json]
better-harness harness checkpoint validate --checkpoint <file> --workspace <dir> [--json]
```

Selection profile and snapshot flags are a required pair; supplying exactly one
is invalid usage and exits 64.

File-mode validation reads `scope.platform` from the envelope, does not access a
store, and resolves `--workspace` to verify exact topology-root/target binding
and artifact references. `--checkpoint` and a positional id are mutually
exclusive.

- `create` is the only write action; it writes only Better Harness user state:
  missing store directories, one envelope, and one catalog record.
- `list` reads a bounded catalog tail and referenced envelopes, defaults to 20,
  caps rows at 200/scan at 1000, and performs no network or artifact reads.
  Unreadable/corrupt entries or remaining cursor history produce a partial result.
- `show` reads one envelope and reports that artifact verification was not run.
- `validate` verifies envelope/digest, topology-root/target, artifact bytes/contracts,
  anchors, summary, and capabilities.
- Help performs no filesystem, workspace, Git, host-home, or network access.
- JSON mode emits one parser-safe document on stdout. Invalid usage exits 64,
  success 0, partial list 2, and operational/validation failure 1.

The command stays advanced until an end-to-end continuity journey is validated.
Continuity loading is adapter/consumer-only in V1; there is no root CLI
`resume`, `continuity`, or context-dump action.
