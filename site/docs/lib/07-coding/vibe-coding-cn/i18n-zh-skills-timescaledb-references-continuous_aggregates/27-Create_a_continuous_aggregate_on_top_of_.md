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
pageSha256: "dd1b46fe936199c929a84ca6c3f23f64ea084c1f7f4533dbadced6e6f1f95973"
contentMode: "local-full"
zh: ""
---

## Create a continuous aggregate on top of another continuous aggregate

Creating a continuous aggregate on top of another continuous aggregate works the
same way as creating it on top of a hypertable. In your query, select from a
continuous aggregate rather than from the hypertable, and use the time-bucketed
column from the existing continuous aggregate as your time column.

For more information, see the instructions for
[creating a continuous aggregate][create-cagg].
