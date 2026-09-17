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
pageSha256: "fb78eca896a9eb81c092514c912612df8cdba13d5b19b44b8255af2dfc82cff9"
contentMode: "local-full"
zh: ""
---

## Drop raw data from a hypertable

If you drop data from a hypertable used in a continuous aggregate it can lead to
problems with your continuous aggregate view. In many cases, dropping underlying
data replaces the aggregate with NULL values, which can lead to unexpected
results in your view.

You can drop data from a hypertable using `drop_chunks` in the usual way, but
before you do so, always check that the chunk is not within the refresh window
of a continuous aggregate that still needs the data. This is also important if
you are manually refreshing a continuous aggregate. Calling
`refresh_continuous_aggregate` on a region containing dropped chunks
recalculates the aggregate without the dropped data.

If a continuous aggregate is refreshing when data is dropped because of a
retention policy, the aggregate is updated to reflect the loss of data. If you
need to retain the continuous aggregate after dropping the underlying data, set
the `start_offset` value of the aggregate policy to a smaller interval than the
`drop_after` parameter of the retention policy.

For more information, see the
[data retention documentation][data-retention-with-continuous-aggregates].
