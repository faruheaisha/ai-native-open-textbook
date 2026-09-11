---
title: "Test Suite Map"
sourceId: "09-harness/repository-harness"
sourceTitle: "Repository Harness（仓库级 Agent 工作区）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/hoangnb24/repository-harness"
entryUrl: "https://github.com/hoangnb24/repository-harness/blob/e765792b635b4d5e3e5fc0578f82f9ca5dea2681/README.md"
zh: ""
---

# Test Suite Map

The normal entrypoint is `scripts/validate-premerge.sh`.

## Rust Core

`crates/harness/` unit and integration tests protect:

- path, hash, provenance, and distribution validation;
- clean architecture;
- install, status, and doctor;
- three-way updates and conflict staging;
- complete-plan drift detection;
- checksum and release identity;
- symlink rejection;
- transaction rollback and executable recovery.

## Repository Contracts

| Location | Protects |
| --- | --- |
| `tests/workflow/` | Read-only, bounded, durable-plan, authority-stop, and no-hidden-control-plane behavior |
| `tests/installer/` | Fresh core installation, merge/override, shims, optional engineering advice, manifest integrity, and platform parity |
| `tests/docs/` | Current authority, links, EOL boundary, and validation entrypoints |
| `tests/maintenance/` | Core release classification and changelog rendering |
| `tests/release/` | Core workflow, exact assets, source identity, promotion, and post-merge recovery |

## Removed Compatibility Proof

SQLite schemas, snapshots, changesets, protocol-v1 commands, and
`harness-cli` release tests ended with decision 0027. Immutable historical
tags retain that proof; it is not run by the current product.

When adding a test, name the observable invariant and update this map. A
historical artifact alone is not a reason to keep an executable in pre-merge.
