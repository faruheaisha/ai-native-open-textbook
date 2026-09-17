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
pageSha256: "87459d5bcd9ee4bfe3d30eae84fe87b5d93c70dbaee7f33e99bae9cf6a15b038"
contentMode: "local-full"
zh: ""
---

## Planning Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `planning.commit_docs` | boolean | `true` | Whether `.planning/` files are committed to git |
| `planning.search_gitignored` | boolean | `false` | Add `--no-ignore` to broad searches to include `.planning/` |
| `planning.sub_repos` | array of strings | `[]` | Paths of nested sub-repos relative to the project root. When set, GSD-aware tooling scopes phase-lookup, path-resolution, and commit operations per sub-repo instead of treating the outer repo as a monorepo |

### Project-Root Resolution in Multi-Repo Workspaces

When `sub_repos` is set and `gsd-tools.cjs` or `gsd-sdk query` is invoked from inside a listed child repo, both CLIs walk up to the parent workspace that owns `.planning/` before dispatching handlers. Resolution order (checked at each ancestor up to 10 levels, never above `$HOME`):

1. If the starting directory already has its own `.planning/`, it is the project root (no walk-up).
2. Parent has `.planning/config.json` listing the starting directory's top-level segment in `sub_repos` (or the legacy `planning.sub_repos` shape).
3. Parent has `.planning/config.json` with legacy `multiRepo: true` and the starting directory is inside a git repo.
4. Parent has `.planning/` and an ancestor up to the candidate parent contains `.git` (heuristic fallback).

If none match, the starting directory is returned unchanged. Explicit `--project-dir /path/to/workspace` is idempotent under this resolution.

### Auto-Detection

If `.planning/` is in `.gitignore`, `commit_docs` is automatically `false` regardless of config.json. This prevents git errors.
