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
pageSha256: "55769c8a2715ab87c9fc3c286eadc5a2aa104784890c3f5e463e987ee708d4d1"
contentMode: "local-full"
zh: ""
---

## Create a base backup on the replica

Replicas work by streaming the primary server's WAL log and replaying its
transactions in Postgres recovery mode. To do this, the replica needs to be in
a state where it can replay the log. You can do this by restoring the replica
from a base backup of the primary instance.

### Creating a base backup on the replica

1.  Stop Postgres services.
1.  If the replica database already contains data, delete it before you run the
    backup, by removing the Postgres data directory:

If you don't know the location of the data directory, find it with the
    `show data_directory;` command.
1.  Restore from the base backup, using the IP address of the primary database
    and the replication username:

The -W flag prompts you for a password. If you are using this command in an
    automated setup, you might need to use a [pgpass file][pgpass-file].
1.  When the backup is complete, create a
    [standby.signal][postgres-recovery-docs] file in your data directory. When
    Postgres finds a `standby.signal` file in its data directory, it starts in
    recovery mode and streams the WAL through the replication protocol:
