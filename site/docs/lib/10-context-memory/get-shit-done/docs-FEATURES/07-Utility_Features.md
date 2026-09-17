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
pageSha256: "8714ad1c9b8302dd0fb067f145c19cd8cca4ffa8b56a0bed7f201213ef0adaeb"
contentMode: "local-full"
zh: ""
---

## Utility Features

### 28. Debug System

**Command:** `/gsd-debug [description]`

**Purpose:** Systematic debugging with persistent state across context resets.

**Requirements:**
- REQ-DEBUG-01: System MUST create debug session file in `.planning/debug/`
- REQ-DEBUG-02: System MUST track hypotheses, evidence, and eliminated theories
- REQ-DEBUG-03: System MUST persist state so debugging survives context resets
- REQ-DEBUG-04: System MUST require human verification before marking resolved
- REQ-DEBUG-05: Resolved sessions MUST append to `.planning/debug/knowledge-base.md`
- REQ-DEBUG-06: Knowledge base MUST be consulted on new debug sessions to prevent re-investigation

**Debug Session States:** `gathering` → `investigating` → `fixing` → `verifying` → `awaiting_human_verify` → `resolved`

---

### 29. Todo Management

**Commands:** `/gsd-capture [desc]`, `/gsd-capture --list`

**Purpose:** Capture ideas and tasks during sessions for later work.

**Requirements:**
- REQ-TODO-01: System MUST capture todo from current conversation context
- REQ-TODO-02: Todos MUST be stored in `.planning/todos/pending/`
- REQ-TODO-03: Completed todos MUST move to `.planning/todos/completed/`
- REQ-TODO-04: Check-todos MUST list all pending items with selection to work on one

---

### 30. Statistics Dashboard

**Command:** `/gsd-stats`

**Purpose:** Display project metrics — phases, plans, requirements, git history, and timeline.

**Requirements:**
- REQ-STATS-01: System MUST show phase/plan completion counts
- REQ-STATS-02: System MUST show requirement coverage
- REQ-STATS-03: System MUST show git commit metrics
- REQ-STATS-04: System MUST support multiple output formats (json, table, bar)

---

### 31. Update System

**Command:** `/gsd-update`

**Purpose:** Update GSD to the latest version with changelog preview.

**Requirements:**
- REQ-UPDATE-01: System MUST check for new versions via npm
- REQ-UPDATE-02: System MUST display changelog for new version before updating
- REQ-UPDATE-03: System MUST be runtime-aware and target the correct directory
- REQ-UPDATE-04: System MUST back up locally modified files to `gsd-local-patches/`
- REQ-UPDATE-05: `/gsd-update --reapply` MUST restore local modifications after update

---

### 32. Settings Management

**Command:** `/gsd-settings`

**Purpose:** Interactive configuration of workflow toggles and model profile.

**Requirements:**
- REQ-SETTINGS-01: System MUST present current settings with toggle options
- REQ-SETTINGS-02: System MUST update `.planning/config.json`
- REQ-SETTINGS-03: System MUST support saving as global defaults (`~/.gsd/defaults.json`)

**Configurable Settings:**
| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `mode` | enum | `interactive` | `interactive` or `yolo` (auto-approve) |
| `granularity` | enum | `standard` | `coarse`, `standard`, or `fine` |
| `model_profile` | enum | `balanced` | `quality`, `balanced`, `budget`, or `inherit` |
| `models.<phase_type>` | enum | (none) | Per-phase-type tier override (`planning`, `discuss`, `research`, `execution`, `verification`, `completion`). Values: `opus`, `sonnet`, `haiku`, `inherit`. Coarse phase-level tuning that wins over `model_profile` but loses to per-agent `model_overrides`. See [CONFIGURATION.md](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index#per-phase-type-models-models--added-in-v140). Added in v1.40 |
| `dynamic_routing.enabled` | boolean | `false` | Master switch for failure-tier escalation. When `true`, agents resolve to `tier_models[default_tier]` and escalate one tier on orchestrator-detected soft failure. Capped by `max_escalations`. See [CONFIGURATION.md](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index#dynamic-routing-with-failure-tier-escalation-dynamic_routing--added-in-v140). Added in v1.40 |
| `workflow.research` | boolean | `true` | Domain research before planning |
| `workflow.plan_check` | boolean | `true` | Plan verification loop |
| `workflow.verifier` | boolean | `true` | Post-execution verification |
| `workflow.auto_advance` | boolean | `false` | Auto-chain discuss→plan→execute |
| `workflow.nyquist_validation` | boolean | `true` | Nyquist test coverage mapping |
| `workflow.ui_phase` | boolean | `true` | UI design contract generation |
| `workflow.ui_safety_gate` | boolean | `true` | Prompt for ui-phase on frontend phases |
| `workflow.node_repair` | boolean | `true` | Autonomous task repair |
| `workflow.node_repair_budget` | number | `2` | Max repair attempts per task |
| `planning.commit_docs` | boolean | `true` | Commit `.planning/` files to git |
| `planning.search_gitignored` | boolean | `false` | Include gitignored files in searches |
| `parallelization.enabled` | boolean | `true` | Run independent plans simultaneously |
| `git.branching_strategy` | enum | `none` | `none`, `phase`, or `milestone` |

---

### 33. Test Generation

**Command:** `/gsd-add-tests [N]`

**Purpose:** Generate tests for a completed phase based on UAT criteria and implementation.

**Requirements:**
- REQ-TEST-01: System MUST analyze completed phase implementation
- REQ-TEST-02: System MUST generate tests based on UAT criteria and acceptance criteria
- REQ-TEST-03: System MUST use existing test infrastructure patterns
