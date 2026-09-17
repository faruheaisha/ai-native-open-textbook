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
pageSha256: "70c7451bf7fa51214d394d264da020a0abd9547965f04a6a1b67eb3de2cc68de"
contentMode: "local-full"
zh: ""
---

### Required arguments

|Name|Type|Description|
|---|---|---|
| `relation` | REGCLASS | Hypertable or regular Postgres table to get row count for. |

===== PAGE: https://docs.tigerdata.com/api/first/ =====

**Examples:**

Example 1 (sql):
```sql
ANALYZE conditions;

SELECT * FROM approximate_row_count('conditions');
```

Example 2 (unknown):
```unknown
approximate_row_count
----------------------
               240000
```

---

## Improve hypertable and query performance

**URL:** llms-txt#improve-hypertable-and-query-performance

**Contents:**
- Optimize hypertable chunk intervals
- Enable chunk skipping
  - How chunk skipping works
  - When to enable chunk skipping
  - Enable chunk skipping
- Analyze your hypertables

Hypertables are Postgres tables that help you improve insert and query performance by automatically partitioning
your data by time. Each hypertable is made up of child tables called chunks. Each chunk is assigned a range of time,
and only contains data from that range. When you run a query, TimescaleDB identifies the correct chunk and runs
the query on it, instead of going through the entire table. This page shows you how to tune hypertables to increase
performance even more.

* [Optimize hypertable chunk intervals][chunk-intervals]: choose the optimum chunk size for your data
* [Enable chunk skipping][chunk-skipping]: skip chunks on non-partitioning columns in hypertables when you query your data
* [Analyze your hypertables][analyze-hypertables]: use Postgres `ANALYZE` to create the best query plan

## Optimize hypertable chunk intervals

Adjusting your hypertable chunk interval can improve performance in your database.

1. **Choose an optimum chunk interval**

Postgres builds the index on the fly during ingestion. That means that to build a new entry on the index,
a significant portion of the index needs to be traversed during every row insertion. When the index does not fit
into memory, it is constantly flushed to disk and read back. This wastes IO resources which would otherwise
be used for writing the heap/WAL data to disk.

The default chunk interval is 7 days. However, best practice is to set `chunk_interval` so that prior to processing,
the indexes for chunks currently being ingested into fit within 25% of main memory. For example, on a system with 64
GB of memory, if index growth is approximately 2 GB per day, a 1-week chunk interval is appropriate. If index growth is
around 10 GB per day, use a 1-day interval.

You set `chunk_interval` when you [create a hypertable][hypertable-create-table], or by calling
[`set_chunk_time_interval`][chunk_interval] on an  existing hypertable.

In the following example you create a table called `conditions` that stores time values in the
   `time` column and has chunks that store data for a `chunk_interval` of one day:

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

1. **Check current setting for chunk intervals**

Query the TimescaleDB catalog for a hypertable. For example:

The result looks like:

Time-based interval lengths are reported in microseconds.

1. **Change the chunk interval length on an existing hypertable**

To change the chunk interval on an already existing hypertable, call `set_chunk_time_interval`.

The updated chunk interval only applies to new chunks. This means setting an overly long
   interval might take a long time to correct. For example, if you set
   `chunk_interval` to 1 year and start inserting data, you can no longer
   shorten the chunk for that year. If you need to correct this situation, create a
   new hypertable and migrate your data.

While chunk turnover does not degrade performance, chunk creation
   does take longer lock time than a normal `INSERT` operation into a chunk that has
   already been created. This means that if multiple chunks are being created at
   the same time, the transactions block each other until the first transaction is
   completed.

If you use expensive index types, such as some PostGIS geospatial indexes, take
care to check the total size of the chunk and its index using
[`chunks_detailed_size`][chunks_detailed_size].

## Enable chunk skipping

Early access: TimescaleDB v2.17.1

One of the key purposes of hypertables is to make your analytical queries run with the lowest latency possible.
When you execute a query on a hypertable, you do not parse the whole table; you only access the chunks necessary
to satisfy the query. This works well when the `WHERE` clause of a query uses the column by which a hypertable is
partitioned. For example, in a hypertable where every day of the year is a separate chunk, a query for September 1
accesses only the chunk for that day.

However, many queries use columns other than the partitioning one. For example, a satellite company might have a
table with two columns: one for when data was gathered by a satellite and one for when it was added to the database.
If you partition by the date of gathering, a query by the date of adding accesses all chunks in the hypertable and
slows the performance.

To improve query performance, TimescaleDB enables you to skip chunks on non-partitioning columns in hypertables.

Chunk skipping only works on chunks converted to the columnstore **after** you `enable_chunk_skipping`.
