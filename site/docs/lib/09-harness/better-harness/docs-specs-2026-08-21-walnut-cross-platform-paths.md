---
title: "Keep Walnut bootstrap paths portable"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-08-21-walnut-cross-platform-paths.md"
sourceRel: "docs/specs/2026-08-21-walnut-cross-platform-paths.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-08-21-walnut-cross-platform-paths.md"
sourceSha256: "c21a64064c22bfacb0560781b82a3da1c743cc3dbcdff886743d7881a733d8c2"
pageSha256: "c21a64064c22bfacb0560781b82a3da1c743cc3dbcdff886743d7881a733d8c2"
contentMode: "local-full"
zh: ""
---

# Keep Walnut bootstrap paths portable

## Traceability

- Spec ID: walnut-cross-platform-paths
- Status: Implemented

## Intent

Make the Studio-private Walnut bootstrap behave consistently on Windows,
macOS, and Linux. Runtime asset references stored in receipts must not depend
on the host path separator, and cache-root derivation must follow the requested
platform rather than the platform running the test.

## Acceptance Scenarios

- **AC-1:** A synthetic Walnut runtime can be probed, installed, and verified
  on Windows without its receipt being rejected as an invalid runtime asset
  set.
- **AC-2:** Runtime asset `sourcePath` and `relativePath` values use stable ASAR
  `/` separators on every host, while filesystem access resolves those values
  safely beneath the local Studio cache.
- **AC-3:** Cache-root derivation returns native Darwin, Linux, and Windows
  paths for the explicitly requested platform, independent of the test host.
- **AC-4:** Tampering with an installed runtime asset still produces the
  existing failed-verification result.

## Non-goals

- Enabling Walnut discovery from non-macOS ChatGPT installations.
- Changing the experimental-local support level, consent flow, asset roles, or
  cache ownership.
- Changing artifact viewer behavior or the broader Studio artifact model.

## Plan and Tasks

1. Use POSIX path semantics for paths originating in the ASAR index and stored
   in provider receipts.
2. Select POSIX or Windows path semantics from the requested platform when
   deriving a default cache root.
3. Tighten the focused tests around portable receipt paths and exact
   platform-specific cache roots.

## Test and Review Evidence

- AC-1/AC-2/AC-4: focused Walnut bootstrap tests passed 8/8 on macOS,
  including install/verify, portable receipt paths, tamper detection, and
  removal. A Windows CI rerun remains pending until the change is committed
  and pushed.
- AC-3: the focused test asserts exact Darwin, Linux, and Windows cache-root
  results without branching on the host platform.
- Package evidence: Studio typecheck passed; the full package build and test
  run passed 141/141 tests across 21 files.
- Documentation evidence: the Markdown link graph passed 6/6 after
  regeneration; the generated graph remained unchanged.
- Diff evidence: `git diff --check` passed for the tracked Walnut source and
  test, and the new spec has no trailing whitespace. Existing artifact-viewer
  worktree changes remain outside this maintenance diff.

### Risks

- Receipt compatibility: existing macOS receipts already use `/`, so keeping
  that representation stable avoids a migration.
- Path containment: portable receipt paths still pass through the existing
  local `resolve`-based confinement check before filesystem access.
