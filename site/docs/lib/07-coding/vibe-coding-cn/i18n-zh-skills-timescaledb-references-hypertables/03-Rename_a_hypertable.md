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
pageSha256: "9110197a817b6de2f9f30a81e1231f578251b521cb79ab2832bf6a8dea6961e5"
contentMode: "local-full"
zh: ""
---

### Rename a hypertable

You can change the name of a hypertable using the `ALTER TABLE` command. In this
example, the hypertable is called `conditions`, and is being changed to the new
name, `weather`:

Drop a hypertable using a standard Postgres [`DROP TABLE`][postgres-droptable]
command:

All data chunks belonging to the hypertable are deleted.

===== PAGE: https://docs.tigerdata.com/use-timescale/hypertables/improve-query-performance/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE TABLE conditions (
   time        TIMESTAMPTZ       NOT NULL,
   location    TEXT              NOT NULL,
   device      TEXT              NOT NULL,
   temperature DOUBLE PRECISION  NULL,
   humidity    DOUBLE PRECISION  NULL
) WITH (
   tsdb.hypertable,
   tsdb.partition_column='time',
   tsdb.segmentby = 'device',
   tsdb.orderby = 'time DESC'
);
```

Example 2 (sql):
```sql
SET timescaledb.enable_direct_compress_copy=on;
```

Example 3 (sql):
```sql
CALL add_columnstore_policy('conditions', after => INTERVAL '1d');
```

Example 4 (sql):
```sql
ALTER TABLE conditions
  ADD COLUMN humidity DOUBLE PRECISION NULL;
```

---

## add_reorder_policy()

**URL:** llms-txt#add_reorder_policy()

**Contents:**
- Samples
- Required arguments
- Optional arguments
- Returns

Create a policy to reorder the rows of a hypertable's chunks on a specific index. The policy reorders the rows for all chunks except the two most recent ones, because these are still getting writes. By default, the policy runs every 24 hours. To change the schedule, call [alter_job][alter_job] and adjust `schedule_interval`.

You can have only one reorder policy on each hypertable.

For manual reordering of individual chunks, see [reorder_chunk][reorder_chunk].

When a chunk's rows have been reordered by a policy, they are not reordered
by subsequent runs of the same policy. If you write significant amounts of data into older chunks that have
already been reordered, re-run [reorder_chunk][reorder_chunk] on them. If you have changed a lot of older chunks, it is better to drop and recreate the policy.

Creates a policy to reorder chunks by the existing `(device_id, time)` index every 24 hours.
This applies to all chunks except the two most recent ones.

## Required arguments

|Name|Type| Description                                                  |
|-|-|--------------------------------------------------------------|
|`hypertable`|REGCLASS| Hypertable to create the policy for                          |
|`index_name`|TEXT| Existing hypertable index by which to order the rows on disk |

## Optional arguments

|Name|Type| Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
|-|-|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`if_not_exists`|BOOLEAN| Set to `true` to avoid an error if the `reorder_policy` already exists. A notice is issued instead. Defaults to `false`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
|`initial_start`|TIMESTAMPTZ| Controls when the policy first runs and how its future run schedule is calculated. <ul><li>If omitted or set to <code>NULL</code> (default): <ul><li>The first run is scheduled at <code>now()</code> + <code>schedule_interval</code> (defaults to 24 hours).</li><li>The next run is scheduled at one full <code>schedule_interval</code> after the end of the previous run.</li></ul></li><li>If set: <ul><li>The first run is at the specified time.</li><li>The next run is scheduled as <code>initial_start</code> + <code>schedule_interval</code> regardless of when the previous run ends.</li></ul></li></ul> |
|`timezone`|TEXT| A valid time zone. If `initial_start` is also specified, subsequent runs of the reorder policy are aligned on its initial start. However, daylight savings time (DST) changes might shift this alignment. Set to a valid time zone if this is an issue you want to mitigate. If omitted, UTC bucketing is performed. Defaults to `NULL`.                                                                                                                                                                                                                                                                                |

|Column|Type|Description|
|-|-|-|
|`job_id`|INTEGER|TimescaleDB background job ID created to implement this policy|

===== PAGE: https://docs.tigerdata.com/api/hypertable/hypertable_detailed_size/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT add_reorder_policy('conditions', 'conditions_device_id_time_idx');
```

---

## split_chunk()

**URL:** llms-txt#split_chunk()

**Contents:**
- Samples
- Required arguments
- Returns

Split a large chunk at a specific point in time. If you do not specify the timestamp to split at, `chunk`
is split equally.

* Split a chunk at a specific time:

* Split a chunk in two:

For example, If the chunk duration is, 24 hours, the following command splits `chunk_1` into
  two chunks of 12 hours each.

## Required arguments

|Name|Type| Required | Description                      |
|---|---|---|----------------------------------|
| `chunk` | REGCLASS | ✔ | Name of the chunk to split.      |
| `split_at` | `TIMESTAMPTZ`| ✖ |Timestamp to split the chunk at. |

This function returns void.

===== PAGE: https://docs.tigerdata.com/api/hypertable/attach_chunk/ =====

**Examples:**

Example 1 (sql):
```sql
CALL split_chunk('chunk_1', split_at => '2025-03-01 00:00');
```

Example 2 (sql):
```sql
CALL split_chunk('chunk_1');
```

---

## timescaledb_information.chunk_columnstore_settings

**URL:** llms-txt#timescaledb_information.chunk_columnstore_settings

**Contents:**
- Samples
- Returns

Retrieve the compression settings for each chunk in the columnstore.

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

To retrieve information about settings:

- **Show settings for all chunks in the columnstore**:

* **Find all chunk columnstore settings for a specific hypertable**:

| Name | Type | Description |
|--|--|--|--|--|
|`hypertable`|`REGCLASS`| The name of the hypertable in the columnstore. |
|`chunk`|`REGCLASS`| The name of the chunk in the `hypertable`.  |
|`segmentby`|`TEXT`| The list of columns used to segment the `hypertable`. |
|`orderby`|`TEXT`| The list of columns used to order the data in the `hypertable`, along with the ordering and `NULL` ordering information. |
|`index`| `TEXT` | The sparse index details.  |

===== PAGE: https://docs.tigerdata.com/api/hypercore/add_columnstore_policy/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM timescaledb_information.chunk_columnstore_settings
```

Example 2 (sql):
```sql
hypertable | chunk | segmentby | orderby
  ------------+-------+-----------+---------
  measurements | _timescaledb_internal._hyper_1_1_chunk| | "time" DESC
```

Example 3 (sql):
```sql
SELECT *
  FROM timescaledb_information.chunk_columnstore_settings
  WHERE hypertable::TEXT LIKE 'metrics';
```

Example 4 (sql):
```sql
hypertable | chunk | segmentby | orderby
  ------------+-------+-----------+---------
  metrics | _timescaledb_internal._hyper_2_3_chunk | metric_id | "time"
```

---

## Alter and drop distributed hypertables

**URL:** llms-txt#alter-and-drop-distributed-hypertables

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

You can alter and drop distributed hypertables in the same way as standard
hypertables. To learn more, see:

*   [Altering hypertables][alter]
*   [Dropping hypertables][drop]

When you alter a distributed hypertable, or set privileges on it, the commands
are automatically applied across all data nodes. For more information, see the
section on
[multi-node administration][multinode-admin].

===== PAGE: https://docs.tigerdata.com/self-hosted/distributed-hypertables/create-distributed-hypertables/ =====

---

## Can't create unique index on hypertable, or can't create hypertable with unique index

**URL:** llms-txt#can't-create-unique-index-on-hypertable,-or-can't-create-hypertable-with-unique-index

You might get a unique index and partitioning column error in 2 situations:

*   When creating a primary key or unique index on a hypertable
*   When creating a hypertable from a table that already has a unique index or
    primary key

For more information on how to fix this problem, see the
[section on creating unique indexes on hypertables][unique-indexes].

===== PAGE: https://docs.tigerdata.com/_troubleshooting/explain/ =====

---

## merge_chunks()

**URL:** llms-txt#merge_chunks()

**Contents:**
- Since2180
- Samples
- Arguments

Merge two or more chunks into one.

The partition boundaries for the new chunk is the union of all partitions of the merged chunks.
The new chunk retains the name, constraints, and triggers of the _first_ chunk in the partition order.

You can only merge chunks that have directly adjacent partitions. It is not possible to merge
chunks that have another chunk, or an empty range between them in any of the partitioning
dimensions.

Chunk merging has the following limitations. You cannot:

* Merge chunks with tiered data
* Read or write from the chunks while they are being merged

Refer to the installation documentation for detailed setup instructions.

- Merge more than two chunks:

You can merge either two chunks, or an arbitrary number of chunks specified as an array of chunk identifiers.
When you call `merge_chunks`, you must specify either `chunk1` and `chunk2`, or `chunks`. You cannot use both
arguments.

| Name               | Type        | Default | Required | Description                                    |
|--------------------|-------------|--|--|------------------------------------------------|
| `chunk1`, `chunk2` | REGCLASS    | - | ✖ | The two chunk to merge in partition order |
| `chunks`           | REGCLASS[]  |- | ✖ | The array of chunks to merge in partition order |

===== PAGE: https://docs.tigerdata.com/api/hypertable/add_dimension/ =====

**Examples:**

Example 1 (sql):
```sql
CALL merge_chunks('_timescaledb_internal._hyper_1_1_chunk', '_timescaledb_internal._hyper_1_2_chunk');
```

Example 2 (sql):
```sql
CALL merge_chunks('{_timescaledb_internal._hyper_1_1_chunk, _timescaledb_internal._hyper_1_2_chunk, _timescaledb_internal._hyper_1_3_chunk}');
```

---

## disable_chunk_skipping()

**URL:** llms-txt#disable_chunk_skipping()

**Contents:**
- Samples
- Required arguments
- Optional arguments
- Returns

Disable range tracking for a specific column in a hypertable **in the columnstore**.

In this sample, you convert the `conditions` table to a hypertable with
partitioning on the `time` column. You then specify and enable additional
columns to track ranges for. You then disable range tracking:

Best practice is to enable range tracking on columns which are correlated to the
 partitioning column. In other words, enable tracking on secondary columns that are
 referenced in the `WHERE` clauses in your queries.
 Use this API to disable range tracking on columns when the query patterns don't
 use this secondary column anymore.

## Required arguments

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Hypertable that the column belongs to|
|`column_name`|TEXT|Column to disable tracking range statistics for|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`if_not_exists`|BOOLEAN|Set to `true` so that a notice is sent when ranges are not being tracked for a column. By default, an error is thrown|

|Column|Type|Description|
|-|-|-|
|`hypertable_id`|INTEGER|ID of the hypertable in TimescaleDB.|
|`column_name`|TEXT|Name of the column range tracking is disabled for|
|`disabled`|BOOLEAN|Returns `true` when tracking is disabled. `false` when `if_not_exists` is `true` and the entry was
not removed|

To `disable_chunk_skipping()`, you must have first called [enable_chunk_skipping][enable_chunk_skipping]
and enabled range tracking on a column in the hypertable.

===== PAGE: https://docs.tigerdata.com/api/hypertable/remove_reorder_policy/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT create_hypertable('conditions', 'time');
SELECT enable_chunk_skipping('conditions', 'device_id');
SELECT disable_chunk_skipping('conditions', 'device_id');
```

---

## Optimize your data for real-time analytics

**URL:** llms-txt#optimize-your-data-for-real-time-analytics

**Contents:**
- Prerequisites
- Optimize your data with columnstore policies
- Reference

[Hypercore][hypercore] is the hybrid row-columnar storage engine in TimescaleDB used by hypertables. Traditional
databases force a trade-off between fast inserts (row-based storage) and efficient analytics
(columnar storage). Hypercore eliminates this trade-off, allowing real-time analytics without sacrificing
transactional capabilities.

Hypercore dynamically stores data in the most efficient format for its lifecycle:

* **Row-based storage for recent data**: the most recent chunk (and possibly more) is always stored in the rowstore,
   ensuring fast inserts, updates, and low-latency single record queries. Additionally, row-based storage is used as a
   writethrough for inserts and updates to columnar storage.
* **Columnar storage for analytical performance**: chunks are automatically compressed into the columnstore, optimizing
   storage efficiency and accelerating analytical queries.

Unlike traditional columnar databases, hypercore allows data to be inserted or modified at any stage, making it a
flexible solution for both high-ingest transactional workloads and real-time analytics—within a single database.

When you convert chunks from the rowstore to the columnstore, multiple records are grouped into a single row.
The columns of this row hold an array-like structure that stores all the data. For example, data in the following
rowstore chunk:

| Timestamp  | Device ID  |  Device Type |  CPU |Disk IO|
|---|---|---|---|---|
|12:00:01|A|SSD|70.11|13.4|
|12:00:01|B|HDD|69.70|20.5|
|12:00:02|A|SSD|70.12|13.2|
|12:00:02|B|HDD|69.69|23.4|
|12:00:03|A|SSD|70.14|13.0|
|12:00:03|B|HDD|69.70|25.2|

Is converted and compressed into arrays in a row in the columnstore:

|Timestamp|Device ID|Device Type|CPU|Disk IO|
|-|-|-|-|-|
|[12:00:01, 12:00:01, 12:00:02, 12:00:02, 12:00:03, 12:00:03]|[A, B, A, B, A, B]|[SSD, HDD, SSD, HDD, SSD, HDD]|[70.11, 69.70, 70.12, 69.69, 70.14, 69.70]|[13.4, 20.5, 13.2, 23.4, 13.0, 25.2]|

Because a single row takes up less disk space, you can reduce your chunk size by up to 98%, and can also
speed up your queries. This saves on storage costs, and keeps your queries operating at lightning speed.

For an in-depth explanation of how hypertables and hypercore work, see the [Data model][data-model].

This page shows you how to get the best results when you set a policy to automatically convert chunks in a hypertable
from the rowstore to the columnstore.

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with real-time analytics enabled.

You need your [connection details][connection-info].

The code samples in this page use the [crypto_sample.zip](https://assets.timescale.com/docs/downloads/candlestick/crypto_sample.zip) data from [this key features tutorial][ingest-data].

## Optimize your data with columnstore policies

The compression ratio and query performance of data in the columnstore is dependent on the order and structure of your
data. Rows that change over a dimension should be close to each other. With time-series data, you `orderby` the time
dimension. For example, `Timestamp`:

| Timestamp  | Device ID  |  Device Type |  CPU |Disk IO|
|---|---|---|---|---|
|12:00:01|A|SSD|70.11|13.4|

This ensures that records are compressed and accessed in the same order. However, you would always have to
access the data using the time dimension, then filter all the rows using other criteria. To make your queries more
efficient, you segment your data based on the following:

- The way you want to access it. For example, to rapidly access data about a
single device, you `segmentby` the `Device ID` column. This enables you to run much faster analytical queries on
data in the columnstore.
- The compression rate you want to achieve. The [lower the cardinality][cardinality-blog] of the `segmentby` column, the better compression results you get.

When TimescaleDB converts a chunk to the columnstore, it automatically creates a different schema for your
data. It also creates and uses custom indexes to incorporate the `segmentby` and `orderby` parameters when
you write to and read from the columnstore.

To set up your hypercore automation:

1. **Connect to your Tiger Cloud service**

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. You can also connect to your service using [psql][connect-using-psql].

1. **Enable columnstore on a hypertable**

Create a [hypertable][hypertables-section] for your time-series data using [CREATE TABLE][hypertable-create-table].
   For [efficient queries][secondary-indexes] on data in the columnstore, remember to `segmentby` the column you will
   use most often to filter your data. For example:

* [Use `CREATE TABLE` for a hypertable][hypertable-create-table]

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

* [Use `ALTER MATERIALIZED VIEW` for a continuous aggregate][compression_continuous-aggregate]
     
     Before you say `huh`, a continuous aggregate is a specialized hypertable.

1. **Add a policy to convert chunks to the columnstore at a specific time interval**

Create a [columnstore_policy][add_columnstore_policy] that automatically converts chunks in a hypertable to the columnstore at a specific time interval. For example, convert yesterday's crypto trading data to the columnstore:

TimescaleDB is optimized for fast updates on compressed data in the columnstore. To modify data in the
   columnstore, use standard SQL.

1. **Check the columnstore policy**

1. View your data space saving:

When you convert data to the columnstore, as well as being optimized for analytics, it is compressed by more than
      90%. This helps you save on storage costs and keeps your queries operating at lightning speed. To see the amount of space
      saved:

You see something like:

| before	 | after  |
      |---------|--------|
      | 194 MB  | 	24 MB |

1. View the policies that you set or the policies that already exist:

See [timescaledb_information.jobs][informational-views].

1. **Pause a columnstore policy**

See [alter_job][alter_job].

1. **Restart a columnstore policy**

See [alter_job][alter_job].

1. **Remove a columnstore policy**

See [remove_columnstore_policy][remove_columnstore_policy].

1. **Disable columnstore**

If your table has chunks in the columnstore, you have to
   [convert the chunks back to the rowstore][convert_to_rowstore] before you disable the columnstore.
   
   See [alter_table_hypercore][alter_table_hypercore].

For integers, timestamps, and other integer-like types, data is compressed using [delta encoding][delta],
[delta-of-delta][delta-delta], [simple-8b][simple-8b], and [run-length encoding][run-length]. For columns with few
repeated values, [XOR-based][xor] and [dictionary compression][dictionary] is used. For all other types,
[dictionary compression][dictionary] is used.

===== PAGE: https://docs.tigerdata.com/use-timescale/hypercore/compression-methods/ =====

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
TimescaleDB is optimized for fast updates on compressed data in the columnstore. To modify data in the
   columnstore, use standard SQL.

1. **Check the columnstore policy**

   1. View your data space saving:

      When you convert data to the columnstore, as well as being optimized for analytics, it is compressed by more than
      90%. This helps you save on storage costs and keeps your queries operating at lightning speed. To see the amount of space
      saved:
```

Example 4 (unknown):
```unknown
You see something like:

      | before	 | after  |
      |---------|--------|
      | 194 MB  | 	24 MB |

   1. View the policies that you set or the policies that already exist:
```

---

## Triggers

**URL:** llms-txt#triggers

**Contents:**
- Create a trigger
  - Creating a trigger

TimescaleDB supports the full range of Postgres triggers. Creating, altering,
or dropping triggers on a hypertable propagates the changes to all of the
underlying chunks.

This example creates a new table called `error_conditions` with the same schema
as `conditions`, but that only stores records which are considered errors. An
error, in this case, is when an application sends a `temperature` or `humidity`
reading with a value that is greater than or equal to 1000.
