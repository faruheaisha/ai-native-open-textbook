---
title: "Separate a session-created commit from the edits it contains"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-13-inspector-commit-provenance.md"
sourceRel: "docs/specs/2026-08-13-inspector-commit-provenance.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-13-inspector-commit-provenance.md"
sourceSha256: "9cf7d90fabe067ad58cf326935c271700a3a641f4cb352b8675b6c045541e5f7"
pageSha256: "9cf7d90fabe067ad58cf326935c271700a3a641f4cb352b8675b6c045541e5f7"
contentMode: "local-full"
zh: ""
---

# Separate a session-created commit from the edits it contains

## Traceability

- Spec ID: inspector-commit-provenance
- Status: Implemented
- Extends the evidence vocabulary of [inspector-evidence-selection](/lib/09-harness/better-harness/docs-specs-2026-08-12-inspector-evidence-selection)
  and the trace surfaces of [inspector-trace-view](/lib/09-harness/better-harness/docs-specs-2026-08-13-inspector-trace-view);
  the correlation contract stays in [commit-session-correlation](/lib/09-harness/better-harness/docs-specs-2026-08-11-commit-session-correlation).

## Intent

Correlation could say a commit was *near* a session, but not that the session
created it, and it could not tell a commit whose files were edited in the same
session from a commit that only wrapped up pre-existing workspace changes. On a
real local report that gap read as authorship: a session with zero observed
Edit/Write paths still showed commits in its lane, and every commit of a session
appeared related to every file-touching call in it.

The Inspector already retains the two facts needed to close the gap: an observed
`create-commit` tool call with a start and duration, and Edit/Write calls with
observed start times and exact repository paths. This slice reads the commit
time against those windows so a reviewer can see which claim is being made.

## Acceptance Scenarios

- AC-1: When a commit time falls inside an observed Create commit call window,
  correlation reports `high` confidence with the call id, and that match ranks
  above session-window candidates of the same confidence.
- AC-2: A commit created inside such a call carries the `observed-commit`
  evidence kind at `observed` strength, and its limitation states that its files
  may have changed before the observed session began.
- AC-3: An Edit/Write call links to a commit only when its observed start sits
  after the previous directly linked commit, at or before this commit, and one
  of its exact repository paths occurs in the commit, so a single edit cannot
  leak forward into every later commit in the session.
- AC-4: When a directly linked commit has no linked Edit/Write path, the
  workbench and the Evidence Drawer say so instead of implying the session
  authored the files.
- AC-5: Selection relates a commit to the call that created it and to the
  Edit/Write calls linked to it. Same-path overlap remains the fallback only for
  links that are not direct.
- AC-6: On a wall-clock axis, directly linked commit times render as focusable
  commit events that report their linked call and path counts, and selecting one
  selects the commit.

## Non-goals

- Claiming authorship of committed lines from any observed call.
- Attributing a commit whose time falls in no observed call window.
- Changing the Feature Tree, Git, or native-session sources of record.
- Reconstructing edits the host never observed or privacy filtering removed.

## Design Decisions

**Provenance, not authorship.** `observedCommitCall` matches the commit time
against an observed `create-commit` call window with a 2 s tolerance on both
ends. It proves only that the session created the Git object; the separate
`linkedEditEvidence` pass answers whether the session was also observed editing
those paths.

**Bounded edit attribution.** Edit linkage is windowed by the previous directly
linked commit rather than by the whole session, and requires an exact changed
path. Both bounds are needed: time alone repeats one edit across later commits,
and path alone ignores commit order.

**Direct links win the lane.** Where a session has direct links, Date view,
commit lanes, and related-object grouping use them instead of mixing in
contextual same-path neighbours, which is what made every commit look related to
every call.

**Absence is stated.** A direct link with no linked edit renders an amber commit
bridge and an explicit fact, so the missing evidence is visible rather than
inferred from an empty list.

## Test and Review Evidence

- AC-1: `a commit inside an observed Create commit call outranks broad
  session-window candidates` asserts ordering, confidence, and the call id.
- AC-2/AC-4: `report model distinguishes a session-created commit from files
  edited in that session` asserts the evidence kind, strength, empty linked
  edits, and both the fact and limitation copy.
- AC-3: `report model links Edit/Write calls to the next direct commit by time
  and exact path` binds two commits in one session to one call each.
- Regression: `npm test` passes with these changes in place, including
  `test/reporting/harness-inspector.test.mjs` and
  `test/sessions/commit-session-link.test.mjs`.

## Risks

- Correlation: the 2 s tolerance is a clock-skew allowance around an observed
  window, not a proximity heuristic; a commit outside every observed call keeps
  its previous candidate or contextual grade.
- Reading: an amber commit bridge marks missing evidence, not a defect, and says
  so in its own copy.
- Privacy: no new text or path is retained; commit events reuse stamps and paths
  the report already exposes.
