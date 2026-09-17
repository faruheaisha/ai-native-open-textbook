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
pageSha256: "0f5fb879bab092bb958f8c76610cceb162eed8d9d28acb667e7fe31ce9672e4d"
contentMode: "local-full"
zh: ""
---

## Use real-time aggregation with hierarchical continuous aggregates

In TimescaleDB v2.13 and later, real-time aggregates are **DISABLED** by default. In earlier versions, real-time aggregates are **ENABLED** by default; when you create a continuous aggregate, queries to that view include the results from the most recent raw data.

Real-time aggregates always return up-to-date data in response to queries. They accomplish this by
joining the materialized data in the continuous aggregate with unmaterialized
raw data from the source table or view.

When continuous aggregates are stacked, each continuous aggregate is only aware
of the layer immediately below. The joining of unmaterialized data happens
recursively until it reaches the bottom layer, giving you access to recent data
down to that layer.

If you keep all continuous aggregates in the stack as real-time aggregates, the
bottom layer is the source hypertable. That means every continuous aggregate in
the stack has access to all recent data.

If there is a non-real-time continuous aggregate somewhere in the stack, the
recursive joining stops at that non-real-time continuous aggregate. Higher-level
continuous aggregates don't receive any unmaterialized data from lower levels.

For example, say you have the following continuous aggregates:

*   A real-time hourly continuous aggregate on the source hypertable
*   A real-time daily continuous aggregate on the hourly continuous aggregate
*   A non-real-time, or materialized-only, monthly continuous aggregate on the
    daily continuous aggregate
*   A real-time yearly continuous aggregate on the monthly continuous aggregate

Queries on the hourly and daily continuous aggregates include real-time,
non-materialized data from the source hypertable. Queries on the monthly
continuous aggregate only return already-materialized data. Queries on the
yearly continuous aggregate return materialized data from the yearly continuous
aggregate itself, plus more recent data from the monthly continuous aggregate.
However, the data is limited to what is already materialized in the monthly
continuous aggregate, and doesn't get even more recent data from the source
hypertable. This happens because the materialized-only continuous aggregate
provides a stopping point, and the yearly continuous aggregate is unaware of any
layers beyond that stopping point. This is similar to
[how stacked views work in Postgres][postgresql-views].

To make queries on the yearly continuous aggregate access all recent data, you
can either:

*   Make the monthly continuous aggregate real-time, or
*   Redefine the yearly continuous aggregate on top of the daily continuous
    aggregate.

&lt;img class="main-content__illustration"
 width=\{1375\} height=\{944\}
 src="https://assets.timescale.com/docs/images/cagg_hierarchy.webp"
 alt="Example of hierarchical continuous aggregates in a finance application"/>
