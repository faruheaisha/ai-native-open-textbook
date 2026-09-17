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
pageSha256: "88a40dc2033e9d84878134ff7c3dafb19a3cf60425c6e383866dfa3d55bd2dce"
contentMode: "local-full"
zh: ""
---

## Create replication slots

When you have configured `postgresql.conf` and restarted Postgres, you can
create a [replication slot][postgres-rslots-docs] for each replica. Replication
slots ensure that the primary does not delete segments from the WAL until they
have been received by the replicas. This is important in case a replica goes
down for an extended time. The primary needs to verify that a WAL segment has
been consumed by a replica, so that it can safely delete data. You can use
[archiving][postgres-archive-docs] for this purpose, but replication slots
provide the strongest protection for streaming replication.

### Creating replication slots

1.  At the `psql` slot, create the first replication slot. The name of the slot
    is arbitrary. In this example, it is called `replica_1_slot`:

1.  Repeat for each required replication slot.
