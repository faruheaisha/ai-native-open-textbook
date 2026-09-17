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
pageSha256: "f98959acc3ba51b4861c9cbd1c905ec32e4d872675c80b5003fcee147f045fde"
contentMode: "local-full"
zh: ""
---

### How chunk skipping works

You enable chunk skipping on a column in a hypertable. TimescaleDB tracks the minimum and maximum values for that
column in each chunk. These ranges are stored in the start (inclusive) and end (exclusive) format in the `chunk_column_stats`
catalog table. TimescaleDB uses these ranges for dynamic chunk exclusion when the `WHERE` clause of an SQL query
specifies ranges on the column.

![Chunk skipping](https://assets.timescale.com/docs/images/hypertable-with-chunk-skipping.png)

You can enable chunk skipping on hypertables compressed into the columnstore for `smallint`, `int`, `bigint`, `serial`,
`bigserial`, `date`, `timestamp`, or `timestamptz` type columns.
