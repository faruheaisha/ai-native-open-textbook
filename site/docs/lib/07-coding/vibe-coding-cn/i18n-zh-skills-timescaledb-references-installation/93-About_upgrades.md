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
pageSha256: "c724148bd0a7927afcbf5f5c6570f4849995b7a7c1fec4325345f5f20b5dfa7b"
contentMode: "local-full"
zh: ""
---

## About upgrades

**URL:** llms-txt#about-upgrades

**Contents:**
- Plan your upgrade
- Check your version

A major upgrade is when you upgrade from one major version of TimescaleDB, to
the next major version. For example, when you upgrade from TimescaleDB&nbsp;1
to TimescaleDB&nbsp;2.

A minor upgrade is when you upgrade within your current major version of
TimescaleDB. For example, when you upgrade from TimescaleDB&nbsp;2.5 to
TimescaleDB&nbsp;2.6.

If you originally installed TimescaleDB using Docker, you can upgrade from
within the Docker container. For more information, and instructions, see the
[Upgrading with Docker section][upgrade-docker].

When you upgrade the `timescaledb` extension, the experimental schema is removed
by default. To use experimental features after an upgrade, you need to add the
experimental schema again.

Tiger Cloud is a fully managed service with automatic backup and restore, high
availability with replication, seamless scaling and resizing, and much more. You
can try Tiger Cloud free for thirty days.

- Install the Postgres client tools on your migration machine. This includes `psql`, and `pg_dump`.
- Read [the release notes][relnotes] for the version of TimescaleDB that you are upgrading to.
- [Perform a backup][backup] of your database. While TimescaleDB
    upgrades are performed in-place, upgrading is an intrusive operation. Always
    make sure you have a backup on hand, and that the backup is readable in the
    case of disaster.

If you use the TimescaleDB Toolkit, ensure the `timescaledb_toolkit` extension is on
version 1.6.0, then upgrade the `timescaledb` extension. If required, you
can then later upgrade the `timescaledb_toolkit` extension to the most
recent version.
