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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hypertables.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceSha256: "2b1f8e46c900f47b6a11c8e246b0d222b1dd95793bf063ebaafd0fb65c96841c"
pageSha256: "13be5d3fa6f80087fc86a81e2e5d9415f368df5863baede46784e3a1b4c61790"
contentMode: "local-full"
zh: ""
---

### Limitations of query push down

Distributed hypertables get improved performance when they can push down queries
to the data nodes. But the query planner might not be able to push down every
query. Or it might only be able to partially push down a query. This can occur
for several reasons:

*   You changed the partitioning configuration. For example, you added new data
    nodes and increased the number of space partitions to match. This can cause
    chunks for the same space value to be stored on different nodes. For
    instance, say you partition by `device_id`. You start with 3 partitions, and
    data for `device_B` is stored on node 3. You later increase to 4 partitions.
    New chunks for `device_B` are now stored on node 4. If you query across the
    repartitioning boundary, a final aggregate for `device_B` cannot be
    calculated on node 3 or node 4 alone. Partially processed data must be sent
    to the access node for final aggregation. The TimescaleDB query planner
    dynamically detects such overlapping chunks and reverts to the appropriate
    partial aggregation plan. This means that you can add data nodes and
    repartition your data to achieve elasticity without worrying about query
    results. In some cases, your query could be slightly less performant, but
    this is rare and the affected chunks usually move quickly out of your
    retention window.
*   The query includes [non-immutable functions][volatility] and expressions.
    The function cannot be pushed down to the data node, because by definition,
    it isn't guaranteed to have a consistent result across each node. An example
    non-immutable function is [`random()`][random-func], which depends on the
    current seed.
*   The query includes a job function. The access node assumes the
    function doesn't exist on the data nodes, and doesn't push it down.

TimescaleDB uses several optimizations to avoid these limitations, and push down
as many queries as possible. For example, `now()` is a non-immutable function.
The database converts it to a constant on the access node and pushes down the
constant timestamp to the data nodes.

## Combine distributed hypertables and standard hypertables

You can use distributed hypertables in the same database as standard hypertables
and standard Postgres tables. This mostly works the same way as having
multiple standard tables, with a few differences. For example, if you `JOIN` a
standard table and a distributed hypertable, the access node needs to fetch the
raw data from the data nodes and perform the `JOIN` locally.

All the limitations of regular hypertables also apply to distributed
hypertables. In addition, the following limitations apply specifically
to distributed hypertables:

*   Distributed scheduling of background jobs is not supported. Background jobs
    created on an access node are scheduled and executed on this access node
    without distributing the jobs to data nodes.
*   Continuous aggregates can aggregate data distributed across data nodes, but
    the continuous aggregate itself must live on the access node. This could
    create a limitation on how far you can scale your installation, but because
    continuous aggregates are downsamples of the data, this does not usually
    create a problem.
*   Reordering chunks is not supported.
*   Tablespaces cannot be attached to a distributed hypertable on the access
    node. It is still possible to attach tablespaces on data nodes.
*   Roles and permissions are assumed to be consistent across the nodes of a
    distributed database, but consistency is not enforced.
*   Joins on data nodes are not supported. Joining a distributed hypertable with
    another table requires the other table to reside on the access node. This
    also limits the performance of joins on distributed hypertables.
*   Tables referenced by foreign key constraints in a distributed hypertable
    must be present on the access node and all data nodes. This applies also to
    referenced values.
*   Parallel-aware scans and appends are not supported.
*   Distributed hypertables do not natively provide a consistent restore point
    for backup and restore across nodes. Use the
    [`create_distributed_restore_point`][create_distributed_restore_point]
    command, and make sure you take care when you restore individual backups to
    access and data nodes.
*   For native replication limitations, see the
    [native replication section][native-replication].
*   User defined functions have to be manually installed on the data nodes so
    that the function definition is available on both access and data nodes.
    This is particularly relevant for functions that are registered with
    `set_integer_now_func`.

Note that these limitations concern usage from the access node. Some
currently unsupported features might still work on individual data nodes,
but such usage is neither tested nor officially supported. Future versions
of TimescaleDB might remove some of these limitations.

===== PAGE: https://docs.tigerdata.com/self-hosted/backup-and-restore/logical-backup/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT location, max(temperature)
  FROM conditions
  GROUP BY location;
```

Example 2 (sql):
```sql
SELECT max(temperature) FROM conditions;
```

---

## reorder_chunk()

**URL:** llms-txt#reorder_chunk()

**Contents:**
- Samples
- Required arguments
- Optional arguments
- Returns

Reorder a single chunk's heap to follow the order of an index. This function
acts similarly to the [Postgres CLUSTER command][postgres-cluster] , however
it uses lower lock levels so that, unlike with the CLUSTER command,  the chunk
and hypertable are able to be read for most of the process. It does use a bit
more disk space during the operation.

This command can be particularly useful when data is often queried in an order
different from that in which it was originally inserted. For example, data is
commonly inserted into a hypertable in loose time order (for example, many devices
concurrently sending their current state), but one might typically query the
hypertable about a _specific_ device. In such cases, reordering a chunk using an
index on `(device_id, time)` can lead to significant performance improvement for
these types of queries.

One can call this function directly on individual chunks of a hypertable, but
using [add_reorder_policy][add_reorder_policy] is often much more convenient.

Reorder a chunk on an index:

## Required arguments

|Name|Type|Description|
|---|---|---|
| `chunk` | REGCLASS | Name of the chunk to reorder. |

## Optional arguments

|Name|Type|Description|
|---|---|---|
| `index` | REGCLASS | The name of the index (on either the hypertable or chunk) to order by.|
| `verbose` | BOOLEAN | Setting to true displays messages about the progress of the reorder command. Defaults to false.|

This function returns void.

===== PAGE: https://docs.tigerdata.com/api/hypertable/add_reorder_policy/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT reorder_chunk('_timescaledb_internal._hyper_1_10_chunk', '_timescaledb_internal.conditions_device_id_time_idx');
```

---

## create_distributed_hypertable()

**URL:** llms-txt#create_distributed_hypertable()

**Contents:**
- Required arguments
- Optional arguments
- Returns
- Sample usage
  - Best practices

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

Create a TimescaleDB hypertable distributed across a multinode environment.

`create_distributed_hypertable()` replaces [`create_hypertable() (old interface)`][create-hypertable-old]. Distributed tables use the old API. The new generalized [`create_hypertable`][create-hypertable-new] API was introduced in TimescaleDB v2.13.

## Required arguments

|Name|Type| Description                                                                                  |
|---|---|----------------------------------------------------------------------------------------------|
| `relation` | REGCLASS | Identifier of the table you want to convert to a hypertable.                                 |
| `time_column_name` | TEXT | Name of the column that contains time values, as well as the primary column to partition by. |

## Optional arguments

|Name|Type|Description|
|---|---|---|
| `partitioning_column` | TEXT | Name of an additional column to partition by. |
| `number_partitions` | INTEGER | Number of hash partitions to use for `partitioning_column`. Must be > 0. Default is the number of `data_nodes`. |
| `associated_schema_name` | TEXT | Name of the schema for internal hypertable tables. Default is `_timescaledb_internal`. |
| `associated_table_prefix` | TEXT | Prefix for internal hypertable chunk names. Default is `_hyper`. |
| `chunk_time_interval` | INTERVAL | Interval in event time that each chunk covers. Must be > 0. Default is 7 days. |
| `create_default_indexes` | BOOLEAN | Boolean whether to create default indexes on time/partitioning columns. Default is TRUE. |
| `if_not_exists` | BOOLEAN | Boolean whether to print warning if table already converted to hypertable or raise exception. Default is FALSE. |
| `partitioning_func` | REGCLASS | The function to use for calculating a value's partition.|
| `migrate_data` | BOOLEAN | Set to TRUE to migrate any existing data from the `relation` table to chunks in the new hypertable. A non-empty table generates an error without this option. Large tables may take significant time to migrate. Default is FALSE. |
| `time_partitioning_func` | REGCLASS | Function to convert incompatible primary time column values to compatible ones. The function must be `IMMUTABLE`. |
| `replication_factor` | INTEGER | The number of data nodes to which the same data is written to. This is done by creating chunk copies on this amount of data nodes. Must be >= 1; If not set, the default value is determined by the `timescaledb.hypertable_replication_factor_default` GUC. Read [the best practices][best-practices] before changing the default. |
| `data_nodes` | ARRAY | The set of data nodes used for the distributed hypertable. If not present, defaults to all data nodes known by the access node (the node on which the distributed hypertable is created). |

|Column|Type|Description|
|---|---|---|
| `hypertable_id` | INTEGER | ID of the hypertable in TimescaleDB. |
| `schema_name` | TEXT | Schema name of the table converted to hypertable. |
| `table_name` | TEXT | Table name of the table converted to hypertable. |
| `created` | BOOLEAN | TRUE if the hypertable was created, FALSE when `if_not_exists` is TRUE and no hypertable was created. |

Create a table `conditions` which is partitioned across data
nodes by the 'location' column. Note that the number of space
partitions is automatically equal to the number of data nodes assigned
to this hypertable (all configured data nodes in this case, as
`data_nodes` is not specified).

Create a table `conditions` using a specific set of data nodes.

* **Hash partitions**: Best practice for distributed hypertables is to enable [hash partitions](https://www.techopedia.com/definition/31996/hash-partitioning).
  With hash partitions, incoming data is divided between the data nodes. Without hash partition, all
  data for each time slice is written to a single data node.

* **Time intervals**: Follow the guidelines for `chunk_time_interval` defined in [`create_hypertable`]
  [create-hypertable-old].

When you enable hash partitioning, the hypertable is evenly distributed across the data nodes. This
  means you can set a larger time interval. For example, you ingest 10 GB of data per day shared over
  five data nodes, each node has 64 GB of memory. If this is the only table being served by these data nodes, use a time interval of 1 week:

If you do not enable hash partitioning, use the same `chunk_time_interval` settings as a non-distributed
  instance. This is because all incoming data is handled by a single node.

* **Replication factor**: `replication_factor` defines the number of data nodes a newly created chunk is
  replicated in. For example, when you set `replication_factor` to `3`, each chunk exists on 3 separate
  data nodes. Rows written to a chunk are inserted into all data notes in a two-phase commit protocol.

If a data node fails or is removed, no data is lost. Writes succeed on the other data nodes. However, the
  chunks on the lost data node are now under-replicated. When the failed data node becomes available, rebalance the chunks with a call to [copy_chunk][copy_chunk].

===== PAGE: https://docs.tigerdata.com/api/distributed-hypertables/attach_data_node/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT create_distributed_hypertable('conditions', 'time', 'location');
```

Example 2 (sql):
```sql
SELECT create_distributed_hypertable('conditions', 'time', 'location',
    data_nodes => '{ "data_node_1", "data_node_2", "data_node_4", "data_node_7" }');
```

Example 3 (unknown):
```unknown
7 days * 10 GB             70
   --------------------  ==  ---  ~= 22% of main memory used for the most recent chunks
   5 data nodes * 64 GB      320
```

---

## Manual compression

**URL:** llms-txt#manual-compression

**Contents:**
  - Selecting chunks to compress
  - Compressing chunks manually
- Manually compress chunks in a single command
- Roll up uncompressed chunks when compressing

In most cases, an [automated compression policy][add_compression_policy] is sufficient to automatically compress your
chunks. However, if you want more control, you can also use manual synchronous compression of specific chunks.

Before you start, you need a list of chunks to compress. In this example, you
use a hypertable called `example`, and compress chunks older than three days.
