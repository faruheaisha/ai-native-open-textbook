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
pageSha256: "0221d4c975874111ed644f20fda9efc2a7274c2896d45e8e050718b867714453"
contentMode: "local-full"
zh: ""
---

## Configuring replication and recovery settings

1.  In the replica's `postgresql.conf` file, add details for communicating with the
    primary server. If you are using streaming replication, the
    `application_name` in `primary_conninfo` should be the same as the name used
    in the primary's `synchronous_standby_names` settings:

1.  Add details to mirror the configuration of the primary database. If you are
    using asynchronous replication, use these settings:

The `hot_standby` parameter must be set to `on` to allow read-only queries
    on the replica. In Postgres 10 and later, this setting is `on` by default.
1.  Restart Postgres to pick up the changes.
