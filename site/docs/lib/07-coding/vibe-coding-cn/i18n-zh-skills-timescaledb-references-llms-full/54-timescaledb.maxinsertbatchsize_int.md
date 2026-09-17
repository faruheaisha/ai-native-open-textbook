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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "71132b95599cd0b9ae6826e9432fe027cc29e5a4835c1f6c048ac62267cec21d"
contentMode: "local-full"
zh: ""
---

#### `timescaledb.max_insert_batch_size (int)`

When acting as a access node, TimescaleDB splits batches of inserted
tuples across multiple data nodes. It batches up to
`max_insert_batch_size` tuples per data node before flushing. Setting
this to 0 disables batching, reverting to tuple-by-tuple inserts. The
default value is 1000.
