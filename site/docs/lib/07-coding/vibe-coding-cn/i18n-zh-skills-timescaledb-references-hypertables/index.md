---
title: "Timescaledb - Hypertables"
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
pageSha256: "4fe1b68a3308739324eb8e47ef8ce9f312484a61f8ce12044f27def0946f5ec7"
contentMode: "local-full"
zh: ""
---

# Timescaledb - Hypertables

**Pages:** 103

---

## chunks_detailed_size()

**URL:** llms-txt#chunks_detailed_size()

**Contents:**
- Samples
- Required arguments
- Returns

Get information about the disk space used by the chunks belonging to a
hypertable, returning size information for each chunk table, any
indexes on the chunk, any toast tables, and the total size associated
with the chunk. All sizes are reported in bytes.

If the function is executed on a distributed hypertable, it returns
disk space usage information as a separate row per node. The access
node is not included since it doesn't have any local chunk data.

Additional metadata associated with a chunk can be accessed
via the `timescaledb_information.chunks` view.

## Required arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Name of the hypertable |

|Column|Type|Description|
|---|---|---|
|chunk_schema| TEXT | Schema name of the chunk |
|chunk_name| TEXT | Name of the chunk|
|table_bytes|BIGINT | Disk space used by the chunk table|
|index_bytes|BIGINT | Disk space used by indexes|
|toast_bytes|BIGINT | Disk space of toast tables|
|total_bytes|BIGINT | Total disk space used by the chunk, including all indexes and TOAST data|
|node_name| TEXT | Node for which size is reported, applicable only to distributed hypertables|

If executed on a relation that is not a hypertable, the function
returns `NULL`.

===== PAGE: https://docs.tigerdata.com/api/hypertable/create_hypertable_old/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM chunks_detailed_size('dist_table')
  ORDER BY chunk_name, node_name;

     chunk_schema      |      chunk_name       | table_bytes | index_bytes | toast_bytes | total_bytes |       node_name
-----------------------+-----------------------+-------------+-------------+-------------+-------------+-----------------------
 _timescaledb_internal | _dist_hyper_1_1_chunk |        8192 |       32768 |           0 |       40960 | data_node_1
 _timescaledb_internal | _dist_hyper_1_2_chunk |        8192 |       32768 |           0 |       40960 | data_node_2
 _timescaledb_internal | _dist_hyper_1_3_chunk |        8192 |       32768 |           0 |       40960 | data_node_3
```

---

## add_columnstore_policy()

**URL:** llms-txt#add_columnstore_policy()

**Contents:**
- Samples
- Arguments

Create a [job][job] that automatically moves chunks in a hypertable to the columnstore after a
specific time interval.

You enable the columnstore a hypertable or continuous aggregate before you create a columnstore policy.
You do this by calling `CREATE TABLE` for hypertables and `ALTER MATERIALIZED VIEW` for continuous aggregates. When
columnstore is enabled, [bloom filters][bloom-filters] are enabled by default, and every new chunk has a bloom index.
If you converted chunks to columnstore using TimescaleDB v2.19.3 or below, to enable bloom filters on that data you have
to convert those chunks to the rowstore, then convert them back to the columnstore.

Bloom indexes are not retrofitted, meaning that the existing chunks need to be fully recompressed to have the bloom
indexes present. Please check out the PR description for more in-depth explanations of how bloom filters in
TimescaleDB work.

To view the policies that you set or the policies that already exist,
see [informational views][informational-views], to remove a policy, see [remove_columnstore_policy][remove_columnstore_policy].

A columnstore policy is applied on a per-chunk basis. If you remove an existing policy and then add a new one, the new policy applies only to the chunks that have not yet been converted to columnstore. The existing chunks in the columnstore remain unchanged. This means that chunks with different columnstore settings can co-exist in the same hypertable.

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

To create a columnstore job:

1. **Enable columnstore**

Create a [hypertable][hypertables-section] for your time-series data using [CREATE TABLE][hypertable-create-table].
   For [efficient queries][secondary-indexes] on data in the columnstore, remember to `segmentby` the column you will
   use most often to filter your data. For example:

* [Use `CREATE TABLE` for a hypertable][hypertable-create-table]

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

* [Use `ALTER MATERIALIZED VIEW` for a continuous aggregate][compression_continuous-aggregate]

1. **Add a policy to move chunks to the columnstore at a specific time interval**

* 60 days after the data was added to the table:
     
   * 3 months prior to the moment you run the query:

* With an integer-based time column:

* Older than eight weeks:

* Control the time your policy runs:

When you use a policy with a fixed schedule, TimescaleDB uses the `initial_start` time to compute the
      next start time. When TimescaleDB finishes executing a policy, it picks the next available time on the
     schedule,
      skipping any candidate start times that have already passed.

When you set the `next_start` time, it only changes the start time of the next immediate execution. It does not
      change the computation of the next scheduled execution after that next execution. To change the schedule so a
      policy starts at a specific time, you need to set `initial_start`. To change the next immediate
      execution, you need to set `next_start`. For example, to modify a policy to execute on a fixed schedule 15 minutes past the hour, and every
      hour, you need to set both `initial_start` and `next_start` using `alter_job`:

1. **View the policies that you set or the policies that already exist**

See [timescaledb_information.jobs][informational-views].

Calls to `add_columnstore_policy` require either `after` or `created_before`, but cannot have both.

| Name                          | Type | Default                                                                                                                      | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
|-------------------------------|--|------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `hypertable`                  |REGCLASS| -                                                                                                                            | ✔        | Name of the hypertable or continuous aggregate to run this [job][job] on.                                                                                                                                                                                                                                                                                                                                                                                                  |
| `after`                       |INTERVAL or INTEGER| -                                                                                                                            | ✖        | Add chunks containing data older than `now - \{after\}::interval` to the columnstore. <br/> Use an object type that matchs the time column type in `hypertable`: <ul><li><b><code>TIMESTAMP</code>, <code>TIMESTAMPTZ</code>, or <code>DATE</code></b>: use an <code>INTERVAL</code> type.</li><li><b> Integer-based timestamps </b>: set an integer type using the [integer_now_func][set_integer_now_func].</li></ul> `after` is mutually exclusive with `created_before`. |
| `created_before`              |INTERVAL| NULL                                                                                                                         | ✖        | Add chunks with a creation time of `now() - created_before` to the columnstore. <br/> `created_before` is <ul><li>Not supported for continuous aggregates.</li><li>Mutually exclusive with `after`.</li></ul>                                                                                                                                                                                                                                                             |
| `schedule_interval`           |INTERVAL| 12 hours when [chunk_time_interval][chunk_time_interval] >= `1 day` for `hypertable`. Otherwise `chunk_time_interval` / `2`. | ✖        | Set the interval between the finish time of the last execution of this policy and the next start.                                                                                                                                                                                                                                                                                                                                                                          |
| `initial_start`               |TIMESTAMPTZ| The interval from the finish time of the last execution to the [next_start][next-start].                                     | ✖        | Set the time this job is first run. This is also the time that `next_start` is calculated from. |
| `next_start`                  |TIMESTAMPTZ| -|  ✖       | Set the start time of the next immediate execution. It does not change the computation of the next scheduled time after the next execution.  |
| `timezone`                    |TEXT| UTC. However, daylight savings time(DST) changes may shift this alignment.                                                   | ✖        | Set to a valid time zone to mitigate DST shifting. If `initial_start` is set, subsequent executions of this policy are aligned on `initial_start`.                                                                                                                                                                                                                                                                                                                         |
| `if_not_exists`               |BOOLEAN| `false`                                                                                                                      | ✖        | Set to `true` so this job fails with a warning rather than an error if a columnstore policy already exists on `hypertable`                                                                                                                                                                                                                                                                                                                                                |

===== PAGE: https://docs.tigerdata.com/api/hypercore/hypertable_columnstore_settings/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE crypto_ticks (
        "time" TIMESTAMPTZ,
        symbol TEXT,
        price DOUBLE PRECISION,
        day_volume NUMERIC
     ) WITH (
       tsdb.hypertable,
       tsdb.partition_column='time',
       tsdb.segmentby='symbol',
       tsdb.orderby='time DESC'
     );
```

Example 2 (sql):
```sql
ALTER MATERIALIZED VIEW assets_candlestick_daily set (
        timescaledb.enable_columnstore = true,
        timescaledb.segmentby = 'symbol' );
```

Example 3 (unknown):
```unknown
* 3 months prior to the moment you run the query:
```

Example 4 (unknown):
```unknown
* With an integer-based time column:
```

---

## Create distributed hypertables

**URL:** llms-txt#create-distributed-hypertables

**Contents:**
  - Creating a distributed hypertable

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

If you have a [multi-node environment][multi-node], you can create a distributed
hypertable across your data nodes. First create a standard Postgres table, and
then convert it into a distributed hypertable.

You need to set up your multi-node cluster before creating a distributed
hypertable. To set up multi-node, see the
[multi-node section](https://docs.tigerdata.com/self-hosted/latest/multinode-timescaledb/).

## 本篇目录

- [Creating a distributed hypertable](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/01-Creating_a_distributed_hypertable.md)
- [Add a column to a hypertable](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/02-Add_a_column_to_a_hypertable.md)
- [Rename a hypertable](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/03-Rename_a_hypertable.md)
- [Creating a trigger](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/04-Creating_a_trigger.md)
- [Adding a data retention policy](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/05-Adding_a_data_retention_policy.md)
- [Creating a continuous aggregate](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/06-Creating_a_continuous_aggregate.md)
- [Creating a continuous aggregate with the WITH NO DATA option](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/07-Creating_a_continuous_aggregate_with_the.md)
- [Querying a continuous aggregate](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/08-Querying_a_continuous_aggregate.md)
- [Create a window function](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/09-Create_a_window_function.md)
- [Window function workaround for older versions of TimescaleDB](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/10-Window_function_workaround_for_older_ver.md)
- [Ordering and segmenting.](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/11-Ordering_and_segmenting..md)
- [Required arguments](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/12-Required_arguments.md)
- [How chunk skipping works](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/13-How_chunk_skipping_works.md)
- [When to enable chunk skipping](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/14-When_to_enable_chunk_skipping.md)
- [Enable chunk skipping](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/15-Enable_chunk_skipping.md)
- [Parallelizing queries across multiple data nodes](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/16-Parallelizing_queries_across_multiple_da.md)
- [Parallelizing disk I/O on a single node](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/17-Parallelizing_disk_I_O_on_a_single_node.md)
- [Attaching a new data node to a distributed hypertable](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/18-Attaching_a_new_data_node_to_a_distribut.md)
- [Time partitioning](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/19-Time_partitioning.md)
- [Closed and open dimensions for space partitioning](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/20-Closed_and_open_dimensions_for_space_par.md)
- [Repartitioning distributed hypertables](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/21-Repartitioning_distributed_hypertables.md)
- [Partial push down](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/22-Partial_push_down.md)
- [Limitations of query push down](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/23-Limitations_of_query_push_down.md)
- [Selecting chunks to compress](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/24-Selecting_chunks_to_compress.md)
- [Compressing chunks manually](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/25-Compressing_chunks_manually.md)
- [Discovering the name of a materialized hypertable](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/26-Discovering_the_name_of_a_materialized_h.md)
- [Creating a trigger on a distributed hypertable](https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/27-Creating_a_trigger_on_a_distributed_hype.md)
