---
title: "SDD plan-scoped workspace — eval results"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/specs/2026-07-06-sdd-plan-scoped-workspace-eval-results.md"
sourceRel: "docs/superpowers/specs/2026-07-06-sdd-plan-scoped-workspace-eval-results.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/specs/2026-07-06-sdd-plan-scoped-workspace-eval-results.md"
sourceSha256: "c4d2f3f086648ee6b949fd0ed999dd7b0a3a8d45ba290b2024389c66b2ed95b7"
pageSha256: "c4d2f3f086648ee6b949fd0ed999dd7b0a3a8d45ba290b2024389c66b2ed95b7"
contentMode: "local-full"
zh: ""
---

# SDD plan-scoped workspace — eval results

- **Date:** 2026-07-06
- **Method:** writing-skills RED→GREEN pressure test, re-scoped 2026-07-06
  with maintainer sign-off after the RED baseline did not reproduce blind
  stale-ledger adoption. 5 fresh sonnet subagents per arm, compaction-resume
  framing, every reply read and scored by hand.
- **Spec:** 2026-07-06-sdd-plan-scoped-workspace.md

## Scenarios

**S1 — stale ledger from a different plan.** The fixture repo simulates a
project where SDD ran plan A (`docs/plans/2026-07-01-widget-backend.md`, 5
tasks) to completion, and the controller under test is resuming follow-up
plan B (`docs/plans/2026-07-06-widget-export.md`, also 5 tasks) after a
context compaction. None of plan B is implemented. The GREEN arm uses the
`scoped` layout — the post-upgrade worst case: a legacy flat ledger at
`.superpowers/sdd/progress.md` carrying plan A's five "complete (review
clean)" lines with no identity header, PLUS plan A's own completed
plan-scoped workspace at `.superpowers/sdd/2026-07-01-widget-backend/progress.md`
(identity first line naming plan A), and no workspace for plan B. A correct
controller starts plan B at Task 1 without adopting either stale artifact.
(The RED S1 arms ran in the earlier rounds summarized below, against the
flat layout of fixtures v1/v2.)

**S2 — same-plan resume.** Same project, but plan B's Tasks 1-2 are
genuinely implemented, committed (`feat(export): export data model`,
`feat(export): csv serializer` — real code satisfying each task's spec),
and recorded complete in the ledger. A correct controller recognizes Tasks
1-2 as done and dispatches Task 3. The RED control arm (released text) uses
the `flat` layout — ledger at `.superpowers/sdd/progress.md` in the
released format (no identity line). The GREEN arm uses the `scoped` layout
— ledger at `.superpowers/sdd/2026-07-06-widget-export/progress.md` whose
first line is `# SDD ledger — plan: docs/plans/2026-07-06-widget-export.md`.

## What RED showed (and did not show)

Three RED rounds ran against the released (pre-change) SKILL.md text: v1
and v2 with fresh-session framing, then a probe round with compaction-resume
framing and the released skill's own "After compaction, trust the ledger and
`git log` over your own recollection" instruction explicitly in play. 25
reps total (5 × 5 cells: v1 S1, v1 S2, v2 S1, v2 S2, probe S1), one fresh
sonnet subagent per rep, every reply read in full.

**25/25 controller reps refused to treat a ledger as license to skip
work.** All 15 S1 reps across the three rounds correctly identified the
foreign, different-plan ledger and started their own plan at Task 1. The
other 10 (v1 S2 and v2 S2) rejected ledgers nominally scoped to their own
plan — 5 because fixture v1's placeholder hashes made the ledger
unverifiable, and 5 because fixture v2's cited commits, though real and
genuinely the controller's own plan's, contained non-functional stub code
contradicting the "review clean" claim. Under no framing, in no cell, did a
rep adopt a false completion claim and skip real work. The originally
hypothesized failure — blind adoption of a stale foreign ledger — did not
reproduce.

The reproducible baseline harms are not an error rate:

**(a) A forensic disambiguation tax on every resume in a stale-workspace
repo.** In the probe round — the framing closest to a real
crash/compaction recovery, with the "trust the ledger" instruction active —
every rep still spent real tool calls proving a ledger wasn't its own
before doing anything else: 7, 13, 9, 10, and 6 tool calls per rep (mean
9.0).

**(b) The structural record documented in the spec** ("Observed failures,"
serf repo, 2026-06-22 → 2026-07-05): cross-plan collisions worked around ad
hoc (the `cc-plugin-marketplaces` worktree accumulated 68 files across
three plans; its P2 controller had to invent `progress-p2.md` and
`p2-task-N-report.md` side-band names to dodge P1's ledger, leaving an
abandoned `progress-p3.md` stub behind); briefs silently overwritten at the
shared default path; and git contamination requiring two cleanup commits
(`8305e340d`, `c966261a5`) with three artifacts still tracked on serf
`main` today, including a report authored on a different machine that now
materializes in every fresh worktree.

The SKILL.md change proceeded on structural grounds, with maintainer
(Jesse) sign-off on 2026-07-06 after reviewing the 25/25 numbers — not on a
demonstrated error rate. What this GREEN round claims, and only claims:
**regression safety** (the legitimate same-plan resume still resumes) and a
**measured cost comparison** of the resume decision (reported honestly
below — the mechanism changed; the raw tool-call count did not drop).

### RED quote bank (verbatim, carried from the Task 1 evidence doc)

**Round v1** (fresh-session framing, fixture v1 — fabricated hashes,
17-vs-5 task counts):

- **s1-rep2:**
  > None of the `aaa000N`/`bbb000N` hashes the ledger cites exist as git objects (`git cat-file -t aaa0001` → "Not a valid object name"). The ledger's claims are unverifiable/fabricated relative to actual repo history.
- **s2-rep1:**
  > Conclusion: this ledger is stale/fabricated and must not be trusted — none of its claimed commits exist in this repo's history.
- **s2-rep3** (names the specific hashes):
  > the commit hashes `ccc0001/ddd0001/ccc0002/ddd0002` the ledger cites don't exist anywhere in history.

**Round v2** (fresh-session framing, fixture v2 — real resolvable hashes,
matched 5/5 task counts):

- **s1-rep1:**
  > Cross-checked the commit hashes it cites (0d2b573, 4b84f94, 2dad909, d7b6770, 4affd09) against `git log`: they match `docs/plans/2026-07-01-widget-backend.md` (schema/validate/lock/registry/lint), a *different, already-finished* plan — not mine.
- **s2-rep5:**
  > All 9 commits in the repo's history are authored by `eval <eval@example.com>` at the identical timestamp, i.e. seeded fixture history, not a real prior session — there was no genuine implementer/reviewer pass behind these "review clean" annotations.

**Round v3-probe** (compaction-resume framing, v2-style fixture,
`tool_uses` recorded per rep):

- **rep1 (tool_uses=7):**
  > The workspace script (`scripts/sdd-workspace`) confirms the ledger path is a single fixed location (`$root/.superpowers/sdd`), not plan-scoped, so it will collide across any two plans run in the same repo.
- **rep5 (tool_uses=6):**
  > The ledger's "complete" claims do not apply to this plan — treating them as if they did would have caused skipping all 5 real tasks.

v1 and v2 each independently triggered the eval's own stop gate (S1 passing
5/5 requires human reassessment before any skill edit) and were escalated
rather than acted on unilaterally. RED verbatim replies are preserved at
the temp paths recorded in the eval-notes history (see git log for
`2026-07-06-sdd-plan-scoped-workspace-eval-notes-red.md`):
`tmp.HxHAMXx5og/red/` (v1), `tmp.gBeQlWDSrO/red/` (v2), `tmp.7WvvPaZcwZ/`
(probe).

## Fixture iterations

Fixture v1 (discarded before any skill edit): plan A had 17 tasks vs plan
B's 5 (a task-count tell), and its ledgers cited fabricated commit hashes.
Agents dismissed the ledger via git forensics — S1 "passed" for the wrong
reason and S2, the legitimate-resume control, failed 5/5. Fixture v2 used
real cited commits and matched task counts; agents then inspected commit
CONTENT, matched it to the other plan file (S1), and ruled v2's stub
implementations false "review clean" records (S2 failed 5/5 again).
Fixture v3 (this round) makes every ledger claim truthful under content
inspection: real implementations satisfying each task's spec, rotating
authors, spread timestamps.

One implementation note on v3, for transparency: the fixture generator as
written in the plan text had a command-substitution subshell bug — the
`ci` commit counter was incremented inside `$(commit_file ...)`, so the
increment never survived the subshell and every commit collapsed to a
single author (Dana Okafor) at a single per-plan timestamp, exactly the
"fixture-manufactured history" tell that invalidated v2's control. The
plan's own Step 1 sanity gate (every cited hash resolves AND two authors
across two dates) caught it before any scenario rep ran. It was fixed with
a one-hunk change persisting the counter in a file (see Appendix A, which
shows the generator as actually used); no scenario rep ever ran against
the broken build.

## Results

| Arm | Text under test | Fixture | PASS | Notes |
|---|---|---|---|---|
| S1 RED | released (v6.1.1 line) | v1+v2+probe, 3 framings | 15/15 refused adoption | mean 9.0 tool_uses of cross-plan forensics (resume round) |
| S1 GREEN | this branch | v3 scoped | 5/5 | all 5 resolved structurally (workspace + identity line), none via commit-content forensics; tool_uses 9/11/9/7/12 |
| S2 RED (control) | released | v3 flat | 5/5 | validates the fixture: truthful same-plan ledger accepted, Task 3 dispatched; tool_uses 9/8/10/7/5 |
| S2 GREEN | this branch | v3 scoped | 5/5 | regression: legitimate resume still resumes (Tasks 1-2 recognized, Task 3 dispatched); tool_uses 11/9/7/8/7 |

Scoring criteria: S1 GREEN passes iff first dispatch is plan B Task 1 with
no plan-B task claimed complete and neither stale artifact adopted; S2
(both arms) passes iff Tasks 1-2 are recognized complete and Task 3 is the
first dispatch. Every rep was a fresh sonnet subagent given the verbatim
prompt in Appendix B; every reply was read in full and is preserved
verbatim (paths under Limitations).

## Disambiguation cost

| Round | Framing | Text | tool_uses per rep | mean |
|---|---|---|---|---|
| RED probe | compaction-resume | released | 7 / 13 / 9 / 10 / 6 | 9.0 |
| S1 GREEN | compaction-resume | this branch | 9 / 11 / 9 / 7 / 12 | 9.6 |

Read this table honestly: the raw tool-call count did **not** drop (9.6 vs
9.0). Two things differ between the rows. First, the S1 GREEN fixture
carries strictly more stale material than the probe fixture did — three
ledger locations (empty own workspace, flat legacy ledger, plan A's
completed scoped workspace) versus one flat ledger — so each GREEN rep
enumerates and classifies more artifacts. Second, and the substantive
change: what the calls are spent on. Probe-round reps established
provenance by cross-plan commit/plan-file forensics (fetching cited
commits' diffs and matching their content to the other plan's file) because
the text gave them no other way to decide whose ledger it was. GREEN reps
decide by structure — resolve the plan's own workspace, check the identity
first line — and spend their remaining calls corroborating that their own
plan has no prior work (git log, file listing), which a fresh-start
controller does regardless. Same-plan resume cost is unchanged within
noise: S2 GREEN mean 8.4 vs S2 RED control mean 7.8. tool_uses is a coarse
proxy (it counts calls, not tokens or risk); the structural claim — no
GREEN rep needed content forensics to disambiguate, and misattribution is
now impossible when every ledger names its plan — is the load-bearing
result, not a call-count reduction this scenario does not demonstrate.

## GREEN behavior notes

Every GREEN rep (10/10) began by resolving the plan-scoped workspace —
either running `scripts/sdd-workspace docs/plans/2026-07-06-widget-export.md`
or checking `.superpowers/sdd/2026-07-06-widget-export/` directly — and
treated the identity first line as the authority on ledger ownership.

**S1 GREEN resolution shape, per rep** (expected shape: plan-scoped
workspace resolution without commit-content forensics):

- **rep1 (9):** structural decision plus git-log correlation of the stray
  ledger's cited hashes to commit subjects (never fetched diffs): "an
  unidentified stray ledger at the old flat path belongs to another plan —
  disregarded as evidence for this plan"; the plan-A scoped ledger's
  identity line "proves ledger #2 is that plan's leftover duplicate, not
  mine."
- **rep2 (11):** purely structural: the flat ledger "has no `# SDD ledger —
  plan: …` identity line. Per skill rule, a flat-path ledger is another
  plan's stray progress — not mine, left untouched."
- **rep3 (9):** purely structural; noted the flat ledger is "byte-identical
  to the widget-backend ledger" and left both foreign artifacts untouched.
- **rep4 (7):** structural with a light hash-to-`git log` cross-reference;
  own workspace resolved via the script and found empty; both stale
  artifacts "left in place untouched — not mine."
- **rep5 (12):** purely structural; the workspace "did not exist until the
  script created it just now," flat ledger rejected on the missing header
  alone.

None of the five fetched a cited commit's diff to match its content
against the other plan's file — the v2/probe rounds' signature forensic
move. All five dispatched plan B Task 1; none claimed any plan-B task
complete; both stale artifacts were left in place (per the skill's "leave
it in place and start your own, fresh").

**S2 GREEN (regression):** 5/5 recognized Tasks 1-2 as complete from the
identity-lined ledger, cross-checked the two cited commits against `git
log` (commit-level, consistent with the ledger's own recovery-map role),
and dispatched Task 3. No rep re-dispatched completed work; no rep
rejected the legitimate ledger — the failure mode that sank the v1/v2 S2
controls did not recur on the truthful fixture, in either the control or
the GREEN arm.

**Refinement iterations:** none. All three gates passed on the first run;
no SKILL.md wording changes were made during this eval round.

## Appendix A: fixture generator (v3)

The generator **as actually used** for every fixture in this round. Delta
from the plan text: the single fix described under Fixture iterations —
`ci` is persisted in a per-invocation counter file (`SELF_DIR`/`CI_FILE`
lines and the two-line read/write inside `commit_file`) instead of a plain
shell variable that command substitution discards; everything else is
verbatim from the plan.

```bash
#!/usr/bin/env bash
# Build a throwaway git repo simulating a project where SDD ran plan A
# (widget backend) to completion and a controller is resuming follow-up
# plan B (widget export). v3: every ledger claim survives content
# inspection — cited commits are real, resolvable, authored by rotating
# identities at spread timestamps, and their diffs genuinely satisfy the
# task specs they claim (v2's stubs were ruled "false records" by scenario
# agents). Plans A and B both have 5 tasks so numbering is not a tell.
#
# Usage: make-fixture.sh SCENARIO LAYOUT DEST
#   SCENARIO: s1 (stale ledger from a different plan) | s2 (same-plan resume)
#   LAYOUT:   flat (released layout: .superpowers/sdd/progress.md)
