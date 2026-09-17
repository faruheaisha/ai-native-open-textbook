---
title: "Open-source project baseline"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/specs/2026-07-16-open-source-baseline.md"
sourceRel: "docs/specs/2026-07-16-open-source-baseline.md"
rawUrl: "/raw/09-harness/better-harness/docs/specs/2026-07-16-open-source-baseline.md"
sourceSha256: "96bdf1e13474492af5a8d7271a1d7180c5d54718d2394efb71abfb17a46fa371"
pageSha256: "96bdf1e13474492af5a8d7271a1d7180c5d54718d2394efb71abfb17a46fa371"
contentMode: "local-full"
zh: ""
---

# Open-source project baseline

## Traceability

- Spec ID: open-source-baseline
- Status: Implemented
- Maintained by: [Clean the pre-public project identity](/lib/09-harness/better-harness/docs-specs-2026-07-24-pre-public-identity-cleanup)
- Core-boundary follow-up: [Remove the configurable core boundary](/lib/09-harness/better-harness/docs-specs-2026-07-27-remove-configurable-core-boundary)

## Intent

Prepare Better Harness for public collaboration and distribution. The repository
must be installable across its supported hosts, disclose its local-data
boundaries, preserve license information in every artifact, and provide enough
governance and automated evidence for an outside contributor to make a safe
change.

## Acceptance Scenarios

- AC-1: Qoder, Codex, and Cursor plugin manifests exist, share the same product
  identity and version, route to the canonical root `skills/`, and pass the
  repository and Codex plugin validators.
- AC-2: The npm package uses the public `@qoder-ai/better-harness` identity, contains
  public registry and repository metadata, has no internal registry references,
  and includes every Markdown document reachable from packaged runtime guidance.
- AC-3: Every npm, runtime zip, and generated host-plugin artifact contains the
  MIT license and aligned package metadata; package verification rejects an
  incomplete artifact.
- AC-4: `session-analysis --help` and `harness checkup --help` return help
  without reading session stores, and quickstart offers an explicit way to skip
  local session discovery.
- AC-5: The previously referenced project-owned core-boundary configuration and
  Harness benchmark are present, and the complete automated test suite passes.
- AC-6: Contributors can find contribution, conduct, security, support,
  governance, privacy, provenance, and changelog policies plus issue and pull
  request templates.
- AC-7: CI exercises Linux, macOS, and Windows on the declared Node.js baseline,
  with a current-Node compatibility job, and runs both tests and package
  verification.

## Non-goals

- Creating the public GitHub repository, configuring branch protection, or
  publishing a new npm release.
- Reconstructing private pre-import Git history.
- Adding a new runtime host adapter or copying canonical behavior into plugin
  shell directories.
- Changing session-analysis output schemas or silently redacting evidence that
  advanced local workflows currently rely on.

## Plan and Tasks

1. Restore the missing source-owned plugin shells, benchmark, and project-owned
   core-boundary configuration, using the existing Qoder shell and Superpowers
   manifests as structural references.
2. Align npm, lockfile, host-manifest, documentation, and generated-artifact
   metadata around `@qoder-ai/better-harness` and the planned public repository URL.
3. Make license and reachable documentation inclusion explicit in package and
   host-artifact builders and verifiers.
4. Make help paths side-effect free, add the quickstart session opt-out, and
   document local-data handling.
5. Add the minimum public governance surface, contribution templates,
   cross-platform CI, and dependency update automation.
6. Run focused validation first, then the complete test and packaging gates;
   perform a Review Readiness Check before committing and publishing the branch.

## Test and Review Evidence

- AC-1: `node --test test/plugin-manifests.test.mjs test/host-plugin-artifact.test.mjs`
