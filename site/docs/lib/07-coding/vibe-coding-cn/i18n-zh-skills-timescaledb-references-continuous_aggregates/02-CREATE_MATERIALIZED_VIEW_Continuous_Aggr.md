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
pageSha256: "32a6ca9aba6d254eb0e3cd4e7120e70484ed8e6645006b67bca2b324a516cda1"
contentMode: "local-full"
zh: ""
---

## CREATE MATERIALIZED VIEW (Continuous Aggregate)

**URL:** llms-txt#create-materialized-view-(continuous-aggregate)

**Contents:**
- Samples
- Parameters

The `CREATE MATERIALIZED VIEW` statement is used to create continuous
aggregates. To learn more, see the
[continuous aggregate how-to guides][cagg-how-tos].

`<select_query>` is of the form:

The continuous aggregate view defaults to `WITH DATA`. This means that when the
view is created, it refreshes using all the current data in the underlying
hypertable or continuous aggregate. This occurs once when the view is created.
If you want the view to be refreshed regularly, you can use a refresh policy. If
you do not want the view to update when it is first created, use the
`WITH NO DATA` parameter. For more information, see
[`refresh_continuous_aggregate`][refresh-cagg].

Continuous aggregates have some limitations of what types of queries they can
support. For more information, see the
[continuous aggregates section][cagg-how-tos].

TimescaleDB v2.17.1 and greater dramatically decrease the amount
of data written on a continuous aggregate in the presence of a small number of changes,
reduce the i/o cost of refreshing a continuous aggregate, and generate fewer Write-Ahead
Logs (WAL), set the`timescaledb.enable_merge_on_cagg_refresh`
configuration parameter to `TRUE`. This enables continuous aggregate
refresh to use merge instead of deleting old materialized data and re-inserting.

For more settings for continuous aggregates, see [timescaledb_information.continuous_aggregates][info-views].

Create a daily continuous aggregate view:

Add a thirty day continuous aggregate on top of the same raw hypertable:

Add an hourly continuous aggregate on top of the same raw hypertable:

|Name|Type|Description|
|-|-|-|
|`<view_name>`|TEXT|Name (optionally schema-qualified) of continuous aggregate view to create|
|`<column_name>`|TEXT|Optional list of names to be used for columns of the view. If not given, the column names are calculated from the query|
|`WITH` clause|TEXT|Specifies options for the continuous aggregate view|
|`<select_query>`|TEXT|A `SELECT` query that uses the specified syntax|

Required `WITH` clause options:

|Name|Type|Description|
|-|-|-|
|`timescaledb.continuous`|BOOLEAN|If `timescaledb.continuous` is not specified, this is a regular PostgresSQL materialized view|

Optional `WITH` clause options:

|Name|Type| Description                                                                                                                                                                                                                                                                                                                                                                                                                      |Default value|
|-|-|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-|
|`timescaledb.chunk_interval`|INTERVAL| Set the chunk interval. The default value is 10x the original hypertable.                                                                                                                                                                                                                                                                                                                                                        |
|`timescaledb.create_group_indexes`|BOOLEAN| Create indexes on the continuous aggregate for columns in its `GROUP BY` clause. Indexes are in the form `(<GROUP_BY_COLUMN>, time_bucket)`                                                                                                                                                                                                                                                                                      |`TRUE`|
|`timescaledb.finalized`|BOOLEAN| In TimescaleDB 2.7 and above, use the new version of continuous aggregates, which stores finalized results for aggregate functions. Supports all aggregate functions, including ones that use `FILTER`, `ORDER BY`, and `DISTINCT` clauses.                                                                                                                                                                                      |`TRUE`|
|`timescaledb.materialized_only`|BOOLEAN| Return only materialized data when querying the continuous aggregate view                                                                                                                                                                                                                                                                                                                                                        |`TRUE`|
| `timescaledb.invalidate_using`   | TEXT      | Since [TimescaleDB v2.22.0](https://github.com/timescale/timescaledb/releases/tag/2.22.0)Set to `wal` to read changes from the WAL using logical decoding, then update the materialization invalidations for continuous aggregates using this information.  This reduces the I/O and CPU needed to manage the hypertable invalidation log. Set to `trigger` to collect invalidations whenever there are inserts, updates, or deletes to a hypertable. This default behaviour uses more resources than `wal`. | `trigger`  |

For more information, see the [real-time aggregates][real-time-aggregates] section.

===== PAGE: https://docs.tigerdata.com/api/continuous-aggregates/alter_materialized_view/ =====

**Examples:**

Example 1 (unknown):
```unknown
`<select_query>` is of the form:
```

Example 2 (unknown):
```unknown
The continuous aggregate view defaults to `WITH DATA`. This means that when the
view is created, it refreshes using all the current data in the underlying
hypertable or continuous aggregate. This occurs once when the view is created.
If you want the view to be refreshed regularly, you can use a refresh policy. If
you do not want the view to update when it is first created, use the
`WITH NO DATA` parameter. For more information, see
[`refresh_continuous_aggregate`][refresh-cagg].

Continuous aggregates have some limitations of what types of queries they can
support. For more information, see the
[continuous aggregates section][cagg-how-tos].

TimescaleDB v2.17.1 and greater dramatically decrease the amount
of data written on a continuous aggregate in the presence of a small number of changes,
reduce the i/o cost of refreshing a continuous aggregate, and generate fewer Write-Ahead
Logs (WAL), set the`timescaledb.enable_merge_on_cagg_refresh`
configuration parameter to `TRUE`. This enables continuous aggregate
refresh to use merge instead of deleting old materialized data and re-inserting.

For more settings for continuous aggregates, see [timescaledb_information.continuous_aggregates][info-views].

## Samples

Create a daily continuous aggregate view:
```

Example 3 (unknown):
```unknown
Add a thirty day continuous aggregate on top of the same raw hypertable:
```

Example 4 (unknown):
```unknown
Add an hourly continuous aggregate on top of the same raw hypertable:
```
