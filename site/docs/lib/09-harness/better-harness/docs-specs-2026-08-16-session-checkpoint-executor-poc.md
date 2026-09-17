---
title: "Continue a Pi session checkpoint into a new Git commit"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-16-session-checkpoint-executor-poc.md"
sourceRel: "docs/specs/2026-08-16-session-checkpoint-executor-poc.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-16-session-checkpoint-executor-poc.md"
sourceSha256: "aa841b6ba817aeeafe7a43257a7358d6d68430c749f33db88e88168c0b8ba970"
pageSha256: "aa841b6ba817aeeafe7a43257a7358d6d68430c749f33db88e88168c0b8ba970"
contentMode: "local-full"
zh: ""
---

# Continue a Pi session checkpoint into a new Git commit

## Traceability

- Spec ID: session-checkpoint-executor-poc
- Status: Implemented

## Intent

Prove the smallest safe execution path that combines an immutable Git source
checkpoint with one exact point in a coding-agent session. Given a repository,
a base commit, a Pi session JSONL file, a session entry id, and a continuation
prompt, Better Harness creates an isolated detached worktree, continues the Pi
conversation from that entry, and records the resulting file changes as a new
commit whose single parent is the resolved base commit.

The POC treats the Git commit and the Pi entry as a caller-supplied checkpoint
pair. It records and revalidates both halves, but it cannot infer that the
historical worktree used by the original session exactly matched the supplied
commit. The resulting commit is kept reachable through a namespaced ref; no
user branch, index, or working tree is switched or updated.

## Acceptance Scenarios

- AC-1: `harness-session-executor plan` resolves the repository, base commit
  and tree, parses the Pi JSONL session without rewriting it, validates the
  selected entry's parent chain, and writes a versioned plan containing full
  immutable ids and SHA-256 digests. Planning does not create a worktree,
  commit, or ref.
- AC-2: `harness-session-executor run --plan <file> --yes` revalidates the plan
  digest, base commit/tree, source session digest, session identity, selected
  entry, and output-ref absence before invoking a model or mutating Git state.
- AC-3: execution forks the Pi JSONL into execution-owned metadata, selects the
  exact entry as the active leaf, and continues it inside a detached worktree at
  the base commit. The live Pi runtime exposes only repository-contained read,
  list, edit, and write tools; shell commands, extensions, skills, prompt
  templates, deletion, and paths through `.git` are unavailable. The runner
  also aborts after 64 tool calls or 15 minutes.
- AC-4: when the continuation changes files, the executor stages only the
  isolated worktree and creates a commit with exactly one parent (the base
  commit), deterministic provenance trailers, and a
