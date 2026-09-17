---
title: "Vibe Coding CN"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "13bbeb7db56e6a5044c2a385d0f15caeff44c7f6cda4fd2a36afbd122b26c88b"
contentMode: "local-full"
zh: ""
---

## Upgrade TimescaleDB running in Docker

**URL:** llms-txt#upgrade-timescaledb-running-in-docker

**Contents:**
- Determine the mount point type
- Upgrade TimescaleDB within Docker

If you originally installed TimescaleDB using Docker, you can upgrade from within the Docker
container. This allows you to upgrade to the latest TimescaleDB version while retaining your data.

The `timescale/timescaledb-ha*` images have the files necessary to run previous versions. Patch releases
only contain bugfixes so should always be safe. Non-patch releases may rarely require some extra steps.
These steps are mentioned in the [release notes][relnotes] for the version of TimescaleDB
that you are upgrading to.

After you upgrade the docker image, you run `ALTER EXTENSION` for all databases using TimescaleDB.

Tiger Cloud is a fully managed service with automatic backup and restore, high
availability with replication, seamless scaling and resizing, and much more. You
can try Tiger Cloud free for thirty days.

The examples in this page use a Docker instance called `timescaledb`. If you
have given your Docker instance a different name, replace it when you issue the
commands.
