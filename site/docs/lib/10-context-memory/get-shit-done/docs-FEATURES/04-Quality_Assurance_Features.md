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
pageSha256: "bac7c1ba5b710dbc420969874c7da68e2cef1b85a2cab6a3680e311a812d204a"
contentMode: "local-full"
zh: ""
---

## Quality Assurance Features

### 15. Nyquist Validation

**Purpose:** Map automated test coverage to phase requirements before any code is written. Named after the Nyquist sampling theorem — ensures a feedback signal exists for every requirement.

**Requirements:**
- REQ-NYQ-01: System MUST detect existing test infrastructure during plan-phase research
- REQ-NYQ-02: System MUST map each requirement to a specific test command
- REQ-NYQ-03: System MUST identify Wave 0 tasks (test scaffolding needed before implementation)
- REQ-NYQ-04: Plan checker MUST enforce Nyquist compliance as 8th verification dimension
- REQ-NYQ-05: System MUST support retroactive validation via `/gsd-validate-phase`
- REQ-NYQ-06: System MUST be disableable via `workflow.nyquist_validation: false`

**Produces:** `\{phase\}-VALIDATION.md` — Test coverage contract

**Retroactive Validation (`/gsd-validate-phase [N]`):**
- Scans implementation and maps requirements to tests
- Identifies gaps where requirements lack automated verification
- Spawns auditor to generate tests (max 3 attempts)
- Never modifies implementation code — only test files and VALIDATION.md
- Flags implementation bugs as escalations for user to address

---

### 16. Plan Checking

**Purpose:** Goal-backward verification that plans will achieve phase objectives before execution.

**Requirements:**
- REQ-PLANCK-01: System MUST verify plans against 8 quality dimensions
- REQ-PLANCK-02: System MUST loop up to 3 iterations until plans pass
- REQ-PLANCK-03: System MUST produce specific, actionable feedback on failures
- REQ-PLANCK-04: System MUST be disableable via `workflow.plan_check: false`

---

### 17. Post-Execution Verification

**Purpose:** Automated check that the codebase delivers what the phase promised.

**Requirements:**
- REQ-POSTVER-01: System MUST check against phase goals, not just task completion
- REQ-POSTVER-02: System MUST produce VERIFICATION.md with pass/fail analysis
- REQ-POSTVER-03: System MUST log issues for `/gsd-verify-work` to address
- REQ-POSTVER-04: System MUST be disableable via `workflow.verifier: false`

---

### 18. Node Repair

**Purpose:** Autonomous recovery when task verification fails during execution.

**Requirements:**
- REQ-REPAIR-01: System MUST analyze failure and choose one strategy: RETRY, DECOMPOSE, or PRUNE
- REQ-REPAIR-02: RETRY MUST attempt with a concrete adjustment
- REQ-REPAIR-03: DECOMPOSE MUST break task into smaller verifiable sub-steps
- REQ-REPAIR-04: PRUNE MUST remove unachievable tasks and escalate to user
- REQ-REPAIR-05: System MUST respect repair budget (default: 2 attempts per task)
- REQ-REPAIR-06: System MUST be configurable via `workflow.node_repair_budget` and `workflow.node_repair`

---

### 19. Health Validation

**Command:** `/gsd-health [--repair]`

**Purpose:** Validate `.planning/` directory integrity and auto-repair issues.

**Requirements:**
- REQ-HEALTH-01: System MUST check for missing required files
- REQ-HEALTH-02: System MUST validate configuration consistency
- REQ-HEALTH-03: System MUST detect orphaned plans without summaries
- REQ-HEALTH-04: System MUST check phase numbering and roadmap sync
- REQ-HEALTH-05: `--repair` flag MUST auto-fix recoverable issues

---

### 20. Cross-Phase Regression Gate

**Purpose:** Prevent regressions from compounding across phases by running prior phases' test suites after execution.

**Requirements:**
- REQ-REGR-01: System MUST run test suites from all completed prior phases after phase execution
- REQ-REGR-02: System MUST report any test failures as cross-phase regressions
- REQ-REGR-03: Regressions MUST be surfaced before post-execution verification
- REQ-REGR-04: System MUST identify which prior phase's tests were broken

**When:** Runs automatically during `/gsd-execute-phase` before the verifier step.

---

### 21. Requirements Coverage Gate

**Purpose:** Ensure all phase requirements are covered by at least one plan before planning completes.

**Requirements:**
- REQ-COVGATE-01: System MUST extract all requirement IDs assigned to the phase from ROADMAP.md
- REQ-COVGATE-02: System MUST verify each requirement appears in at least one PLAN.md
- REQ-COVGATE-03: Uncovered requirements MUST block planning completion
- REQ-COVGATE-04: System MUST report which specific requirements lack plan coverage

**When:** Runs automatically at the end of `/gsd-plan-phase` after the plan checker loop.
