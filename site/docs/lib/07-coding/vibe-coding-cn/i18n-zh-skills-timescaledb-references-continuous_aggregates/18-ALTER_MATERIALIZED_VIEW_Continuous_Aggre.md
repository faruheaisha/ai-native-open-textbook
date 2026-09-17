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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceRel: "i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceSha256: "2fc13047cc1286afec41d05f8c09c0c452219a02da65b4ba1b4a06c4663c93ed"
pageSha256: "9e744af350233d51c3295bd1a263eb1555566f289d1b0c8626b751fa364cafd3"
contentMode: "local-full"
zh: ""
---

## ALTER MATERIALIZED VIEW (Continuous Aggregate)

**URL:** llms-txt#alter-materialized-view-(continuous-aggregate)

**Contents:**
- Samples
- Arguments

You use the `ALTER MATERIALIZED VIEW` statement to modify some of the `WITH`
clause [options][create_materialized_view] for a continuous aggregate view. You can only set the `continuous` and `create_group_indexes` options when you [create a continuous aggregate][create_materialized_view]. `ALTER MATERIALIZED VIEW` also supports the following
[Postgres clauses][postgres-alterview] on the continuous aggregate view:

*   `RENAME TO`: rename the continuous aggregate view
*   `RENAME [COLUMN]`: rename the continuous aggregate column
*   `SET SCHEMA`: set the new schema for the continuous aggregate view
*   `SET TABLESPACE`: move the materialization of the continuous aggregate view to the new tablespace
*   `OWNER TO`: set a new owner for the continuous aggregate view

- Enable real-time aggregates for a continuous aggregate:

- Enable hypercore for a continuous aggregate Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0):

- Rename a column for a continuous aggregate:

| Name                                                                      | Type      | Default                                              | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|---------------------------------------------------------------------------|-----------|------------------------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `view_name`                                                               | TEXT      | -                                                    | ✖        | The name  of the continuous aggregate view to be altered.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `timescaledb.materialized_only`                                           | BOOLEAN   | `true`                                               | ✖        | Enable real-time aggregation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `timescaledb.enable_columnstore`                                          | BOOLEAN   | `true`                                               | ✖        | Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Enable columnstore. Effectively the same as `timescaledb.compress`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `timescaledb.compress`                                                    | TEXT      | Disabled.                                            | ✖        | Enable compression.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `timescaledb.orderby`                                                     | TEXT      | Descending order on the time column in `table_name`. | ✖        | Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Set the order in which items are used in the columnstore. Specified in the same way as an `ORDER BY` clause in a `SELECT` query.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `timescaledb.compress_orderby`                                            | TEXT      | Descending order on the time column in `table_name`. | ✖        | Set the order used by compression. Specified in the same way as the `ORDER BY` clause in a `SELECT` query.                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `timescaledb.segmentby`                                                   | TEXT      | No segementation by column.                          | ✖        | Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Set the list of columns used to segment data in the columnstore for `table`. An identifier representing the source of the data such as `device_id` or `tags_id` is usually a good candidate.                                                                                                                                                                                                                                                                                                                                                             |
| `timescaledb.compress_segmentby`                                          | TEXT      | No segementation by column.                          | ✖        | Set the list of columns used to segment the compressed data. An identifier representing the source of the data such as `device_id` or `tags_id` is usually a good candidate.                                                                                                                                                                                                                                                                                                                                                                                           |
| `column_name`                                                             | TEXT      | -                                                    | ✖        | Set the name of the column to order by or segment by.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `timescaledb.compress_chunk_time_interval`                                | TEXT      | -                                                    | ✖        | Reduce the total number of compressed/columnstore chunks for `table`. If you set `compress_chunk_time_interval`, compressed/columnstore chunks are merged with the previous adjacent chunk within `chunk_time_interval` whenever possible. These chunks are irreversibly merged. If you call to [decompress][decompress]/[convert_to_rowstore][convert_to_rowstore], merged chunks are not split up. You can call `compress_chunk_time_interval` independently of other compression settings; `timescaledb.compress`/`timescaledb.enable_columnstore` is not required. |
| `timescaledb.enable_cagg_window_functions`                                | BOOLEAN   | `false`                                              | ✖        | EXPERIMENTAL: enable window functions on continuous aggregates. Support is experimental, as there is a risk of data inconsistency. For example, in backfill scenarios, buckets could be missed.                                                                                                                                                                                                                                                                                                                                                                        |
| `timescaledb.chunk_interval` (formerly `timescaledb.chunk_time_interval`) | INTERVAL  | 10x the original hypertable.                         | ✖        | Set the chunk interval. Renamed in TimescaleDB V2.20.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

===== PAGE: https://docs.tigerdata.com/api/continuous-aggregates/cagg_migrate/ =====

**Examples:**

Example 1 (sql):
```sql
ALTER MATERIALIZED VIEW contagg_view SET (timescaledb.materialized_only = false);
```

Example 2 (sql):
```sql
ALTER MATERIALIZED VIEW contagg_view SET (
     timescaledb.enable_columnstore = true,
     timescaledb.segmentby = 'symbol' );
```

Example 3 (sql):
```sql
ALTER MATERIALIZED VIEW contagg_view RENAME COLUMN old_name TO new_name;
```
