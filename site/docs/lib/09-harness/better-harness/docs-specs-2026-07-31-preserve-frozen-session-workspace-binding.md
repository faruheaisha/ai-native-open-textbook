---
title: "Preserve frozen Session workspace binding"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-31-preserve-frozen-session-workspace-binding.md"
sourceRel: "docs/specs/2026-07-31-preserve-frozen-session-workspace-binding.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-31-preserve-frozen-session-workspace-binding.md"
sourceSha256: "a3270f12d9ed8a217e374a5ff9e4e25f96adeab7f5cc7062f64cc0f5c01e8040"
pageSha256: "a3270f12d9ed8a217e374a5ff9e4e25f96adeab7f5cc7062f64cc0f5c01e8040"
contentMode: "local-full"
zh: ""
---

# Preserve frozen Session workspace binding

## Traceability

- Spec ID: preserve-frozen-session-workspace-binding
- Status: Implemented

## Intent

Keep the workspace qualification metadata of eligible Sessions intact when an
evidence bundle freezes its shared Session population. This prevents a Session
that was already qualified for the requested workspace from being discarded
when the Session evidence and lead lanes consume the frozen population.

## Acceptance Scenarios

- AC-1: Freezing a Session with non-enumerable workspace CWD candidates
  preserves those candidates on the frozen Session without making them part of
  the public enumerable or serialized contract.
- AC-2: A Codex evidence bundle whose frozen population contains one eligible
  workspace-qualified Session reports one eligible and selected Session in the
  Session facts lane instead of failing with
  `SESSION_POPULATION_BINDING_MISMATCH`.

## Non-goals

- Changing Session discovery, active-Session omission, time-window filtering,
  workspace qualification policy, or population fingerprints.
- Making workspace CWD candidates enumerable or exposing them in report output.
- Changing renderer, finding, scoring, or report schemas.

## Plan and Tasks

1. Preserve the private workspace CWD candidates while cloning each Session in
   `freezeSessionPopulation`.
2. Add a focused regression test proving the candidates survive freezing and
   remain non-enumerable.
3. Run the Session population tests, evidence-bundle tests, full package tests,
   and a real Codex evidence-bundle collection against the reproducing
   workspace.

## Test and Review Evidence

- AC-1: `node --test test/session-population.test.mjs`
- AC-2: `node --test test/better-harness-evidence-bundle.test.mjs`
- Regression gate: `npm test`
- Real-path verification: run `harness evidence-bundle` for Codex against the
  reproducing workspace and require `status: complete`, an available Session
  evidence lane, and a bound Session population.
- Risk review: confirm workspace CWD candidates remain absent from
  `Object.keys`, object spread, and `JSON.stringify` output.

Observed evidence:

- Focused Session population, task-loop source, and evidence-bundle tests:
  55 passed, 0 failed.
- Full package suite: 1019 passed, 0 failed.
- Real Codex evidence bundle: `complete`; Session and lead lanes `available`;
  population binding `bound`; eligible and analyzed counts `1/1`.
