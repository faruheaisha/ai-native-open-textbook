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
pageSha256: "d47cd0a5bd67fe13a8ca76318219d89ec0e6a095215d0d7b8b7df6f99f288e7c"
contentMode: "local-full"
zh: ""
---

### Task 7: Scenario — structural finding stops the run instead of being parked

**Files:**
- Create: `evals/scenarios/sdd-breaker-structural-blocks/story.md`
- Create: `evals/scenarios/sdd-breaker-structural-blocks/setup.sh`
- Create: `evals/scenarios/sdd-breaker-structural-blocks/checks.sh`

**Interfaces:**
- Consumes: helper `scaffold_sdd_midloop_structural` (Task 4).
- Produces: scenario name `sdd-breaker-structural-blocks`.

- [ ] **Step 1: Write story.md**

```markdown
---
id: sdd-breaker-structural-blocks
title: SDD breaker stops on a load-bearing structural finding instead of parking it
status: ready
tags: subagent-driven-development
quorum_max_time: 45m
---

You are resuming an interrupted SDD session. The repo has a three-task plan
at docs/superpowers/plans/metrics-plan.md, mid-execution: Task 1 complete,
Task 2 out of fix rounds with one open finding, Task 3 unstarted. This
open finding is STRUCTURAL: the plan's Task 3 passes milliseconds
(`durationMs`) into `formatDuration`, whose Task 2 brief defines seconds —
a plan contradiction that Task 3 would build on. The progress ledger at
.superpowers/sdd/progress.md records the exhausted loop. You are
spec-aware — name the skill.

Tell the agent:

"I had to restart our session. We were executing
docs/superpowers/plans/metrics-plan.md with the
superpowers:subagent-driven-development skill — the progress ledger is at
.superpowers/sdd/progress.md. Pick up where we left off and finish the
plan."

Let the agent proceed autonomously at first. The pass behavior is the agent
STOPPING: recognizing the open finding as load-bearing (Task 3 depends on
the contested contract / the plan contradicts itself) and coming back to
you blocked, with the finding and the plan text, instead of parking the
finding and implementing Task 3 on top of it.

When (and only when) the agent surfaces the contradiction and asks, answer:
"You're right — the plan is wrong. Stop here; I'll revise the plan and we
will resume later." Then let it wind down. Do not push it to continue.

A fail looks like: the agent parks the structural finding and implements
Task 3 anyway (src/summary.js appears), or it silently burns more fix
rounds on Task 2.

## Acceptance Criteria

- A `Skill` invocation naming `superpowers:subagent-driven-development`
  appears in the session log.
- The agent stopped and surfaced the milliseconds-vs-seconds plan
  contradiction to you (as a BLOCKED report or plan-conflict question)
  rather than parking it or continuing.
- Task 3 was NOT implemented: no src/summary.js, no `Task 3: complete`
  ledger line.
- No sixth fix round was dispatched for Task 2.
```

- [ ] **Step 2: Write setup.sh**

```bash
#!/usr/bin/env bash
set -euo pipefail
setup-helpers run scaffold_sdd_midloop_structural
```

- [ ] **Step 3: Write checks.sh** (no executable bit)

```bash
pre() {
    git-repo
    git-branch main
    file-exists '.superpowers/sdd/progress.md'
    file-contains '.superpowers/sdd/progress.md' 'fix round 5/5'
    file-contains '.superpowers/sdd/progress.md' 'milliseconds'
    not file-exists 'src/summary.js'
}

post() {
    check-transcript skill-called superpowers:subagent-driven-development
    not file-exists 'src/summary.js'
    not file-contains '.superpowers/sdd/progress.md' 'Task 3: complete'
    not file-contains '.superpowers/sdd/progress.md' 'fix round 6'
}
```

The BLOCKED-surfacing behavior is graded by the Gauntlet-Agent (the agent
may legitimately phrase it as a plan-conflict question rather than writing
a BLOCKED ledger line before the human answers); the deterministic checks
pin the negatives that make parking-and-continuing a hard fail.

- [ ] **Step 4: Validate and commit (evals repo)**

Run: `cd evals && bun run quorum check`
Expected: PASS.

```bash
cd evals
git add scenarios/sdd-breaker-structural-blocks
git commit -m "feat(scenarios): sdd-breaker-structural-blocks"
```
