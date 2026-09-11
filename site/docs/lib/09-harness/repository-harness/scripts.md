---
title: "Scripts"
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

# Scripts

The normal validation entrypoint is:

```bash
scripts/validate-premerge.sh
```

## Installation

- `install-harness.sh`: Bash bootstrap for the versioned Rust `harness`
  candidate.
- `install-harness.ps1`: PowerShell bootstrap with the same product contract.
- `harness-install-files.txt`: exact embedded core payload.
- `engineering-wisdom-install-files.txt`: independent optional advisory
  payload.
- `agent-harness-block.md` and `claude-harness-block.md`: managed entrypoint
  shims.

The bootstraps verify candidate checksum and reported version before delegating
install or update. They do not contain a database or compatibility profile.

## Core Release

- `build-harness-release.sh`: build one platform artifact and checksum.
- `harness-release-changed.sh`: classify changes that require a core release.
- `harness-release-tag`: current core release pointer.
- `verify-harness-release-identity.sh`: pretag and published-source identity
  guard.
- `verify-harness-release-assets.sh`: exact cross-platform asset inventory.
- `promote-harness-release-tag.sh`: promote a proven source commit.
- `render-changelog-files.py`: render bounded changed-file lists.

Release commands are called by GitHub workflows. Local development should use
the pre-merge entrypoint rather than publishing commands.

## Historical CLI

Protocol v1 and `harness-cli` are end-of-life. Their build, schema,
materialization, snapshot, changeset, release, and bootstrap scripts remain
available only through historical Git tags.
