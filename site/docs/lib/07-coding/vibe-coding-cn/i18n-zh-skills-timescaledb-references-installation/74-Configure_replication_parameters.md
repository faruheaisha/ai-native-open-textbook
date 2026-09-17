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
pageSha256: "cdf703ce58365b8bb1357bf016f802328bf1ba407d965ca6c5e06a7a023873b1"
contentMode: "local-full"
zh: ""
---

## Configure replication parameters

There are several replication settings that need to be added or edited in the
`postgresql.conf` configuration file.

### Configuring replication parameters

1.  Set the `synchronous_commit` parameter to `off`.
1.  Set the `max_wal_senders` parameter to the total number of concurrent
    connections from replicas or backup clients. As a minimum, this should equal
    the number of replicas you intend to have.
1.  Set the `wal_level` parameter to the amount of information written to the
    Postgres write-ahead log (WAL). For replication to work, there needs to be
    enough data in the WAL to support archiving and replication. The default
    value is usually appropriate.
1.  Set the `max_replication_slots` parameter to the total number of replication
    slots the primary database can support.
1.  Set the `listen_addresses` parameter to the address of the primary database.
    Do not leave this parameter as the local loopback address, because the
    remote replicas must be able to connect to the primary to stream the WAL.
1.  Restart Postgres to pick up the changes. This must be done before you
    create replication slots.

The most common streaming replication use case is asynchronous replication with
one or more replicas. In this example, the WAL is streamed to the replica, but
the primary server does not wait for confirmation that the WAL has been written
to disk on either the primary or the replica. This is the most performant
replication configuration, but it does carry the risk of a small amount of data
loss in the event of a system failure. It also makes no guarantees that the
replica is fully up to date with the primary, which could cause inconsistencies
between read queries on the primary and the replica. The example configuration
for this use case:

If you need stronger consistency on the replicas, or if your query load is heavy
enough to cause significant lag between the primary and replica nodes in
asynchronous mode, consider a synchronous replication configuration instead. For
more information about the different replication modes, see the
[replication modes section][replication-modes].
