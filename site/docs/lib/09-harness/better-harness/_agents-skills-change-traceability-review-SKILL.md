---
title: "Change Traceability Review"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/.agents/skills/change-traceability-review/SKILL.md"
sourceRel: ".agents/skills/change-traceability-review/SKILL.md"
rawUrl: "/raw/09-harness/better-harness/.agents/skills/change-traceability-review/SKILL.md"
sourceSha256: "96bcd83886f55b3fd6e037fad01028f141a3d7d8be67a663db9a87720ff6edc7"
pageSha256: "96bcd83886f55b3fd6e037fad01028f141a3d7d8be67a663db9a87720ff6edc7"
contentMode: "local-full"
zh: ""
---

# Change Traceability Review

Review the traceability behind a change, not code style: Story or issue -> Spec
-> plan/tasks -> commit/branch/PR -> diff -> tests -> risk. Default to Chinese
and keep the report compact and decision-oriented. Treat specs as the review
source of truth; code is acceptable when it clearly serves the spec.

## Modes

- **Spec Preparation**: before implementation or commit, create or tighten a
  Story-linked spec and define acceptance scenarios, plan/tasks, tests, and risk
  evidence that later commits can cite. Load [Spec Contract](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-spec-contract).
- **Review Readiness Check**: inspect the current diff, staged diff, PR text,
  branch, or selected commits before review/merge. Load [Mode Rules](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-mode-rules)
  and [Reporting](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-reporting).
- **Review Retrospective**: inspect recent history, usually latest 30 commits.
  Identify commit-message habits, weak traceability, missing Spec/Test/Risk
  evidence, oversized or mixed-scope commits, spec-doc patterns, and rework
  signals. Load [Mode Rules](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-mode-rules) and [Reporting](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-reporting).

## Entry and Routing

1. Identify the mode from the user's request or the current review surface.
2. Read repo instructions first: nearest `AGENTS.md`, plugin manifests, and the
   target spec or diff.
3. Gather bounded local evidence using [Evidence Commands](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-evidence-commands).
4. Apply the relevant contract:
   - Spec Preparation: [Spec Contract](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-spec-contract)
   - Commits: [Commit Contract](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-commit-contract)
   - Any review: [Mode Rules](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-mode-rules)
5. Produce the report using [Reporting](/lib/09-harness/better-harness/_agents-skills-change-traceability-review-references-reporting).

Keep generated helpers and local experiments outside `SKILL.md` unless they are
durable resources the skill must use.
