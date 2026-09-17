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
pageSha256: "b494dde7b3def82e07a21acb5720343dd758d8fb9f87ef3939e894db6a2f7395"
contentMode: "local-full"
zh: ""
---

### Adding a data retention policy

1.  Choose which hypertable you want to add the policy to. Decide how long
    you want to keep data before dropping it. In this example, the hypertable
    named `conditions` retains the data for 24 hours.
1.  Call `add_retention_policy`:

A data retention policy only allows you to drop chunks based on how far they are
in the past. To drop chunks based on how far they are in the future,
[manually drop chunks](https://docs.tigerdata.com/use-timescale/latest/data-retention/manually-drop-chunks).

## Remove a data retention policy

Remove an existing data retention policy by using the
[`remove_retention_policy`][remove_retention_policy] function. Pass it the name
of the hypertable to remove the policy from.

## See scheduled data retention jobs

To see your scheduled data retention jobs and their job statistics, query the
[`timescaledb_information.jobs`][timescaledb_information.jobs] and
[`timescaledb_information.job_stats`][timescaledb_information.job_stats] tables.
For example:

The results look like this:

===== PAGE: https://docs.tigerdata.com/use-timescale/data-retention/manually-drop-chunks/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT add_retention_policy('conditions', INTERVAL '24 hours');
```

Example 2 (sql):
```sql
SELECT remove_retention_policy('conditions');
```

Example 3 (sql):
```sql
SELECT j.hypertable_name,
       j.job_id,
       config,
       schedule_interval,
       job_status,
       last_run_status,
       last_run_started_at,
       js.next_start,
       total_runs,
       total_successes,
       total_failures
  FROM timescaledb_information.jobs j
  JOIN timescaledb_information.job_stats js
    ON j.job_id = js.job_id
  WHERE j.proc_name = 'policy_retention';
```

Example 4 (sql):
```sql
-[ RECORD 1 ]-------+-----------------------------------------------
hypertable_name     | conditions
job_id              | 1000
config              | {"drop_after": "5 years", "hypertable_id": 14}
schedule_interval   | 1 day
job_status          | Scheduled
last_run_status     | Success
last_run_started_at | 2022-05-19 16:15:11.200109+00
next_start          | 2022-05-20 16:15:11.243531+00
total_runs          | 1
total_successes     | 1
total_failures      | 0
```

---

## chunk_columnstore_stats()

**URL:** llms-txt#chunk_columnstore_stats()

**Contents:**
- Samples
- Arguments
- Returns

Retrieve statistics about the chunks in the columnstore

`chunk_columnstore_stats` returns the size of chunks in the columnstore, these values are computed when you call either:
- [add_columnstore_policy][add_columnstore_policy]: create a [job][job] that automatically moves chunks in a hypertable to the columnstore at a
  specific time interval.
- [convert_to_columnstore][convert_to_columnstore]: manually add a specific chunk in a hypertable to the columnstore.

Inserting into a chunk in the columnstore does not change the chunk size. For more information about how to compute
chunk sizes, see [chunks_detailed_size][chunks_detailed_size].

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

To retrieve statistics about chunks:

- **Show the status of the first two chunks in the `conditions` hypertable**:
   
  Returns:

- **Use `pg_size_pretty` to return a more human friendly format**:

| Name | Type | Default | Required | Description |
|--|--|--|--|--|
|`hypertable`|`REGCLASS`|-|✖| The name of a hypertable |

|Column|Type| Description                                                                                                                                                                                                      |
|-|-|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`chunk_schema`|TEXT| Schema name of the chunk.                                                                                                                                                                                        |
|`chunk_name`|TEXT| Name of the chunk.                                                                                                                                                                                               |
|`compression_status`|TEXT| Current compression status of the chunk.                                                                                                                                                                         |
|`before_compression_table_bytes`|BIGINT| Size of the heap before compression. Returns `NULL` if `compression_status` == `Uncompressed`.                                                                                                                   |
|`before_compression_index_bytes`|BIGINT| Size of all the indexes before compression. Returns `NULL` if `compression_status` == `Uncompressed`.                                                                                                            |
|`before_compression_toast_bytes`|BIGINT| Size the TOAST table before compression. Returns `NULL` if `compression_status` == `Uncompressed`.                                                                                                               |
|`before_compression_total_bytes`|BIGINT| Size of the entire chunk table (`before_compression_table_bytes` + `before_compression_index_bytes` + `before_compression_toast_bytes`) before compression. Returns `NULL` if `compression_status` == `Uncompressed`.|
|`after_compression_table_bytes`|BIGINT| Size of the heap after compression. Returns `NULL` if `compression_status` == `Uncompressed`.                                                                                                                    |
|`after_compression_index_bytes`|BIGINT| Size of all the indexes after compression. Returns `NULL` if `compression_status` == `Uncompressed`.                                                                                                             |
|`after_compression_toast_bytes`|BIGINT| Size the TOAST table after compression. Returns `NULL` if `compression_status` == `Uncompressed`.                                                                                                                |
|`after_compression_total_bytes`|BIGINT| Size of the entire chunk table (`after_compression_table_bytes` + `after_compression_index_bytes `+ `after_compression_toast_bytes`) after compression. Returns `NULL` if `compression_status` == `Uncompressed`. |
|`node_name`|TEXT| **DEPRECATED**: nodes the chunk is located on, applicable only to distributed hypertables.                                                                                                                       |

===== PAGE: https://docs.tigerdata.com/api/hypercore/convert_to_rowstore/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM chunk_columnstore_stats('conditions')
     ORDER BY chunk_name LIMIT 2;
```

Example 2 (sql):
```sql
-[ RECORD 1 ]------------------+----------------------
   chunk_schema                   | _timescaledb_internal
   chunk_name                     | _hyper_1_1_chunk
   compression_status             | Uncompressed
   before_compression_table_bytes |
   before_compression_index_bytes |
   before_compression_toast_bytes |
   before_compression_total_bytes |
   after_compression_table_bytes  |
   after_compression_index_bytes  |
   after_compression_toast_bytes  |
   after_compression_total_bytes  |
   node_name                      |
   -[ RECORD 2 ]------------------+----------------------
   chunk_schema                   | _timescaledb_internal
   chunk_name                     | _hyper_1_2_chunk
   compression_status             | Compressed
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
SELECT pg_size_pretty(after_compression_total_bytes) AS total
     FROM chunk_columnstore_stats('conditions')
     WHERE compression_status = 'Compressed';
```

Example 4 (sql):
```sql
-[ RECORD 1 ]--+------
   total | 48 kB
```

---

## timescaledb_information.dimensions

**URL:** llms-txt#timescaledb_information.dimensions

**Contents:**
- Samples
- Available columns

Returns information about the dimensions of a hypertable. Hypertables can be
partitioned on a range of different dimensions. By default, all hypertables are
partitioned on time, but it is also possible to partition on other dimensions in
addition to time.

For hypertables that are partitioned solely on time,
`timescaledb_information.dimensions` returns a single row of metadata. For
hypertables that are partitioned on more than one dimension, the call returns a
row for each dimension.

For time-based dimensions, the metadata returned indicates the integer datatype,
such as BIGINT, INTEGER, or SMALLINT, and the time-related datatype, such as
TIMESTAMPTZ, TIMESTAMP, or DATE. For space-based dimension, the metadata
returned specifies the number of `num_partitions`.

If the hypertable uses time data types, the `time_interval` column is defined.
Alternatively, if the hypertable uses integer data types, the `integer_interval`
and `integer_now_func` columns are defined.

Get information about the dimensions of hypertables.

The `by_range` and `by_hash` dimension builders are an addition to TimescaleDB 2.13.

Get information about dimensions of a hypertable that has two time-based dimensions.

|Name|Type|Description|
|-|-|-|
|`hypertable_schema`|TEXT|Schema name of the hypertable|
|`hypertable_name`|TEXT|Table name of the hypertable|
|`dimension_number`|BIGINT|Dimension number of the hypertable, starting from 1|
|`column_name`|TEXT|Name of the column used to create this dimension|
|`column_type`|REGTYPE|Type of the column used to create this dimension|
|`dimension_type`|TEXT|Is this a time based or space based dimension|
|`time_interval`|INTERVAL|Time interval for primary dimension if the column type is a time datatype|
|`integer_interval`|BIGINT|Integer interval for primary dimension if the column type is an integer datatype|
|`integer_now_func`|TEXT|`integer_now`` function for primary dimension if the column type is an integer datatype|
|`num_partitions`|SMALLINT|Number of partitions for the dimension|

The `time_interval` and `integer_interval` columns are not applicable for space
based dimensions.

===== PAGE: https://docs.tigerdata.com/api/informational-views/job_errors/ =====

**Examples:**

Example 1 (sql):
```sql
-- Create a range and hash partitioned hypertable
CREATE TABLE dist_table(time timestamptz, device int, temp float);
SELECT create_hypertable('dist_table', by_range('time', INTERVAL '7 days'));
SELECT add_dimension('dist_table', by_hash('device', 3));

SELECT * from timescaledb_information.dimensions
  ORDER BY hypertable_name, dimension_number;

-[ RECORD 1 ]-----+-------------------------
hypertable_schema | public
hypertable_name   | dist_table
dimension_number  | 1
column_name       | time
column_type       | timestamp with time zone
dimension_type    | Time
time_interval     | 7 days
integer_interval  |
integer_now_func  |
num_partitions    |
-[ RECORD 2 ]-----+-------------------------
hypertable_schema | public
hypertable_name   | dist_table
dimension_number  | 2
column_name       | device
column_type       | integer
dimension_type    | Space
time_interval     |
integer_interval  |
integer_now_func  |
num_partitions    | 2
```

---

## About Tiger Cloud storage tiers

**URL:** llms-txt#about-tiger-cloud-storage-tiers

**Contents:**
- High-performance storage
- Low-cost storage

The tiered storage architecture in Tiger Cloud includes a high-performance storage tier and a low-cost object storage tier. You use the high-performance tier for data that requires quick access, and the object tier for rarely used historical data. Tiering policies move older data asynchronously and periodically from high-performance to low-cost storage, sparing you the need to do it manually. Chunks from a single hypertable, including compressed chunks, can stretch across these two storage tiers.

![Tiger Cloud tiered storage](https://assets.timescale.com/docs/images/timescale-tiered-storage-architecture.png)

## High-performance storage

High-performance storage is where your data is stored by default, until you [enable tiered storage][manage-tiering] and [move older data to the low-cost tier][move-data]. In the high-performance storage, your data is stored in the block format and optimized for frequent querying. The [hypercore row-columnar storage engine][hypercore] available in this tier is designed specifically for real-time analytics. It enables you to compress the data in the high-performance storage by up to 90%, while improving performance. Coupled with other optimizations, Tiger Cloud high-performance storage makes sure your data is always accessible and your queries run at lightning speed.

Tiger Cloud high-performance storage comes in the following types:

- **Standard** (default): based on [AWS EBS gp3][aws-gp3] and designed for general workloads. Provides up to 16 TB of storage and 16,000 IOPS.
- **Enhanced**: based on [EBS io2][ebs-io2] and designed for high-scale, high-throughput workloads. Provides up to 64 TB of storage and 32,000 IOPS.

[See the differences][aws-storage-types] in the underlying AWS storage. You [enable enhanced storage][enable-enhanced] as needed in Tiger Cloud Console.

Once you [enable tiered storage][manage-tiering], you can start moving rarely used data to the object tier. The object tier is based on AWS S3 and stores your data in the [Apache Parquet][parquet] format. Within a Parquet file, a set of rows is grouped together to form a row group. Within a row group, values for a single column across multiple rows are stored together. The original size of the data in your service, compressed or uncompressed, does not correspond directly to its size in S3. A compressed hypertable may even take more space in S3 than it does in Tiger Cloud.

Apache Parquet allows for more efficient scans across longer time periods, and Tiger Cloud uses other metadata and query optimizations to reduce the amount of data that needs to be fetched to satisfy a query, such as:

- **Chunk skipping**: exclude the chunks that fall outside the query time window.
- **Row group skipping**: identify the row groups within the Parquet object that satisfy the query.
- **Column skipping**: fetch only columns that are requested by the query.

The following query is against a tiered dataset and illustrates the optimizations:

`EXPLAIN` illustrates which chunks are being pulled in from the object storage tier:

1. Fetch data from chunks 42, 43, and 44 from the object storage tier.
1. Skip row groups and limit the fetch to a subset of the offsets in the
   Parquet object that potentially match the query filter. Only fetch the data
   for `device_uuid`, `sensor_id`, and `observed_at` as the query needs only these 3 columns.

The object storage tier is more than an archiving solution. It is also:

- **Cost-effective:** store high volumes of data at a lower cost. You pay only for what you store, with no extra cost for queries.
- **Scalable:** scale past the restrictions of even the enhanced high-performance storage tier.
- **Online:** your data is always there and can be [queried when needed][querying-tiered-data].

By default, tiered data is not included when you query from a Tiger Cloud service. To access tiered data, you [enable tiered reads][querying-tiered-data] for a query, a session, or even for all sessions. After you enable tiered reads, when you run regular SQL queries, a behind-the-scenes process transparently pulls data from wherever it's located: the standard high-performance storage tier, the object storage tier, or both.  You can `JOIN` against tiered data, build views, and even define continuous aggregates on it. In fact, because the implementation of continuous aggregates also uses hypertables, they can be tiered to low-cost storage as well.

For low-cost storage, Tiger Data charges only for the size of your data in S3 in the Apache Parquet format, regardless of whether it was compressed in Tiger Cloud before tiering. There are no additional expenses, such as data transfer or compute.

The low-cost storage tier comes with the following limitations:

- **Limited schema modifications**: some schema modifications are not allowed
    on hypertables with tiered chunks.

_Allowed_ modifications include: renaming the hypertable, adding columns
    with `NULL` defaults, adding indexes, changing or renaming the hypertable
    schema, and adding `CHECK` constraints. For `CHECK` constraints, only
    untiered data is verified.
    Columns can also be deleted, but you cannot subsequently add a new column
    to a tiered hypertable with the same name as the now-deleted column.

_Disallowed_ modifications include: adding a column with non-`NULL`
    defaults, renaming a column, changing the data type of a
    column, and adding a `NOT NULL` constraint to the column.

-  **Limited data changes**: you cannot insert data into, update, or delete a
    tiered chunk. These limitations take effect as soon as the chunk is
    scheduled for tiering.

-   **Inefficient query planner filtering for non-native data types**: the query
    planner speeds up reads from our object storage tier by using metadata
    to filter out columns and row groups that don't satisfy the query. This works for all
    native data types, but not for non-native types, such as `JSON`, `JSONB`,
    and `GIS`.

*   **Latency**: S3 has higher access latency than local storage. This can affect the
    execution time of queries in latency-sensitive environments, especially
    lighter queries.

*   **Number of dimensions**: you cannot use tiered storage with hypertables
    partitioned on more than one dimension. Make sure your hypertables are
    partitioned on time only, before you enable tiered storage.

===== PAGE: https://docs.tigerdata.com/use-timescale/security/overview/ =====

**Examples:**

Example 1 (sql):
```sql
EXPLAIN ANALYZE
SELECT count(*) FROM
( SELECT device_uuid,  sensor_id FROM public.device_readings
  WHERE observed_at > '2023-08-28 00:00+00' and observed_at < '2023-08-29 00:00+00'
  GROUP BY device_uuid,  sensor_id ) q;
            QUERY PLAN

-------------------------------------------------------------------------------------------------
 Aggregate  (cost=7277226.78..7277226.79 rows=1 width=8) (actual time=234993.749..234993.750 rows=1 loops=1)
   ->  HashAggregate  (cost=4929031.23..7177226.78 rows=8000000 width=68) (actual time=184256.546..234913.067 rows=1651523 loops=1)
         Group Key: osm_chunk_1.device_uuid, osm_chunk_1.sensor_id
         Planned Partitions: 128  Batches: 129  Memory Usage: 20497kB  Disk Usage: 4429832kB
         ->  Foreign Scan on osm_chunk_1  (cost=0.00..0.00 rows=92509677 width=68) (actual time=345.890..128688.459 rows=92505457 loops=1)
               Filter: ((observed_at > '2023-08-28 00:00:00+00'::timestamp with time zone) AND (observed_at < '2023-08-29 00:00:00+00'::timestamp with t
ime zone))
               Rows Removed by Filter: 4220
               Match tiered objects: 3
               Row Groups:
                 _timescaledb_internal._hyper_1_42_chunk: 0-74
                 _timescaledb_internal._hyper_1_43_chunk: 0-29
                 _timescaledb_internal._hyper_1_44_chunk: 0-71
               S3 requests: 177
               S3 data: 224423195 bytes
 Planning Time: 6.216 ms
 Execution Time: 235372.223 ms
(16 rows)
```

---

## Create a continuous aggregate

**URL:** llms-txt#create-a-continuous-aggregate

**Contents:**
- Create a continuous aggregate
  - Creating a continuous aggregate
- Choosing an appropriate bucket interval
- Using the WITH NO DATA option
  - Creating a continuous aggregate with the WITH NO DATA option
- Create a continuous aggregate with a JOIN
- Query continuous aggregates
  - Querying a continuous aggregate
- Use continuous aggregates with mutable functions: experimental
- Use continuous aggregates with window functions: experimental

Creating a continuous aggregate is a two-step process. You need to create the
view first, then enable a policy to keep the view refreshed. You can create the
view on a hypertable, or on top of another continuous aggregate. You can have
more than one continuous aggregate on each source table or view.

Continuous aggregates require a `time_bucket` on the time partitioning column of
the hypertable.

By default, views are automatically refreshed. You can adjust this by setting
the [WITH NO DATA](#using-the-with-no-data-option) option. Additionally, the
view can not be a [security barrier view][postgres-security-barrier].

Continuous aggregates use hypertables in the background, which means that they
also use chunk time intervals. By default, the continuous aggregate's chunk time
interval is 10 times what the original hypertable's chunk time interval is. For
example, if the original hypertable's chunk time interval is 7 days, the
continuous aggregates that are on top of it have a 70 day chunk time
interval.

## Create a continuous aggregate

In this example, we are using a hypertable called `conditions`, and creating a
continuous aggregate view for daily weather data. The `GROUP BY` clause must
include a `time_bucket` expression which uses time dimension column of the
hypertable. Additionally, all functions and their arguments included in
`SELECT`, `GROUP BY`, and `HAVING` clauses must be
[immutable][postgres-immutable].
