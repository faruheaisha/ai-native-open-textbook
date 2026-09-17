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
pageSha256: "38be72041b7f5d5449becab636f4930256c0d85a91859c197671429f54564ba8"
contentMode: "local-full"
zh: ""
---

## Approximate percentiles

**URL:** llms-txt#approximate-percentiles

**Contents:**
- Run an approximate percentage query
  - Running an approximate percentage query

TimescaleDB uses approximation algorithms to calculate a percentile without
requiring all of the data. This also makes them more compatible with continuous
aggregates.

By default, TimescaleDB Toolkit uses `uddsketch`, but you can also choose to use
`tdigest`. For more information about these algorithms, see the
[advanced aggregation methods][advanced-agg] documentation.
