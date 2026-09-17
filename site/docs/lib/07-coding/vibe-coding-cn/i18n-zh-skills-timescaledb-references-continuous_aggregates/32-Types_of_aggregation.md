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
pageSha256: "cab4eed31a38ccf7e00b34ab29e534d4a383b6c674d2e9a5a65d96a1ca0c68fe"
contentMode: "local-full"
zh: ""
---

## Types of aggregation

There are three main ways to make aggregation easier: materialized views,
continuous aggregates, and real-time aggregates.

[Materialized views][pg-materialized views] are a standard Postgres function.
They are used to cache the result of a complex query so that you can reuse it
later on. Materialized views do not update regularly, although you can manually
refresh them as required.

[Continuous aggregates][about-caggs] are a TimescaleDB-only feature. They work in
a similar way to a materialized view, but they are updated automatically in the
background, as new data is added to your database. Continuous aggregates are
updated continuously and incrementally, which means they are less resource
intensive to maintain than materialized views. Continuous aggregates are based
on hypertables, and you can query them in the same way as you do your other
tables.

[Real-time aggregates][real-time-aggs] are a TimescaleDB-only feature. They are
the same as continuous aggregates, but they add the most recent raw data to the
previously aggregated data to provide accurate and up-to-date results, without
needing to aggregate data as it is being written.
