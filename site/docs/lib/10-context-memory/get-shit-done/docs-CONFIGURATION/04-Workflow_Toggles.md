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
pageSha256: "ed8cc53b0028e589cf92a9c0ff6d55008942727f0fd13fd08b8460a466b1e8f8"
contentMode: "local-full"
zh: ""
---

## Workflow Toggles

All workflow toggles follow the **absent = enabled** pattern. If a key is missing from config, it defaults to `true`.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `workflow.research` | boolean | `true` | Domain investigation before planning each phase |
| `workflow.plan_check` | boolean | `true` | Plan verification loop (up to 3 iterations) |
| `workflow.verifier` | boolean | `true` | Post-execution verification against phase goals |
| `workflow.auto_advance` | boolean | `false` | Auto-chain discuss → plan → execute without stopping |
| `workflow.nyquist_validation` | boolean | `true` | Test coverage mapping during plan-phase research |
| `workflow.ui_phase` | boolean | `true` | Generate UI design contracts for frontend phases |
| `workflow.ui_safety_gate` | boolean | `true` | Prompt to run /gsd-ui-phase for frontend phases during plan-phase |
| `workflow.ui_review` | boolean | `true` | Run visual quality audit (`/gsd-ui-review`) after phase execution in autonomous mode. When `false`, the UI audit step is skipped. |
| `workflow.node_repair` | boolean | `true` | Autonomous task repair on verification failure |
| `workflow.node_repair_budget` | number | `2` | Max repair attempts per failed task |
| `workflow.research_before_questions` | boolean | `false` | Run research before discussion questions instead of after |
| `workflow.discuss_mode` | string | `'discuss'` | Controls how `/gsd-discuss-phase` gathers context. `'discuss'` (default) asks questions one-by-one. `'assumptions'` reads the codebase first, generates structured assumptions with confidence levels, and only asks you to correct what's wrong. Added in v1.28 |
| `workflow.max_discuss_passes` | number | `3` | Maximum number of question rounds in discuss-phase before the workflow stops asking. Useful in headless/auto mode to prevent infinite discussion loops. |
| `workflow.skip_discuss` | boolean | `false` | When `true`, `/gsd-autonomous` bypasses the discuss-phase entirely, writing minimal CONTEXT.md from the ROADMAP phase goal. Useful for projects where developer preferences are fully captured in PROJECT.md/REQUIREMENTS.md. Added in v1.28 |
| `workflow.text_mode` | boolean | `false` | Replaces AskUserQuestion TUI menus with plain-text numbered lists. Required for Claude Code remote sessions (`/rc` mode) where TUI menus don't render. Can also be set per-session with `--text` flag on discuss-phase. Added in v1.28 |
| `workflow.use_worktrees` | boolean | `true` | When `false`, disables git worktree isolation for parallel execution. Users who prefer sequential execution or whose environment does not support worktrees can disable this. Added in v1.31 |
| `workflow.worktree_skip_hooks` | boolean | `false` | When `true`, executor agents in worktree mode pass `--no-verify` (skipping pre-commit hooks) and post-wave hook validation runs against the merged result instead. Opt-in escape hatch for projects whose hooks cannot run in agent worktrees. Default `false` runs hooks on every commit (#2924). |
| `workflow.code_review` | boolean | `true` | Enable `/gsd-code-review` and `/gsd-code-review --fix` commands. When `false`, the commands exit with a configuration gate message. Added in v1.34 |
| `workflow.code_review_depth` | string | `standard` | Default review depth for `/gsd-code-review`: `quick` (pattern-matching only), `standard` (per-file analysis), or `deep` (cross-file with import graphs). Can be overridden per-run with `--depth=`. Added in v1.34 |
| `workflow.plan_bounce` | boolean | `false` | Run external validation script against generated plans. When enabled, the plan-phase orchestrator pipes each PLAN.md through the script specified by `plan_bounce_script` and blocks on non-zero exit. Added in v1.36 |
| `workflow.plan_bounce_script` | string | (none) | Path to the external script invoked for plan bounce validation. Receives the PLAN.md path as its first argument. Required when `plan_bounce` is `true`. Added in v1.36 |
| `workflow.plan_bounce_passes` | number | `2` | Number of sequential bounce passes to run. Each pass feeds the previous pass's output back into the validator. Higher values increase rigor at the cost of latency. Added in v1.36 |
| `workflow.post_planning_gaps` | boolean | `true` | Unified post-planning gap report (#2493). After all plans are generated and committed, scans REQUIREMENTS.md and CONTEXT.md `<decisions>` against every PLAN.md in the phase directory, then prints one `Source \| Item \| Status` table. Word-boundary matching (REQ-1 vs REQ-10) and natural sort (REQ-02 before REQ-10). Non-blocking — informational report only. Set to `false` to skip Step 13e of plan-phase. |
| `workflow.plan_review_convergence` | boolean | `false` | Enable the `/gsd-plan-review-convergence` command. Disabled by default — the command exits with an enable instruction when this key is `false`. The command automates the manual plan→review→replan loop: it spawns configured reviewers (Codex, Gemini, Claude, OpenCode, Ollama, LM Studio, llama.cpp), counts unresolved HIGH concerns via the CYCLE_SUMMARY contract, replans with `--reviews` feedback, and repeats until converged or max cycles reached. Enable with `gsd config-set workflow.plan_review_convergence true`. Added in v1.39 |
| `workflow.plan_chunked` | boolean | `false` | Enable chunked planning mode. When `true` (or when `--chunked` flag is passed to `/gsd-plan-phase`), the orchestrator splits the single long-lived planner Task into a short outline Task followed by N short per-plan Tasks (~3-5 min each). Each plan is committed individually for crash resilience. If a Task hangs and the terminal is force-killed, rerunning with `--chunked` resumes from the last completed plan. Particularly useful on Windows where long-lived Tasks may hang on stdio. Added in v1.38 |
| `workflow.code_review_command` | string | (none) | Shell command for external code review integration in `/gsd-ship`. Receives changed file paths via stdin. Non-zero exit blocks the ship workflow. Added in v1.36 |
| `workflow.tdd_mode` | boolean | `false` | Enable TDD pipeline as a first-class execution mode. When `true`, the planner aggressively applies `type: tdd` to eligible tasks (business logic, APIs, validations, algorithms) and the executor enforces RED/GREEN/REFACTOR gate sequence. An end-of-phase collaborative review checkpoint verifies gate compliance. Added in v1.36 |
