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
pageSha256: "3036a5a388ab007cffbbdc6d1c7d41bd2eece49eee72085e209aec6ad9c2097e"
contentMode: "local-full"
zh: ""
---

### Window function workaround for older versions of TimescaleDB

For TimescaleDB v2.19.3 and below, continuous aggregates do not support window functions. To work around this:

1. Create a simple table with to store a value at a specific time:

1. Create a continuous aggregate that does not use a window function:

1.  Use the `lag`  window function on your continuous aggregate at query time:

This speeds up your query by calculating the aggregation ahead of time. The
    delta is calculated at query time.

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/hierarchical-continuous-aggregates/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE MATERIALIZED VIEW conditions_summary_daily
    WITH (timescaledb.continuous) AS
    SELECT device,
       time_bucket(INTERVAL '1 day', time) AS bucket,
       AVG(temperature),
       MAX(temperature),
       MIN(temperature)
    FROM conditions
    GROUP BY device, bucket;
```

Example 2 (sql):
```sql
SELECT add_continuous_aggregate_policy('conditions_summary_daily',
      start_offset => INTERVAL '1 month',
      end_offset => INTERVAL '1 day',
      schedule_interval => INTERVAL '1 hour');
```

Example 3 (sql):
```sql
CREATE MATERIALIZED VIEW cagg_rides_view
    WITH (timescaledb.continuous) AS
    SELECT vendor_id,
    time_bucket('1h', pickup_datetime) AS hour,
      count(*) total_rides,
      avg(fare_amount) avg_fare,
      max(trip_distance) as max_trip_distance,
      min(trip_distance) as min_trip_distance
    FROM rides
    GROUP BY vendor_id, time_bucket('1h', pickup_datetime)
    WITH NO DATA;
```

Example 4 (sql):
```sql
CALL refresh_continuous_aggregate('cagg_rides_view', NULL, localtimestamp - INTERVAL '1 week');
```

---

## ALTER TABLE (hypercore)

**URL:** llms-txt#alter-table-(hypercore)

**Contents:**
- Samples
- Arguments

Enable the columnstore or change the columnstore settings for a hypertable. The settings are applied on a per-chunk basis. You do not need to convert the entire hypertable back to the rowstore before changing the settings. The new settings apply only to the chunks that have not yet been converted to columnstore, the existing chunks in the columnstore do not change. This means that chunks with different columnstore settings can co-exist in the same hypertable.

TimescaleDB calculates default columnstore settings for each chunk when it is created. These settings apply to each chunk, and not the entire hypertable. To explicitly disable the defaults, set a setting to an empty string. To remove the current configuration and re-enable the defaults, call `ALTER TABLE <your_table_name> RESET (<columnstore_setting>);`.

After you have enabled the columnstore, either:
- [add_columnstore_policy][add_columnstore_policy]: create a [job][job] that automatically moves chunks in a hypertable to the columnstore at a
  specific time interval.
- [convert_to_columnstore][convert_to_columnstore]: manually add a specific chunk in a hypertable to the columnstore.

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

To enable the columnstore:

- **Configure a hypertable that ingests device data to use the columnstore**:

In this example, the `metrics` hypertable is often queried about a specific device or set of devices.
   Segment the hypertable by `device_id` to improve query performance.

- **Specify the chunk interval without changing other columnstore settings**:

- Set the time interval when chunks are added to the columnstore:

- To disable the option you set previously, set the interval to 0:

| Name  | Type    | Default                                                                                                                                                                                                                           | Required | Description  |
|-------|---------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------------|
| `table_name`                               | TEXT    | -                                                                                                                                                                                                                                 | ✖        | The hypertable to enable columstore for.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `timescaledb.enable_columnstore`           | BOOLEAN | `true`                                                                                                                                                                                                                            | ✖        | Set to `false` to disable columnstore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `timescaledb.compress_orderby`                      | TEXT    | Descending order on the time column in `table_name`.                                                                                                                                                                              | ✖        | The order in which items are used in the columnstore. Specified in the same way as an `ORDER BY` clause in a `SELECT` query. Setting `timescaledb.compress_orderby` automatically creates an implicit min/max sparse index on the `orderby` column.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `timescaledb.compress_segmentby`                    | TEXT    | TimescaleDB looks at [`pg_stats`](https://www.postgresql.org/docs/current/view-pg-stats.html) and determines an appropriate column based on the data cardinality and distribution. If `pg_stats` is not available, TimescaleDB looks for an appropriate column from the existing indexes. | ✖        | Set the list of columns used to segment data in the columnstore for `table`. An identifier representing the source of the data such as `device_id` or `tags_id` is usually a good candidate.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `column_name`                              | TEXT    | -                                                                                                                                                                                                                                 | ✖        | The name of the column to `orderby` or `segmentby`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
|`timescaledb.sparse_index`| TEXT    | TimescaleDB evaluates the columns you already have indexed, checks which data types are a good fit for sparse indexing, then creates a sparse index as an optimization.                                                         | ✖        | Configure the sparse indexes for compressed chunks. Requires setting `timescaledb.compress_orderby`. Supported index types include: <li> `bloom(<column_name>)`: a probabilistic index, effective for `=` filters. Cannot be applied to `timescaledb.compress_orderby` columns.</li> <li> `minmax(<column_name>)`: stores min/max values for each compressed chunk. Setting `timescaledb.compress_orderby` automatically creates an implicit min/max sparse index on the `orderby` column. </li> Define multiple indexes using a comma-separated list. You can set only one index per column. Set to an empty string to avoid using sparse indexes and explicitly disable the default behavior. To remove the current sparse index configuration and re-enable default sparse index selection, call `ALTER TABLE your_table_name RESET (timescaledb.sparse_index);`. |
| `timescaledb.compress_chunk_time_interval` | TEXT    | -                                                                                                                                                                                                                                 | ✖        | EXPERIMENTAL: reduce the total number of chunks in the columnstore for `table`. If you set `compress_chunk_time_interval`, chunks added to the columnstore are merged with the previous adjacent chunk within `chunk_time_interval` whenever possible. These chunks are irreversibly merged. If you call [convert_to_rowstore][convert_to_rowstore], merged chunks are not split up. You can call `compress_chunk_time_interval` independently of other compression settings; `timescaledb.enable_columnstore` is not required.                                                                                                                                                                                                                                                                                                                             |
| `interval`                                 | TEXT    | -                                                                                                                                                                                                                                 | ✖        | Set to a multiple of the [chunk_time_interval][chunk_time_interval] for `table`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `ALTER`                                    | TEXT    |                                                                                                                                                                                                                                   | ✖        | Set a specific column in the columnstore to be `NOT NULL`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `ADD CONSTRAINT`                           | TEXT    |                                                                                                                                                                                                                                   | ✖        | Add `UNIQUE` constraints to data in the columnstore.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

===== PAGE: https://docs.tigerdata.com/api/hypercore/chunk_columnstore_stats/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER TABLE metrics SET(
      timescaledb.enable_columnstore,
      timescaledb.orderby = 'time DESC',
      timescaledb.segmentby = 'device_id');
```

Example 2 (sql):
```sql
ALTER TABLE metrics SET (timescaledb.compress_chunk_time_interval = '24 hours');
```

Example 3 (sql):
```sql
ALTER TABLE metrics SET (timescaledb.compress_chunk_time_interval = '0');
```

---

## chunk_compression_stats()

**URL:** llms-txt#chunk_compression_stats()

**Contents:**
- Samples
- Required arguments
- Returns

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/api/latest/hypercore/chunk_columnstore_stats/">chunk_columnstore_stats()</a>.

Get chunk-specific statistics related to hypertable compression.
All sizes are in bytes.

This function shows the compressed size of chunks, computed when the
`compress_chunk` is manually executed, or when a compression policy processes
the chunk. An insert into a compressed chunk does not update the compressed
sizes. For more information about how to compute chunk sizes, see the
`chunks_detailed_size` section.

Use `pg_size_pretty` get the output in a more human friendly format.

## Required arguments

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Name of the hypertable|

|Column|Type|Description|
|-|-|-|
|`chunk_schema`|TEXT|Schema name of the chunk|
|`chunk_name`|TEXT|Name of the chunk|
|`compression_status`|TEXT|the current compression status of the chunk|
|`before_compression_table_bytes`|BIGINT|Size of the heap before compression (NULL if currently uncompressed)|
|`before_compression_index_bytes`|BIGINT|Size of all the indexes before compression (NULL if currently uncompressed)|
|`before_compression_toast_bytes`|BIGINT|Size the TOAST table before compression (NULL if currently uncompressed)|
|`before_compression_total_bytes`|BIGINT|Size of the entire chunk table (table+indexes+toast) before compression (NULL if currently uncompressed)|
|`after_compression_table_bytes`|BIGINT|Size of the heap after compression (NULL if currently uncompressed)|
|`after_compression_index_bytes`|BIGINT|Size of all the indexes after compression (NULL if currently uncompressed)|
|`after_compression_toast_bytes`|BIGINT|Size the TOAST table after compression (NULL if currently uncompressed)|
|`after_compression_total_bytes`|BIGINT|Size of the entire chunk table (table+indexes+toast) after compression (NULL if currently uncompressed)|
|`node_name`|TEXT|nodes on which the chunk is located, applicable only to distributed hypertables|

===== PAGE: https://docs.tigerdata.com/api/compression/add_compression_policy/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT * FROM chunk_compression_stats('conditions')
  ORDER BY chunk_name LIMIT 2;

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

Example 2 (sql):
```sql
SELECT pg_size_pretty(after_compression_total_bytes) AS total
  FROM chunk_compression_stats('conditions')
  WHERE compression_status = 'Compressed';

-[ RECORD 1 ]--+------
total | 48 kB
```

---

## Inefficient `compress_chunk_time_interval` configuration

**URL:** llms-txt#inefficient-`compress_chunk_time_interval`-configuration

When you configure `compress_chunk_time_interval` but do not set the primary dimension as the first column in `compress_orderby`, TimescaleDB decompresses chunks before merging. This makes merging less efficient. Set the primary dimension of the chunk as the first column in `compress_orderby` to improve efficiency.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/cloud-jdbc-authentication-support/ =====

---

## convert_to_rowstore()

**URL:** llms-txt#convert_to_rowstore()

**Contents:**
- Samples
- Arguments

Manually convert a specific chunk in the hypertable columnstore to the rowstore.

If you need to modify or add a lot of data to a chunk in the columnstore, best practice is to stop
any [jobs][job] moving chunks to the columnstore, convert the chunk back to the rowstore, then modify the
data. After the update, [convert the chunk to the columnstore][convert_to_columnstore] and restart the jobs.
This workflow is especially useful if you need to backfill old data.

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

To modify or add a lot of data to a chunk:

1. **Stop the jobs that are automatically adding chunks to the columnstore**

Retrieve the list of jobs from the [timescaledb_information.jobs][informational-views] view
   to find the job you need to [alter_job][alter_job].

1. **Convert a chunk to update back to the rowstore**

1. **Update the data in the chunk you added to the rowstore**

Best practice is to structure your [INSERT][insert] statement to include appropriate
   partition key values, such as the timestamp. TimescaleDB adds the data to the correct chunk:

1. **Convert the updated chunks back to the columnstore**

1. **Restart the jobs that are automatically converting chunks to the columnstore**

| Name | Type     | Default | Required | Description|
|--|----------|---------|----------|-|
|`chunk`| REGCLASS | -       | ✖        | Name of the chunk to be moved to the rowstore. |
|`if_compressed`| BOOLEAN  | `true`  | ✔        | Set to `false` so this job fails with an error rather than an warning if `chunk` is not in the columnstore |

===== PAGE: https://docs.tigerdata.com/api/hypercore/hypertable_columnstore_stats/ =====

**Examples:**

Example 1 (unknown):
```unknown
1. **Convert a chunk to update back to the rowstore**
```

Example 2 (unknown):
```unknown
1. **Update the data in the chunk you added to the rowstore**

   Best practice is to structure your [INSERT][insert] statement to include appropriate
   partition key values, such as the timestamp. TimescaleDB adds the data to the correct chunk:
```

Example 3 (unknown):
```unknown
1. **Convert the updated chunks back to the columnstore**
```

Example 4 (unknown):
```unknown
1. **Restart the jobs that are automatically converting chunks to the columnstore**
```

---

## About compression

**URL:** llms-txt#about-compression

**Contents:**
- Key aspects of compression
  - Ordering and segmenting.

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/use-timescale/latest/hypercore/">hypercore</a>.

Compressing your time-series data allows you to reduce your chunk size by more
than 90%. This saves on storage costs, and keeps your queries operating at
lightning speed.

When you enable compression, the data in your hypertable is compressed chunk by
chunk. When the chunk is compressed, multiple records are grouped into a single
row. The columns of this row hold an array-like structure that stores all the
data. This means that instead of using lots of rows to store the data, it stores
the same data in a single row. Because a single row takes up less disk space
than many rows, it decreases the amount of disk space required, and can also
speed up your queries.

For example, if you had a table with data that looked a bit like this:

|Timestamp|Device ID|Device Type|CPU|Disk IO|
|-|-|-|-|-|
|12:00:01|A|SSD|70.11|13.4|
|12:00:01|B|HDD|69.70|20.5|
|12:00:02|A|SSD|70.12|13.2|
|12:00:02|B|HDD|69.69|23.4|
|12:00:03|A|SSD|70.14|13.0|
|12:00:03|B|HDD|69.70|25.2|

You can convert this to a single row in array form, like this:

|Timestamp|Device ID|Device Type|CPU|Disk IO|
|-|-|-|-|-|
|[12:00:01, 12:00:01, 12:00:02, 12:00:02, 12:00:03, 12:00:03]|[A, B, A, B, A, B]|[SSD, HDD, SSD, HDD, SSD, HDD]|[70.11, 69.70, 70.12, 69.69, 70.14, 69.70]|[13.4, 20.5, 13.2, 23.4, 13.0, 25.2]|

This section explains how to enable native compression, and then goes into
detail on the most important settings for compression, to help you get the
best possible compression ratio.

## Key aspects of compression

Every table has a different schema but they do share some commonalities that you need to think about.

Consider the table `metrics` with the following attributes:

|Column|Type|Collation|Nullable|Default|
|-|-|-|-|-|
 time|timestamp with time zone|| not null|
 device_id| integer|| not null|
 device_type| integer|| not null|
 cpu| double precision|||
 disk_io| double precision|||

All hypertables have a primary dimension which is used to partition the table into chunks. The primary dimension is given when [the hypertable is created][hypertable-create-table]. In the example below, you can see a classic time-series use case with a `time` column as the primary dimension. In addition, there are two columns `cpu` and `disk_io` containing the values  that are captured over time, and a column `device_id` for the device that captured the values.
Columns can be used in a few different ways:
- You can use values in a column as a lookup key, in the example above `device_id` is a typical example of such a column.
- You can use a column for partitioning a table. This is typically a time column like `time` in the example above, but it is possible to partition the table using other types as well.
- You can use a column as a filter to narrow down on what data you select. The column `device_type` is an example of where you can decide to look at, for example, only solid state drives (SSDs).
The remaining columns are typically the values or metrics you are collecting. These are typically aggregated or presented in other ways. The columns `cpu` and `disk_io` are typical examples of such columns.

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
SELECT avg(cpu), sum(disk_io)
FROM metrics
WHERE device_type = ‘SSD’
AND time >= now() - ‘1 day’::interval;
`\} />

When chunks are compressed in a hypertable, data stored in them is reorganized and stored in column-order rather than row-order. As a result, it is not possible to use the same uncompressed schema version of the chunk and a different schema must be created. This is automatically handled by TimescaleDB, but it has a few implications:
The compression ratio and query performance is very dependent on the order and structure of the compressed data, so some considerations are needed when setting up compression.
Indexes on the hypertable cannot always be used in the same manner for the compressed data.

Indexes set on the hypertable are used only on chunks containing uncompressed
data. TimescaleDB creates and uses custom indexes to incorporate the `segmentby`
and `orderby` parameters during compression which are used when reading compressed data.
More on this in the next section.

Based on the previous schema, filtering of data should happen over a certain time period and analytics are done on device granularity. This pattern of data access lends itself to organizing the data layout suitable for compression.
