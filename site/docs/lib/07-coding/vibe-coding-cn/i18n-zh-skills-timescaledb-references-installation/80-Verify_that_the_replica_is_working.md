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
pageSha256: "e37c503fa9393af97066292804813954d14d245083936b5661952c1489cdf9ff"
contentMode: "local-full"
zh: ""
---

## Verify that the replica is working

At this point, your replica should be fully synchronized with the primary
database and prepared to stream from it. You can verify that it is working
properly by checking the logs on the replica, which should look like this:

Any client can perform reads on the replica. You can verify this by running
inserts, updates, or other modifications to your data on the primary database,
and then querying the replica to ensure they have been properly copied over.

In most cases, asynchronous streaming replication is sufficient. However, you
might require greater consistency between the primary and replicas, especially
if you have a heavy workload. Under heavy workloads, replicas can lag far behind
the primary, providing stale data to clients reading from the replicas.
Additionally, in cases where any data loss is fatal, asynchronous replication
might not provide enough of a durability guarantee. The Postgres
[`synchronous_commit`][postgres-synchronous-commit-docs] feature has several
options with varying consistency and performance tradeoffs.

In the `postgresql.conf` file, set the `synchronous_commit` parameter to:

*   `on`: This is the default value. The server does not return `success` until
    the WAL transaction has been written to disk on the primary and any
    replicas.
*   `off`: The server returns `success` when the WAL transaction has been sent
    to the operating system to write to the WAL on disk on the primary, but
    does not wait for the operating system to actually write it. This can cause
    a small amount of data loss if the server crashes when some data has not
    been written, but it does not result in data corruption. Turning
    `synchronous_commit` off is a well-known Postgres optimization for
    workloads that can withstand some data loss in the event of a system crash.
*   `local`: Enforces `on` behavior only on the primary server.
*   `remote_write`: The database returns `success` to a client when the WAL
    record has been sent to the operating system for writing to the WAL on the
    replicas, but before confirmation that the record has actually been
    persisted to disk. This is similar to asynchronous commit, except it waits
    for the replicas as well as the primary. In practice, the extra wait time
    incurred waiting for the replicas significantly decreases replication lag.
*   `remote_apply`: Requires confirmation that the WAL records have been written
    to the WAL and applied to the databases on all replicas. This provides the
    strongest consistency of any of the `synchronous_commit` options. In this
    mode, replicas always reflect the latest state of the primary, and
    replication lag is nearly non-existent.

If `synchronous_standby_names` is empty, the settings `on`, `remote_apply`,
`remote_write` and `local` all provide the same synchronization level, and
transaction commits wait for the local flush to disk.

This matrix shows the level of consistency provided by each mode:

|Mode|WAL Sent to OS (Primary)|WAL Persisted (Primary)|WAL Sent to OS (Primary & Replicas)|WAL Persisted (Primary & Replicas)|Transaction Applied (Primary & Replicas)|
|-|-|-|-|-|-|
|Off|✅|❌|❌|❌|❌|
|Local|✅|✅|❌|❌|❌|
|Remote Write|✅|✅|✅|❌|❌|
|On|✅|✅|✅|✅|❌|
|Remote Apply|✅|✅|✅|✅|✅|

The `synchronous_standby_names` setting is a complementary setting to
`synchronous_commit`. It lists the names of all replicas the primary database
supports for synchronous replication, and configures how the primary database
waits for them. The `synchronous_standby_names` setting supports these formats:

*   `FIRST num_sync (replica_name_1, replica_name_2)`: This waits for
    confirmation from the first `num_sync` replicas before returning `success`.
    The list of `replica_names` determines the relative priority of
    the replicas. Replica names are determined by the `application_name` setting
    on the replicas.
*   `ANY num_sync (replica_name_1, replica_name_2)`: This waits for confirmation
    from `num_sync` replicas in the provided list, regardless of their priority
    or position in the list. This is works as a quorum function.

Synchronous replication modes force the primary to wait until all required
replicas have written the WAL, or applied the database transaction, depending on
the `synchronous_commit` level. This could cause the primary to hang
indefinitely if a required replica crashes. When the replica reconnects, it
replays any of the WAL it needs to catch up. Only then is the primary able to
resume writes. To mitigate this, provision more than the amount of nodes
required under the `synchronous_standby_names` setting and list them in the
`FIRST` or `ANY` clauses. This allows the primary to move forward as long as a
quorum of replicas have written the most recent WAL transaction. Replicas that
were out of service are able to reconnect and replay the missed WAL transactions
asynchronously.
