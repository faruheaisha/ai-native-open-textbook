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
pageSha256: "b55aaa276fe32bf514dcbe4421c24d4a12223aade3b56428d766f74787191a61"
contentMode: "local-full"
zh: ""
---

## Queries fail when defining continuous aggregates but work on regular tables

**URL:** llms-txt#queries-fail-when-defining-continuous-aggregates-but-work-on-regular-tables

Continuous aggregates do not work on all queries. For example, TimescaleDB does not support window functions on
continuous aggregates. If you use an unsupported function, you see the following error:

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

===== PAGE: https://docs.tigerdata.com/_troubleshooting/caggs-real-time-previously-materialized-not-shown/ =====

**Examples:**

Example 1 (sql):
```sql
ERROR:  invalid continuous aggregate view
      SQL state: 0A000
```

Example 2 (sql):
```sql
CREATE TABLE public.candle(
symbol_id uuid                     NOT NULL,
symbol    text                     NOT NULL,
"time"    timestamp with time zone NOT NULL,
open      double precision         NOT NULL,
high      double precision         NOT NULL,
low       double precision         NOT NULL,
close     double precision         NOT NULL,
volume    double precision         NOT NULL
);
```

Example 3 (sql):
```sql
CREATE MATERIALIZED VIEW candles_start_end
  WITH (timescaledb.continuous) AS
  SELECT time_bucket('1 hour', "time"), COUNT(DISTINCT symbol), first(time, time) as first_candle, last(time, time) as last_candle
  FROM candle
  GROUP BY 1;
```

Example 4 (sql):
```sql
CREATE MATERIALIZED VIEW candles_start_end
  WITH (timescaledb.continuous) AS
  SELECT DISTINCT ON (symbol)
  symbol,symbol_id, first(time, time) as first_candle, last(time, time) as last_candle
  FROM candle
  GROUP BY symbol_id;
```
