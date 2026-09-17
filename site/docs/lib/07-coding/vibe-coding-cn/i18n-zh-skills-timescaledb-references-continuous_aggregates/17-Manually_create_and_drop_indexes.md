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
pageSha256: "fb1d75b6c9223f13fc3cf631ce81d8ef0734965d51131cdcc4aa5c3510fb987c"
contentMode: "local-full"
zh: ""
---

## Manually create and drop indexes

You can use a regular Postgres statement to create or drop an index on a
continuous aggregate.

For example, to create an index on `avg_temp` for a materialized hypertable
named `weather_daily`:

Indexes are created under the `_timescaledb_internal` schema, where the
continuous aggregate data is stored. To drop the index, specify the schema. For
example, to drop the index `avg_temp_idx`, run:

### Limitations on created indexes

In TimescaleDB v2.7 and later, you can create an index on any column in the
materialized view. This includes aggregated columns, such as those storing sums
and averages. In earlier versions of TimescaleDB, you can't create an index on
an aggregated column.

You can't create unique indexes on a continuous aggregate, in any of the
TimescaleDB versions.

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/about-continuous-aggregates/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE MATERIALIZED VIEW conditions_daily
  WITH (timescaledb.continuous, timescaledb.create_group_indexes=false)
  AS
  ...
```

Example 2 (sql):
```sql
CREATE INDEX avg_temp_idx ON weather_daily (avg_temp);
```

Example 3 (sql):
```sql
DROP INDEX _timescaledb_internal.avg_temp_idx
```
