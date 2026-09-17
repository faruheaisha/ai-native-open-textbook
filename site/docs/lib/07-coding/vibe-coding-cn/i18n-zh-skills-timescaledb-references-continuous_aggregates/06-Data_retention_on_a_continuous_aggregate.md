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
pageSha256: "cab72704516b37bf65c4894454f91b891dc96249734c0a7a8e991574f791f0fb"
contentMode: "local-full"
zh: ""
---

## Data retention on a continuous aggregate itself

You can also apply data retention on a continuous aggregate itself. For example,
you can keep raw data for 30 days, as mentioned earlier. Meanwhile, you can keep
daily data for 600 days, and no data beyond that.

===== PAGE: https://docs.tigerdata.com/use-timescale/data-retention/about-data-retention/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE MATERIALIZED VIEW conditions_summary_daily (day, device, temp)
WITH (timescaledb.continuous) AS
  SELECT time_bucket('1 day', time), device, avg(temperature)
  FROM conditions
  GROUP BY (1, 2);

SELECT add_continuous_aggregate_policy('conditions_summary_daily', '7 days', '1 day', '1 day');
```

Example 2 (sql):
```sql
SELECT add_retention_policy('conditions', INTERVAL '30 days');
```
