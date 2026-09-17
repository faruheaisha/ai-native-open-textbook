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
pageSha256: "12c56b8aa6a8858d897cf2690b386c9e7665bb6f0ab818c075bf21143eadd358"
contentMode: "local-full"
zh: ""
---

### Querying a continuous aggregate

1.  At the `psql` prompt, query the continuous aggregate view called
    `conditions_summary_hourly` for the average, minimum, and maximum
    temperatures for the first quarter of 2021 recorded by device 5:

1.  Alternatively, query the continuous aggregate view called
    `conditions_summary_hourly` for the top 20 largest metric spreads in that
    quarter:

## Use continuous aggregates with mutable functions: experimental

Mutable functions have experimental supported in the continuous aggregate query definition. Mutable functions are enabled
by default. However, if you use them in a materialized query a warning is returned.

When using non-immutable functions you have to ensure these functions produce consistent results across
continuous aggregate refresh runs. For example, if a function depends on the current time zone you have
to ensure all your continuous aggregate refreshes run with a consistent setting for this.

## Use continuous aggregates with window functions: experimental

Window functions have experimental supported in the continuous aggregate query definition. Window functions are disabled
 by default. To enable them, set `timescaledb.enable_cagg_window_functions` to `true`.

Support is experimental, there is a risk of data inconsistency. For example, in backfill scenarios, buckets could be missed.
