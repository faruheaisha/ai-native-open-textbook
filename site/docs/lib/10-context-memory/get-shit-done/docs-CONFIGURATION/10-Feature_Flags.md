---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "fa5d232899311f9a5e7e61a11643ed9a879bb2b86264c6b4e7da50ac44fd90d9"
contentMode: "local-full"
zh: ""
---

## Feature Flags

Toggle optional capabilities via the `features.*` config namespace. Feature flags default to `false` (disabled) — enabling a flag opts into new behavior without affecting existing workflows.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `features.thinking_partner` | boolean | `false` | Enable thinking partner analysis at workflow decision points |
| `features.global_learnings` | boolean | `false` | Enable cross-project learnings pipeline (auto-copy at phase completion, planner injection) |
| `learnings.max_inject` | number | `10` | Maximum number of cross-project learnings injected into each planner prompt. Lower values reduce prompt size; higher values provide broader historical context |
| `intel.enabled` | boolean | `false` | Enable queryable codebase intelligence system. When `true`, `/gsd-map-codebase --query` commands build and query a JSON index in `.planning/intel/`. Added in v1.34 |

### Graphify Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `graphify.enabled` | boolean | `false` | Enable the project knowledge graph. When `true`, `/gsd-graphify` builds and queries a graph in `.planning/graphs/`. Added in v1.36 |
| `graphify.build_timeout` | number (seconds) | `300` | Maximum seconds allowed for a `/gsd-graphify build` run before it aborts. Added in v1.36 |
| `graphify.auto_update` | boolean | `false` | **Opt-in (issue #3347).** When `true` (and `graphify.enabled` is also `true`), the bundled PostToolUse hook `hooks/gsd-graphify-update.sh` auto-rebuilds the project knowledge graph in a detached background process after `git commit/merge/pull/rebase --continue/cherry-pick` on the default branch (`git.base_branch` override, else `main`/`master`/`trunk`). Hook returns instantly; the rebuild updates `.planning/graphs/\{graph.json,graph.html,GRAPH_REPORT.md\}` and writes `.planning/graphs/.last-build-status.json` (`\{ts, status: "running"\|"ok"\|"failed", exit_code, duration_ms, head_at_build\}`). PID-locked, CI-aware (`$CI` env suppresses), bails silently if `graphify` is not on `PATH`. Default `false` so existing behaviour is unchanged after upgrade. |

#### Multi-developer setup

If multiple developers will rebuild the graph in the same repo, run once per
clone after enabling graphify:

```bash
graphify hook install
```

This installs a git merge driver that union-merges concurrent `graph.json`
writes (no conflict markers in the knowledge graph), plus the post-commit
rebuild hook. It writes `.gitattributes` and registers `graphify
merge-driver` in `.git/config`. Solo projects can skip this step; running it
anyway is harmless. Introduced upstream in graphify v0.7.0 alongside the
`built_at_commit` freshness signal that `/gsd-graphify status` surfaces.

#### Commit-based staleness

`/gsd-graphify status` reports two orthogonal staleness signals:

- **`stale`** (mtime-based, 24-hour window) — when the graph file was last
  written. Useful when graphify isn't run automatically.
- **`commit_stale`** (commit-based, requires graphify v0.7+) — whether the
  graph was built against the current `git HEAD`. Trustworthy when present.
  Tri-state: `true` / `false` / `null`. `null` means the signal is
  unavailable (pre-v0.7 graph, no git, or unreachable commit) — fall back
  to the mtime flag.

A CI-built graph rebuilt minutes ago against an old checkout will read as
fresh on mtime but `commit_stale: true`. Surface both when answering
architecture questions.

### Usage

```bash
# Enable a feature
gsd-sdk query config-set features.global_learnings true

# Disable a feature
gsd-sdk query config-set features.thinking_partner false
```

The `features.*` namespace is a dynamic key pattern — new feature flags can be added without modifying `VALID_CONFIG_KEYS`. Any key matching `features.<name>` is accepted by the config system.
