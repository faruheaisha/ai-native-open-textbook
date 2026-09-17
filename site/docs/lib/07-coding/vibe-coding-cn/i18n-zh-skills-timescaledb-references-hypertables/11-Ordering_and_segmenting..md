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
pageSha256: "da07be216b3dc10b9cbfdeea9cd26e799b0b13bb7bcc3877adbd4091e32cf2a9"
contentMode: "local-full"
zh: ""
---

### Ordering and segmenting.

Ordering the data will have a great impact on the compression ratio and performance of your queries. Rows that change over a dimension should be close to each other. Since we are mostly dealing with time-series data, time dimension is a great candidate. Most of the time data changes in a predictable fashion, following a certain trend. We can exploit this fact to encode the data so it takes less space to store. For example, if you order the records over time, they will get compressed in that order and subsequently also accessed in the same order.

Using the following configuration setup on our example table:
&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
ALTER TABLE metrics
SET (timescaledb.compress, timescaledb.compress_orderby='time');
`\} />

would produce the following data layout.

|Timestamp|Device ID|Device Type|CPU|Disk IO|
|-|-|-|-|
|[12:00:01, 12:00:01, 12:00:02, 12:00:02, 12:00:03, 12:00:03]|[A, B, A, B, A, B]|[SSD, HDD, SSD, HDD, SSD, HDD]|[70.11, 69.70, 70.12, 69.69, 70.14, 69.70]|[13.4, 20.5, 13.2, 23.4, 13.0, 25.2]|

`time` column is used for ordering data, which makes filtering it using `time` column much more efficient.

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
postgres=# select avg(cpu) from metrics where time >= '2024-03-01 00:00:00+01' and time < '2024-03-02 00:00:00+01';
        avg
--------------------
 0.4996848437842719
(1 row)
Time: 87,218 ms
postgres=# ALTER TABLE metrics
SET (
	timescaledb.compress,
	timescaledb.compress_segmentby = 'device_id',
	timescaledb.compress_orderby='time'
);
ALTER TABLE
Time: 6,607 ms
postgres=# SELECT compress_chunk(c) FROM show_chunks('metrics') c;
             compress_chunk
----------------------------------------
 _timescaledb_internal._hyper_2_4_chunk
 _timescaledb_internal._hyper_2_5_chunk
 _timescaledb_internal._hyper_2_6_chunk
(3 rows)
Time: 3070,626 ms (00:03,071)
postgres=# select avg(cpu) from metrics where time >= '2024-03-01 00:00:00+01' and time < '2024-03-02 00:00:00+01';
       avg
------------------
 0.49968484378427
(1 row)
Time: 45,384 ms
`\} />

This makes the time column a perfect candidate for ordering your data since the measurements evolve as time goes on. If you were to use that as your only compression setting, you would most likely get a good enough compression ratio to save a lot of storage. However, accessing the data effectively depends on your use case and your queries. With this setup, you would always have to access the data by using the time dimension and subsequently filter all the rows based on any other criteria.

Segmenting the compressed data should be based on the way you access the data. Basically, you want to segment your data in such a way that you can make it easier for your queries to fetch the right data at the right time. That is to say, your queries should dictate how you segment the data so they can be optimized and yield even better query performance.

For example, If you want to access a single device using a specific `device_id` value (either all records or maybe for a specific time range), you would need to filter all those records one by one during row access time. To get around this, you can use device_id column for segmenting. This would allow you to run analytical queries on compressed data much faster if you are looking for specific device IDs.

Consider the following query:

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
SELECT device_id, AVG(cpu) AS avg_cpu, AVG(disk_io) AS avg_disk_io
FROM metrics
WHERE device_id = 5
GROUP BY device_id;
`\} />

As you can see, the query does a lot of work based on the `device_id` identifier by grouping all its values together. We can use this fact to speed up these types of queries by setting
up compression to segment the data around the values in this column.

Using the following configuration setup on our example table:
&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
ALTER TABLE metrics
SET (
	timescaledb.compress,
	timescaledb.compress_segmentby='device_id',
	timescaledb.compress_orderby='time'
);
`\} />

would produce the following data layout.

|time|device_id|device_type|cpu|disk_io|energy_consumption|
|---|---|---|---|---|---|
|[12:00:02, 12:00:01]|1|[SSD,SSD]|[88.2, 88.6]|[20, 25]|[0.8, 0.85]|
|[12:00:02, 12:00:01]|2|[HDD,HDD]|[300.5, 299.1]|[30, 40]|[0.9, 0.95]|
|...|...|...|...|...|...|

Segmenting column `device_id` is used for grouping data points together based on the value of that column. This makes accessing a specific device much more efficient.

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
postgres=# \\timing
Timing is on.
postgres=# SELECT device_id, AVG(cpu) AS avg_cpu, AVG(disk_io) AS avg_disk_io
FROM metrics
WHERE device_id = 5
GROUP BY device_id;
 device_id |      avg_cpu       |     avg_disk_io
-----------+--------------------+---------------------
         5 | 0.4972598866221261 | 0.49820356730280524
(1 row)
Time: 177,399 ms
postgres=# ALTER TABLE metrics
SET (
	timescaledb.compress,
	timescaledb.compress_segmentby = 'device_id',
	timescaledb.compress_orderby='time'
);
ALTER TABLE
Time: 6,607 ms
postgres=# SELECT compress_chunk(c) FROM show_chunks('metrics') c;
             compress_chunk
----------------------------------------
 _timescaledb_internal._hyper_2_4_chunk
 _timescaledb_internal._hyper_2_5_chunk
 _timescaledb_internal._hyper_2_6_chunk
(3 rows)
Time: 3070,626 ms (00:03,071)
postgres=# SELECT device_id, AVG(cpu) AS avg_cpu, AVG(disk_io) AS avg_disk_io
FROM metrics
WHERE device_id = 5
GROUP BY device_id;
 device_id |      avg_cpu      |     avg_disk_io
-----------+-------------------+---------------------
         5 | 0.497259886622126 | 0.49820356730280535
(1 row)
Time: 42,139 ms
`\} />

Number of rows that are compressed together in a single batch (like the ones we see above) is 1000.
If your chunk does not contain enough data to create big enough batches, your compression ratio will be reduced.
This needs to be taken into account when defining your compression settings.

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/compression-design/ =====

---

## Temporary file size limit exceeded when converting chunks to the columnstore

**URL:** llms-txt#temporary-file-size-limit-exceeded-when-converting-chunks-to-the-columnstore

When you try to convert a chunk to the columnstore, especially if the chunk is very large, you
could get this error. Compression operations write files to a new compressed
chunk table, which is written in temporary memory. The maximum amount of
temporary memory available is determined by the `temp_file_limit` parameter. You
can work around this problem by adjusting the `temp_file_limit` and
`maintenance_work_mem` parameters.

===== PAGE: https://docs.tigerdata.com/_troubleshooting/slow-tiering-chunks/ =====

---

## hypertable_index_size()

**URL:** llms-txt#hypertable_index_size()

**Contents:**
- Samples
- Required arguments
- Returns

Get the disk space used by an index on a hypertable, including the
disk space needed to provide the index on all chunks. The size is
reported in bytes.

For more information about using hypertables, including chunk size partitioning,
see the [hypertable section][hypertable-docs].

Get size of a specific index on a hypertable.

## Required arguments

|Name|Type|Description|
|-|-|-|
|`index_name`|REGCLASS|Name of the index on a hypertable|

|Column|Type|Description|
|-|-|-|
|hypertable_index_size|BIGINT|Returns the disk space used by the index|

NULL is returned if the function is executed on a non-hypertable relation.

===== PAGE: https://docs.tigerdata.com/api/hypertable/enable_chunk_skipping/ =====

**Examples:**

Example 1 (sql):
```sql
\d conditions_table
                     Table "public.conditions_table"
 Column |           Type           | Collation | Nullable | Default
--------+--------------------------+-----------+----------+---------
 time   | timestamp with time zone |           | not null |
 device | integer                  |           |          |
 volume | integer                  |           |          |
Indexes:
    "second_index" btree ("time")
    "test_table_time_idx" btree ("time" DESC)
    "third_index" btree ("time")

SELECT hypertable_index_size('second_index');

 hypertable_index_size
-----------------------
                163840

SELECT pg_size_pretty(hypertable_index_size('second_index'));

 pg_size_pretty
----------------
 160 kB
```

---

## approximate_row_count()

**URL:** llms-txt#approximate_row_count()

**Contents:**
  - Samples
  - Required arguments

Get approximate row count for hypertable, distributed hypertable, or regular Postgres table based on catalog estimates.
This function supports tables with nested inheritance and declarative partitioning.

The accuracy of `approximate_row_count` depends on the database having up-to-date statistics about the table or hypertable, which are updated by `VACUUM`, `ANALYZE`, and a few DDL commands. If you have auto-vacuum configured on your table or hypertable, or changes to the table are relatively infrequent, you might not need to explicitly `ANALYZE` your table as shown below. Otherwise, if your table statistics are too out-of-date, running this command updates your statistics and yields more accurate approximation results.

Get the approximate row count for a single hypertable.
