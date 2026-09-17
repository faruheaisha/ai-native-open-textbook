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
pageSha256: "02b80453662d355b2d88322546adae94f0ab07599e8998410722d28d12a6cac3"
contentMode: "local-full"
zh: ""
---

### Parallelizing disk I/O on a single node

Parallel I/O can benefit in two scenarios: (a) two or more concurrent
queries should be able to read from different disks in parallel, or
(b) a single query should be able to use query parallelization to read
from multiple disks in parallel.

Thus, users looking for parallel I/O have two options:

1.  Use a RAID setup across multiple physical disks, and expose a
single logical disk to the hypertable (that is, via a single tablespace).

1.  For each physical disk, add a separate tablespace to the
database. TimescaleDB allows you to actually add multiple tablespaces
to a *single* hypertable (although under the covers, a hypertable's
chunks are spread across the tablespaces associated with that hypertable).

We recommend a RAID setup when possible, as it supports both forms of
parallelization described above (that is, separate queries to separate
disks, single query to multiple disks in parallel).  The multiple
tablespace approach only supports the former. With a RAID setup,
*no spatial partitioning is required*.

That said, when using space partitions, we recommend using 1
space partition per disk.

TimescaleDB does *not* benefit from a very large number of space
partitions (such as the number of unique items you expect in partition
field).  A very large number of such partitions leads both to poorer
per-partition load balancing (the mapping of items to partitions using
hashing), as well as much increased planning latency for some types of
queries.

## Required arguments

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Hypertable to add the dimension to|
|`column_name`|TEXT|Column to partition by|

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`number_partitions`|INTEGER|Number of hash partitions to use on `column_name`. Must be > 0|
|`chunk_time_interval`|INTERVAL|Interval that each chunk covers. Must be > 0|
|`partitioning_func`|REGCLASS|The function to use for calculating a value's partition (see `create_hypertable` [instructions][create_hypertable])|
|`if_not_exists`|BOOLEAN|Set to true to avoid throwing an error if a dimension for the column already exists. A notice is issued instead. Defaults to false|

|Column|Type|Description|
|-|-|-|
|`dimension_id`|INTEGER|ID of the dimension in the TimescaleDB internal catalog|
|`schema_name`|TEXT|Schema name of the hypertable|
|`table_name`|TEXT|Table name of the hypertable|
|`column_name`|TEXT|Column name of the column to partition by|
|`created`|BOOLEAN|True if the dimension was added, false when `if_not_exists` is true and no dimension was added|

When executing this function, either `number_partitions` or
`chunk_time_interval` must be supplied, which dictates if the
dimension uses hash or interval partitioning.

The `chunk_time_interval` should be specified as follows:

*   If the column to be partitioned is a TIMESTAMP, TIMESTAMPTZ, or
DATE, this length should be specified either as an INTERVAL type or
an integer value in *microseconds*.

*   If the column is some other integer type, this length
should be an integer that reflects
the column's underlying semantics (for example, the
`chunk_time_interval` should be given in milliseconds if this column
is the number of milliseconds since the UNIX epoch).

Supporting more than **one** additional dimension is currently
 experimental. For any production environments, users are recommended
 to use at most one "space" dimension.

===== PAGE: https://docs.tigerdata.com/api/hypertable/hypertable_approximate_detailed_size/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT create_hypertable('conditions', 'time');
SELECT add_dimension('conditions', 'location', number_partitions => 4);
```

Example 2 (sql):
```sql
SELECT create_hypertable('conditions', 'time', 'location', 2);
SELECT add_dimension('conditions', 'time_received', chunk_time_interval => INTERVAL '1 day');
SELECT add_dimension('conditions', 'device_id', number_partitions => 2);
SELECT add_dimension('conditions', 'device_id', number_partitions => 2, if_not_exists => true);
```

Example 3 (sql):
```sql
SELECT add_data_node('dn1', host => 'dn1.example.com');
SELECT add_data_node('dn2', host => 'dn2.example.com');
SELECT create_distributed_hypertable('conditions', 'time');
SELECT add_dimension('conditions', 'location', number_partitions => 2);
```

---

## Hypertable retention policy isn't applying to continuous aggregates

**URL:** llms-txt#hypertable-retention-policy-isn't-applying-to-continuous-aggregates

A retention policy set on a hypertable does not apply to any continuous
aggregates made from the hypertable. This allows you to set different retention
periods for raw and summarized data. To apply a retention policy to a continuous
aggregate, set the policy on the continuous aggregate itself.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/columnstore-backlog-ooms/ =====

---

## hypertable_columnstore_stats()

**URL:** llms-txt#hypertable_columnstore_stats()

**Contents:**
- Samples
- Arguments
- Returns

Retrieve compression statistics for the columnstore.

For more information about using hypertables, including chunk size partitioning,
see [hypertables][hypertable-docs].

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

To retrieve compression statistics:

- **Show the compression status of the `conditions` hypertable**:

- **Use `pg_size_pretty` get the output in a more human friendly format**:

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Hypertable to show statistics for|

|Column|Type|Description|
|-|-|-|
|`total_chunks`|BIGINT|The number of chunks used by the hypertable. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`number_compressed_chunks`|INTEGER|The number of chunks used by the hypertable that are currently compressed. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`before_compression_table_bytes`|BIGINT|Size of the heap before compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`before_compression_index_bytes`|BIGINT|Size of all the indexes before compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`before_compression_toast_bytes`|BIGINT|Size the TOAST table before compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`before_compression_total_bytes`|BIGINT|Size of the entire table (`before_compression_table_bytes` + `before_compression_index_bytes` + `before_compression_toast_bytes`) before compression. Returns `NULL` if `compression_status` == `Uncompressed`.|
|`after_compression_table_bytes`|BIGINT|Size of the heap after compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`after_compression_index_bytes`|BIGINT|Size of all the indexes after compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`after_compression_toast_bytes`|BIGINT|Size the TOAST table after compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`after_compression_total_bytes`|BIGINT|Size of the entire table (`after_compression_table_bytes` + `after_compression_index_bytes `+ `after_compression_toast_bytes`) after compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`node_name`|TEXT|nodes on which the hypertable is located, applicable only to distributed hypertables. Returns `NULL` if `compression_status` == `Uncompressed`. |

===== PAGE: https://docs.tigerdata.com/api/hypercore/remove_columnstore_policy/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM hypertable_columnstore_stats('conditions');
```

Example 2 (sql):
```sql
-[ RECORD 1 ]------------------+------
   total_chunks                   | 4
   number_compressed_chunks       | 1
   before_compression_table_bytes | 8192
   before_compression_index_bytes | 32768
   before_compression_toast_bytes | 0
   before_compression_total_bytes | 40960
   after_compression_table_bytes  | 8192
   after_compression_index_bytes  | 32768
   after_compression_toast_bytes  | 8192
   after_compression_total_bytes  | 49152
   node_name                      |
```

Example 3 (sql):
```sql
SELECT pg_size_pretty(after_compression_total_bytes) as total
     FROM hypertable_columnstore_stats('conditions');
```

Example 4 (sql):
```sql
-[ RECORD 1 ]--+------
   total | 48 kB
```

---

## Aggregate time-series data with time bucket

**URL:** llms-txt#aggregate-time-series-data-with-time-bucket

**Contents:**
- Group data by time buckets and calculate a summary value
- Group data by time buckets and show the end time of the bucket
- Group data by time buckets and change the time range of the bucket
- Calculate the time bucket of a single value

The `time_bucket` function helps you group in a [hypertable][create-hypertable] so you can
perform aggregate calculations over arbitrary time intervals. It is usually used
in combination with `GROUP BY` for this purpose.

This section shows examples of `time_bucket` use. To learn how time buckets
work, see the [about time buckets section][time-buckets].

## Group data by time buckets and calculate a summary value

Group data into time buckets and calculate a summary value for a column. For
example, calculate the average daily temperature in a table named
`weather_conditions`. The table has a time column named `time` and a
`temperature` column:

The `time_bucket` function returns the start time of the bucket. In this
example, the first bucket starts at midnight on November 15, 2016, and
aggregates all the data from that day:

## Group data by time buckets and show the end time of the bucket

By default, the `time_bucket` column shows the start time of the bucket. If you
prefer to show the end time, you can shift the displayed time using a
mathematical operation on `time`.

For example, you can calculate the minimum and maximum CPU usage for 5-minute
intervals, and show the end of time of the interval. The example table is named
`metrics`. It has a time column named `time` and a CPU usage column named `cpu`:

The addition of `+ '5 min'` changes the displayed timestamp to the end of the
bucket. It doesn't change the range of times spanned by the bucket.

## Group data by time buckets and change the time range of the bucket

To change the time range spanned by the buckets, use the `offset` parameter,
which takes an `INTERVAL` argument. A positive offset shifts the start and end
time of the buckets later. A negative offset shifts the start and end time of
the buckets earlier.

For example, you can calculate the average CPU usage for 5-hour intervals, and
shift the start and end times of all buckets 1 hour later:

## Calculate the time bucket of a single value

Time buckets are usually used together with `GROUP BY` to aggregate data. But
you can also run `time_bucket` on a single time value. This is useful for
testing and learning, because you can see what bucket a value falls into.

For example, to see the 1-week time bucket into which January 5, 2021 would
fall, run:

The function returns `2021-01-04 00:00:00`. The start time of the time bucket is
the Monday of that week, at midnight.

===== PAGE: https://docs.tigerdata.com/use-timescale/time-buckets/about-time-buckets/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT time_bucket('1 day', time) AS bucket,
  avg(temperature) AS avg_temp
FROM weather_conditions
GROUP BY bucket
ORDER BY bucket ASC;
```

Example 2 (sql):
```sql
bucket                 |      avg_temp
-----------------------+---------------------
2016-11-15 00:00:00+00 | 68.3704391666665821
2016-11-16 00:00:00+00 | 67.0816684374999347
```

Example 3 (sql):
```sql
SELECT time_bucket('5 min', time) + '5 min' AS bucket,
  min(cpu),
  max(cpu)
FROM metrics
GROUP BY bucket
ORDER BY bucket DESC;
```

Example 4 (sql):
```sql
SELECT time_bucket('5 hours', time, '1 hour'::INTERVAL) AS bucket,
  avg(cpu)
FROM metrics
GROUP BY bucket
ORDER BY bucket DESC;
```

---

## Integrate Debezium with Tiger Cloud

**URL:** llms-txt#integrate-debezium-with-tiger-cloud

**Contents:**
- Prerequisites
- Configure your database to work with Debezium
- Configure Debezium to work with your database

[Debezium][debezium] is an open-source distributed platform for change data capture (CDC).
It enables you to capture changes in a self-hosted TimescaleDB instance and stream them to other systems in real time.

Debezium can capture events about:

- [Hypertables][hypertables]: captured events are rerouted from their chunk-specific topics to a single logical topic
