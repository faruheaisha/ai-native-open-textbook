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
pageSha256: "722b33f4220acde9a5a0eede730ad470bd0d823d549667c81a01237c722aef76"
contentMode: "local-full"
zh: ""
---

## Context Engineering Features

### 22. Context Window Monitoring

**Purpose:** Prevent context rot by alerting both user and agent when context is running low.

**Requirements:**
- REQ-CTX-01: Statusline MUST display context usage percentage to user
- REQ-CTX-02: Context monitor MUST inject agent-facing warnings at ≤35% remaining (WARNING)
- REQ-CTX-03: Context monitor MUST inject agent-facing warnings at ≤25% remaining (CRITICAL)
- REQ-CTX-04: Warnings MUST debounce (5 tool uses between repeated warnings)
- REQ-CTX-05: Severity escalation (WARNING→CRITICAL) MUST bypass debounce
- REQ-CTX-06: Context monitor MUST differentiate GSD-active vs non-GSD-active projects
- REQ-CTX-07: Warnings MUST be advisory, never imperative commands that override user preferences
- REQ-CTX-08: All hooks MUST fail silently and never block tool execution

**Architecture:** Two-part bridge system:
1. Statusline writes metrics to `/tmp/claude-ctx-\{session\}.json`
2. Context monitor reads metrics and injects `additionalContext` warnings

---

### 23. Session Management

**Commands:** `/gsd-pause-work`, `/gsd-resume-work`, `/gsd-progress`

**Purpose:** Maintain project continuity across context resets and sessions.

**Requirements:**
- REQ-SESSION-01: Pause MUST save current position and next steps to `continue-here.md` and structured `HANDOFF.json`
- REQ-SESSION-02: Resume MUST restore full project context from HANDOFF.json (preferred) or state files (fallback)
- REQ-SESSION-03: Progress MUST show current position, next action, and overall completion
- REQ-SESSION-04: Progress MUST read all state files (STATE.md, ROADMAP.md, phase directories)
- REQ-SESSION-05: All session operations MUST work after `/clear` (context reset)
- REQ-SESSION-06: HANDOFF.json MUST include blockers, human actions pending, and in-progress task state
- REQ-SESSION-07: Resume MUST surface human actions and blockers immediately on session start

---

### 24. Session Reporting

**Command:** `/gsd-pause-work --report`

**Purpose:** Generate a structured post-session summary document capturing work performed, outcomes achieved, and estimated resource usage.

**Requirements:**
- REQ-REPORT-01: System MUST gather data from STATE.md, git log, and plan/summary files
- REQ-REPORT-02: System MUST include commits made, plans executed, and phases progressed
- REQ-REPORT-03: System MUST estimate token usage and cost based on session activity
- REQ-REPORT-04: System MUST include active blockers and decisions made
- REQ-REPORT-05: System MUST recommend next steps

**Produces:** `.planning/reports/SESSION_REPORT.md`

**Report Sections:**
- Session overview (duration, milestone, phase)
- Work performed (commits, plans, phases)
- Outcomes and deliverables
- Blockers and decisions
- Resource estimates (tokens, cost)
- Next steps recommendation

---

### 25. Multi-Agent Orchestration

**Purpose:** Coordinate specialized agents with fresh context windows for each task.

**Requirements:**
- REQ-ORCH-01: Each agent MUST receive a fresh context window
- REQ-ORCH-02: Orchestrators MUST be thin — spawn agents, collect results, route next
- REQ-ORCH-03: Context payload MUST include all relevant project artifacts
- REQ-ORCH-04: Parallel agents MUST be truly independent (no shared mutable state)
- REQ-ORCH-05: Agent results MUST be written to disk before orchestrator processes them
- REQ-ORCH-06: Failed agents MUST be detected (spot-check actual output vs reported failure)

---

### 26. Model Profiles

**Command:** `/gsd-config --profile <quality|balanced|budget|adaptive|inherit>`

**Purpose:** Control which AI model each agent uses, balancing quality vs cost.

**Requirements:**
- REQ-MODEL-01: System MUST support 4 profiles: `quality`, `balanced`, `budget`, `inherit`
- REQ-MODEL-02: Each profile MUST define model tier per agent (see profile table)
- REQ-MODEL-03: Per-agent overrides MUST take precedence over profile
- REQ-MODEL-04: `inherit` profile MUST defer to runtime's current model selection
- REQ-MODEL-04a: `inherit` profile MUST be used when running non-Anthropic providers (OpenRouter, local models) to avoid unexpected API costs
- REQ-MODEL-05: Profile switch MUST be programmatic (script, not LLM-driven)
- REQ-MODEL-06: Model resolution MUST happen once per orchestration, not per spawn

**Profile Assignments:**

| Agent | `quality` | `balanced` | `budget` | `inherit` |
|-------|-----------|------------|----------|-----------|
| gsd-planner | Opus | Opus | Sonnet | Inherit |
| gsd-roadmapper | Opus | Sonnet | Sonnet | Inherit |
| gsd-executor | Opus | Sonnet | Sonnet | Inherit |
| gsd-phase-researcher | Opus | Sonnet | Haiku | Inherit |
| gsd-project-researcher | Opus | Sonnet | Haiku | Inherit |
| gsd-research-synthesizer | Sonnet | Sonnet | Haiku | Inherit |
| gsd-debugger | Opus | Sonnet | Sonnet | Inherit |
| gsd-codebase-mapper | Sonnet | Haiku | Haiku | Inherit |
| gsd-verifier | Sonnet | Sonnet | Haiku | Inherit |
| gsd-plan-checker | Sonnet | Sonnet | Haiku | Inherit |
| gsd-integration-checker | Sonnet | Sonnet | Haiku | Inherit |
| gsd-nyquist-auditor | Sonnet | Sonnet | Haiku | Inherit |
