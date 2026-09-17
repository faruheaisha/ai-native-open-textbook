---
title: "ECC —— Harness 性能优化系统"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/docs/ECC-2.0-GA-ROADMAP.md"
sourceRel: "docs/ECC-2.0-GA-ROADMAP.md"
rawUrl: "/raw/09-harness/ecc/docs/ECC-2.0-GA-ROADMAP.md"
sourceSha256: "1d0b211ca4ac4603a61270e0507f5c4c6728189eb718cb77c30e47e0ab2eb34a"
pageSha256: "8b066e917d5aa799dbf75542529e483a399a2e6ed2421d2ae4cd050bc3cdfd9a"
contentMode: "local-full"
zh: ""
---

## Operating Rules

- Keep public PRs and issues below 20, with zero as the preferred release-lane
  target.
- Maintain 80/80 harness audit and 21/21 observability readiness after every
  GA-readiness batch.
- Do not publish release or social announcements until the GitHub release,
  npm/package state, billing state, and plugin submission surfaces are verified
  with fresh evidence.
- Do not treat closed stale PRs as discarded. Pair each cleanup batch with a
  salvage pass: inspect the closed diffs, port useful compatible work on
  maintainer-owned branches, and credit the source PR.
- Use Linear project documents/comments for project-level updates because
  project status updates are disabled in this workspace; create or update
  issues when a lane needs a durable execution owner.
