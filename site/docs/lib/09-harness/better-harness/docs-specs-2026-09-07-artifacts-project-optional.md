---
title: "Make Artifacts available without a Project"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-09-07-artifacts-project-optional.md"
sourceRel: "docs/specs/2026-09-07-artifacts-project-optional.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-09-07-artifacts-project-optional.md"
sourceSha256: "9e059a43dfe8e9822a1f5a4f227f3d536b869a1ff96f9bf9c0c384d30fad7546"
pageSha256: "9e059a43dfe8e9822a1f5a4f227f3d536b869a1ff96f9bf9c0c384d30fad7546"
contentMode: "local-full"
zh: ""
---

# Make Artifacts available without a Project

## Traceability
- Spec ID: artifacts-project-optional
- Status: Implemented

## Intent
Artifacts opens as a usable workspace without requiring Project selection or a populated catalog.

## Acceptance Scenarios
- AC-1: An explicit Artifacts route bypasses the initial Project gate without invoking a picker.
- AC-2: Missing or empty catalogs render browse, list and preview panes with neutral empty states.
- AC-3: Existing configured catalogs and Project artifacts continue loading and previewing normally.
- AC-4: Keyboard focus, overflow and page errors are checked at wide, compact and narrow widths.

## Non-goals
No new filesystem discovery, global aggregation, or artifact write permissions. Interpretation: default availability of the Artifacts page; existing Sessions startup landing remains unchanged.

## Plan and Tasks
Make gating area-aware, render empty workspaces without fabricated catalog authority, update translations and availability, and run focused tests.

## Test and Review Evidence
TypeScript and app build passed. Shell model/routing: 19 tests passed. Project-shell browser suite: 9 passed, including no-project cases at 1440/1024/390 widths with search, keyboard focus, zero page errors and bounded overflow. Artifact-host broad suite: 26 passed, 2 failed in existing theme-button and Debugger-title expectations; neither failure reports an artifact render failure. Artifact workspace regression also exposed an obsolete project-prefixed header expectation from the previous title cleanup; updated to the agreed Artifacts-only title. Documentation link tests: 8 passed; graph regenerated. Existing preview health and canvas-module endpoints returned 200; starting another preview found port 58575 occupied. Screenshots inspected at all three widths. Scope comes from direct maintainer request; AI implementation: Codex. Preserve unrelated unstaged work. Main risk: conflating page availability with data availability.
