---
title: "GSD CLI Tools Reference"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CLI-TOOLS.md"
sourceRel: "docs/CLI-TOOLS.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CLI-TOOLS.md"
sourceSha256: "f20b888e0702dd3cf206f6e57c0cea5f7e5caf42d7c29eee442a2e85ece7bbeb"
pageSha256: "f20b888e0702dd3cf206f6e57c0cea5f7e5caf42d7c29eee442a2e85ece7bbeb"
contentMode: "local-full"
zh: ""
---

# GSD CLI Tools Reference

> Surface-area reference for `get-shit-done/bin/gsd-tools.cjs` (legacy Node CLI). Workflows and agents should prefer `gsd-sdk query` or `@gsd-build/sdk` where a handler exists — see [SDK and programmatic access](#sdk-and-programmatic-access). For slash commands and user flows, see [Command Reference](/lib/10-context-memory/get-shit-done/docs-COMMANDS).

---

## Overview

`gsd-tools.cjs` centralizes config parsing, model resolution, phase lookup, git commits, summary verification, state management, and template operations across GSD commands, workflows, and agents.

|                    |                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Shipped path**   | `get-shit-done/bin/gsd-tools.cjs`                                                                                                                                                                      |
| **Implementation** | 20 domain modules under `get-shit-done/bin/lib/` (the directory is authoritative)                                                                                                                        |
| **Status**         | Maintained for parity tests and CJS-only entrypoints; `gsd-sdk query` / SDK registry are the supported path for new orchestration (see [QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md)). |

**Usage (CJS):**

```bash
node gsd-tools.cjs <command> [args] [--raw] [--cwd <path>]
```

**Global flags (CJS):**

| Flag           | Description                                                                  |
| -------------- | ---------------------------------------------------------------------------- |
| `--raw`        | Machine-readable output (JSON or plain text, no formatting)                  |
| `--cwd <path>` | Override working directory (for sandboxed subagents)                         |
| `--ws <name>`  | Workstream context (also honored when the SDK spawns this binary; see below) |

---

## SDK and programmatic access

Use this when authoring workflows, not when you only need the command list below.

**1. CLI — `gsd-sdk query <argv…>`**

- Resolves argv with the same **longest-prefix** rules as the typed registry (`resolveQueryArgv` in `sdk/src/query/registry.ts`). Unregistered commands **fail fast** — use `node …/gsd-tools.cjs` only for handlers not in the registry.
- Full matrix (CJS command → registry key, CLI-only tools, aliases, golden tiers): [sdk/src/query/QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md).

**2. TypeScript — `@gsd-build/sdk` (`GSDTools`, `createRegistry`)**

- `GSDTools` now routes through the **SDK Runtime Bridge Module** (`sdk/src/query-runtime-bridge.ts`). Native registry dispatch is preferred; subprocess fallback is explicit policy (`allowFallbackToSubprocess`) and can be disabled for strict SDK-only execution.
- `strictSdk` mode fails fast when a command has no native adapter, making SDK publish/readiness checks deterministic.
- Structured bridge observability is available via `onDispatchEvent` (dispatch mode, fallback reason, duration, outcome, error kind).
- For direct typed dispatch without `GSDTools`, use `createRegistry()` from `sdk/src/query/index.ts`, or invoke `gsd-sdk query` (see [QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md)).
- Conventions: mutation event wiring, `GSDError` vs `\{ data: \{ error \} \}`, locks, and stubs — [QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md).

**CJS → SDK examples (same project directory):**

| Legacy CJS                               | Preferred `gsd-sdk query` (examples) |
| ---------------------------------------- | ------------------------------------ |
| `node gsd-tools.cjs init phase-op 12`    | `gsd-sdk query init phase-op 12`     |
| `node gsd-tools.cjs phase-plan-index 12` | `gsd-sdk query phase-plan-index 12`  |
| `node gsd-tools.cjs state json`          | `gsd-sdk query state json`           |
| `node gsd-tools.cjs roadmap analyze`     | `gsd-sdk query roadmap analyze`      |

**SDK state reads:** `state.json` and `state.load` are both registered query handlers with parity coverage. You can invoke them through `gsd-sdk query …` and through the SDK Runtime Bridge (`GSDTools` → `sdk/src/query-runtime-bridge.ts`), honoring `allowFallbackToSubprocess` / `strictSdk` and emitting `onDispatchEvent` observability. For direct typed dispatch, use `createRegistry()` from `sdk/src/query/index.ts`. Full routing and golden rules: [QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md).

**CLI-only (not in registry):** e.g. **graphify**, **from-gsd2** / **gsd2-import** — call `gsd-tools.cjs` until registered.

**Mutation events (SDK):** `QUERY_MUTATION_COMMANDS` in `sdk/src/query/index.ts` lists commands that may emit structured events after a successful dispatch. Exceptions called out in QUERY-HANDLERS: `state validate` (read-only), `skill-manifest` (writes only with `--write`), `intel update` (stub).

**Golden parity:** Policy and CJS↔SDK test categories are documented under **Golden parity** in [QUERY-HANDLERS.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/sdk/src/query/QUERY-HANDLERS.md).

---

## State Commands

Manage `.planning/STATE.md` — the project's living memory.

```bash
# Load full project config + state as JSON
node gsd-tools.cjs state load

# Output STATE.md frontmatter as JSON
node gsd-tools.cjs state json

# Update a single field
node gsd-tools.cjs state update <field> <value>

# Get STATE.md content or a specific section
node gsd-tools.cjs state get [section]

# Batch update multiple fields
node gsd-tools.cjs state patch --field1 val1 --field2 val2

# Increment plan counter
node gsd-tools.cjs state advance-plan

# Record execution metrics
node gsd-tools.cjs state record-metric --phase N --plan M --duration Xmin [--tasks N] [--files N]

# Recalculate progress bar
node gsd-tools.cjs state update-progress

# Add a decision
node gsd-tools.cjs state add-decision --summary "..." [--phase N] [--rationale "..."]
# Or from files:
node gsd-tools.cjs state add-decision --summary-file path [--rationale-file path]

# Add/resolve blockers
node gsd-tools.cjs state add-blocker --text "..."
node gsd-tools.cjs state resolve-blocker --text "..."

# Record session continuity
node gsd-tools.cjs state record-session --stopped-at "..." [--resume-file path]

# Phase start — update STATE.md Status/Last activity for a new phase
node gsd-tools.cjs state begin-phase --phase N --name SLUG --plans COUNT

# Agent-discoverable blocker signalling (used by discuss-phase / UI flows)
node gsd-tools.cjs state signal-waiting --type TYPE --question "..." --options "A|B" --phase P
node gsd-tools.cjs state signal-resume
```

### State Snapshot

Structured parse of the full STATE.md:

```bash
node gsd-tools.cjs state-snapshot
```

Returns JSON with: current position, phase, plan, status, decisions, blockers, metrics, last activity.

---

## Phase Commands

Manage phases — directories, numbering, and roadmap sync.

```bash
# Find phase directory by number
node gsd-tools.cjs find-phase <phase>

# Calculate next decimal phase number for insertions
node gsd-tools.cjs phase next-decimal <phase>

# Append new phase to roadmap + create directory
node gsd-tools.cjs phase add <description>

# Insert decimal phase after existing
node gsd-tools.cjs phase insert <after> <description>

# Remove phase, renumber subsequent
node gsd-tools.cjs phase remove <phase> [--force]

# Mark phase complete, update state + roadmap
node gsd-tools.cjs phase complete <phase>

# Index plans with waves and status
node gsd-tools.cjs phase-plan-index <phase>

# List phases with filtering
node gsd-tools.cjs phases list [--type planned|executed|all] [--phase N] [--include-archived]
```

---

## Roadmap Commands

Parse and update `ROADMAP.md`.

```bash
# Extract phase section from ROADMAP.md
node gsd-tools.cjs roadmap get-phase <phase>

# Full roadmap parse with disk status
node gsd-tools.cjs roadmap analyze

# Update progress table row from disk
node gsd-tools.cjs roadmap update-plan-progress <N>
```

---

## Config Commands

Read and write `.planning/config.json`.

```bash
# Initialize config.json with defaults
node gsd-tools.cjs config-ensure-section

# Set a config value (dot notation)
node gsd-tools.cjs config-set <key> <value>

# Get a config value
node gsd-tools.cjs config-get <key>

# Set model profile
node gsd-tools.cjs config-set-model-profile <profile>
```

---

## Model Resolution

```bash
# Get model for agent based on current profile
