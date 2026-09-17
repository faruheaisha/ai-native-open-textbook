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
pageSha256: "fe2bd22d4f8a35aa1b2bd629e1c4a074e8a93cad7fd313dc24b5b25500b7b8fc"
contentMode: "local-full"
zh: ""
---

### Compressing chunks manually

1.  At the psql prompt, compress the chunk:

1.  Check the results of the compression with this command:

The results show the chunks for the given hypertable, their compression
    status, and some other statistics:

|chunk_schema|chunk_name|compression_status|before_compression_table_bytes|before_compression_index_bytes|before_compression_toast_bytes|before_compression_total_bytes|after_compression_table_bytes|after_compression_index_bytes|after_compression_toast_bytes|after_compression_total_bytes|node_name|
    |---|---|---|---|---|---|---|---|---|---|---|---|
    |_timescaledb_internal|_hyper_1_1_chunk|Compressed|8192 bytes|16 kB|8192 bytes|32 kB|8192 bytes|16 kB|8192 bytes|32 kB||
    |_timescaledb_internal|_hyper_1_20_chunk|Uncompressed||||||||||

1.  Repeat for all chunks you want to compress.

## Manually compress chunks in a single command

Alternatively, you can select the chunks and compress them in a single command
by using the output of the `show_chunks` command to compress each one. For
example, use this command to compress chunks between one and three weeks old
if they are not already compressed:

## Roll up uncompressed chunks when compressing

In TimescaleDB v2.9 and later, you can roll up multiple uncompressed chunks into
a previously compressed chunk as part of your compression procedure. This allows
you to have much smaller uncompressed chunk intervals, which reduces the disk
space used for uncompressed data. For example, if you have multiple smaller
uncompressed chunks in your data, you can roll them up into a single compressed
chunk.

To roll up your uncompressed chunks into a compressed chunk, alter the compression
settings to set the compress chunk time interval and run compression operations
to roll up the chunks while compressing.

The default setting of `compress_orderby` is `'time DESC'` (the descending or DESC command is used to sort the data returned in ascending order), which causes chunks to be re-compressed
many times during the rollup, possibly leading to a steep performance penalty.
Set `timescaledb.compress_orderby = 'time ASC'` to avoid this penalty.

The time interval you choose must be a multiple of the uncompressed chunk
interval. For example, if your uncompressed chunk interval is one week, your
`<time_interval>` of the compressed chunk could be two weeks or six weeks, but
not one month.

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/about-compression/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT show_chunks('example', older_than => INTERVAL '3 days');
```

Example 2 (sql):
```sql
SELECT compress_chunk( '<chunk_name>');
```

Example 3 (sql):
```sql
SELECT *
    FROM chunk_compression_stats('example');
```

Example 4 (sql):
```sql
SELECT compress_chunk(i, if_not_compressed => true)
    FROM show_chunks(
        'example',
        now()::timestamp - INTERVAL '1 week',
        now()::timestamp - INTERVAL '3 weeks'
    ) i;
```

---

## Materialized hypertables

**URL:** llms-txt#materialized-hypertables

**Contents:**
- Discover the name of a materialized hypertable
  - Discovering the name of a materialized hypertable

Continuous aggregates take raw data from the original hypertable, aggregate it,
and store the aggregated data in a materialization hypertable. You can modify
this materialized hypertable in the same way as any other hypertable.

## Discover the name of a materialized hypertable

To change a materialized hypertable, you need to use its fully qualified
name. To find the correct name, use the
[timescaledb_information.continuous_aggregates view][api-continuous-aggregates-info]).
You can then use the name to modify it in the same way as any other hypertable.
