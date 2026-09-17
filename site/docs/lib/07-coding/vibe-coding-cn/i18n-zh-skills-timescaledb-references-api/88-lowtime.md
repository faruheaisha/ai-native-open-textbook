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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "69172dd02916ce74bd81d6427c716ea55613f2890b94e5370f9e3108982b71c8"
contentMode: "local-full"
zh: ""
---

## low_time()

**URL:** llms-txt#low_time()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/candlestick_agg/intro/ =====

Perform analysis of financial asset data. These specialized hyperfunctions make
it easier to write financial analysis queries that involve candlestick data.

They help you answer questions such as:

*   What are the opening and closing prices of these stocks?
*   When did the highest price occur for this stock?

This function group uses the [two-step aggregation][two-step-aggregation]
pattern. In addition to the usual aggregate function,
[`candlestick_agg`][candlestick_agg], it also includes the pseudo-aggregate
function `candlestick`. `candlestick_agg` produces a candlestick aggregate from
raw tick data, which can then be used with the accessor and rollup functions in
this group. `candlestick` takes pre-aggregated data and transforms it into the
same format that `candlestick_agg` produces. This allows you to use the
accessors and rollups with existing candlestick data.

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/candlestick_agg/close_time/ =====
