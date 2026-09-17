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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/CONTEXT.md"
sourceRel: "CONTEXT.md"
rawUrl: "/raw/10-context-memory/get-shit-done/CONTEXT.md"
sourceSha256: "5339f8a1f2c77cfdd65b419f1126cfd9d409f8ad3b5dbe31a8b51a34aff5d7d5"
pageSha256: "49b2cfb2e46090ef6b679b1718ac84d4a5c67ebe7af7a82495f50f2234dc63ac"
contentMode: "local-full"
zh: ""
---

## Glossary — Domain modules and seams

### Milestone Module
Module owning `milestone complete` (archive roadmap/requirements/phases, build MILESTONES.md entry, update STATE.md), `requirements mark-complete` (checkbox + table update with regex-global-state fix), and `phases clear`. Key behaviors: milestone-phase scoping (extract phases from ROADMAP.md milestone slice, support project-code-prefix dirs e.g. CK-01-name, exclude prior-milestone phases), milestone-archive layout (resolve phase dirs from `.planning/milestones/v*-phases/` when `.planning/phases/` absent), fenced-code-block boundary tracking in `extractCurrentMilestone`. Source of truth: `get-shit-done/bin/lib/milestone.cjs`; SDK surface: `sdk/src/query/milestone.ts` (query handlers for `milestone.complete`, `phases.archive`). SDK milestone runner (`GSD.run()`) lives in `sdk/src/index.ts` — discovers phases via `roadmapAnalyze`, runs each incomplete phase, emits `MilestoneStart`/`MilestoneComplete` events. Test consolidation: PR #3753 (10 files → 4).

### Dispatch Pipeline Module
Module that composes Dispatch Policy Module, Query Execution Policy Module, and per-stage handlers (input-validation, plan, execution, result-builder, formatting, error-mapping, observability) into the end-to-end pipeline that produces a `QueryDispatchResult`. Entry point: `sdk/src/query/query-dispatch.ts`. Typed contract: `sdk/src/query/query-dispatch-contract.ts`.

### Phase Lifecycle Module
Module owning phase create, rename, complete, remove, list, and plan-index operations, plus phase-dir prefix validation, STATE.md staleness detection, and auto-prune behaviour. Entry points: `get-shit-done/bin/lib/phase.cjs` (CJS surface) and `sdk/src/query/phase.ts` (SDK native query). Typed events: `GSDPhaseStartEvent`, `GSDPhaseStepStartEvent`, `GSDPhaseStepCompleteEvent`, `GSDPhaseCompleteEvent` (see `sdk/src/types.ts`). Phase execution is driven by `sdk/src/phase-runner.ts`; prompt construction by `sdk/src/phase-prompt.ts`.

### Dispatch Policy Module
Module owning dispatch error mapping, fallback policy, timeout classification, and CLI exit mapping contract.

Canonical error kind set:
- `unknown_command`
- `native_failure`
- `native_timeout`
- `fallback_failure`
- `validation_error`
- `internal_error`

### Sync Runtime Bridge Module
SDK Module exposing `executeForCjs(input: RuntimeBridgeExecuteInput): RuntimeBridgeSyncResult` — a synchronous-friendly entry point on top of the async `QueryRuntimeBridge`. Enables the CJS dispatcher (`bin/gsd-tools.cjs` and per-family `*-command-router.cjs` files) to invoke SDK query handlers in-process — no subprocess hop — while preserving the synchronous contract that ~21 CJS test files and 100+ consumers depend on. Implementation uses `synckit` (Atomics.wait on a SharedArrayBuffer in a pooled Worker thread). First-call cost ~80ms (Worker startup + native bridge construction); steady-state ~0.1ms per call after the worker warms. Maps the async bridge's exceptions into a typed sync result `\{ ok: true, data, exitCode: 0 \} | \{ ok: false, exitCode, errorKind, errorDetails?, stderrLines \}` aligned with the Dispatch Policy Module's error taxonomy from ADR-0001 (`unknown_command`, `native_failure`, `native_timeout`, `fallback_failure`, `validation_error`, `internal_error`). Subprocess fallback is disabled by design inside the sync bridge — unknown commands surface as `unknown_command` rather than spawning `gsd-sdk`. Source: `sdk/src/runtime-bridge-sync/index.ts` + `sdk/src/runtime-bridge-sync/worker.ts`.

### Command Definition Module
Canonical command metadata Interface powering alias, catalog, and semantics generation.

### Query Runtime Context Module
Module owning query-time context resolution for `projectDir` and `ws`, including precedence and validation policy used by query adapters.

### Native Dispatch Adapter Module
Adapter Module that satisfies native query dispatch at the Dispatch Policy seam, so policy modules consume a focused dispatch Interface instead of closure-wired call sites.

### Query CLI Output Module
Module owning projection from dispatch results/errors to CLI `\{ exitCode, stdoutChunks, stderrLines \}` output contract.

### STATE.md Document Module
Shared CJS/SDK pure transform Module owning STATE.md parse, field extraction, field replacement, status normalization, and frontmatter reconstruction. It does not scan `.planning/phases` and does not own persistence or locking; phase/plan/summary counts arrive from inventory/progress Modules as inputs, and CJS/SDK read-modify-write paths remain Adapters. Source of truth: `sdk/src/query/state-document.ts`; CJS callers consume the generator-emitted `get-shit-done/bin/lib/state-document.generated.cjs` via the thin re-export at `get-shit-done/bin/lib/state-document.cjs`.

### Query Execution Policy Module
Module owning query transport routing policy projection (`preferNative`, fallback policy, workstream subprocess forcing) at execution seam.

### Query Subprocess Adapter Module
Adapter Module owning subprocess execution contract for query commands (JSON/raw invocation, `@file:` indirection parsing, timeout/exit error projection).

### Query Command Resolution Module
Canonical command normalization and resolution Interface (`query-command-resolution-strategy`) used by internal query/transport paths after dead-wrapper convergence.

### Command Topology Module
Module owning command resolution, policy projection (`mutation`, `output_mode`), unknown-command diagnosis, and handler Adapter binding at one seam for query dispatch.

### Init Command Module
SDK Module owning the `init.*` family of query handlers that compose atomic SDK queries into the flat JSON bundles consumed by init workflows (`/gsd-execute-phase`, `/gsd-plan-phase`, `/gsd-verify-work`, `/gsd-new-project`, `/gsd-manager`, `/gsd-progress`, `/gsd-resume`, etc.). Divided into two source files: `sdk/src/query/init.ts` (13 basic handlers plus `withProjectRoot` project-identity injection) and `sdk/src/query/init-complex.ts` (the 3 heavyweight handlers: `initNewProject`, `initProgress`, `initManager`). All handlers return `\{ data: <flat JSON> \}` aligned with the CJS `bin/lib/init.cjs` surface. Test seams: `sdk/src/query/init.test.ts` (basic handlers + withProjectRoot precedence), `sdk/src/query/init-complex.test.ts` (complex handlers + progress/manager precedence regression #2674 + workstream scoping regression #3196), `sdk/src/query/init-workstream-milestone-op.test.ts` (initMilestoneOp + roadmapAnalyze + resolveQueryRuntimeContext workstream fallback). CJS CLI surface tested in `tests/init.test.cjs` and `tests/init-manager.test.cjs` (includes cross-milestone dependency regression #2267).

### CJS Command Router Adapter Module
Compatibility Adapter Module for `gsd-tools.cjs` command families. Uses generated command metadata plus small argument shapers to route to CJS handlers, rather than calling SDK Command Topology directly. Preserves CJS compatibility startup while reducing hand-written router drift. Per-family migration to call the **Sync Runtime Bridge Module**'s `executeForCjs` in-process — eliminating the remaining parallel CJS handler implementations — is the active work of #3524 Phase 5; the primitive itself ships in #3555, with each canonical command family (`state.*`, `verify.*`, `init.*`, `phase.*`, `phases.*`, `validate.*`, `roadmap.*`, `frontmatter.*`, `config.*`) routing through `executeForCjs` in its own follow-up enhancement.

### Command Routing Hub
Single dispatch seam (`get-shit-done/bin/lib/command-routing-hub.cjs`) that centralizes mode selection (sdk vs cjs), the no-throw pure-result contract, and the closed 6-value `errorKind` enum for all CJS command family router adapters. Interface: `createHub(\{ mode, sdkLoader, cjsRegistry, manifest \}) → hub`; `hub.dispatch(\{ family, subcommand, args, cwd, raw \}) → Result` where `Result = \{ ok: true, data \} | \{ ok: false, errorKind, message, details? \}` and `errorKind ∈ \{ UnknownCommand, InvalidArgs, HandlerRefusal, HandlerFailure, SdkLoadFailed, SdkDispatchFailed \}`. Mode is fixed at construction; hub never prints, never exits, never throws. No transparent fallback: SDK crash → `SdkDispatchFailed`, not CJS retry. Adapters call `createHub`, dispatch, then translate the pure Result to `output()`/`error()` calls. Proof-of-concept migration: `phase-command-router.cjs` (#3788). ADR: `docs/adr/0012-command-routing-hub.md`.

### Query Pre-Project Config Policy Module
Module policy that defines query-time behavior when `.planning/config.json` is absent: use built-in defaults for parity-sensitive query Interfaces, and emit parity-aligned empty model ids for pre-project model resolution surfaces.

### Configuration Module
Shared CJS/SDK Module owning config load, legacy-key normalization, defaults merge, and explicit on-disk migration for `.planning/config.json`. Interface: `loadConfig(cwd) → MergedConfig` (pure read, never writes disk), `normalizeLegacyKeys(parsed) → \{ parsed, normalizations[] \}` (idempotent, pure, returns the list of normalizations applied), `mergeDefaults(parsed) → MergedConfig` (deep-merge of parsed config over canonical defaults), `migrateOnDisk(cwd) → MigrationReport` (explicit, opt-in, called by the installer and by `gsd-tools migrate-config`). Invariants: never mutates disk inside `loadConfig`; legacy top-level keys (`branching_strategy`, `sub_repos`, `multiRepo`, `depth`) are normalized into their canonical nested locations in the returned value; defaults come from the shared `sdk/shared/config-defaults.manifest.json`; schema (`VALID_CONFIG_KEYS`, `RUNTIME_STATE_KEYS`, `DYNAMIC_KEY_PATTERNS`) comes from `sdk/shared/config-schema.manifest.json`. Source of truth: `sdk/src/configuration/index.ts`; CJS callers consume the generator-emitted `get-shit-done/bin/lib/configuration.generated.cjs` via the thin Adapters at `bin/lib/core.cjs:loadConfig` and `bin/lib/config-schema.cjs`. Eliminates the recurring #3523-class drift bug structurally.

### Planning Workspace Module
Module owning `.planning` path resolution, active workstream pointer policy (`session-scoped > shared`), pointer self-heal behavior, and planning lock semantics for workstream-aware execution.

### Workstream Inventory Module
Shared CJS/SDK Module owning workstream directory discovery, per-workstream state projection, phase/plan/summary counting, roadmap-declared phase count, active marker projection, and active-workstream collision inputs. Command handlers render list/status/progress outputs from this inventory instead of rescanning `.planning/workstreams/*` directly. Source of truth for the pure projection is `sdk/src/workstream-inventory/builder.ts` (a Builder Module emitted to `get-shit-done/bin/lib/workstream-inventory-builder.generated.cjs` via the generator pattern); per-side Reader Adapters (`bin/lib/workstream-inventory.cjs` sync, `sdk/src/query/workstream-inventory.ts` async-ready) collect filesystem inputs and delegate projection to the Builder.

### Project-Root Resolution Module
Shared CJS/SDK Module owning project-root resolution from any starting directory. Walks the ancestor chain (bounded by `FIND_PROJECT_ROOT_MAX_DEPTH = 10`) applying four heuristics in order: (0) own `.planning/` guard (#1362), (1) parent `.planning/config.json` `sub_repos` traversal, (2) legacy `multiRepo: true` boolean + ancestor `.git`, (3) `.git` heuristic with parent `.planning/`. Returns `startDir` when no ancestor qualifies. Sync `node:fs` I/O. Source of truth: `sdk/src/project-root/index.ts`; CJS callers consume the generator-emitted `get-shit-done/bin/lib/project-root.generated.cjs` via thin re-exports at `get-shit-done/bin/lib/core.cjs` and `sdk/src/query/helpers.ts`.

### Planning Path Projection Module
SDK query Module owning projection from project/workstream context to concrete `.planning` paths. Policy precedence is `explicit workstream > env workstream > env project > root`. Invalid workspace context is a validation error at this seam rather than a silent fallback.

### Worktree Safety Policy Module
CJS Module owning worktree lifecycle safety policy for the GSD orchestration layer. Interface: `resolveWorktreeContext(cwd, deps) → WorktreeContext` (linked-worktree root mapping), `parseWorktreePorcelain(output) → WorktreeEntry[]` (porcelain parser, skips detached HEAD), `planWorktreePrune(repoRoot, opts, deps) → PrunePlan` (metadata-prune plan, never destructive by default), `executeWorktreePrunePlan(plan, deps) → PruneResult` (executes prune; degrades gracefully on git timeout), `listLinkedWorktreePaths(repoRoot, deps) → LinkedPathsResult`, `inspectWorktreeHealth(repoRoot, opts, deps) → HealthResult` (orphan + stale detection), `snapshotWorktreeInventory(repoRoot, opts, deps) → InventoryResult`, `planWorktreeWaveCleanup(repoRoot, manifest) → CleanupPlan` (manifest-scoped, fail-closed), `executeWorktreeWaveCleanupPlan(plan, deps) → CleanupResult`. Source of truth: `get-shit-done/bin/lib/worktree-safety.cjs`. Timeout path: all git subprocess calls are bounded; callers receive `ok:false, reason:'git_timed_out'` rather than a thrown exception. Test anchor: `tests/worktree-safety.test.cjs`.

### Worktree Lifecycle Module
Workflow contract seam covering agent worktree lifecycle orchestration rules embedded in `get-shit-done/workflows/execute-phase.md`, `quick.md`, `execute-plan.md`, and `agents/gsd-executor.md`. Key invariants: `worktree_branch_check` uses `git reset --hard` (not `--soft`); HEAD attachment verified via `git symbolic-ref` before any reset; positive allow-list `^worktree-agent-*` enforced; `git update-ref` on protected refs is prohibited; cleanup is manifest-scoped (`WAVE_WORKTREE_MANIFEST`) not global-discovery-based; worktree spawning is sequential (one `run_in_background` at a time to avoid `config.lock` contention). Test anchor: `tests/worktree.test.cjs`.

### Worktree Root Resolution Adapter Module
Adapter Module owning linked-worktree root mapping and metadata-prune policy (`git worktree prune` non-destructive default) for planning/workstream callers.

### SDK Package Seam Module
Module owning SDK-to-`get-shit-done-cc` compatibility policy: legacy asset discovery, install-layout probing, transition-only error messaging, and thin Adapter access for CJS-era assets that native SDK Modules have not replaced yet.

### Runtime-Global Skills Policy Module
Module owning runtime-aware global skills directory policy for SDK query surfaces. Resolves runtime-global skills bases/skill paths from runtime + env precedence, renders display paths for warnings/manifests, and reports unsupported runtimes with no skills directory.

### Installer Migration Authoring Guard Module
Module owning validation for Installer Migration Module records and planned actions. It enforces migration metadata, explicit install scopes, ownership evidence for destructive/config actions, and runtime contract citations for runtime config rewrites before a migration can enter planning or apply.

### Installer Module
Primary installer for all runtimes. Single production file: `bin/install.js` (generated). Exports: `install(isGlobal, runtime[, configDir])` → typed result `\{ runtime, configDir, settingsPath, settings, statuslineCommand, updateBannerCommand \}`; `uninstall(isGlobal, runtime[, configDir])`; `installRuntimeArtifacts(runtime, configDir, scope, resolvedProfile)`; `uninstallRuntimeArtifacts(runtime, configDir, scope)`; `writeManifest(configDir, runtime)`. Runtime enum: `allRuntimes` (15 values: claude, antigravity, augment, cline, codebuddy, codex, copilot, cursor, gemini, hermes, kilo, opencode, qwen, trae, windsurf). Directory helpers: `getDirName(runtime)` → local dir name; `getGlobalDir(runtime[, explicitDir])` → global path (env-var–aware per runtime); `getConfigDirFromHome(runtime, isGlobal)` → shell-quoted path fragment. Runtime-specific helpers: `resolveKiloConfigPath(configDir)`, `configureKiloPermissions(isGlobal[, explicitDir])`. Layout-driven artifact copy/removal delegates to `get-shit-done/bin/lib/runtime-artifact-layout.cjs:resolveRuntimeArtifactLayout` (throws `TypeError` for unknown runtimes). Hermes uses nested `skills/gsd/<stem>/` layout (prefix: ''); other skill-runtimes use flat `skills/gsd-<stem>/` layout. See Skill Surface Budget Module and Runtime Artifact Layout Module.

### Skill Surface Budget Module
Module owning which skills and agents are written to runtime config directories at install time (Phase 1) and at runtime via cluster-level toggles (Phase 2). Phase 1: `get-shit-done/bin/lib/install-profiles.cjs` defines named profiles (`core`, `standard`, `full`), computes transitive closure over `requires:` frontmatter, stages skills/agents to runtime config dirs, and persists the chosen profile in a `.gsd-profile` marker. Profile resolution precedence: explicit `--profile=` flag > `.gsd-profile` marker > `full`. `--minimal`/`--core-only` are back-compat aliases for `--profile=core`. Phase 2: `get-shit-done/bin/lib/surface.cjs` implements the `/gsd:surface` slash command for cluster-level enable/disable without reinstall; cluster definitions live in `get-shit-done/bin/lib/clusters.cjs`; per-runtime state persists in `<runtimeConfigDir>/.gsd-surface.json` independent from the `.gsd-profile` marker. See ADR-0011.

### Runtime Artifact Layout Module
Module owning the per-runtime mapping from artifact kind to filesystem placement. ADR-3660 defines the typed `kinds` per runtime (`commands`, `agents`, `skills`) with destination subpath, prefix, and stage adapter (with per-runtime converters in `bin/install.js`: `convertClaudeCommandToClaudeSkill`, `…CodexSkill`, `…CopilotSkill`, `…AntigravitySkill`). Phase 1 applies this seam to the Runtime Surface Module (`surface.cjs:applySurface`). Phase 2 is planned to migrate install/uninstall in `bin/install.js` so all lifecycle sites iterate one shared layout table instead of re-encoding runtime layout logic. This design is intended to remove the #3659 class of omissions. Migrations remain under the Installer Migration Module (ADR-0008). See ADR-3660.

### Knowledge Graph Module
Module owning the graphify integration: config gate (`isGraphifyEnabled`), disabled response (`disabledResponse`), subprocess helper (`execGraphify`, typed `GRAPHIFY_REASON` enum), presence detection (`checkGraphifyInstalled`), version checking (`checkGraphifyVersion`), query surface (`graphifyQuery` — BFS seed-expand + budget trim), status surface (`graphifyStatus` — node/edge counts, mtime staleness, commit-staleness tri-state via `built_at_commit`/`commits_behind`/`commit_stale`), diff surface (`graphifyDiff` — added/removed/changed nodes+edges), build pre-flight (`graphifyBuild`), snapshot management (`writeSnapshot`). Reads `.planning/config.json:graphify.enabled` as config gate; writes to `.planning/graphs/`. Auto-update hook (`hooks/gsd-graphify-update.sh`) triggers a detached background rebuild after HEAD-advancing git operations on the default branch when `graphify.auto_update=true`. Status file `.planning/graphs/.last-build-status.json` carries `\{ ts, status, exit_code, duration_ms, head_at_build, graphify_version \}`. Graph IR uses `nodes[]`, `edges[]` (or `links[]` for graphify ≥0.7 compat), `hyperedges[]`, `built_at_commit`. `commit_stale` is tri-state: `false` (known fresh), `true` (stale), `null` (unknown — no git or pre-v0.7 graph). Source: `get-shit-done/bin/lib/graphify.cjs`. Skill: `commands/gsd/graphify.md`.

### MVP Mode
Phase-level planning mode that frames work as a vertical slice (UI → API → DB) of one user-visible capability instead of horizontal layers. Resolved at workflow init via the precedence chain: `--mvp` CLI flag → ROADMAP.md `**Mode:** mvp` field → `workflow.mvp_mode` config → false. All-or-nothing per phase (PRD #2826 Q1). Surfaced as `MVP_MODE=true|false` to the planner, executor, verifier, and discovery surfaces (progress, stats, graphify). Canonical parser: `roadmap.cjs` `**Mode:**` field; canonical resolution chain documented in `workflows/plan-phase.md`. Concept index: `references/mvp-concepts.md`.

### User Story
Phase-goal format under MVP Mode: `As a [role], I want to [capability], so that [outcome].` Required regex shape: `/^As a .+, I want to .+, so that .+\.$/`. Used as the framing input by `gsd-planner` (emits as bolded `## Phase Goal` header in PLAN.md) and as the verification target by `gsd-verifier` (the `[outcome]` clause is the goal-backward verification anchor). Authored interactively by `/gsd-mvp-phase`, validated by SPIDR Splitting when too large.

### Walking Skeleton
Phase 1 deliverable under `--mvp` on a new project: the thinnest end-to-end stack proving every layer (framework, DB, routing, deployment) works together. Emitted as `SKELETON.md` capturing the architectural decisions subsequent vertical slices inherit. Gate fires when `phase_number == "01"` AND `prior_summaries == 0` AND `MVP_MODE=true`. Scope intentionally narrow (PRD #2826 Q2) — does not retrofit existing projects.

### Vertical Slice
Single-feature task that moves one user capability from open-to-close (happy path) end-to-end. Contrast with the horizontal layer (all models, then all APIs, then all UI). The MVP Mode planning unit; SPIDR Splitting axes (Spike, Paths, Interfaces, Data, Rules) are the canonical decomposition tools when a slice is too large for one phase.

### Behavior-Adding Task
Predicate over a PLAN.md task: `tdd="true"` frontmatter AND `<behavior>` block names a user-visible outcome AND `<files>` includes at least one non-`*.md` / non-`*.json` / non-`*.test.*` source file. Pure doc/config/test-only tasks are exempt. The MVP+TDD Gate (in `references/execute-mvp-tdd.md`) only halts execution on this predicate; the gsd-executor agent applies all three checks at runtime. Currently a prose-only specification — no shared utility.

### MVP+TDD Gate
Per-task runtime gate in `/gsd-execute-phase` that, when both `MVP_MODE` and `TDD_MODE` are true, refuses to advance a Behavior-Adding Task until a failing-test commit (`test(\{phase\}-\{plan\})`) exists for it. The `tdd_review_checkpoint` end-of-phase review escalates from advisory to blocking under the same condition. Documented contract: `references/execute-mvp-tdd.md`. Reserved escape hatch `--force-mvp-gate` is documented but not implemented.

### SPIDR Splitting
Five-axis story decomposition discipline (**S**pike, **P**aths, **I**nterfaces, **D**ata, **R**ules) used by `/gsd-mvp-phase` when a User Story is too large for one phase. Full interactive flow per PRD #2826 Q3 (not a lightweight filter). Reference: `get-shit-done/references/spidr-splitting.md`.
