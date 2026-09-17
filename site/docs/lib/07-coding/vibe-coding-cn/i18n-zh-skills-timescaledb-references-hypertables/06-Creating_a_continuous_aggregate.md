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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hypertables.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceSha256: "2b1f8e46c900f47b6a11c8e246b0d222b1dd95793bf063ebaafd0fb65c96841c"
pageSha256: "3ea50b68efaaba505c2f2f85c681362fe25a6d9933dbeca784f142daa537f41b"
contentMode: "local-full"
zh: ""
---

### Creating a continuous aggregate

1.  At the `psql`prompt, create the materialized view:

To create a continuous aggregate within a transaction block, use the [WITH NO DATA option][with-no-data].

To improve continuous aggregate performance, [set `timescaledb.invalidate_using = 'wal'`][create_materialized_view] Since [TimescaleDB v2.22.0](https://github.com/timescale/timescaledb/releases/tag/2.22.0).

1.  Create a policy to refresh the view every hour:

You can use most Postgres aggregate functions in continuous aggregations. To
see what Postgres features are supported, check the
[function support table][cagg-function-support].

## Choosing an appropriate bucket interval

Continuous aggregates require a `time_bucket` on the time partitioning column of
the hypertable. The time bucket allows you to define a time interval, instead of
having to use specific timestamps. For example, you can define a time bucket as
five minutes, or one day.

You can't use [time_bucket_gapfill][api-time-bucket-gapfill] directly in a
continuous aggregate. This is because you need access to previous data to
determine the gapfill content, which isn't yet available when you create the
continuous aggregate. You can work around this by creating the continuous
aggregate using [`time_bucket`][api-time-bucket], then querying the continuous
aggregate using `time_bucket_gapfill`.

## Using the WITH NO DATA option

By default, when you create a view for the first time, it is populated with
data. This is so that the aggregates can be computed across the entire
hypertable. If you don't want this to happen, for example if the table is very
large, or if new data is being continuously added, you can control the order in
which the data is refreshed. You can do this by adding a manual refresh with
your continuous aggregate policy using the `WITH NO DATA` option.

The `WITH NO DATA` option allows the continuous aggregate to be created
instantly, so you don't have to wait for the data to be aggregated. Data begins
to populate only when the policy begins to run. This means that only data newer
than the `start_offset` time begins to populate the continuous aggregate. If you
have historical data that is older than the `start_offset` interval, you need to
manually refresh the history up to the current `start_offset` to allow real-time
queries to run efficiently.
