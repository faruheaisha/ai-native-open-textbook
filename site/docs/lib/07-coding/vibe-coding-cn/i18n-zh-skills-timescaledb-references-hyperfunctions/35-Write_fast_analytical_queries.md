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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "e5993d43820dfb1d59ecb49561c81cf8cafd058f3f6b35728130933d7599e08a"
contentMode: "local-full"
zh: ""
---

## Write fast analytical queries

Aggregation is a way of combining data to get insights from it. Average, sum, and count are all examples of simple
aggregates. However, with large amounts of data aggregation slows things down, quickly. Continuous aggregates
are a kind of hypertable that is refreshed automatically in the background as new data is added, or old data is
modified. Changes to your dataset are tracked, and the hypertable behind the continuous aggregate is automatically
updated in the background.

By default, querying continuous aggregates provides you with real-time data. Pre-aggregated data from the materialized
view is combined with recent data that hasn't been aggregated yet. This gives you up-to-date results on every query.

You create continuous aggregates on uncompressed data in high-performance storage. They continue to work
on [data in the columnstore][test-drive-enable-compression]
and [rarely accessed data in tiered storage][test-drive-tiered-storage]. You can even
create [continuous aggregates on top of your continuous aggregates][hierarchical-caggs].

1.  **Monitor energy consumption on a day-to-day basis**

1.  Create a continuous aggregate `kwh_day_by_day` for energy consumption:

1.  Add a refresh policy to keep `kwh_day_by_day` up-to-date:

1.  **Monitor energy consumption on an hourly basis**

1. Create a continuous aggregate `kwh_hour_by_hour` for energy consumption:

1.  Add a refresh policy to keep the continuous aggregate up-to-date:

1.  **Analyze your data**

Now you have made continuous aggregates, it could be a good idea to use them to perform analytics on your data.
    For example, to see how average energy consumption changes during weekdays over the last year, run the following query:

You see something like:

| day | ordinal | value |
      | --- | ------- | ----- |
      | Mon | 2 | 23.08078714975423 |
      | Sun | 1 | 19.511430831944395 |
      | Tue | 3 | 25.003118897837307 |
      | Wed | 4 | 8.09300571759772 |
