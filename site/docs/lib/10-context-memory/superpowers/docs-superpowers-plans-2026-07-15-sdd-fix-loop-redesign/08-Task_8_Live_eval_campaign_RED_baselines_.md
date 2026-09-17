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
pageSha256: "9f611063c54e37903e7dcb50b052562690b32b6e3564e705c5acec83f1462495"
contentMode: "local-full"
zh: ""
---

### Task 8: Live eval campaign — RED baselines, GREEN runs, regression, experiment log

**TRUSTED-MAINTAINER TASK.** Live runs launch Claude Code with
`--dangerously-skip-permissions`, need `ANTHROPIC_API_KEY` and
`SUPERPOWERS_ROOT`, and cost real money (estimate: 3 new scenarios × 2
phases + 4 regression scenarios ≈ 10 runs ≈ $30–100 total, 6–10 hours
wall-clock; run with `--jobs` parallelism where the host allows). Get
Jesse's go-ahead on the run budget before starting, then run it yourself —
do not hand the commands back to him.

**Files:**
- Create: `evals/docs/experiments/2026-07-sdd-fix-loop-redesign.md`

**Interfaces:**
- Consumes: everything from Tasks 1–7; a second superpowers checkout pinned to `dev` for baselines.
- Produces: verdicts for the PR's before/after evidence.

- [ ] **Step 1: Prepare the two SUPERPOWERS_ROOT checkouts**

```bash
git -C /Users/jesse/git/superpowers-workspace/superpowers worktree add /tmp/superpowers-baseline dev
export BASELINE_ROOT=/tmp/superpowers-baseline
export REDESIGN_ROOT=/Users/jesse/git/superpowers-workspace/superpowers   # on sdd-fix-loop-redesign
```

Confirm: `git -C "$REDESIGN_ROOT" branch --show-current` prints `sdd-fix-loop-redesign`; `git -C "$BASELINE_ROOT" branch --show-current` prints `dev` (detached at dev tip also fine).

- [ ] **Step 2: RED — run the three new scenarios against dev**

```bash
cd evals
SUPERPOWERS_ROOT="$BASELINE_ROOT" bun run quorum run scenarios/sdd-fix-loop-resumes-implementer --coding-agent claude
SUPERPOWERS_ROOT="$BASELINE_ROOT" bun run quorum run scenarios/sdd-breaker-adjudicates-at-cap --coding-agent claude
SUPERPOWERS_ROOT="$BASELINE_ROOT" bun run quorum run scenarios/sdd-breaker-structural-blocks --coding-agent claude
bun run quorum show
```

Expected (record actuals either way): resumes-implementer FAILS or is
indeterminate (current skill dispatches fix subagents; `SendMessage` check
unmet); adjudicates-at-cap FAILS (no `parked —` ledger line — current skill
has no cap or parked format); structural-blocks may pass or fail (current
skill escalates plan problems but has no breaker route) — record what
happens. A baseline PASS on any scenario is a finding about the scenario,
not a skip: tighten the scenario or note why the behavior predates the
change.

- [ ] **Step 3: GREEN — run the three new scenarios against the redesign**

```bash
cd evals
SUPERPOWERS_ROOT="$REDESIGN_ROOT" bun run quorum run scenarios/sdd-fix-loop-resumes-implementer --coding-agent claude
SUPERPOWERS_ROOT="$REDESIGN_ROOT" bun run quorum run scenarios/sdd-breaker-adjudicates-at-cap --coding-agent claude
SUPERPOWERS_ROOT="$REDESIGN_ROOT" bun run quorum run scenarios/sdd-breaker-structural-blocks --coding-agent claude
bun run quorum show
```

Expected: all three PASS. Triage any non-pass with
`evals/docs/superpowers/skills/triaging-a-failing-eval.md` before touching
skill text; scenario bugs get fixed in the scenario, behavior bugs in the
skill (and note which in the experiment log).

- [ ] **Step 4: Regression — run the existing SDD scenarios against the redesign**

```bash
cd evals
for s in sdd-quality-reviewer-catches-planted-defect sdd-rejects-extra-features sdd-escalates-broken-plan sdd-spec-constraint-preserved; do
  SUPERPOWERS_ROOT="$REDESIGN_ROOT" bun run quorum run "scenarios/$s" --coding-agent claude
done
bun run quorum show
```

Expected: all PASS. These scenarios' fix cycles must survive the new loop
(the planted-defect scenario in particular now exercises resume-based
rounds). Any regression blocks the merge — fix the skill, re-run.

- [ ] **Step 5: Write the experiment log entry**

Create `evals/docs/experiments/2026-07-sdd-fix-loop-redesign.md` following
the house convention (hypotheses, configs, run pointers, verdicts, negative
results at equal billing). Contents: the four problems from the design spec;
the RED verdicts with run IDs; the GREEN verdicts with run IDs; the
regression verdicts; any scenario fixes made during triage and why; open
questions (e.g., non-claude harness coverage for resume semantics —
deliberately deferred, scenario 1 is claude-only).

- [ ] **Step 6: Commit (evals repo) and clean up**

```bash
cd evals
git add docs/experiments/2026-07-sdd-fix-loop-redesign.md
git commit -m "docs(experiments): sdd fix-loop redesign campaign — RED/GREEN/regression verdicts"
git -C /Users/jesse/git/superpowers-workspace/superpowers worktree remove /tmp/superpowers-baseline
```

- [ ] **Step 7: Hand off**

Both branches ready: `sdd-fix-loop-redesign` (superpowers) and
`sdd-fix-loop-scenarios` (evals). Use superpowers:finishing-a-development-branch
in each repo. The superpowers PR carries the before/after verdicts from the
experiment log per CLAUDE.md's eval-evidence requirement.
