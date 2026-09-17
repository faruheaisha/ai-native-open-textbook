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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/FEATURES.md"
sourceRel: "docs/FEATURES.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/FEATURES.md"
sourceSha256: "61edc3296bf4ef591d33619cc636f09ee0f1c5e7f6efa257be1536b819f28e69"
pageSha256: "284a4f2e4dbf2fecf191b6d24a1e66166f8298d45557d96dbb7cc5e5f20dd80b"
contentMode: "local-full"
zh: ""
---

## Brownfield Features

### 27. Codebase Mapping

**Command:** `/gsd-map-codebase [area]`

**Purpose:** Analyze an existing codebase before starting a new project, so GSD understands what exists.

**Requirements:**
- REQ-MAP-01: System MUST spawn parallel mapper agents for each analysis area
- REQ-MAP-02: System MUST produce structured documents in `.planning/codebase/`
- REQ-MAP-03: System MUST detect: tech stack, architecture patterns, coding conventions, concerns
- REQ-MAP-04: Subsequent `/gsd-new-project` MUST load codebase mapping and focus questions on what's being added
- REQ-MAP-05: Optional `[area]` argument MUST scope mapping to a specific area

**Produces:**
| Document | Content |
|----------|---------|
| `STACK.md` | Languages, frameworks, databases, infrastructure |
| `ARCHITECTURE.md` | Patterns, layers, data flow, boundaries |
| `CONVENTIONS.md` | Naming, file organization, code style, testing patterns |
| `CONCERNS.md` | Technical debt, security issues, performance bottlenecks |
| `STRUCTURE.md` | Directory layout and file organization |
| `TESTING.md` | Test infrastructure, coverage, patterns |
| `INTEGRATIONS.md` | External services, APIs, third-party dependencies |

**Incremental remap — `--paths` (#2003):** The mapper accepts an optional
`--paths <p1,p2,...>` scope hint. When provided, it restricts exploration
to the listed repo-relative prefixes instead of scanning the whole tree.
This is the pathway used by the post-execute codebase-drift gate to refresh
only the subtrees the phase actually changed. Each produced document carries
`last_mapped_commit` in its YAML frontmatter so drift can be measured
against the mapping point, not HEAD.

### 27a. Post-Execute Codebase Drift Detection

**Introduced by:** #2003
**Trigger:** Runs automatically at the end of every `/gsd-execute-phase`
**Configuration:**
- `workflow.drift_threshold` (integer, default `3`) — minimum new
  structural elements before the gate acts.
- `workflow.drift_action` (`warn` | `auto-remap`, default `warn`) —
  warn-only or spawn `gsd-codebase-mapper` with `--paths` scoped to
  affected subtrees.

**What counts as drift:**
- New directory outside mapped paths
- New barrel export at `(packages|apps)/*/src/index.*`
- New migration file (supabase/prisma/drizzle/src/migrations/…)
- New route module under `routes/` or `api/`

**Non-blocking guarantee:** any internal failure (missing STRUCTURE.md,
git errors, mapper spawn failure) logs a single line and the phase
continues. Drift detection cannot fail verification.

**Requirements:**
- REQ-DRIFT-01: System MUST detect the four drift categories from `git diff
  --name-status last_mapped_commit..HEAD`
- REQ-DRIFT-02: Action fires only when element count ≥ `workflow.drift_threshold`
- REQ-DRIFT-03: `warn` action MUST NOT spawn any agent
- REQ-DRIFT-04: `auto-remap` action MUST pass sanitized `--paths` to the mapper
- REQ-DRIFT-05: Detection/remap failure MUST be non-blocking for `/gsd-execute-phase`
- REQ-DRIFT-06: `last_mapped_commit` round-trip through YAML frontmatter
  on each `.planning/codebase/*.md` file
