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
pageSha256: "1e2ae223b03b507f58b598a6efb7876af1a6eebfca6c45aaedc53f7cbae8d547"
contentMode: "local-full"
zh: ""
---

## About continuous aggregates

**URL:** llms-txt#about-continuous-aggregates

**Contents:**
- Types of aggregation
- Continuous aggregates on continuous aggregates
- Continuous aggregates with a `JOIN` clause
  - JOIN examples
- Function support
- Components of a continuous aggregate
  - Materialization hypertable
  - Materialization engine
  - Invalidation engine

In modern applications, data usually grows very quickly. This means that aggregating
it into useful summaries can become very slow. If you are collecting data very frequently, you might want to aggregate your
data into minutes or hours instead. For example, if an IoT device takes
temperature readings every second, you might want to find the average temperature
for each hour. Every time you run this query, the database needs to scan the
entire table and recalculate the average. TimescaleDB makes aggregating data lightning fast, accurate, and easy with continuous aggregates.

![Reduced data calls with continuous aggregates](https://assets.timescale.com/docs/images/continuous-aggregate.png)

Continuous aggregates in TimescaleDB are a kind of hypertable that is refreshed automatically
in the background as new data is added, or old data is modified. Changes to your
dataset are tracked, and the hypertable behind the continuous aggregate is
automatically updated in the background.

Continuous aggregates have a much lower maintenance burden than regular Postgres materialized
views, because the whole view is not created from scratch on each refresh. This
means that you can get on with working your data instead of maintaining your
database.

Because continuous aggregates are based on hypertables, you can query them in exactly the same way as your other tables. This includes continuous aggregates in the rowstore, compressed into the [columnstore][hypercore],
or [tiered to object storage][data-tiering]. You can even create [continuous aggregates on top of your continuous aggregates][hierarchical-caggs], for an even more fine-tuned aggregation.

[Real-time aggregation][real-time-aggregation] enables you to combine pre-aggregated data from the materialized view with the most recent raw data. This gives you up-to-date results on every query. In TimescaleDB v2.13 and later, real-time aggregates are **DISABLED** by default. In earlier versions, real-time aggregates are **ENABLED** by default; when you create a continuous aggregate, queries to that view include the results from the most recent raw data.
