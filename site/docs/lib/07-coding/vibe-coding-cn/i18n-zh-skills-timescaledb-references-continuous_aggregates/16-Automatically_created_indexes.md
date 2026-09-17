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
pageSha256: "5a4762fe64fa5f456b6d067df953f084812942eaa79e883c4d58e58839b27fef"
contentMode: "local-full"
zh: ""
---

## Automatically created indexes

When you create a continuous aggregate, an index is automatically created for
each `GROUP BY` column. The index is a composite index, combining the `GROUP BY`
column with the `time_bucket` column.

For example, if you define a continuous aggregate view with `GROUP BY device,
location, bucket`, two composite indexes are created: one on `\{device, bucket\}`
and one on `\{location, bucket\}`.

### Turn off automatic index creation

To turn off automatic index creation, set `timescaledb.create_group_indexes` to
`false` when you create the continuous aggregate.
