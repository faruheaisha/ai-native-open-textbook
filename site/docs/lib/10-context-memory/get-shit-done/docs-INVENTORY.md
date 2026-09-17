---
title: "GSD Shipped Surface Inventory"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/INVENTORY.md"
sourceRel: "docs/INVENTORY.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/INVENTORY.md"
sourceSha256: "6d1244e355990987e6f8548d57c393589638ab960ee7c87828ad23d0b39f7acf"
pageSha256: "6d1244e355990987e6f8548d57c393589638ab960ee7c87828ad23d0b39f7acf"
contentMode: "local-full"
zh: ""
---

# GSD Shipped Surface Inventory

> Authoritative roster of every shipped GSD surface: commands, agents, workflows, references, CLI modules, and hooks. Where the broad docs (AGENTS.md, COMMANDS.md, ARCHITECTURE.md, CLI-TOOLS.md) diverge from the filesystem, treat this file and the repository tree itself as the source of truth.

## How To Use This File

- Counts here are derived from the filesystem at the v1.36.0 pin and may drift between releases. For live counts, run `ls commands/gsd/*.md | wc -l`, `ls agents/gsd-*.md | wc -l`, etc. against the checkout.
- This file enumerates every shipped surface across all six families (agents, commands, workflows, references, CLI modules, hooks). Broad docs may render narrative or curated subsets; when they disagree with the filesystem, this file and the directory listings are authoritative.
- New surfaces added after v1.36.0 should land here first, then propagate to the broad docs. The drift-control tests in `tests/inventory-counts.test.cjs`, `tests/commands-doc-parity.test.cjs`, `tests/agents-doc-parity.test.cjs`, `tests/cli-modules-doc-parity.test.cjs`, `tests/hooks-doc-parity.test.cjs`, `tests/architecture-counts.test.cjs`, and `tests/command-count-sync.test.cjs` anchor the counts and roster contents against the filesystem.

---

## Agents (33 shipped)

Full roster at `agents/gsd-*.md`. The "Primary doc" column flags whether [`docs/AGENTS.md`](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/AGENTS.md) carries a full role card (*primary*), a short stub in the "Advanced and Specialized Agents" section (*advanced stub*), or no coverage (*inventory only*).

| Agent | Role (one line) | Spawned by | Primary doc |
|-------|-----------------|------------|-------------|
| gsd-project-researcher | Researches domain ecosystem before roadmap creation (stack, features, architecture, pitfalls). | `/gsd-new-project`, `/gsd-new-milestone` | primary |
| gsd-phase-researcher | Researches implementation approach for a specific phase before planning. | `/gsd-plan-phase` | primary |
| gsd-ui-researcher | Produces UI design contracts for frontend phases. | `/gsd-ui-phase` | primary |
| gsd-assumptions-analyzer | Produces evidence-backed assumptions for discuss-phase (assumptions mode). | `discuss-phase-assumptions` workflow | primary |
| gsd-advisor-researcher | Researches a single gray-area decision during discuss-phase advisor mode. | `discuss-phase` workflow (advisor mode) | primary |
| gsd-research-synthesizer | Combines parallel researcher outputs into a unified SUMMARY.md. | `/gsd-new-project` | primary |
| gsd-planner | Creates executable phase plans with task breakdown and goal-backward verification. | `/gsd-plan-phase`, `/gsd-quick` | primary |
| gsd-roadmapper | Creates project roadmaps with phase breakdown and requirement mapping. | `/gsd-new-project` | primary |
| gsd-executor | Executes GSD plans with atomic commits and deviation handling. | `/gsd-execute-phase`, `/gsd-quick` | primary |
| gsd-plan-checker | Verifies plans will achieve phase goals (8 verification dimensions). | `/gsd-plan-phase` (verification loop) | primary |
| gsd-integration-checker | Verifies cross-phase integration and end-to-end flows. | `/gsd-audit-milestone` | primary |
| gsd-ui-checker | Validates UI-SPEC.md design contracts against quality dimensions. | `/gsd-ui-phase` (validation loop) | primary |
| gsd-verifier | Verifies phase goal achievement through goal-backward analysis. | `/gsd-execute-phase` | primary |
| gsd-nyquist-auditor | Fills Nyquist validation gaps by generating tests. | `/gsd-validate-phase` | primary |
| gsd-ui-auditor | Retroactive 6-pillar visual audit of implemented frontend code. | `/gsd-ui-review` | primary |
| gsd-codebase-mapper | Explores codebase and writes structured analysis documents. | `/gsd-map-codebase` | primary |
| gsd-debugger | Investigates bugs using scientific method with persistent state. | `/gsd-debug`, `/gsd-verify-work` | primary |
| gsd-user-profiler | Scores developer behavior across 8 dimensions. | `/gsd-profile-user` | primary |
| gsd-doc-writer | Writes and updates project documentation. | `/gsd-docs-update` | primary |
| gsd-doc-verifier | Verifies factual claims in generated documentation. | `/gsd-docs-update` | primary |
| gsd-security-auditor | Verifies threat mitigations from PLAN.md threat model. | `/gsd-secure-phase` | primary |
| gsd-pattern-mapper | Maps new files to closest existing analogs; writes PATTERNS.md for the planner. | `/gsd-plan-phase` (between research and planning) | advanced stub |
| gsd-debug-session-manager | Runs the full `/gsd-debug` checkpoint-and-continuation loop in isolated context so main stays lean. | `/gsd-debug` | advanced stub |
| gsd-code-reviewer | Reviews source files for bugs, security issues, and code-quality problems; produces REVIEW.md. | `/gsd-code-review` | advanced stub |
| gsd-code-fixer | Applies fixes to REVIEW.md findings with atomic per-fix commits; produces REVIEW-FIX.md. | `/gsd-code-review --fix` | advanced stub |
| gsd-ai-researcher | Researches a chosen AI framework's official docs into implementation-ready guidance (AI-SPEC.md §3–§4b). | `/gsd-ai-integration-phase` | advanced stub |
| gsd-domain-researcher | Surfaces domain-expert evaluation criteria and failure modes for an AI system (AI-SPEC.md §1b). | `/gsd-ai-integration-phase` | advanced stub |
| gsd-eval-planner | Designs structured evaluation strategy for an AI phase (AI-SPEC.md §5–§7). | `/gsd-ai-integration-phase` | advanced stub |
| gsd-eval-auditor | Retroactive audit of an AI phase's evaluation coverage; produces EVAL-REVIEW.md (COVERED/PARTIAL/MISSING). | `/gsd-eval-review` | advanced stub |
| gsd-framework-selector | ≤6-question interactive decision matrix that scores and recommends an AI/LLM framework. | `/gsd-ai-integration-phase` | advanced stub |
| gsd-intel-updater | Writes structured intel files (`.planning/intel/*.json`) used as a queryable codebase knowledge base. | `/gsd-map-codebase --query` | advanced stub |
| gsd-doc-classifier | Classifies a single planning document as ADR, PRD, SPEC, DOC, or UNKNOWN; spawned in parallel to process the doc corpus. | `/gsd-ingest-docs` | advanced stub |
| gsd-doc-synthesizer | Synthesizes classified planning docs into a single consolidated context with precedence rules, cycle detection, and three-bucket conflicts report. | `/gsd-ingest-docs` | advanced stub |

**Coverage note.** `docs/AGENTS.md` gives full role cards for 21 primary agents plus concise stubs for the 12 advanced agents. The Agent Tool Permissions Summary in that file covers only the primary 21 agents; the advanced agents' tool lists are captured in their per-agent frontmatter in `agents/gsd-*.md`.

---

## Commands (67 shipped)

Full roster at `commands/gsd/*.md`. The groupings below mirror `docs/COMMANDS.md` section order; each row carries the command name, a one-line role derived from the command's frontmatter `description:`, and a link to the source file. `tests/command-count-sync.test.cjs` locks the count against the filesystem.

### Namespace Meta-Skills

These six routers are descriptor-only entries that the model picks first; the body of each contains a routing table that points at the correct concrete sub-skill. They exist to keep the eager skill-listing token cost low while the full surface remains reachable. See [#2792](https://github.com/gsd-build/get-shit-done/issues/2792) for the rationale; the routing tables target the post-[#2790](https://github.com/gsd-build/get-shit-done/issues/2790) consolidated surface.

| Command | Role | Source |
|---------|------|--------|
| `/gsd-workflow` | Phase pipeline router — discuss / plan / execute / verify / phase / progress. | [commands/gsd/ns-workflow.md](/lib/10-context-memory/get-shit-done/commands-gsd-ns-workflow) |
| `/gsd-project` | Project lifecycle router — milestones, audits, summary. | [commands/gsd/ns-project.md](/lib/10-context-memory/get-shit-done/commands-gsd-ns-project) |
| `/gsd-quality` | Quality-gate router — code review, debug, audit, security, eval, ui. | [commands/gsd/ns-review.md](/lib/10-context-memory/get-shit-done/commands-gsd-ns-review) |
| `/gsd-context` | Codebase-intelligence router — map, graphify, docs, learnings. | [commands/gsd/ns-context.md](/lib/10-context-memory/get-shit-done/commands-gsd-ns-context) |
| `/gsd-manage` | Management router — config, workspace, workstreams, thread, update, ship, inbox. | [commands/gsd/ns-manage.md](/lib/10-context-memory/get-shit-done/commands-gsd-ns-manage) |
| `/gsd-ideate` | Exploration & capture router — explore, sketch, spike, spec, capture. | [commands/gsd/ns-ideate.md](/lib/10-context-memory/get-shit-done/commands-gsd-ns-ideate) |

### Core Workflow

| Command | Role | Source |
|---------|------|--------|
| `/gsd-new-project` | Initialize a new project with deep context gathering and PROJECT.md. | [commands/gsd/new-project.md](/lib/10-context-memory/get-shit-done/commands-gsd-new-project) |
| `/gsd-workspace` | Manage GSD workspaces — create (`--new`), list (`--list`), or remove (`--remove`) isolated workspace environments. | [commands/gsd/workspace.md](/lib/10-context-memory/get-shit-done/commands-gsd-workspace) |
| `/gsd-discuss-phase` | Gather phase context through adaptive questioning before planning. | [commands/gsd/discuss-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-discuss-phase) |
| `/gsd-mvp-phase` | Plan a phase as a vertical MVP slice — user story, SPIDR splitting, then plan-phase. | [commands/gsd/mvp-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-mvp-phase) |
| `/gsd-spec-phase` | Socratic spec refinement producing a SPEC.md with falsifiable requirements. | [commands/gsd/spec-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-spec-phase) |
| `/gsd-ui-phase` | Generate UI design contract (UI-SPEC.md) for frontend phases. | [commands/gsd/ui-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-ui-phase) |
| `/gsd-ai-integration-phase` | Generate AI design contract (AI-SPEC.md) via framework selection, research, and eval planning. | [commands/gsd/ai-integration-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-ai-integration-phase) |
| `/gsd-plan-phase` | Create detailed phase plan (PLAN.md) with verification loop. | [commands/gsd/plan-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-plan-phase) |
| `/gsd-plan-review-convergence` | Cross-AI plan convergence loop — replan with review feedback until no HIGH concerns remain (max 3 cycles). | [commands/gsd/plan-review-convergence.md](/lib/10-context-memory/get-shit-done/commands-gsd-plan-review-convergence) |
| `/gsd-ultraplan-phase` | [BETA] Offload plan phase to Claude Code's ultraplan cloud — drafts remotely, review in browser, import back via `/gsd-import`. Claude Code only. | [commands/gsd/ultraplan-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-ultraplan-phase) |
| `/gsd-spike` | Rapidly spike an idea with throwaway experiments; use `--wrap-up` to package findings as a persistent skill. | [commands/gsd/spike.md](/lib/10-context-memory/get-shit-done/commands-gsd-spike) |
| `/gsd-sketch` | Rapidly sketch UI/design ideas using throwaway HTML mockups; use `--wrap-up` to package findings. | [commands/gsd/sketch.md](/lib/10-context-memory/get-shit-done/commands-gsd-sketch) |
| `/gsd-execute-phase` | Execute all plans in a phase with wave-based parallelization. | [commands/gsd/execute-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-execute-phase) |
| `/gsd-verify-work` | Validate built features through conversational UAT with auto-diagnosis. | [commands/gsd/verify-work.md](/lib/10-context-memory/get-shit-done/commands-gsd-verify-work) |
| `/gsd-ship` | Create PR, run review, and prepare for merge after verification. | [commands/gsd/ship.md](/lib/10-context-memory/get-shit-done/commands-gsd-ship) |
| `/gsd-fast` | Execute a trivial task inline — no subagents, no planning overhead. | [commands/gsd/fast.md](/lib/10-context-memory/get-shit-done/commands-gsd-fast) |
| `/gsd-quick` | Execute a quick task with GSD guarantees (atomic commits, state tracking) but skip optional agents. | [commands/gsd/quick.md](/lib/10-context-memory/get-shit-done/commands-gsd-quick) |
| `/gsd-ui-review` | Retroactive 6-pillar visual audit of implemented frontend code. | [commands/gsd/ui-review.md](/lib/10-context-memory/get-shit-done/commands-gsd-ui-review) |
| `/gsd-code-review` | Review source files changed during a phase for bugs, security, and code-quality problems; use `--fix` to auto-apply findings. | [commands/gsd/code-review.md](/lib/10-context-memory/get-shit-done/commands-gsd-code-review) |
| `/gsd-eval-review` | Retroactively audit an executed AI phase's evaluation coverage; produces EVAL-REVIEW.md. | [commands/gsd/eval-review.md](/lib/10-context-memory/get-shit-done/commands-gsd-eval-review) |

### Phase & Milestone Management

| Command | Role | Source |
|---------|------|--------|
| `/gsd-phase` | CRUD for phases — add (default), insert (`--insert`), remove (`--remove`), or edit (`--edit`) phases in ROADMAP.md. | [commands/gsd/phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-phase) |
| `/gsd-add-tests` | Generate tests for a completed phase based on UAT criteria and implementation. | [commands/gsd/add-tests.md](/lib/10-context-memory/get-shit-done/commands-gsd-add-tests) |
| `/gsd-validate-phase` | Retroactively audit and fill Nyquist validation gaps for a completed phase. | [commands/gsd/validate-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-validate-phase) |
| `/gsd-secure-phase` | Retroactively verify threat mitigations for a completed phase. | [commands/gsd/secure-phase.md](/lib/10-context-memory/get-shit-done/commands-gsd-secure-phase) |
| `/gsd-audit-milestone` | Audit milestone completion against original intent before archiving. | [commands/gsd/audit-milestone.md](/lib/10-context-memory/get-shit-done/commands-gsd-audit-milestone) |
| `/gsd-audit-uat` | Cross-phase audit of all outstanding UAT and verification items. | [commands/gsd/audit-uat.md](/lib/10-context-memory/get-shit-done/commands-gsd-audit-uat) |
| `/gsd-audit-fix` | Autonomous audit-to-fix pipeline — find issues, classify, fix, test, commit. | [commands/gsd/audit-fix.md](/lib/10-context-memory/get-shit-done/commands-gsd-audit-fix) |
| `/gsd-complete-milestone` | Archive completed milestone and prepare for next version. | [commands/gsd/complete-milestone.md](/lib/10-context-memory/get-shit-done/commands-gsd-complete-milestone) |
| `/gsd-new-milestone` | Start a new milestone cycle — update PROJECT.md and route to requirements. | [commands/gsd/new-milestone.md](/lib/10-context-memory/get-shit-done/commands-gsd-new-milestone) |
| `/gsd-milestone-summary` | Generate a comprehensive project summary from milestone artifacts. | [commands/gsd/milestone-summary.md](/lib/10-context-memory/get-shit-done/commands-gsd-milestone-summary) |
| `/gsd-cleanup` | Archive accumulated phase directories from completed milestones. | [commands/gsd/cleanup.md](/lib/10-context-memory/get-shit-done/commands-gsd-cleanup) |
| `/gsd-manager` | Interactive command center for managing multiple phases from one terminal. | [commands/gsd/manager.md](/lib/10-context-memory/get-shit-done/commands-gsd-manager) |
| `/gsd-workstreams` | Manage parallel workstreams — list, create, switch, status, progress, complete, resume. | [commands/gsd/workstreams.md](/lib/10-context-memory/get-shit-done/commands-gsd-workstreams) |
| `/gsd-autonomous` | Run all remaining phases autonomously — discuss → plan → execute per phase. | [commands/gsd/autonomous.md](/lib/10-context-memory/get-shit-done/commands-gsd-autonomous) |
| `/gsd-undo` | Safe git revert — roll back phase or plan commits using the phase manifest. | [commands/gsd/undo.md](/lib/10-context-memory/get-shit-done/commands-gsd-undo) |

### Session & Navigation

| Command | Role | Source |
|---------|------|--------|
| `/gsd-progress` | Check project progress, show context, and route to next action; use `--next` to advance automatically or `--do` to run a freeform task. | [commands/gsd/progress.md](/lib/10-context-memory/get-shit-done/commands-gsd-progress) |
| `/gsd-capture` | Capture ideas, tasks, notes, and seeds — todo (default), `--note`, `--backlog`, `--seed`, or `--list` pending todos. | [commands/gsd/capture.md](/lib/10-context-memory/get-shit-done/commands-gsd-capture) |
| `/gsd-stats` | Display project statistics — phases, plans, requirements, git metrics, timeline. | [commands/gsd/stats.md](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/stats.md) |
| `/gsd-pause-work` | Create context handoff when pausing work mid-phase. | [commands/gsd/pause-work.md](/lib/10-context-memory/get-shit-done/commands-gsd-pause-work) |
| `/gsd-resume-work` | Resume work from previous session with full context restoration. | [commands/gsd/resume-work.md](/lib/10-context-memory/get-shit-done/commands-gsd-resume-work) |
| `/gsd-explore` | Socratic ideation and idea routing — think through ideas before committing. | [commands/gsd/explore.md](/lib/10-context-memory/get-shit-done/commands-gsd-explore) |
| `/gsd-review-backlog` | Review and promote backlog items to active milestone. | [commands/gsd/review-backlog.md](/lib/10-context-memory/get-shit-done/commands-gsd-review-backlog) |
| `/gsd-thread` | Manage persistent context threads for cross-session work. | [commands/gsd/thread.md](/lib/10-context-memory/get-shit-done/commands-gsd-thread) |

### Codebase Intelligence

| Command | Role | Source |
|---------|------|--------|
| `/gsd-map-codebase` | Analyze codebase with parallel mapper agents; use `--fast` for lightweight scan or `--query` for intel queries. | [commands/gsd/map-codebase.md](/lib/10-context-memory/get-shit-done/commands-gsd-map-codebase) |
| `/gsd-graphify` | Build, query, and inspect the project knowledge graph in `.planning/graphs/`. | [commands/gsd/graphify.md](/lib/10-context-memory/get-shit-done/commands-gsd-graphify) |
| `/gsd-extract-learnings` | Extract decisions, lessons, patterns, and surprises from completed phase artifacts. | [commands/gsd/extract-learnings.md](/lib/10-context-memory/get-shit-done/commands-gsd-extract-learnings) |

### Review, Debug & Recovery

| Command | Role | Source |
|---------|------|--------|
| `/gsd-review` | Request cross-AI peer review of phase plans from external AI CLIs. | [commands/gsd/review.md](/lib/10-context-memory/get-shit-done/commands-gsd-review) |
| `/gsd-debug` | Systematic debugging with persistent state across context resets. | [commands/gsd/debug.md](/lib/10-context-memory/get-shit-done/commands-gsd-debug) |
| `/gsd-forensics` | Post-mortem investigation for failed GSD workflows — analyzes git, artifacts, state. | [commands/gsd/forensics.md](/lib/10-context-memory/get-shit-done/commands-gsd-forensics) |
| `/gsd-health` | Diagnose planning directory health and optionally repair issues. | [commands/gsd/health.md](/lib/10-context-memory/get-shit-done/commands-gsd-health) |
| `/gsd-import` | Ingest external plans with conflict detection against project decisions. | [commands/gsd/import.md](/lib/10-context-memory/get-shit-done/commands-gsd-import) |
| `/gsd-inbox` | Triage and review all open GitHub issues and PRs against project templates. | [commands/gsd/inbox.md](/lib/10-context-memory/get-shit-done/commands-gsd-inbox) |

### Docs, Profile & Utilities

| Command | Role | Source |
|---------|------|--------|
| `/gsd-docs-update` | Generate or update project documentation verified against the codebase. | [commands/gsd/docs-update.md](/lib/10-context-memory/get-shit-done/commands-gsd-docs-update) |
| `/gsd-ingest-docs` | Scan a repo for mixed ADRs/PRDs/SPECs/DOCs and bootstrap or merge the full `.planning/` setup with classification, synthesis, and conflicts report. | [commands/gsd/ingest-docs.md](/lib/10-context-memory/get-shit-done/commands-gsd-ingest-docs) |
| `/gsd-profile-user` | Generate developer behavioral profile and Claude-discoverable artifacts. | [commands/gsd/profile-user.md](/lib/10-context-memory/get-shit-done/commands-gsd-profile-user) |
| `/gsd-settings` | Configure GSD workflow toggles and model profile. | [commands/gsd/settings.md](/lib/10-context-memory/get-shit-done/commands-gsd-settings) |
| `/gsd-config` | Configure GSD settings — workflow toggles (default), advanced knobs (`--advanced`), integrations (`--integrations`), or model profile (`--profile`). | [commands/gsd/config.md](/lib/10-context-memory/get-shit-done/commands-gsd-config) |
| `/gsd-pr-branch` | Create a clean PR branch by filtering out `.planning/` commits. | [commands/gsd/pr-branch.md](/lib/10-context-memory/get-shit-done/commands-gsd-pr-branch) |
| `/gsd-surface` | Toggle which skills are surfaced — apply a profile, list, or disable a cluster without reinstall. | [commands/gsd/surface.md](/lib/10-context-memory/get-shit-done/commands-gsd-surface) |
| `/gsd-update` | Update GSD to latest version; use `--sync` to sync skills across runtimes or `--reapply` to reapply local patches. | [commands/gsd/update.md](/lib/10-context-memory/get-shit-done/commands-gsd-update) |
| `/gsd-help` | Show available GSD commands and usage guide. | [commands/gsd/help.md](/lib/10-context-memory/get-shit-done/commands-gsd-help) |

---

## Workflows (88 shipped)

Full roster at `get-shit-done/workflows/*.md`. Workflows are thin orchestrators that commands reference internally; most are not read directly by end users. Rows below map each workflow file to its role (derived from the `<purpose>` block) and, where applicable, to the command that invokes it.

| Workflow | Role | Invoked by |
|----------|------|------------|
| `add-backlog.md` | Add a backlog item to ROADMAP.md using 999.x numbering. | `/gsd-capture --backlog` |
| `add-phase.md` | Add a new integer phase to the end of the current milestone in the roadmap. | `/gsd-phase` (default) |
| `add-tests.md` | Generate unit and E2E tests for a completed phase based on its artifacts. | `/gsd-add-tests` |
| `add-todo.md` | Capture an idea or task that surfaces during a session as a structured todo. | `/gsd-capture` (default) |
| `ai-integration-phase.md` | Orchestrate framework selection → AI research → domain research → eval planning into AI-SPEC.md. | `/gsd-ai-integration-phase` |
| `analyze-dependencies.md` | Analyze ROADMAP.md phases for file overlap and semantic dependencies; suggest `Depends on` edges. | `/gsd-manager --analyze-deps` |
| `audit-fix.md` | Autonomous audit-to-fix pipeline — run audit, parse, classify, fix, test, commit. | `/gsd-audit-fix` |
| `audit-milestone.md` | Verify milestone met its definition of done by aggregating phase verifications. | `/gsd-audit-milestone` |
| `audit-uat.md` | Cross-phase audit of UAT and verification files; produces prioritized outstanding-items list. | `/gsd-audit-uat` |
| `autonomous.md` | Drive milestone phases autonomously — all remaining, a range, or a single phase. | `/gsd-autonomous` |
| `check-todos.md` | List pending todos, allow selection, load context, and route to the appropriate action. | `/gsd-capture --list` |
| `cleanup.md` | Archive accumulated phase directories from completed milestones. | `/gsd-cleanup` |
| `code-review-fix.md` | Auto-fix issues from REVIEW.md via gsd-code-fixer with per-fix atomic commits. | `/gsd-code-review --fix` |
| `code-review.md` | Review phase source changes via gsd-code-reviewer; produces REVIEW.md. | `/gsd-code-review` |
| `complete-milestone.md` | Mark a shipped version as complete — MILESTONES.md entry, PROJECT.md evolution, tag. | `/gsd-complete-milestone` |
| `diagnose-issues.md` | Orchestrate parallel debug agents to investigate UAT gaps and find root causes. | `/gsd-verify-work` (auto-diagnosis) |
| `discovery-phase.md` | Execute discovery at the appropriate depth level. | `/gsd-new-project` (discovery path) |
| `discuss-phase-assumptions.md` | Assumptions-mode discuss — extract implementation decisions via codebase-first analysis. | `/gsd-discuss-phase` (when `discuss_mode=assumptions`) |
| `discuss-phase-power.md` | Power-user discuss — pre-generate all questions into a JSON state file + HTML UI. | `/gsd-discuss-phase --power` |
| `discuss-phase.md` | Extract implementation decisions through iterative gray-area discussion. | `/gsd-discuss-phase` |
| `mvp-phase.md` | Plan a phase as a vertical MVP slice — user story, SPIDR splitting, then plan-phase. | `/gsd-mvp-phase` |
| `do.md` | Route freeform text from the user to the best matching GSD command. | `/gsd-progress --do` |
| `docs-update.md` | Generate, update, and verify canonical and hand-written project documentation. | `/gsd-docs-update` |
| `edit-phase.md` | Edit any field of an existing phase in ROADMAP.md in place, preserving number and position. | `/gsd-phase --edit` |
| `eval-review.md` | Retroactive audit of an implemented AI phase's evaluation coverage. | `/gsd-eval-review` |
| `execute-phase.md` | Execute all plans in a phase using wave-based parallel execution. | `/gsd-execute-phase` |
| `execute-plan.md` | Execute a phase prompt (PLAN.md) and create the outcome summary (SUMMARY.md). | `execute-phase.md` (per-plan subagent) |
| `explore.md` | Socratic ideation — guide the developer through probing questions. | `/gsd-explore` |
| `debug.md` | Systematic debugging — subcommand routing, session creation, delegation to gsd-debug-session-manager. | `/gsd-debug` |
| `extract-learnings.md` | Extract decisions, lessons, patterns, and surprises from completed phase artifacts. | `/gsd-extract-learnings` |
| `fast.md` | Execute a trivial task inline without subagent overhead. | `/gsd-fast` |
| `forensics.md` | Forensics investigation of failed workflows — git, artifacts, and state analysis. | `/gsd-forensics` |
| `graduation.md` | Cluster recurring LEARNINGS.md items across phases and surface HITL promotion candidates. | `transition.md` (graduation_scan step) |
| `health.md` | Validate `.planning/` directory integrity and report actionable issues. | `/gsd-health` |
| `help.md` | Display the complete GSD command reference. | `/gsd-help` |
| `import.md` | Ingest external plans with conflict detection against existing project decisions. | `/gsd-import` |
| `inbox.md` | Triage open GitHub issues and PRs against project contribution templates. | `/gsd-inbox` |
| `ingest-docs.md` | Scan a repo for mixed planning docs; classify, synthesize, and bootstrap or merge into `.planning/` with a conflicts report. | `/gsd-ingest-docs` |
| `insert-phase.md` | Insert a decimal phase for urgent work discovered mid-milestone. | `/gsd-phase --insert` |
| `list-phase-assumptions.md` | Surface Claude's assumptions about a phase before planning. | `/gsd-discuss-phase --assumptions` |
| `list-workspaces.md` | List all GSD workspaces found in `~/gsd-workspaces/` with their status. | `/gsd-workspace --list` |
| `manager.md` | Interactive milestone command center — dashboard, inline discuss, background plan/execute. | `/gsd-manager` |
| `map-codebase.md` | Orchestrate parallel codebase mapper agents to produce `.planning/codebase/` docs. | `/gsd-map-codebase` |
| `milestone-summary.md` | Milestone summary synthesis — onboarding and review artifact from milestone artifacts. | `/gsd-milestone-summary` |
| `new-milestone.md` | Start a new milestone cycle — load project context, gather goals, update PROJECT.md/STATE.md. | `/gsd-new-milestone` |
| `new-project.md` | Unified new-project flow — questioning, research (optional), requirements, roadmap. | `/gsd-new-project` |
| `new-workspace.md` | Create an isolated workspace with repo worktrees/clones and an independent `.planning/`. | `/gsd-workspace --new` |
| `next.md` | Detect current project state and automatically advance to the next logical step. | `/gsd-progress --next` |
| `node-repair.md` | Autonomous repair operator for failed task verification; invoked by `execute-plan`. | `execute-plan.md` (recovery) |
| `note.md` | Zero-friction idea capture — one Write call, one confirmation line. | `/gsd-capture --note` |
| `pause-work.md` | Create structured `.planning/HANDOFF.json` and `.continue-here.md` handoff files. | `/gsd-pause-work` |
| `plan-phase.md` | Create executable PLAN.md files with integrated research and verification loop. | `/gsd-plan-phase`, `/gsd-quick` |
| `plan-review-convergence.md` | Cross-AI plan convergence loop — replan with review feedback until no HIGH concerns remain. | `/gsd-plan-review-convergence` |
| `plant-seed.md` | Capture a forward-looking idea as a structured seed file with trigger conditions. | `/gsd-capture --seed` |
| `pr-branch.md` | Create a clean branch for pull requests by filtering `.planning/` commits. | `/gsd-pr-branch` |
| `profile-user.md` | Orchestrate the full developer profiling flow — consent, session scan, profile generation. | `/gsd-profile-user` |
| `progress.md` | Progress rendering — project context, position, and next-action routing. | `/gsd-progress` |
| `quick.md` | Quick-task execution with GSD guarantees (atomic commits, state tracking). | `/gsd-quick` |
| `reapply-patches.md` | Reapply local modifications after a GSD update. | `/gsd-update --reapply` |
| `remove-phase.md` | Remove a future phase from the roadmap and renumber subsequent phases. | `/gsd-phase --remove` |
| `remove-workspace.md` | Remove a GSD workspace and clean up worktrees. | `/gsd-workspace --remove` |
| `resume-project.md` | Resume work — restore full context from STATE.md, HANDOFF.json, and artifacts. | `/gsd-resume-work` |
| `review.md` | Cross-AI plan review via external CLIs; produces REVIEWS.md. | `/gsd-review` |
| `scan.md` | Rapid single-focus codebase scan — lightweight alternative to map-codebase. | `/gsd-map-codebase --fast` |
| `secure-phase.md` | Retroactive threat-mitigation audit for a completed phase. | `/gsd-secure-phase` |
| `session-report.md` | Session report — token usage, work summary, outcomes. | `/gsd-pause-work --report` |
| `settings.md` | Configure GSD workflow toggles and model profile. | `/gsd-settings`, `/gsd-config --profile` |
| `settings-advanced.md` | Configure GSD power-user knobs — plan bounce, timeouts, branch templates, cross-AI execution, runtime knobs. | `/gsd-config --advanced` |
