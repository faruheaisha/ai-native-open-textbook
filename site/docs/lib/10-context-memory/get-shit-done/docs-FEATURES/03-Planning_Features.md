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
pageSha256: "8acc97d8838841ece707d249436f8f9fb4d8b5761d6f2e507abf314c036ba6ec"
contentMode: "local-full"
zh: ""
---

## Planning Features

### 9. Phase Management

**Commands:** `/gsd-phase`, `/gsd-phase --insert [N]`, `/gsd-phase --remove [N]`

**Purpose:** Dynamic roadmap modification during development.

**Requirements:**
- REQ-PHASE-01: Add MUST append a new phase to the end of the current roadmap
- REQ-PHASE-02: Insert MUST use decimal numbering (e.g., 3.1) between existing phases
- REQ-PHASE-03: Remove MUST renumber all subsequent phases
- REQ-PHASE-04: Remove MUST prevent removing phases that have been executed
- REQ-PHASE-05: All operations MUST update ROADMAP.md and create/remove phase directories

---

### 10. Quick Mode

**Command:** `/gsd-quick [--full] [--discuss] [--research]`

**Purpose:** Ad-hoc task execution with GSD guarantees but a faster path.

**Requirements:**
- REQ-QUICK-01: System MUST accept freeform task description
- REQ-QUICK-02: System MUST use same planner + executor agents as full workflow
- REQ-QUICK-03: System MUST skip research, plan checker, and verifier by default
- REQ-QUICK-04: `--full` flag MUST enable plan checking (max 2 iterations) and post-execution verification
- REQ-QUICK-05: `--discuss` flag MUST run lightweight pre-planning discussion
- REQ-QUICK-06: `--research` flag MUST spawn focused research agent before planning
- REQ-QUICK-07: Flags MUST be composable (`--discuss --research --full`)
- REQ-QUICK-08: System MUST track quick tasks in `.planning/quick/YYMMDD-xxx-slug/`
- REQ-QUICK-09: System MUST produce atomic commits for quick task execution

---

### 11. Autonomous Mode

**Command:** `/gsd-autonomous [--from N]`

**Purpose:** Run all remaining phases autonomously — discuss → plan → execute per phase.

**Requirements:**
- REQ-AUTO-01: System MUST iterate through all incomplete phases in roadmap order
- REQ-AUTO-02: System MUST run discuss → plan → execute for each phase
- REQ-AUTO-03: System MUST pause for explicit user decisions (gray area acceptance, blockers, validation)
- REQ-AUTO-04: System MUST re-read ROADMAP.md after each phase to catch dynamically inserted phases
- REQ-AUTO-05: `--from N` flag MUST start from a specific phase number

---

### 12. Freeform Routing

**Command:** `/gsd-progress --do` (see also `/gsd-manager` for interactive routing)

**Purpose:** Analyze freeform text and route to the appropriate GSD command.

**Requirements:**
- REQ-DO-01: System MUST parse user intent from natural language input
- REQ-DO-02: System MUST map intent to the best matching GSD command
- REQ-DO-03: System MUST confirm the routing with the user before executing
- REQ-DO-04: System MUST handle project-exists vs no-project contexts differently

---

### 13. Note Capture

**Command:** `/gsd-capture`

**Purpose:** Zero-friction idea capture without interrupting workflow. Append timestamped notes, list all notes, or promote notes to structured todos.

**Requirements:**
- REQ-NOTE-01: System MUST save timestamped note files with a single Write call
- REQ-NOTE-02: System MUST support `list` subcommand to show all notes from project and global scopes
- REQ-NOTE-03: System MUST support `promote N` subcommand to convert a note into a structured todo
- REQ-NOTE-04: System MUST support `--global` flag for global scope operations
- REQ-NOTE-05: System MUST NOT use Task, AskUserQuestion, or Bash — runs inline only

---

### 14. Auto-Advance (Next)

**Command:** `/gsd-progress --next`

**Purpose:** Automatically detect current project state and advance to the next logical workflow step, eliminating the need to remember which phase/step you're on.

**Requirements:**
- REQ-NEXT-01: System MUST read STATE.md, ROADMAP.md, and phase directories to determine current position
- REQ-NEXT-02: System MUST detect whether discuss, plan, execute, or verify is needed
- REQ-NEXT-03: System MUST invoke the correct command automatically
- REQ-NEXT-04: System MUST suggest `/gsd-new-project` if no project exists
- REQ-NEXT-05: System MUST suggest `/gsd-complete-milestone` when all phases are complete

**State Detection Logic:**
| State | Action |
|-------|--------|
| No `.planning/` directory | Suggest `/gsd-new-project` |
| Phase has no CONTEXT.md | Run `/gsd-discuss-phase` |
| Phase has no PLAN.md files | Run `/gsd-plan-phase` |
| Phase has plans but no SUMMARY.md | Run `/gsd-execute-phase` |
| Phase executed but no VERIFICATION.md | Run `/gsd-verify-work` |
| All phases complete | Suggest `/gsd-complete-milestone` |
