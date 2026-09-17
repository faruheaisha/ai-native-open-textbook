---
title: "SDD Task-Scoped Review Dispatch"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/specs/2026-06-09-sdd-task-scoped-review-dispatch-design.md"
sourceRel: "docs/superpowers/specs/2026-06-09-sdd-task-scoped-review-dispatch-design.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/specs/2026-06-09-sdd-task-scoped-review-dispatch-design.md"
sourceSha256: "08b6b77be0d3b95e1d19a3dc320b93bba52917ca9beb0084fd74ecd75c015b59"
pageSha256: "08b6b77be0d3b95e1d19a3dc320b93bba52917ca9beb0084fd74ecd75c015b59"
contentMode: "local-full"
zh: ""
---

# SDD Task-Scoped Review Dispatch

Make subagent-driven-development's per-task reviews cheaper and faster without weakening them, by scoping per-task review prompts to the task and stopping redundant work — while final branch review stays broad.

## Problem

Per-task code quality reviewers in SDD routinely do branch-review-scale work on single-task diffs. Evidence from two real local SDD sessions: `a1a6719a-6109-453a-9933-34ae396f5bae` (sen-core-v2) and `0cc1a12d-9984-4c35-8615-9d42dadb2c47` (serf), both under `~/.claude/projects/`:

- In the sen-core-v2 session, 7/8 quality reviewers ran repo-wide greps; the most expensive ran 50+ Bash commands over ~200 seconds. Across both sessions, quality reviewers cost 4-8× what spec reviewers cost on the same tasks.
- Spec reviewers, whose prompt contains "Only read files in this diff. Do not crawl the broader codebase," stayed tight: 6-16 tool calls, 14-65 seconds.
- No reviewer ran heavy tests autonomously. Every package-wide or repeated test run observed was explicitly requested by a controller-written prompt ("check all uses," "run tests if useful, especially race-focused ones," "does anything else read `Meta()`?").

Root causes, in order of impact:

1. **The per-task quality prompt inherits a merge-readiness review.** `code-quality-reviewer-prompt.md` delegates to `requesting-code-review/code-reviewer.md`, which asks about architecture, scalability, security, production readiness, and ends with "Ready to merge?" That frame licenses branch-level breadth on a one-task diff. The spec prompt's diff-scope guard was never carried over.
2. **The controller gets no guidance on writing reviewer prompts**, so it invents open-ended directives ("check all uses") that reviewers interpret literally.
3. **Duplicated work across the pipeline.** The quality template's "Plan alignment" dimension re-checks what the spec reviewer just verified. Reviewers re-run test suites the implementer already ran (and reported, with TDD evidence) on identical code.
4. **Per-task and final review share one template**, so there is no representation of "per-task narrow, final broad" anywhere.

A field report (`~/2026-06-09-code-quality-reviewer-scope-budget-issue.md`) first flagged this. Its cited session and headline numbers could not be verified, but its qualitative diagnosis was confirmed against two real local sessions. One correction to it: cross-cutting audits (lock ordering, changed contracts) are sometimes the *correct* review method — the fix must gate breadth behind a stated concrete risk, not forbid it.

## Goals

- Per-task reviews scoped to the task: diff-first reading, justified broadening, no redundant test runs.
- Final whole-branch review keeps its current breadth.
- No reduction in what reviews catch.

## Non-goals / explicitly preserved

- **Full re-reviews stay.** When a reviewer re-reviews after a fix, it still reviews the whole task at full reading breadth. (It does not re-run tests the implementer just ran on the amended code.) This deliberately rejects the field report's "re-review budget" remedy: the cost of its worst cited example (a re-review running `-race` and `-count=100` loops) is curbed by the test budget below, not by narrowing what re-reviewers read.
- ~~**The two review stages stay separate.** Spec compliance and code quality remain independent subagents, serially gated. No merging.~~ **Superseded by the cost iterations below**: live eval economics showed per-dispatch overhead dominating cost, and the maintainer put everything on the table. The per-task stages are now one task reviewer with two verdicts; the independent broad final review remains.
- **The coordinator keeps model judgment.** No forced model tier for reviews, in either direction.
- **`requesting-code-review/` is untouched.** It remains the broad template for final branch review and ad-hoc review.
- Verdict ordering (spec compliance reported before quality), the fix-and-re-review loops, and the requirement to fix Critical/Important findings are unchanged.

## Cost iterations (post-launch eval economics)

Live before/after runs surfaced a cost regression once the quality-hardening
prose (evidence rule, constraint carrying, pristine output) landed: go-fractals
went from 42.8 min / 14.5M tokens (first task-scoped version) to 69.9 min /
32.2M (hardened version) while reaching baseline-parity quality (blind-judged
8.5 vs 8.5). Per-subagent turn profiling attributed cost to, in order: cheap
models taking 2-3× the turns on multi-step work (678 of 1197 subagent turns
were haiku), per-dispatch overhead (3 subagent spin-ups per task, each
re-deriving the diff; controller coordination was half the dollars), and
evidence-rule narration.

- **Iteration 1:** turn-count-beats-token-price model guidance (mid-tier floor
  for multi-step work), optional inline diffs, cite-don't-narrate evidence,
  Important = cannot-trust-until-fixed, fixes dispatched only for
  Critical/Important. Result: 68.2 min / 22.9M — tokens down 29%, wall-clock
  flat; controllers pasted the diff in only 2 of 22 review dispatches when
  phrasing was optional.
- **Iteration 2:** per-task spec and quality reviews merged into one
  `task-reviewer-prompt.md` (one reviewer, one reading of the diff, two
  verdicts; one fix dispatch addresses both kinds of findings); implementers
  run the focused test while iterating, full suite once before commit.
  Result (go-fractals): 47.5 min / 15.7M / $13.55 — beat baseline on every
  axis, blind-judged 9/10 vs baseline 7/10.
- **Iteration 3:** Calibration names merge-blocking maintainability damage
  (verbatim duplication, swallowed errors, assertion-free tests) as
  Important and Minor findings must be pasted into the final review for
  triage; reviewer skepticism extended to the implementer's design
  rationales ("left it per YAGNI" is a claim, not a verdict); diff handed
  to reviewers as a file (`git diff > /tmp/sdd-task-N.diff`, redirected so
  it never enters the controller's context; one Read call for the
  reviewer) after paste-into-prompt guidance went unadopted (0-6 of 11-17
  dispatches) for locally-rational context-economics reasons.
- **Final frozen config (e355795), all five scenarios pass:** go-fractals
  44.4 min / 13.4M / $11.67 (-32% time, -37% tokens, -27% dollars vs
  baseline); svelte-todo 62.8 / 19.7M / $15.76 (-21% / -28% / -25%);
  rejects-extra-features $1.31 (vs $1.88); spec-reviewer-flaws flat; the
  planted-defect scenario (v3: open-flag transparency bar for judgment
  calls, must-fix bar for a test whose name promises verification it
  never performs) passes with the defect caught and fixed.

### Iterations 4-5 (2026-06-10): variance honesty, structural fixes, positive recipes

A same-config re-run exposed run-to-run variance (44.4→57.1 min on
identical prompts; reviewer escape-hatch appetite swung 1.0→6.3 tool
calls/review), so all subsequent claims use ranges. Five parallel
experiment variants on go-fractals plus transcript mining of real local
sessions (full log with negative results:
`evals/docs/experiments/2026-06-10-sdd-cost-experiments.md`) produced the
final config:

- **Adopted:** final-review package (final reviewer 33→6 turns at
  controller-model prices); REQUIRED `model:` line in both templates
  (prose guidance decayed mid-session once, inheriting opus for 17
  dispatches, +$5); task-brief + report files (`scripts/task-brief`;
  fidelity anchor, modest context savings); progress ledger in
