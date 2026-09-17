---
title: "0024 Rust Harness Core Maintenance CLI"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/docs/decisions/0024-rust-harness-core-maintenance-cli.md"
sourceRel: "docs/decisions/0024-rust-harness-core-maintenance-cli.md"
rawUrl: "/raw/09-harness/repository-harness/docs/decisions/0024-rust-harness-core-maintenance-cli.md"
sourceSha256: "8580549ba10fcc4057e9c5456aa8d19336705c92c6652f0dabebc981c94cfbb9"
pageSha256: "8580549ba10fcc4057e9c5456aa8d19336705c92c6652f0dabebc981c94cfbb9"
contentMode: "local-full"
zh: ""
---

# 0024 Rust Harness Core Maintenance CLI

Date: 2026-07-21

## Status

Accepted and implemented.

## Context

Copy-on-install could preserve existing files only by skipping them or replacing
them wholesale. It could not safely deliver upstream workflow corrections into
a locally customized repository.

## Decision

The product includes one Rust CLI named `harness`.

It owns:

- initial core installation after platform bootstrap;
- exact installed provenance;
- three-way core updates;
- dry-run and conflict reporting;
- recoverable transactional application;
- status and integrity diagnostics; and
- versioned candidate handoff and executable replacement.

It does not own consumer product behavior, task tracking, work selection,
orchestration, evaluation, or application operation.

Bash and PowerShell are thin platform bootstraps. They download an immutable,
checksum-verified candidate and delegate product semantics to the Rust binary.

## Alternatives Considered

1. **Keep manual copy upgrades.** Rejected because upstream corrections would
   remain fragmented across consumers.
2. **Duplicate update semantics in Bash and PowerShell.** Rejected because
   merge, recovery, provenance, and transaction behavior need one owner.
3. **Create a separately named updater.** Rejected because installation and
   maintenance are one user-facing product.

## Consequences

- Core installation and maintenance have one cross-platform implementation.
- Consumers can receive improvements without silently losing local changes.
- Artifact identity, release publication, conflict UX, and recovery require
  executable proof.
