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
pageSha256: "52bcd9f0f3509168dd45f156b03f87ecfe0727649d7875637d55fee046922e3c"
contentMode: "local-full"
zh: ""
---

## Continuous aggregates with a `JOIN` clause

Continuous aggregates support the following JOIN features:

| Feature | TimescaleDB < 2.10.x | TimescaleDB <= 2.15.x | TimescaleDB >= 2.16.x|
|-|-|-|-|
|INNER JOIN|&#10060;|&#9989;|&#9989;|
|LEFT JOIN|&#10060;|&#10060;|&#9989;|
|LATERAL JOIN|&#10060;|&#10060;|&#9989;|
|Joins between **ONE** hypertable and **ONE** standard Postgres table|&#10060;|&#9989;|&#9989;|
|Joins between **ONE** hypertable and **MANY** standard Postgres tables|&#10060;|&#10060;|&#9989;|
|Join conditions must be equality conditions, and there can only be **ONE** `JOIN` condition|&#10060;|&#9989;|&#9989;|
|Any join conditions|&#10060;|&#10060;|&#9989;|

JOINS in TimescaleDB must meet the following conditions:

*   Only the changes to the hypertable are tracked, and they are updated in the
    continuous aggregate when it is refreshed. Changes to standard
    Postgres table are not tracked.
*   You can use an `INNER`, `LEFT`, and `LATERAL` joins; no other join type is supported.
*   Joins on the materialized hypertable of a continuous aggregate are not supported.
*   Hierarchical continuous aggregates can be created on top of a continuous
    aggregate with a `JOIN` clause, but cannot themselves have a `JOIN` clause.

Given the following schema:

See the following `JOIN` examples on continuous aggregates:

- `INNER JOIN` on a single equality condition, using the `ON` clause:

- `INNER JOIN` on a single equality condition, using the `ON` clause, with a further condition added in the `WHERE` clause:

- `INNER JOIN` on a single equality condition specified in `WHERE` clause:

- `INNER JOIN` on multiple equality conditions:

TimescaleDB v2.16.x and higher.

- `INNER JOIN` with a single equality condition specified in `WHERE` clause can be combined with further conditions in the `WHERE` clause:

TimescaleDB v2.16.x and higher.

- `INNER JOIN` between a hypertable and multiple Postgres tables:

TimescaleDB v2.16.x and higher.

- `LEFT JOIN` between a hypertable and a Postgres table:

TimescaleDB v2.16.x and higher.

- `LATERAL JOIN` between a hypertable and a subquery:

TimescaleDB v2.16.x and higher.

In TimescaleDB v2.7 and later, continuous aggregates support all Postgres
aggregate functions. This includes both parallelizable aggregates, such as `SUM`
and `AVG`, and non-parallelizable aggregates, such as `RANK`.

In TimescaleDB v2.10.0 and later, the `FROM` clause supports `JOINS`, with
some restrictions. For more information, see the [`JOIN` support section][caggs-joins].

In older versions of TimescaleDB, continuous aggregates only support
[aggregate functions that can be parallelized by Postgres][postgres-parallel-agg].
You can work around this by aggregating the other parts of your query in the
continuous aggregate, then
[using the window function to query the aggregate][cagg-window-functions].

The following table summarizes the aggregate functions supported in continuous aggregates:

| Function, clause, or feature                               |TimescaleDB 2.6 and earlier|TimescaleDB 2.7, 2.8, and 2.9|TimescaleDB 2.10 and later|
|------------------------------------------------------------|-|-|-|
| Parallelizable aggregate functions                         |✅|✅|✅|
| [Non-parallelizable SQL aggregates][postgres-parallel-agg] |❌|✅|✅|
| `ORDER BY`                                                 |❌|✅|✅|
| Ordered-set aggregates                                     |❌|✅|✅|
| Hypothetical-set aggregates                                |❌|✅|✅|
| `DISTINCT` in aggregate functions                          |❌|✅|✅|
| `FILTER` in aggregate functions                            |❌|✅|✅|
| `FROM` clause supports `JOINS`                             |❌|❌|✅|

DISTINCT works in aggregate functions, not in the query definition. For example, for the table:

- The following works:
  
- This does not:

If you want the old behavior in later versions of TimescaleDB, set the
`timescaledb.finalized` parameter to `false` when you create your continuous
aggregate.
