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
pageSha256: "0fee683c5f67596e27617c4e49ec9828b672b5064d235a804e2edd3a72273318"
contentMode: "local-full"
zh: ""
---

## Core Features

### 1. Project Initialization

**Command:** `/gsd-new-project [--auto @file.md]`

**Purpose:** Transform a user's idea into a fully structured project with research, scoped requirements, and a phased roadmap.

**Requirements:**
- REQ-INIT-01: System MUST conduct adaptive questioning until project scope is fully understood
- REQ-INIT-02: System MUST spawn parallel research agents to investigate the domain ecosystem
- REQ-INIT-03: System MUST extract requirements into v1 (must-have), v2 (future), and out-of-scope categories
- REQ-INIT-04: System MUST generate a phased roadmap with requirement traceability
- REQ-INIT-05: System MUST require user approval of the roadmap before proceeding
- REQ-INIT-06: System MUST prevent re-initialization when `.planning/PROJECT.md` already exists
- REQ-INIT-07: System MUST support `--auto @file.md` flag to skip interactive questions and extract from a document

**Produces:**
| Artifact | Description |
|----------|-------------|
| `PROJECT.md` | Project vision, constraints, technical decisions, evolution rules |
| `REQUIREMENTS.md` | Scoped requirements with unique IDs (REQ-XX) |
| `ROADMAP.md` | Phase breakdown with status tracking and requirement mapping |
| `STATE.md` | Initial project state with position, decisions, metrics |
| `config.json` | Workflow configuration |
| `research/SUMMARY.md` | Synthesized domain research |
| `research/STACK.md` | Technology stack investigation |
| `research/FEATURES.md` | Feature implementation patterns |
| `research/ARCHITECTURE.md` | Architecture patterns and trade-offs |
| `research/PITFALLS.md` | Common failure modes and mitigations |

**Process:**
1. **Questions** — Adaptive questioning guided by the "dream extraction" philosophy (not requirements gathering)
2. **Research** — 4 parallel researcher agents investigate stack, features, architecture, and pitfalls
3. **Synthesis** — Research synthesizer combines findings into SUMMARY.md
4. **Requirements** — Extracted from user responses + research, categorized by scope
5. **Roadmap** — Phase breakdown mapped to requirements, with granularity setting controlling phase count

**Functional Requirements:**
- Questions adapt based on detected project type (web app, CLI, mobile, API, etc.)
- Research agents have web search capability for current ecosystem information
- Granularity setting controls phase count: `coarse` (3-5), `standard` (5-8), `fine` (8-12)
- `--auto` mode extracts all information from the provided document without interactive questioning
- Existing codebase context (from `/gsd-map-codebase`) is loaded if present

---

### 2. Phase Discussion

**Command:** `/gsd-discuss-phase [N] [--auto] [--batch]`

**Purpose:** Capture user's implementation preferences and decisions before research and planning begin. Eliminates the gray areas that cause AI to guess.

**Requirements:**
- REQ-DISC-01: System MUST analyze the phase scope and identify decision areas (gray areas)
- REQ-DISC-02: System MUST categorize gray areas by type (visual, API, content, organization, etc.)
- REQ-DISC-03: System MUST ask only questions not already answered in prior CONTEXT.md files
- REQ-DISC-04: System MUST persist decisions in `\{phase\}-CONTEXT.md` with canonical references
- REQ-DISC-05: System MUST support `--auto` flag to auto-select recommended defaults
- REQ-DISC-06: System MUST support `--batch` flag for grouped question intake
- REQ-DISC-07: System MUST scout relevant source files before identifying gray areas (code-aware discussion)
- REQ-DISC-08: System MUST adapt gray area language to product-outcome terms when USER-PROFILE.md indicates a non-technical owner (learning_style: guided, jargon in frustration_triggers, or high-level explanation depth)
- REQ-DISC-09: When REQ-DISC-08 applies, advisor_research rationale paragraphs MUST be rewritten in plain language — same decisions, translated framing

**Produces:** `\{padded_phase\}-CONTEXT.md` — User preferences that feed into research and planning

**Gray Area Categories:**
| Category | Example Decisions |
|----------|-------------------|
| Visual features | Layout, density, interactions, empty states |
| APIs/CLIs | Response format, flags, error handling, verbosity |
| Content systems | Structure, tone, depth, flow |
| Organization | Grouping criteria, naming, duplicates, exceptions |

---

### 3. UI Design Contract

**Command:** `/gsd-ui-phase [N]`

**Purpose:** Lock design decisions before planning so that all components in a phase share consistent visual standards.

**Requirements:**
- REQ-UI-01: System MUST detect existing design system state (shadcn components.json, Tailwind config, tokens)
- REQ-UI-02: System MUST ask only unanswered design contract questions
- REQ-UI-03: System MUST validate against 6 dimensions (Copywriting, Visuals, Color, Typography, Spacing, Registry Safety)
- REQ-UI-04: System MUST enter revision loop if validation returns BLOCKED (max 2 iterations)
- REQ-UI-05: System MUST offer shadcn initialization for React/Next.js/Vite projects without `components.json`
- REQ-UI-06: System MUST enforce registry safety gate for third-party shadcn registries

**Produces:** `\{padded_phase\}-UI-SPEC.md` — Design contract consumed by executors

**6 Validation Dimensions:**
1. **Copywriting** — CTA labels, empty states, error messages
2. **Visuals** — Focal points, visual hierarchy, icon accessibility
3. **Color** — Accent usage discipline, 60/30/10 compliance
4. **Typography** — Font size/weight constraint adherence
5. **Spacing** — Grid alignment, token consistency
6. **Registry Safety** — Third-party component inspection requirements

**shadcn Integration:**
- Detects missing `components.json` in React/Next.js/Vite projects
- Guides user through `ui.shadcn.com/create` preset configuration
- Preset string becomes a planning artifact reproducible across phases
- Safety gate requires `npx shadcn view` and `npx shadcn diff` before third-party components

---

### 4. Phase Planning

**Command:** `/gsd-plan-phase [N] [--auto] [--skip-research] [--skip-verify]`

**Purpose:** Research the implementation domain and produce verified, atomic execution plans.

**Requirements:**
- REQ-PLAN-01: System MUST spawn a phase researcher to investigate implementation approaches
- REQ-PLAN-02: System MUST produce plans with 2-3 tasks each, sized for a single context window
- REQ-PLAN-03: System MUST structure plans as XML with `<task>` elements containing `name`, `files`, `action`, `verify`, and `done` fields
- REQ-PLAN-04: System MUST include `read_first` and `acceptance_criteria` sections in every plan
- REQ-PLAN-05: System MUST run plan checker verification loop (up to 3 iterations) unless `--skip-verify` is set
- REQ-PLAN-06: System MUST support `--skip-research` flag to bypass research phase
- REQ-PLAN-07: System MUST prompt user to run `/gsd-ui-phase` if frontend phase detected and no UI-SPEC.md exists (UI safety gate)
- REQ-PLAN-08: System MUST include Nyquist validation mapping when `workflow.nyquist_validation` is enabled
- REQ-PLAN-09: System MUST verify all phase requirements are covered by at least one plan before planning completes (requirements coverage gate)

**Produces:**
| Artifact | Description |
|----------|-------------|
| `\{phase\}-RESEARCH.md` | Ecosystem research findings |
| `\{phase\}-\{N\}-PLAN.md` | Atomic execution plans (2-3 tasks each) |
| `\{phase\}-VALIDATION.md` | Test coverage mapping (Nyquist layer) |

**Plan Structure (XML):**
```xml
<task type="auto">
  <name>Create login endpoint</name>
  <files>src/app/api/auth/login/route.ts</files>
  <action>
    Use jose for JWT. Validate credentials against users table.
    Return httpOnly cookie on success.
  </action>
  <verify>curl -X POST localhost:3000/api/auth/login returns 200 + Set-Cookie</verify>
  <done>Valid credentials return cookie, invalid return 401</done>
</task>
```

**Plan Checker Verification (8 Dimensions):**
1. Requirement coverage — Plans address all phase requirements
2. Task atomicity — Each task is independently committable
3. Dependency ordering — Tasks sequence correctly
4. File scope — No excessive file overlap between plans
5. Verification commands — Each task has testable done criteria
6. Context fit — Tasks fit within a single context window
7. Gap detection — No missing implementation steps
8. Nyquist compliance — Tasks have automated verify commands (when enabled)

---

### 5. Phase Execution

**Command:** `/gsd-execute-phase <N>`

**Purpose:** Execute all plans in a phase using wave-based parallelization with fresh context windows per executor.

**Requirements:**
- REQ-EXEC-01: System MUST analyze plan dependencies and group into execution waves
- REQ-EXEC-02: System MUST spawn independent plans in parallel within each wave
- REQ-EXEC-03: System MUST give each executor a fresh context window (200K tokens)
- REQ-EXEC-04: System MUST produce atomic git commits per task
- REQ-EXEC-05: System MUST produce a SUMMARY.md for each completed plan
- REQ-EXEC-06: System MUST run post-execution verifier to check phase goals were met
- REQ-EXEC-07: System MUST support git branching strategies (`none`, `phase`, `milestone`)
- REQ-EXEC-08: System MUST invoke node repair operator on task verification failure (when enabled)
- REQ-EXEC-09: System MUST run prior phases' test suites before verification to catch cross-phase regressions

**Produces:**
| Artifact | Description |
|----------|-------------|
| `\{phase\}-\{N\}-SUMMARY.md` | Execution outcomes per plan |
| `\{phase\}-VERIFICATION.md` | Post-execution verification report |
| Git commits | Atomic commits per task |

**Wave Execution:**
- Plans with no dependencies → Wave 1 (parallel)
- Plans depending on Wave 1 → Wave 2 (parallel, waits for Wave 1)
- Continues until all plans complete
- File conflicts force sequential execution within same wave

**Executor Capabilities:**
- Reads PLAN.md with full task instructions
- Has access to PROJECT.md, STATE.md, CONTEXT.md, RESEARCH.md
- Commits each task atomically with structured commit messages
- Uses `--no-verify` on commits during parallel execution to avoid build lock contention
- Handles checkpoint types: `auto`, `checkpoint:human-verify`, `checkpoint:decision`, `checkpoint:human-action`
- Reports deviations from plan in SUMMARY.md

**Parallel Safety:**
- **Pre-commit hooks**: Skipped by parallel agents (`--no-verify`), run once by orchestrator after each wave
- **STATE.md locking**: File-level lockfile prevents concurrent write corruption across agents

---

### 6. Work Verification

**Command:** `/gsd-verify-work [N]`

**Purpose:** User acceptance testing — walk the user through testing each deliverable and auto-diagnose failures.

**Requirements:**
- REQ-VERIFY-01: System MUST extract testable deliverables from the phase
- REQ-VERIFY-02: System MUST present deliverables one at a time for user confirmation
- REQ-VERIFY-03: System MUST spawn debug agents to diagnose failures automatically
- REQ-VERIFY-04: System MUST create fix plans for identified issues
- REQ-VERIFY-05: System MUST inject cold-start smoke test for phases modifying server/database/seed/startup files
- REQ-VERIFY-06: System MUST produce UAT.md with pass/fail results

**Produces:** `\{phase\}-UAT.md` — User acceptance test results, plus fix plans if issues found

---

### 6.5. Ship

**Command:** `/gsd-ship [N] [--draft]`

**Purpose:** Bridge local completion → merged PR. After verification passes, push branch, create PR with auto-generated body from planning artifacts, optionally trigger review, and track in STATE.md.

**Requirements:**
- REQ-SHIP-01: System MUST verify phase has passed verification before shipping
- REQ-SHIP-02: System MUST push branch and create PR via `gh` CLI
- REQ-SHIP-03: System MUST auto-generate PR body from SUMMARY.md, VERIFICATION.md, and REQUIREMENTS.md
- REQ-SHIP-04: System MUST update STATE.md with shipping status and PR number
- REQ-SHIP-05: System MUST support `--draft` flag for draft PRs
- REQ-SHIP-06: System MUST support append-only project PR body sections configured with `ship.pr_body_sections`

**Prerequisites:** Phase verified, `gh` CLI installed and authenticated, work on feature branch

**Produces:** GitHub PR with rich body, optional configured PRD-style sections, STATE.md updated

**User documentation:** [Custom PR Body Sections](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/ship-pr-body-sections.md)

---

### 7. UI Review

**Command:** `/gsd-ui-review [N]`

**Purpose:** Retroactive 6-pillar visual audit of implemented frontend code. Works standalone on any project.

**Requirements:**
- REQ-UIREVIEW-01: System MUST score each of the 6 pillars on a 1-4 scale
- REQ-UIREVIEW-02: System MUST capture screenshots via Playwright CLI to `.planning/ui-reviews/`
- REQ-UIREVIEW-03: System MUST create `.gitignore` for screenshot directory
- REQ-UIREVIEW-04: System MUST identify top 3 priority fixes
- REQ-UIREVIEW-05: System MUST work standalone (without UI-SPEC.md) using abstract quality standards

**6 Audit Pillars (scored 1-4):**
1. **Copywriting** — CTA labels, empty states, error states
2. **Visuals** — Focal points, visual hierarchy, icon accessibility
3. **Color** — Accent usage discipline, 60/30/10 compliance
4. **Typography** — Font size/weight constraint adherence
5. **Spacing** — Grid alignment, token consistency
6. **Experience Design** — Loading/error/empty state coverage

**Produces:** `\{padded_phase\}-UI-REVIEW.md` — Scores and prioritized fixes

---

### 8. Milestone Management

**Commands:** `/gsd-audit-milestone`, `/gsd-complete-milestone`, `/gsd-new-milestone [name]`

**Purpose:** Verify milestone completion, archive, tag release, and start the next development cycle.

**Requirements:**
- REQ-MILE-01: Audit MUST verify all milestone requirements are met
- REQ-MILE-02: Audit MUST detect stubs, placeholder implementations, and untested code
- REQ-MILE-03: Audit MUST check Nyquist validation compliance across phases
- REQ-MILE-04: Complete MUST archive milestone data to MILESTONES.md
- REQ-MILE-05: Complete MUST offer git tag creation for the release
- REQ-MILE-06: Complete MUST offer squash merge or merge with history for branching strategies
- REQ-MILE-07: Complete MUST clean up UI review screenshots
- REQ-MILE-08: New milestone MUST follow same flow as new-project (questions → research → requirements → roadmap)
- REQ-MILE-09: New milestone MUST NOT reset existing workflow configuration
