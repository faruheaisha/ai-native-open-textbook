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
pageSha256: "a1715f7ff9a239888a3b1949b4f326dc97499554d014ac6a29ae6c0177fbf5ce"
contentMode: "local-full"
zh: ""
---

## refresh_continuous_aggregate()

**URL:** llms-txt#refresh_continuous_aggregate()

**Contents:**
- Samples
- Required arguments
- Optional arguments

Refresh all buckets of a continuous aggregate in the refresh window given by
`window_start` and `window_end`.

A continuous aggregate materializes aggregates in time buckets. For example,
min, max, average over 1 day worth of data, and is determined by the `time_bucket`
interval. Therefore, when
refreshing the continuous aggregate, only buckets that completely fit within the
refresh window are refreshed. In other words, it is not possible to compute the
aggregate over, for an incomplete bucket. Therefore, any buckets that do not
fit within the given refresh window are excluded.

The function expects the window parameter values to have a time type that is
compatible with the continuous aggregate's time bucket expression&mdash;for
example, if the time bucket is specified in `TIMESTAMP WITH TIME ZONE`, then the
start and end time should be a date or timestamp type. Note that a continuous
aggregate using the `TIMESTAMP WITH TIME ZONE` type aligns with the UTC time
zone, so, if `window_start` and `window_end` is specified in the local time
zone, any time zone shift relative UTC needs to be accounted for when refreshing
to align with bucket boundaries.

To improve performance for continuous aggregate refresh, see
[CREATE MATERIALIZED VIEW ][create_materialized_view].

Refresh the continuous aggregate `conditions` between `2020-01-01` and
`2020-02-01` exclusive.

Alternatively, incrementally refresh the continuous aggregate `conditions`
between `2020-01-01` and `2020-02-01` exclusive, working in `12h` intervals:

Force the  `conditions` continuous aggregate to refresh between `2020-01-01` and
`2020-02-01` exclusive, even if the data has already been refreshed.
