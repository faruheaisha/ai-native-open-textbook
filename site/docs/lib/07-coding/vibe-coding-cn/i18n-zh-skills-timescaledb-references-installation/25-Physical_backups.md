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
pageSha256: "58fb1061fd0da6de2886b0540a7e339a1f6c0055f66b521dafdc35e7bd9a627c"
contentMode: "local-full"
zh: ""
---

## Physical backups

**URL:** llms-txt#physical-backups

For full instance physical backups (which are especially useful for starting up
new [replicas][replication-tutorial]), [`pg_basebackup`][postgres-pg_basebackup]
works with all TimescaleDB installation types. You can also use any of several
external backup and restore managers such as [`pg_backrest`][pg-backrest], or [`barman`][pg-barman]. For ongoing physical backups, you can use
[`wal-e`][wale], although this method is now deprecated. These tools all allow
you to take online, physical backups of your entire instance, and many offer
incremental backups and other automation options.

Tiger Cloud is a fully managed service with automatic backup and restore, high
availability with replication, seamless scaling and resizing, and much more. You
can try Tiger Cloud free for thirty days.

===== PAGE: https://docs.tigerdata.com/self-hosted/backup-and-restore/docker-and-wale/ =====
