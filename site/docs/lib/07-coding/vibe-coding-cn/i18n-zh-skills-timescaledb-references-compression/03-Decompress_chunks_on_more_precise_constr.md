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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "e80e49c2c0007097424002186c0dc871c7a23811b2fc8c853bc2886f8c1f5f0a"
contentMode: "local-full"
zh: ""
---

### Decompress chunks on more precise constraints

If you want to use more precise matching constraints, for example space
partitioning, you can construct a command like this:

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/compression-on-continuous-aggregates/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT decompress_chunk('_timescaledb_internal.<chunk_name>');
```

Example 2 (sql):
```sql
SELECT decompress_chunk(c, true)
    FROM show_chunks('table_name', older_than, newer_than) c;
```

Example 3 (sql):
```sql
SELECT tableoid::regclass FROM metrics
  WHERE time = '2000-01-01' AND device_id = 1
  GROUP BY tableoid;

                 tableoid
------------------------------------------
 _timescaledb_internal._hyper_72_37_chunk
```

---

## Designing your database for compression

**URL:** llms-txt#designing-your-database-for-compression

**Contents:**
- Compressing data
- Querying compressed data

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/use-timescale/latest/hypercore/">hypercore</a>.

Time-series data can be unique, in that it needs to handle both shallow and wide
queries, such as "What's happened across the deployment in the last 10 minutes,"
and deep and narrow, such as "What is the average CPU usage for this server
over the last 24 hours." Time-series data usually has a very high rate of
inserts as well; hundreds of thousands of writes per second can be very normal
for a time-series dataset. Additionally, time-series data is often very
granular, and data is collected at a higher resolution than many other
datasets. This can result in terabytes of data being collected over time.

All this means that if you need great compression rates, you probably need to
consider the design of your database, before you start ingesting data. This
section covers some of the things you need to take into consideration when
designing your database for maximum compression effectiveness.

TimescaleDB is built on Postgres which is, by nature, a row-based database.
Because time-series data is accessed in order of time, when you enable
compression, TimescaleDB converts many wide rows of data into a single row of
data, called an array form. This means that each field of that new, wide row
stores an ordered set of data comprising the entire column.

For example, if you had a table with data that looked a bit like this:

|Timestamp|Device ID|Status Code|Temperature|
|-|-|-|-|
|12:00:01|A|0|70.11|
|12:00:01|B|0|69.70|
|12:00:02|A|0|70.12|
|12:00:02|B|0|69.69|
|12:00:03|A|0|70.14|
|12:00:03|B|4|69.70|

You can convert this to a single row in array form, like this:

|Timestamp|Device ID|Status Code|Temperature|
|-|-|-|-|
|[12:00:01, 12:00:01, 12:00:02, 12:00:02, 12:00:03, 12:00:03]|[A, B, A, B, A, B]|[0, 0, 0, 0, 0, 4]|[70.11, 69.70, 70.12, 69.69, 70.14, 69.70]|

Even before you compress any data, this format immediately saves storage by
reducing the per-row overhead. Postgres typically adds a small number of bytes
of overhead per row. So even without any compression, the schema in this example
is now smaller on disk than the previous format.

This format arranges the data so that similar data, such as timestamps, device
IDs, or temperature readings, is stored contiguously. This means that you can
then use type-specific compression algorithms to compress the data further, and
each array is separately compressed. For more information about the compression
methods used, see the [compression methods section][compression-methods].

When the data is in array format, you can perform queries that require a subset
of the columns very quickly. For example, if you have a query like this one, that
asks for the average temperature over the past day:

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
SELECT time_bucket(‘1 minute’, timestamp) as minute
 AVG(temperature)
FROM table
WHERE timestamp > now() - interval ‘1 day’
ORDER BY minute DESC
GROUP BY minute;
`\} />

The query engine can fetch and decompress only the timestamp and temperature
columns to efficiently compute and return these results.

Finally, TimescaleDB uses non-inline disk pages to store the compressed arrays.
This means that the in-row data points to a secondary disk page that stores the
compressed array, and the actual row in the main table becomes very small,
because it is now just pointers to the data. When data stored like this is
queried, only the compressed arrays for the required columns are read from disk,
further improving performance by reducing disk reads and writes.

## Querying compressed data

In the previous example, the database has no way of knowing which rows need to
be fetched and decompressed to resolve a query. For example, the database can't
easily determine which rows contain data from the past day, as the timestamp
itself is in a compressed column. You don't want to have to decompress all the
data in a chunk, or even an entire hypertable, to determine which rows are
required.

TimescaleDB automatically includes more information in the row and includes
additional groupings to improve query performance. When you compress a
hypertable, either manually or through a compression policy, it can help to specify
an `ORDER BY` column.

`ORDER BY` columns specify how the rows that are part of a compressed batch are
ordered. For most time-series workloads, this is by timestamp, so if you don't
specify an `ORDER BY` column, TimescaleDB defaults to using the time column. You
can also specify additional dimensions, such as location.

For each `ORDER BY` column, TimescaleDB automatically creates additional columns
that store the minimum and maximum value of that column. This way, the query
planner can look at the range of timestamps in the compressed column, without
having to do any decompression, and determine whether the row could possibly
match the query.

When you compress your hypertable, you can also choose to specify a `SEGMENT BY`
column. This allows you to segment compressed rows by a specific column, so that
each compressed row corresponds to a data about a single item such as, for
example, a specific device ID. This further allows the query planner to
determine if the row could possibly match the query without having to decompress
the column first. For example:

|Device ID|Timestamp|Status Code|Temperature|Min Timestamp|Max Timestamp|
|-|-|-|-|-|-|
|A|[12:00:01, 12:00:02, 12:00:03]|[0, 0, 0]|[70.11, 70.12, 70.14]|12:00:01|12:00:03|
|B|[12:00:01, 12:00:02, 12:00:03]|[0, 0, 4]|[69.70, 69.69, 69.70]|12:00:01|12:00:03|

With the data segmented in this way, a query for device A between a time
interval becomes quite fast. The query planner can use an index to find those
rows for device A that contain at least some timestamps corresponding to the
specified interval, and even a sequential scan is quite fast since evaluating
device IDs or timestamps does not require decompression. This means the
query executor only decompresses the timestamp and temperature columns
corresponding to those selected rows.

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/compression-policy/ =====

---

## remove_compression_policy()

**URL:** llms-txt#remove_compression_policy()

**Contents:**
- Samples
- Required arguments
- Optional arguments

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/api/latest/hypercore/remove_columnstore_policy/">remove_columnstore_policy()</a>.

If you need to remove the compression policy. To restart policy-based
compression you need to add the policy again. To view the policies that
already exist, see [informational views][informational-views].

Remove the compression policy from the 'cpu' table:

Remove the compression policy from the 'cpu_weekly' continuous aggregate:

## Required arguments

|Name|Type|Description|
|-|-|-|
|`hypertable`|REGCLASS|Name of the hypertable or continuous aggregate the policy should be removed from|

## Optional arguments

|Name|Type|Description|
|---|---|---|
| `if_exists` | BOOLEAN | Setting to true causes the command to fail with a notice instead of an error if a compression policy does not exist on the hypertable. Defaults to false.|

===== PAGE: https://docs.tigerdata.com/api/compression/alter_table_compression/ =====

**Examples:**

Example 1 (unknown):
```unknown
Remove the compression policy from the 'cpu_weekly' continuous aggregate:
```

---

## About compression methods

**URL:** llms-txt#about-compression-methods

**Contents:**
- Integer compression
  - Delta encoding
  - Delta-of-delta encoding
  - Simple-8b
  - Run-length encoding
- Floating point compression
  - XOR-based compression
- Data-agnostic compression
  - Dictionary compression

Depending on the data type that is compressed when your data is converted from the rowstore to the
columnstore, TimescaleDB uses the following compression algorithms:

- **Integers, timestamps, boolean and other integer-like types**: a combination of the following compression
  methods is used: [delta encoding][delta], [delta-of-delta][delta-delta], [simple-8b][simple-8b], and
  [run-length encoding][run-length].
- **Columns that do not have a high amount of repeated values**: [XOR-based][xor] compression with
  some [dictionary compression][dictionary].
- **All other types**: [dictionary compression][dictionary].

This page gives an in-depth explanation of the compression methods used in hypercore.

## Integer compression

For integers, timestamps, and other integer-like types TimescaleDB uses a
combination of delta encoding, delta-of-delta, simple 8-b, and run-length
encoding.

The simple-8b compression method has been extended so that data can be
decompressed in reverse order. Backward scanning queries are common in
time-series workloads. This means that these types of queries run much faster.

Delta encoding reduces the amount of information required to represent a data
object by only storing the difference, sometimes referred to as the delta,
between that object and one or more reference objects. These algorithms work
best where there is a lot of redundant information, and it is often used in
workloads like versioned file systems. For example, this is how Dropbox keeps
your files synchronized. Applying delta-encoding to time-series data means that
you can use fewer bytes to represent a data point, because you only need to
store the delta from the previous data point.

For example, imagine you had a dataset that collected CPU, free memory,
temperature, and humidity over time. If you time column was stored as an integer
value, like seconds since UNIX epoch, your raw data would look a little like
this:

|time|cpu|mem_free_bytes|temperature|humidity|
|-|-|-|-|-|
|2023-04-01 10:00:00|82|1,073,741,824|80|25|
|2023-04-01 10:00:05|98|858,993,459|81|25|
|2023-04-01 10:00:10|98|858,904,583|81|25|

With delta encoding, you only need to store how much each value changed from the
previous data point, resulting in smaller values to store. So after the first
row, you can represent subsequent rows with less information, like this:

|time|cpu|mem_free_bytes|temperature|humidity|
|-|-|-|-|-|
|2023-04-01 10:00:00|82|1,073,741,824|80|25|
|5 seconds|16|-214,748,365|1|0|
|5 seconds|0|-88,876|0|0|

Applying delta encoding to time-series data takes advantage of the fact that
most time-series datasets are not random, but instead represent something that
is slowly changing over time. The storage savings over millions of rows can be
substantial, especially if the value changes very little, or doesn't change at
all.
