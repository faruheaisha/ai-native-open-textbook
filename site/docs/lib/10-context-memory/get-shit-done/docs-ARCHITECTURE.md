---
title: "GSD Architecture"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ARCHITECTURE.md"
sourceRel: "docs/ARCHITECTURE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/ARCHITECTURE.md"
sourceSha256: "21381b7c30a3418720fdffe737e1da2381a21560729b12b2a05108db7dca6bef"
pageSha256: "21381b7c30a3418720fdffe737e1da2381a21560729b12b2a05108db7dca6bef"
contentMode: "local-full"
zh: ""
---

# GSD Architecture

> System architecture for contributors and advanced users. For user-facing documentation, see [Feature Reference](/lib/10-context-memory/get-shit-done/docs-FEATURES/index) or [User Guide](/lib/10-context-memory/get-shit-done/docs-USER-GUIDE/index).

---

## Table of Contents

- [System Overview](#system-overview)
- [Design Principles](#design-principles)
- [Component Architecture](#component-architecture)
- [Agent Model](#agent-model)
- [Data Flow](#data-flow)
- [File System Layout](#file-system-layout)
- [Installer Architecture](#installer-architecture)
- [Hook System](#hook-system)
- [CLI Tools Layer](#cli-tools-layer)
- [Runtime Abstraction](#runtime-abstraction)

---

## System Overview

GSD is a **meta-prompting framework** that sits between the user and AI coding agents (Claude Code, Gemini CLI, OpenCode, Kilo, Codex, Copilot, Antigravity, Trae, Cline, Augment Code). It provides:

1. **Context engineering** — Structured artifacts that give the AI everything it needs per task
2. **Multi-agent orchestration** — Thin orchestrators that spawn specialized agents with fresh context windows
3. **Spec-driven development** — Requirements → research → plans → execution → verification pipeline
4. **State management** — Persistent project memory across sessions and context resets

```
┌──────────────────────────────────────────────────────┐
│                      USER                            │
│            /gsd-command [args]                        │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────┐
│              COMMAND LAYER                            │
│   commands/gsd/*.md — Prompt-based command files      │
│   (Claude Code custom commands / Codex skills)        │
└─────────────────────┬────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────┐
│              WORKFLOW LAYER                           │
│   get-shit-done/workflows/*.md — Orchestration logic  │
│   (Reads references, spawns agents, manages state)    │
└──────┬──────────────┬─────────────────┬──────────────┘
       │              │                 │
┌──────▼──────┐ ┌─────▼─────┐ ┌────────▼───────┐
│  AGENT      │ │  AGENT    │ │  AGENT         │
│  (fresh     │ │  (fresh   │ │  (fresh        │
│   context)  │ │   context)│ │   context)     │
└──────┬──────┘ └─────┬─────┘ └────────┬───────┘
       │              │                 │
┌──────▼──────────────▼─────────────────▼──────────────┐
│              CLI TOOLS LAYER                          │
│   gsd-sdk query (sdk/src/query) + gsd-tools.cjs       │
│   Programmatic SDK bridge: GSDTools/query-runtime-bridge.ts │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│              FILE SYSTEM (.planning/)                 │
│   PROJECT.md | REQUIREMENTS.md | ROADMAP.md          │
│   STATE.md | config.json | phases/ | research/       │
└──────────────────────────────────────────────────────┘
```

---

## Design Principles

### 1. Fresh Context Per Agent

Every agent spawned by an orchestrator gets a clean context window (up to 200K tokens). This eliminates context rot — the quality degradation that happens as an AI fills its context window with accumulated conversation.

### 2. Thin Orchestrators

Workflow files (`get-shit-done/workflows/*.md`) never do heavy lifting. They:

- Load context via `gsd-sdk query init.<workflow>` (or legacy `gsd-tools.cjs init <workflow>`)
- Spawn specialized agents with focused prompts
- Collect results and route to the next step
- Update state between steps

### 3. File-Based State

All state lives in `.planning/` as human-readable Markdown and JSON. No database, no server, no external dependencies. This means:

- State survives context resets (`/clear`)
- State is inspectable by both humans and agents
- State can be committed to git for team visibility

### 4. Absent = Enabled

Workflow feature flags follow the **absent = enabled** pattern. If a key is missing from `config.json`, it defaults to `true`. Users explicitly disable features; they don't need to enable defaults.

### 5. Defense in Depth

Multiple layers prevent common failure modes:

- Plans are verified before execution (plan-checker agent)
- Execution produces atomic commits per task
- Post-execution verification checks against phase goals
- UAT provides human verification as final gate

---

## Component Architecture

### Commands (`commands/gsd/*.md`)

User-facing entry points. Each file contains YAML frontmatter (name, description, allowed-tools) and a prompt body that bootstraps the workflow. Commands are installed as:

- **Claude Code:** Custom slash commands (hyphen form, `/gsd-command-name`)
- **OpenCode / Kilo:** Slash commands (hyphen form, `/gsd-command-name`)
- **Codex:** Skills (`$gsd-command-name`)
- **Copilot:** Slash commands (hyphen form, `/gsd-command-name`)
- **Gemini CLI:** Slash commands under the `gsd:` namespace (colon form, `/gsd:command-name`) — Gemini namespaces all custom commands under their plugin id, so the install path rewrites every body-text reference to colon form
- **Antigravity:** Skills

**Total commands:** see [`docs/INVENTORY.md`](/lib/10-context-memory/get-shit-done/docs-INVENTORY#commands) for the authoritative count and full roster.

#### Two-stage hierarchical routing (v1.40, [#2792](https://github.com/gsd-build/get-shit-done/issues/2792))

To keep the eager skill-listing token cost low, v1.40 introduces six namespace **meta-skills** (`gsd-workflow`, `gsd-project`, `gsd-quality`, `gsd-context`, `gsd-manage`, `gsd-ideate` — sourced from `commands/gsd/ns-*.md`, but the invocable `name:` is the bare form shown here) layered above the concrete sub-skills. The model sees 6 namespace routers (~120 tokens) instead of a flat 86-skill listing (~2,150 tokens), selects a namespace, then routes to the concrete sub-skill via a routing table embedded in the namespace router's body. Namespace skills are **additive** — every concrete command is still directly invocable.

The router descriptions use pipe-separated keyword tags (≤ 60 chars) per the Tool Attention research showing keyword-dense tags outperform prose for routing at ~40 % the token cost.

#### MCP token-budget interaction

The eager skill listing is one of two recurring per-turn token costs. The other is the MCP tool schema injected by every enabled MCP server in `.claude/settings.json`. Heavyweight MCP servers (browser/playwright, Mac-tools, Windows-tools) can each cost 20 k+ tokens per turn — often dwarfing what `model_profile` tuning saves. The toggle lives in the Claude Code harness (`enabledMcpjsonServers` / `disabledMcpjsonServers` in `.claude/settings.json`) and is **not** a GSD concern. Together, the two-stage routing layer (#2792) and disciplined MCP enablement are the largest cost levers per turn. See [`docs/USER-GUIDE.md`](/lib/10-context-memory/get-shit-done/docs-USER-GUIDE/index) and `references/context-budget.md` for the audit checklist.

### Workflows (`get-shit-done/workflows/*.md`)

Orchestration logic that commands reference. Contains the step-by-step process including:

- Context loading via `gsd-sdk query` init handlers (or legacy `gsd-tools.cjs init`)
- Agent spawn instructions with model resolution
- Gate/checkpoint definitions
- State update patterns
- Error handling and recovery

**Total workflows:** see [`docs/INVENTORY.md`](/lib/10-context-memory/get-shit-done/docs-INVENTORY#workflows) for the authoritative count and full roster.

#### Progressive disclosure for workflows

Workflow files are loaded verbatim into Claude's context every time the
corresponding `/gsd-*` command is invoked. To keep that cost bounded, the
workflow size budget enforced by `tests/workflow-size-budget.test.cjs`
mirrors the agent budget from #2361:

| Tier      | Per-file line limit |
|-----------|--------------------|
| `XL`      | 1700 — top-level orchestrators (`execute-phase`, `plan-phase`, `new-project`) |
| `LARGE`   | 1500 — multi-step planners and large feature workflows |
| `DEFAULT` | 1000 — focused single-purpose workflows (the target tier) |

`workflows/discuss-phase.md` is held to a stricter <500-line ceiling per
issue #2551. When a workflow grows beyond its tier, extract per-mode bodies
into `workflows/<workflow>/modes/<mode>.md`, templates into
`workflows/<workflow>/templates/`, and shared knowledge into
`get-shit-done/references/`. The parent file becomes a thin dispatcher that
Reads only the mode and template files needed for the current invocation.

`workflows/discuss-phase/` is the canonical example of this pattern —
parent dispatches, modes/ holds per-flag behavior (`power.md`, `all.md`,
`auto.md`, `chain.md`, `text.md`, `batch.md`, `analyze.md`, `default.md`,
`advisor.md`), and templates/ holds CONTEXT.md, DISCUSSION-LOG.md, and
checkpoint.json schemas that are read only when the corresponding output
file is being written.

### Agents (`agents/*.md`)

Specialized agent definitions with frontmatter specifying:

- `name` — Agent identifier
- `description` — Role and purpose
- `tools` — Allowed tool access (Read, Write, Edit, Bash, Grep, Glob, WebSearch, etc.)
- `color` — Terminal output color for visual distinction

**Total agents:** 33

### References (`get-shit-done/references/*.md`)

Shared knowledge documents that workflows and agents `@-reference` (see [`docs/INVENTORY.md`](/lib/10-context-memory/get-shit-done/docs-INVENTORY#references-41-shipped) for the authoritative count and full roster):

**Core references:**

- `checkpoints.md` — Checkpoint type definitions and interaction patterns
- `gates.md` — 4 canonical gate types (Confirm, Quality, Safety, Transition) wired into plan-checker and verifier
- `model-profiles.md` — Per-agent model tier assignments
- `model-profile-resolution.md` — Model resolution algorithm documentation
- `verification-patterns.md` — How to verify different artifact types
- `verification-overrides.md` — Per-artifact verification override rules
- `planning-config.md` — Full config schema and behavior
- `git-integration.md` — Git commit, branching, and history patterns
- `git-planning-commit.md` — Planning directory commit conventions
- `questioning.md` — Dream extraction philosophy for project initialization
- `tdd.md` — Test-driven development integration patterns
- `ui-brand.md` — Visual output formatting patterns
- `common-bug-patterns.md` — Common bug patterns for code review and verification

**Workflow references:**

- `agent-contracts.md` — Formal interface between orchestrators and agents
- `context-budget.md` — Context window budget allocation rules
- `continuation-format.md` — Session continuation/resume format
- `domain-probes.md` — Domain-specific probing questions for discuss-phase
- `gate-prompts.md` — Gate/checkpoint prompt templates
- `revision-loop.md` — Plan revision iteration patterns
- `universal-anti-patterns.md` — Common anti-patterns to detect and avoid
- `artifact-types.md` — Planning artifact type definitions
- `phase-argument-parsing.md` — Phase argument parsing conventions
- `decimal-phase-calculation.md` — Decimal sub-phase numbering rules
- `workstream-flag.md` — Workstream active pointer conventions
- `user-profiling.md` — User behavioral profiling methodology
- `thinking-partner.md` — Conditional thinking partner activation at decision points

**Thinking model references:**

References for integrating thinking-class models (o3, o4-mini, Gemini 2.5 Pro) into GSD workflows:

- `thinking-models-debug.md` — Thinking model patterns for debugging workflows
- `thinking-models-execution.md` — Thinking model patterns for execution agents
- `thinking-models-planning.md` — Thinking model patterns for planning agents
- `thinking-models-research.md` — Thinking model patterns for research agents
- `thinking-models-verification.md` — Thinking model patterns for verification agents

**Modular planner decomposition:**

The planner agent (`agents/gsd-planner.md`) was decomposed from a single monolithic file into a core agent plus reference modules to stay under the 50K character limit imposed by some runtimes:

- `planner-gap-closure.md` — Gap closure mode behavior (reads VERIFICATION.md, targeted replanning)
- `planner-reviews.md` — Cross-AI review integration (reads REVIEWS.md from `/gsd-review`)
- `planner-revision.md` — Plan revision patterns for iterative refinement

### Templates (`get-shit-done/templates/`)

Markdown templates for all planning artifacts. Used by `gsd-sdk query template.fill` / `phase.scaffold` (and legacy `gsd-tools.cjs template fill` / top-level `scaffold`) to create pre-structured files:
- `project.md`, `requirements.md`, `roadmap.md`, `state.md` — Core project files
- `phase-prompt.md` — Phase execution prompt template
- `summary.md` (+ `summary-minimal.md`, `summary-standard.md`, `summary-complex.md`) — Granularity-aware summary templates
- `DEBUG.md` — Debug session tracking template
- `UI-SPEC.md`, `UAT.md`, `VALIDATION.md` — Specialized verification templates
- `discussion-log.md` — Discussion audit trail template
- `codebase/` — Brownfield mapping templates (stack, architecture, conventions, concerns, structure, testing, integrations)
- `research-project/` — Research output templates (SUMMARY, STACK, FEATURES, ARCHITECTURE, PITFALLS)

### Hooks (`hooks/`)

Runtime hooks that integrate with the host AI agent:

| Hook | Event | Purpose |
|------|-------|---------|
| `gsd-statusline.js` | `statusLine` | Displays model, task, directory, and context usage bar |
| `gsd-context-monitor.js` | `PostToolUse` / `AfterTool` | Injects agent-facing context warnings at 35%/25% remaining |
| `gsd-check-update.js` | `SessionStart` | Foreground trigger for the background update check |
| `gsd-check-update-worker.js` | (helper) | Background worker spawned by `gsd-check-update.js`; no direct event registration |
| `gsd-prompt-guard.js` | `PreToolUse` | Scans `.planning/` writes for prompt injection patterns (advisory) |
| `gsd-read-injection-scanner.js` | `PostToolUse` | Scans Read tool output for injected instructions in untrusted content |
| `gsd-workflow-guard.js` | `PreToolUse` | Detects file edits outside GSD workflow context (advisory, opt-in via `hooks.workflow_guard`) |
| `gsd-read-guard.js` | `PreToolUse` | Advisory guard preventing Edit/Write on files not yet read in the session |
| `gsd-session-state.sh` | `PostToolUse` | Session state tracking for shell-based runtimes |
| `gsd-validate-commit.sh` | `PostToolUse` | Commit validation for conventional commit enforcement |
| `gsd-phase-boundary.sh` | `PostToolUse` | Phase boundary detection for workflow transitions |

See [`docs/INVENTORY.md`](/lib/10-context-memory/get-shit-done/docs-INVENTORY#hooks-11-shipped) for the authoritative 11-hook roster.

### SDK Runtime Bridge Module (`sdk/src/query-runtime-bridge.ts`)

Programmatic SDK callers (`GSDTools`) route through one seam that owns query dispatch policy:

- Native registry dispatch preference
- Explicit subprocess fallback policy (`allowFallbackToSubprocess`)
- Strict SDK mode (`strictSdk`) for fail-fast native-only enforcement
- Structured dispatch observability (`onDispatchEvent`) with mode, reason, duration, and outcome

This keeps callers thin adapters and centralizes transport decisions for SDK publishability.

### Command Routing Hub (`get-shit-done/bin/lib/command-routing-hub.cjs`)

CJS command family routers migrate to dispatch through `CommandRoutingHub` incrementally. `phase-command-router.cjs` is the first migration (issue #3788); remaining routers (`phases-command-router.cjs`, `roadmap-command-router.cjs`, etc.) continue using `routeCjsCommandFamily` until migrated in follow-up issues. The hub owns three cross-cutting concerns that each router previously duplicated: (1) mode selection (`sdk` when `tryLoadSdk()` succeeds and no `GSD_WORKSTREAM` is active, `cjs` otherwise), set once at construction; (2) a no-throw pure-result contract (`hub.dispatch()` catches all exceptions and returns `\{ ok: false, errorKind, message, details \}` instead of propagating); and (3) a closed six-value `errorKind` enum exported as the frozen `ERROR_KINDS` object. Router adapters remain thin CLI translators — they build the hub, call `dispatch`, then map the Result to `output()`/`error()` calls. No transparent SDK→CJS fallback: an SDK-mode hub that encounters a load or dispatch failure returns `SdkLoadFailed` or `SdkDispatchFailed` without retrying via CJS. See `docs/adr/0012-command-routing-hub.md`.

### CLI Tools (`get-shit-done/bin/`)

Node.js CLI utility (`gsd-tools.cjs`) with domain modules split across `get-shit-done/bin/lib/` (see [`docs/INVENTORY.md`](/lib/10-context-memory/get-shit-done/docs-INVENTORY#cli-modules-33-shipped) for the authoritative roster):

| Module                 | Responsibility                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------- |
| `core.cjs`             | Error handling, output formatting, shared utilities; compatibility re-exports for planning helpers |
| `planning-workspace.cjs` | Planning seam (`planningDir`, `planningPaths`, active workstream routing, `.planning/.lock`)      |
| `state.cjs`            | STATE.md parsing, updating, progression, metrics                                                    |
| `phase.cjs`            | Phase directory operations, decimal numbering, plan indexing                                        |
| `roadmap.cjs`          | ROADMAP.md parsing, phase extraction, plan progress                                                 |
| `config.cjs`           | config.json read/write, section initialization                                                      |
| `verify.cjs`           | Plan structure, phase completeness, reference, commit validation                                    |
| `template.cjs`         | Template selection and filling with variable substitution                                           |
| `frontmatter.cjs`      | YAML frontmatter CRUD operations                                                                    |
| `init.cjs`             | Compound context loading for each workflow type                                                     |
| `milestone.cjs`        | Milestone archival, requirements marking                                                            |
| `commands.cjs`         | Misc commands (slug, timestamp, todos, scaffolding, stats)                                          |
| `model-profiles.cjs`   | Model profile resolution table                                                                      |
| `security.cjs`         | Path traversal prevention, prompt injection detection, safe JSON parsing, shell argument validation |
| `uat.cjs`              | UAT file parsing, verification debt tracking, audit-uat support                                     |
| `docs.cjs`             | Docs-update workflow init, Markdown scanning, monorepo detection                                    |
| `workstream.cjs`       | Workstream CRUD, migration, session-scoped active pointer                                           |
| `schema-detect.cjs`    | Schema-drift detection for ORM patterns (Prisma, Drizzle, etc.)                                     |
| `profile-pipeline.cjs` | User behavioral profiling data pipeline, session file scanning                                      |
| `profile-output.cjs`   | Profile rendering, USER-PROFILE.md and dev-preferences.md generation                                |

---

## Agent Model

### Orchestrator → Agent Pattern

```
Orchestrator (workflow .md)
    │
    ├── Load context: gsd-sdk query init.<workflow> <phase> (or legacy gsd-tools.cjs init)
    │   Returns JSON with: project info, config, state, phase details
    │
