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
pageSha256: "b34ae45798b4c507374c2090238d83aa827e839eb0ae917e9395110568960289"
contentMode: "local-full"
zh: ""
---

## Manually refresh a continuous aggregate

If you need to manually refresh a continuous aggregate, you can use the
`refresh` command. This recomputes the data within the window that has changed
in the underlying hypertable since the last refresh. Therefore, if only a few
buckets need updating, the refresh runs quickly.

If you have recently dropped data from a hypertable with a continuous aggregate,
calling `refresh_continuous_aggregate` on a region containing dropped chunks
recalculates the aggregate without the dropped data. See
[drop data][cagg-drop-data] for more information.

The `refresh` command takes three arguments:

*   The name of the continuous aggregate view to refresh
*   The timestamp of the beginning of the refresh window
*   The timestamp of the end of the refresh window

Only buckets that are wholly within the specified range are refreshed. For
example, if you specify `2021-05-01', '2021-06-01` the only buckets that are
refreshed are those up to but not including 2021-06-01. It is possible to
specify `NULL` in a manual refresh to get an open-ended range, but we do not
recommend using it, because you could inadvertently materialize a large amount
of data, slow down your performance, and have unintended consequences on other
policies like data retention.

To manually refresh a continuous aggregate, use the `refresh` command:

Follow the logic used by automated refresh policies and avoid refreshing time buckets that are likely to have a lot of writes. This means that you should generally not refresh the latest incomplete time bucket. To include the latest raw data in your queries, use [real-time aggregation][real-time-aggregates] instead.

===== PAGE: https://docs.tigerdata.com/use-timescale/continuous-aggregates/drop-data/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT add_continuous_aggregate_policy('conditions_summary_hourly',
      start_offset => NULL,
      end_offset => INTERVAL '1 h',
      schedule_interval => INTERVAL '1 h');
```

Example 2 (sql):
```sql
SELECT add_continuous_aggregate_policy('conditions_summary_hourly',
      start_offset => INTERVAL '1 month',
      end_offset => INTERVAL '1 h',
      schedule_interval => INTERVAL '1 h');
```

Example 3 (sql):
```sql
SELECT add_continuous_aggregate_policy('conditions_summary_daily',
      start_offset => INTERVAL '1 day',
      end_offset => INTERVAL '1 h',
      schedule_interval => INTERVAL '1 h');
```

Example 4 (sql):
```sql
SELECT add_continuous_aggregate_policy('conditions_summary_daily',
      start_offset => NULL
      end_offset => INTERVAL '1 day',
      schedule_interval => INTERVAL '1 hour');
```
