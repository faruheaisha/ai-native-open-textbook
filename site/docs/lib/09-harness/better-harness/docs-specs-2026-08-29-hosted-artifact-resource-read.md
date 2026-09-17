---
title: "Hosted Artifact Resource Read"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-29-hosted-artifact-resource-read.md"
sourceRel: "docs/specs/2026-08-29-hosted-artifact-resource-read.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-29-hosted-artifact-resource-read.md"
sourceSha256: "fc5c9e4c0bf991c3dc3ee76d84e90cbd0b6676fd4c8df6a75151791e48a65489"
pageSha256: "fc5c9e4c0bf991c3dc3ee76d84e90cbd0b6676fd4c8df6a75151791e48a65489"
contentMode: "local-full"
zh: ""
---

# Hosted Artifact Resource Read

## Traceability

- Spec ID: hosted-artifact-resource-read
- Status: Implemented

## Intent

Allow a trusted external-hosted Artifact renderer to read revision-scoped binary
resources through Studio's existing `/viewer/*` resource route. This enables
large geometry and media to remain outside JSON projections while the Host
continues to own provider selection, route confinement, and response headers.

## Acceptance Scenarios

- AC-1: A hosted iframe may fetch a resource from its own revision-scoped
  `/viewer/` origin, and the Host returns only bytes supplied by the selected
  provider runtime.
- AC-2: The hosted document CSP continues to reject cross-origin network
  connections, plugins, navigation authority, and same-origin DOM access from
  the parent; only same-origin resource reads are added.
- AC-3: Existing hosted modules, source maps, and provider resource routes keep
  their current response behavior.

## Non-goals

- No arbitrary network access, cookie forwarding, filesystem paths, or new
  provider activation authority.
- No change to iframe sandbox flags or hosted selection/mutation protocols.
- No format-specific 3D behavior in Better Harness.

## Plan and Tasks

- Change the common hosted-document CSP from `connect-src 'none'` to the
  narrowly scoped `connect-src 'self'` required by its existing resource route.
- Extend the hosted provider server test with an observable same-origin resource
  fetch contract and a negative assertion against broad network allowances.
- Run focused server tests and a browser smoke using a Homology FBX provider.

## Test and Review Evidence

- AC-1/AC-3: Node 24 `npm exec vitest run
  test/artifact-provider-server.test.ts` passed 1 file / 3 tests from
  `packages/harness-studio`.
- AC-2: the focused test verified `connect-src 'self'` without any HTTP(S)
  origin; the mounted Studio frame retained `sandbox="allow-scripts"`.
- Browser evidence: the live Homology fixture selected exact revision
  `9351731f...56acb9`; Studio displayed the shared Scene 3D tree and viewport,
  the frame reported `homology.viewer.scene-3d/v1`,
  `host-read-resource-v1`, and a ready Canvas. Tree and viewport selection both
  highlighted `node:200`; console reported 0 errors and 0 warnings. At
  390x844, document client and scroll widths were both 390 pixels.
- Host evidence: `verify-studio.mjs` fetched the selected provider's
  `scene.json` and `scene.bin` through the revision-scoped hosted-resource
  route, matched manifest geometry length, and returned HTTP 200 for catalog,
  snapshot, document, module, and resource endpoints.
