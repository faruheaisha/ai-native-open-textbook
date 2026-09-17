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
pageSha256: "c6fc6bf31a9a47a83a8d0cb11768d99e8dadd95027ab3cb2ed92514d29679bbf"
contentMode: "local-full"
zh: ""
---

## Configure continuous aggregate migration

The migration procedure provides two boolean configuration parameters,
`override` and `drop_old`. By default, the name of your new continuous
aggregate is the name of your old continuous aggregate, with the suffix `_new`.

Set `override` to true to rename your new continuous aggregate with the
original name. The old continuous aggregate is renamed with the suffix `_old`.

To both rename and drop the old continuous aggregate entirely, set both
parameters to true. Note that `drop_old` must be used together with
`override`.
