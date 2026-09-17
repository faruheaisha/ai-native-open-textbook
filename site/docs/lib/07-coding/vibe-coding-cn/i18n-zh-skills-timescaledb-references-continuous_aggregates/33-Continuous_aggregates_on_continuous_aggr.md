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
pageSha256: "38059850094f4825de2726e4ecc0604539a8cf01dd1380b8763fc967251865a2"
contentMode: "local-full"
zh: ""
---

## Continuous aggregates on continuous aggregates

You can create a continuous aggregate on top of another continuous aggregate.
This allows you to summarize data at different granularity. For example, you
might have a raw hypertable that contains second-by-second data. Create a
continuous aggregate on the hypertable to calculate hourly data. To calculate
daily data, create a continuous aggregate on top of your hourly continuous
aggregate.

For more information, see the documentation about
[continuous aggregates on continuous aggregates][caggs-on-caggs].
