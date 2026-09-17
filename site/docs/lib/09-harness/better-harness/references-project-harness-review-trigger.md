---
title: "Review Trigger"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/references/project-harness/review-trigger.md"
sourceRel: "references/project-harness/review-trigger.md"
rawUrl: "/raw/09-harness/better-harness/references/project-harness/review-trigger.md"
sourceSha256: "0b21ceabe43bdf309eb27a1baf2bf207f59238f0117296204073fd0dafb413fd"
pageSha256: "0b21ceabe43bdf309eb27a1baf2bf207f59238f0117296204073fd0dafb413fd"
contentMode: "local-full"
zh: ""
---

# Review Trigger

## Purpose

Review Trigger defines when an AI-assisted change needs extra review and which
next action is required.

It is a routing reference, not a full code-review checklist:

```text
local signals -> review trigger -> self-check / fresh Agent review / human review / split change / more evidence
```

Keep thresholds, path lists, and ownership rules in analyzer config or project
policy. This document should explain how to interpret signals and turn them into
recommendations.

## Trigger Signals

| Signal | Why It Matters | Recommendation |
| --- | --- | --- |
| large diff | reviewer context may be too broad | split the change or request fresh Agent review |
| high blast radius | callers may regress | inspect callers and add regression tests |
| shared symbol changed | compatibility risk | review edge cases and public behavior |
| core path hit | ownership or architecture risk | request domain or human review |
| new dependency growth | supply-chain and maintenance scope may expand | verify necessity, pre-existing coverage, and lockfile or policy evidence |
| new file sprawl | one change may hide mixed responsibilities | split by owner or justify the cohesive boundary |
| non-trivial untested logic | behavior is not proven at the changed boundary | add a focused test or record why execution is unavailable |
| explicit deferral comment | known work may escape the acceptance path | link the deferral to an owner, follow-up, or deliberate non-goal |
| missing test evidence | behavior is not proven | add targeted tests or justify the gap |
| security-like removal | a safety boundary may be weaker | block for security or domain review |
| generated or binary output | hard to review directly | verify source generator and output parity |
| truncated analysis | confidence is limited | require another review pass |

Do not route only on a numeric score. Use the score to decide whether to
interrupt, then use the reasons to choose the next action.

These are qualitative review cues unless an owning analyzer, project policy,
configuration, and behavior test define a threshold. This reference does not
provide a standalone complexity score.

## Recommended Example: Blast Radius

A blast-radius script is a good review-trigger example because it turns a diff
into structural signals: changed symbols, affected callers, core hits, test
gaps, security-like removals, score, severity, and reasons.

Copyable Better Harness reference implementation:

```text
hooks/git-scripts/blast-radius.mjs
hooks/git-scripts/blast-radius/
```

Example commands:

```bash
node hooks/git-scripts/blast-radius.mjs --json
node hooks/git-scripts/blast-radius.mjs --mode=post-tool
node hooks/git-scripts/blast-radius.mjs --mode=stop
```

Recommended hook pattern:

- On write/edit events, show advisory feedback without blocking immediately.
- On task stop/completion, block only when a recent write occurred and review is
  recommended.
- In pre-push or CI, read JSON output and translate `shouldReview`, `severity`,
  and `reasons` into review requirements.

## Recommendation Format

```text
Review recommended: <severity>

Signals:
- <specific reason>

Next action:
- <split change / inspect callers / add tests / run fresh Agent review / request owner review>

Evidence required:
- <test command, log, screenshot, owner approval, or rationale>
```

Good recommendations name the concrete action. Avoid vague wording such as
`review carefully`, `add more tests`, or `this looks risky`.
