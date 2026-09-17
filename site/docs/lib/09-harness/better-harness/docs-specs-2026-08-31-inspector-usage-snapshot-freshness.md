---
title: "Clarify Inspector usage snapshot freshness"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-31-inspector-usage-snapshot-freshness.md"
sourceRel: "docs/specs/2026-08-31-inspector-usage-snapshot-freshness.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-31-inspector-usage-snapshot-freshness.md"
sourceSha256: "561f1f596009f742af6ded504e730d0354cdef8f645e5419bd96b0dac73ee3ab"
pageSha256: "561f1f596009f742af6ded504e730d0354cdef8f645e5419bd96b0dac73ee3ab"
contentMode: "local-full"
zh: ""
---

# Clarify Inspector usage snapshot freshness

## Traceability

- Spec ID: inspector-usage-snapshot-freshness
- Status: Implemented

## Intent

Prevent reviewers from reading a self-contained Inspector report as a live
usage feed. The Session outline and detailed Usage report must describe the
latest retained context as an observed snapshot and state when that snapshot
was current.

## Acceptance Scenarios

- AC-1: Standalone Inspector and Harness Studio label context occupancy as the
  latest observed context rather than the current live context, and identify
  the surface as a static snapshot.
- AC-2: Snapshot freshness prefers the timestamp of the latest retained Usage
  progression point. When that timestamp is unavailable, the report-level
  `generatedAt` timestamp is used and labelled as generation time. When neither
  timestamp is valid, freshness remains explicitly unavailable.
- AC-3: The compact Session outline and detailed Usage report expose the same
  snapshot semantics in English and Simplified Chinese without changing token,
  cache-reuse, context-progression, compaction, or provider accounting values.
- AC-4: The changed Studio and standalone Usage surfaces remain keyboard
  reachable, avoid document and outline overflow at wide, compact, and narrow
  layouts, and produce no browser console or page errors.

## Non-goals

- Auto-refreshing an open Inspector report or mutating native Session state.
- Changing provider adapters, usage arithmetic, context-window inference, or
  compaction detection.
- Collapsing edited, retried, or zero-response user Turns.

## Plan and Tasks

1. Derive one bounded optional Session `usageSnapshot` in the report model:
   latest retained Usage timestamp, then report generation time, then
   unavailable. Older reports retain the same renderer-side fallback.
2. Pass report generation time into Studio Session Detail and render the same
   bounded freshness note in the outline and detailed Usage report.
3. Rename context labels and add English and Simplified Chinese copy without
   changing provider accounting or context evidence fields.
4. Add focused behavior assertions and run Inspector, Studio, and visual
   validation before review.

## Test and Review Evidence

- AC-1/AC-2: `npx vitest run test/reporting/harness-inspector.test.mjs`
  passed 39 tests; the deterministic demo tests also passed 2 tests.
- Full repository regression: `npm test` passed 1,598 tests with 2 skipped.
- AC-1/AC-2/AC-3: `npm run harness-studio:test` passed 512 tests;
  `npx playwright test test/browser/artifact-host.spec.mjs` passed all 27
  browser tests, including the Inspector Session and Usage flow.
