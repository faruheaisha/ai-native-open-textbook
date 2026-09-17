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
pageSha256: "d621d8b14ef87265d622fa89e130c3aaf7c60f87af0a81ecbdc0b56bea239290"
contentMode: "local-full"
zh: ""
---

## Upgrade TimescaleDB

**URL:** llms-txt#upgrade-timescaledb

A major upgrade is when you update from TimescaleDB `X.<minor version>` to `Y.<minor version>`.
A minor upgrade is when you update from TimescaleDB `<major version>.x`, to TimescaleDB `<major version>.y`.
You upgrade your self-hosted TimescaleDB installation in-place.

Tiger Cloud is a fully managed service with automatic backup and restore, high
availability with replication, seamless scaling and resizing, and much more. You
can try Tiger Cloud free for thirty days.

This section shows you how to:

* Upgrade self-hosted TimescaleDB to a new [minor version][upgrade-minor].
* Upgrade self-hosted TimescaleDB to a new [major version][upgrade-major].
* Upgrade self-hosted TimescaleDB running in a [Docker container][upgrade-docker] to a new minor version.
* Upgrade [Postgres][upgrade-pg] to a new version.
* Downgrade self-hosted TimescaleDB to the [previous minor version][downgrade].

===== PAGE: https://docs.tigerdata.com/self-hosted/uninstall/ =====
