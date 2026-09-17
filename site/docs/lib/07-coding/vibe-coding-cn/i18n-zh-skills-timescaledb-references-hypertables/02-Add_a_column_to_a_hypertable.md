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
pageSha256: "2537e82a567b2eaa2daff5776236017c70491f7f6830a5ffef822777ea304d5e"
contentMode: "local-full"
zh: ""
---

### Add a column to a hypertable

You add a column to a hypertable using the `ALTER TABLE` command. In this
example, the hypertable is named `conditions` and the new column is named
`humidity`:

If the column you are adding has the default value set to `NULL`, or has no
default value, then adding a column is relatively fast. If you set the default
to a non-null value, it takes longer, because it needs to fill in this value for
all existing rows of all existing chunks.
