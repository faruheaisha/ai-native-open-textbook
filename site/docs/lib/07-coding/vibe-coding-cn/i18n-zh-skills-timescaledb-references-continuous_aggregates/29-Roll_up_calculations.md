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
pageSha256: "353eec363dfdbe7cbfbb8334c235129b473427982fb89b128c43120f7eceffa6"
contentMode: "local-full"
zh: ""
---

## Roll up calculations

When summarizing already-summarized data, be aware of how stacked calculations
work. Not all calculations return the correct result if you stack them.

For example, if you take the maximum of several subsets, then take the maximum
of the maximums, you get the maximum of the entire set. But if you take the
average of several subsets, then take the average of the averages, that can
result in a different figure than the average of all the data.

To simplify such calculations when using continuous aggregates on top of
continuous aggregates, you can use the [hyperfunctions][hyperfunctions] from
TimescaleDB Toolkit, such as the [statistical aggregates][stats-aggs]. These
hyperfunctions are designed with a two-step aggregation pattern that allows you
to roll them up into larger buckets. The first step creates a summary aggregate
that can be rolled up, just as a maximum can be rolled up. You can store this
aggregate in your continuous aggregate. Then, you can call an accessor function
as a second step when you query from your continuous aggregate. This accessor
takes the stored data from the summary aggregate and returns the final result.

For example, you can create an hourly continuous aggregate using `percentile_agg`
over a hypertable, like this:

To then stack another daily continuous aggregate over it, you can use a `rollup`
function, like this:

The `mean` function of the TimescaleDB Toolkit is used to calculate the concrete
mean value of the rolled up values. The additional `percentile_daily` attribute
contains the raw rolled up values, which can be used in an additional continuous
aggregate on top of this continuous aggregate (for example a continuous
aggregate for the daily values).

For more information and examples about using `rollup` functions to stack
calculations, see the [percentile approximation API documentation][percentile_agg_api].

There are some restrictions when creating a continuous aggregate on top of
another continuous aggregate. In most cases, these restrictions are in place to
ensure valid time-bucketing:

*   You can only create a continuous aggregate on top of a finalized continuous
    aggregate. This new finalized format is the default for all continuous
    aggregates created since TimescaleDB 2.7. If you need to create a continuous
    aggregate on top of a continuous aggregate in the old format, you need to
    [migrate your continuous aggregate][migrate-cagg] to the new format first.

*   The time bucket of a continuous aggregate should be greater than or equal to
    the time bucket of the underlying continuous aggregate. It also needs to be
    a multiple of the underlying time bucket. For example, you can rebucket an
    hourly continuous aggregate into a new continuous aggregate with time
    buckets of 6 hours. You can't rebucket the hourly continuous aggregate into
    a new continuous aggregate with time buckets of 90 minutes, because 90
    minutes is not a multiple of 1 hour.

*   A continuous aggregate with a fixed-width time bucket can't be created on
    top of a continuous aggregate with a variable-width time bucket. Fixed-width
    time buckets are time buckets defined in seconds, minutes, hours, and days,
    because those time intervals are always the same length. Variable-width time
    buckets are time buckets defined in months or years, because those time
    intervals vary by the month or on leap years. This limitation prevents a
    case such as trying to rebucket monthly buckets into `61 day` buckets, where
    there is no good mapping between time buckets for month combinations such as
    July/August (62 days).

Note that even though weeks are fixed-width intervals, you can't use monthly
    or yearly time buckets on top of weekly time buckets for the same reason.
    The number of weeks in a month or year is usually not an integer.

However, you can stack a variable-width time bucket on top of a fixed-width
    time bucket. For example, creating a monthly continuous aggregate on top of
    a daily continuous aggregate works, and is the one of the main use cases for
    this feature.

===== PAGE: https://docs.tigerdata.com/use-timescale/hypercore/secondary-indexes/ =====

**Examples:**

Example 1 (sql):
```sql
CREATE MATERIALIZED VIEW response_times_hourly
WITH (timescaledb.continuous)
AS SELECT
    time_bucket('1 h'::interval, ts) as bucket,
    api_id,
    avg(response_time_ms),
    percentile_agg(response_time_ms) as percentile_hourly
FROM response_times
GROUP BY 1, 2;
```

Example 2 (sql):
```sql
CREATE MATERIALIZED VIEW response_times_daily
WITH (timescaledb.continuous)
AS SELECT
    time_bucket('1 d'::interval, bucket) as bucket_daily,
    api_id,
    mean(rollup(percentile_hourly)) as mean,
    rollup(percentile_hourly) as percentile_daily
FROM response_times_hourly
GROUP BY 1, 2;
```
