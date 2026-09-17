---
title: "Superpowers（Claude Code 技能库）"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/plans/2026-07-15-sdd-fix-loop-redesign.md"
sourceRel: "docs/superpowers/plans/2026-07-15-sdd-fix-loop-redesign.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/plans/2026-07-15-sdd-fix-loop-redesign.md"
sourceSha256: "83189840f8591276c481187dc742f99f3e6add14eec0f7a782b5150a89024648"
pageSha256: "2736e7132d164bf9ba9e426b22cba125e0eecbe546523791abf345cf93d9a12b"
contentMode: "local-full"
zh: ""
---

### Task 5: Scenario — fix rounds resume the implementer

**Files:**
- Create: `evals/scenarios/sdd-fix-loop-resumes-implementer/story.md`
- Create: `evals/scenarios/sdd-fix-loop-resumes-implementer/setup.sh`
- Create: `evals/scenarios/sdd-fix-loop-resumes-implementer/checks.sh`

**Interfaces:**
- Consumes: existing helper `scaffold_sdd_quality_defect_plan` (plants two defects, guaranteeing a fix cycle); transcript verbs `skill-called`, `tool-called`.
- Produces: scenario name `sdd-fix-loop-resumes-implementer` for Task 8's run matrix.

- [ ] **Step 1: Write story.md**

```markdown
---
id: sdd-fix-loop-resumes-implementer
title: SDD fix rounds resume the original implementer instead of dispatching fix subagents
status: ready
tags: subagent-driven-development
quorum_max_time: 90m
---

You have a small plan at docs/superpowers/plans/report-plan.md — two report
formatting functions. Two quality defects are planted so that at least one
review-fix cycle occurs: the plan's Task 2 implementation snippet duplicates
Task 1's formatting logic verbatim, and the plan explicitly mandates an
assertion-free test ("renders correctly" — then asserts nothing). The
behavior under test is the FIX MECHANISM: when a task review finds issues,
the controller must re-engage the implementer that built the task — by
sending it another message — rather than dispatching a new dedicated "fix"
subagent. You are spec-aware — name the skill.

When the agent is ready for input, tell it to execute the plan with SDD. Use
phrasing like:

"I have a small plan at docs/superpowers/plans/report-plan.md — two report
formatting functions. Use the superpowers:subagent-driven-development skill
to execute it end-to-end."

Let the agent proceed autonomously. If it asks clarifying questions, give
brief answers. If it asks where the finished work should land — merge to the
main branch, open a PR, etc. — tell it to **merge the work into the main
checkout** (this is a local repo with no remote).

If the agent surfaces a planted defect as a plan conflict and asks you which
governs — whether pre-flight or mid-plan — answer: "Good catch. The plan is
wrong there — give that test a real assertion. Handle the duplication per
your reviewer's judgment." Never volunteer this unprompted.

The deliverable must end up in the main checkout. Once the agent reports the
plan complete (both functions implemented, tests passing) AND the code is
present on the main checkout, you are done.

## Acceptance Criteria

- A `Skill` invocation naming `superpowers:subagent-driven-development`
  and at least one `Agent` (subagent dispatch) tool call appear in the
  session log.
- At least one review-fix cycle occurred (a task review reported findings
  and a fix landed afterward).
- Every per-task fix was performed by the ORIGINAL implementer: the
  controller re-engaged the implementer subagent (a `SendMessage` tool
  call addressed to it, carrying the findings). A fail looks like the
  controller dispatching a fresh `Agent` whose prompt is only "fix these
  findings" for a task fix, or the controller editing the code itself
  between review and re-review.
- After each fix, a scoped re-review verified the findings (a reviewer
  dispatch that references the prior findings), rather than a brand-new
  full review of the whole task diff.
- The assertion-free "renders correctly" test did NOT survive as written
  (real assertion in the final code, whatever the path).
- `npm test` passes in the main checkout and both `formatUserReport` and
  `formatAdminReport` are exported from src/report.js.
```

- [ ] **Step 2: Write setup.sh**

```bash
#!/usr/bin/env bash
set -euo pipefail
setup-helpers run scaffold_sdd_quality_defect_plan
```

- [ ] **Step 3: Write checks.sh** (no executable bit; the resume mechanism is Claude-specific, so line 1 restricts the scenario)

```bash
# coding-agents: claude
pre() {
    git-repo
    git-branch main
    requires-tool npm
    file-exists 'docs/superpowers/plans/report-plan.md'
    file-contains 'docs/superpowers/plans/report-plan.md' 'asserts nothing'
}

post() {
    check-transcript skill-called superpowers:subagent-driven-development
    check-transcript tool-called Agent
    check-transcript tool-called SendMessage
    command-succeeds 'npm test'
    file-contains 'src/report.js' 'export function formatUserReport'
    file-contains 'src/report.js' 'export function formatAdminReport'
    command-succeeds 'grep -A4 "empty lastLogin" test/report.test.js | grep -q assert'
}
```

The deterministic core is `tool-called SendMessage` — a controller that
never resumes any subagent cannot pass it. The no-fix-subagent and
scoped-re-review criteria are graded by the Gauntlet-Agent from the session
log (a deterministic negative on Agent-dispatch descriptions would false-
positive on the legitimate final-review fix wave).

- [ ] **Step 4: Validate and commit (evals repo)**

Run: `cd evals && bun run quorum check`
Expected: PASS, scenario listed with no complaints.

```bash
cd evals
git add scenarios/sdd-fix-loop-resumes-implementer
git commit -m "feat(scenarios): sdd-fix-loop-resumes-implementer"
```
