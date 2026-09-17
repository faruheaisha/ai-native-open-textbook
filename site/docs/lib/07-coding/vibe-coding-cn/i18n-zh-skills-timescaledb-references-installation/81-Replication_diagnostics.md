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
pageSha256: "f8183d962173244d15d512cc8ba7d0668f7384b245ce72570ada18a3ceba6869"
contentMode: "local-full"
zh: ""
---

## Replication diagnostics

The Postgres [pg_stat_replication][postgres-pg-stat-replication-docs] view
provides information about each replica. This view is particularly useful for
calculating replication lag, which measures how far behind the primary the
current state of the replica is. The `replay_lag` field gives a measure of the
seconds between the most recent WAL transaction on the primary, and the last
reported database commit on the replica. Coupled with `write_lag` and
`flush_lag`, this provides insight into how far behind the replica is. The
`*_lsn` fields also provide helpful information. They allow you to compare WAL locations between
the primary and the replicas. The `state` field is useful for determining
exactly what each replica is currently doing; the available modes are `startup`,
`catchup`, `streaming`, `backup`, and `stopping`.

To see the data, on the primary database, run this command:

The output looks like this:

Postgres provides some failover functionality, where the replica is promoted
to  primary in the event of a failure. This is provided using the
[pg_ctl][pgctl-docs] command or the `trigger_file`. However, Postgres does
not provide support for automatic failover. For more information, see the
[Postgres failover documentation][failover-docs]. If you require a
configurable high availability solution with automatic failover functionality,
check out [Patroni][patroni-github].

===== PAGE: https://docs.tigerdata.com/self-hosted/replication-and-ha/about-ha/ =====

**Examples:**

Example 1 (sql):
```sql
SET password_encryption = 'scram-sha-256';
```

Example 2 (sql):
```sql
CREATE ROLE repuser WITH REPLICATION PASSWORD '<PASSWORD>' LOGIN;
```

Example 3 (yaml):
```yaml
listen_addresses = '*'
wal_level = replica
max_wal_senders = 2
max_replication_slots = 2
synchronous_commit = off
```

Example 4 (sql):
```sql
SELECT * FROM pg_create_physical_replication_slot('replica_1_slot', true);
```
