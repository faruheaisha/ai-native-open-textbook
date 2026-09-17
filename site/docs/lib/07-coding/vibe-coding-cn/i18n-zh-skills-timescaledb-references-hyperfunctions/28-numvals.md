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
pageSha256: "2fdc5b49d0c1b3fb7c8db232340fc469167b069f8c6644e7b7066c7c6656e127"
contentMode: "local-full"
zh: ""
---

## num_vals()

**URL:** llms-txt#num_vals()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/uddsketch/intro/ =====

Estimate the value at a given percentile, or the percentile rank of a given
value, using the UddSketch algorithm. This estimation is more memory- and
CPU-efficient than an exact calculation using Postgres's `percentile_cont` and
`percentile_disc` functions.

`uddsketch` is one of two advanced percentile approximation aggregates provided
in TimescaleDB Toolkit. It produces stable estimates within a guaranteed
relative error.

The other advanced percentile approximation aggregate is [`tdigest`][tdigest],
which is more accurate at extreme quantiles, but is somewhat dependent on input
order.

If you aren't sure which aggregate to use, try the default percentile estimation
method, [`percentile_agg`][percentile_agg]. It uses the `uddsketch` algorithm
with some sensible defaults.

For more information about percentile approximation algorithms, see the
[algorithms overview][algorithms].

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/uddsketch/approx_percentile_rank/ =====
