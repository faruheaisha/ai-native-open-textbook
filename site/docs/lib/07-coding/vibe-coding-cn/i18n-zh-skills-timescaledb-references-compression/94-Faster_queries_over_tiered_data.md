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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "aec52756e82a7af8e37a34886a65b13c783994f9b0a1ca7d0ea87931c73a1f06"
contentMode: "local-full"
zh: ""
---

### Faster queries over tiered data
This release adds support for runtime chunk exclusion for queries that need to access [tiered storage](https://docs.timescale.com/use-timescale/latest/data-tiering/). Chunk exclusion now works with queries that use stable expressions in the `WHERE` clause. The most common form of this type of query is:

For more info on queries with immutable/stable/volatile filters, check our blog post on [Implementing constraint exclusion for faster query performance](https://www.timescale.com/blog/implementing-constraint-exclusion-for-faster-query-performance/).

If you no longer want to use tiered storage for a particular hypertable, you can now disable tiering and drop the associated tiering metadata on the hypertable with a call to [disable_tiering function](https://docs.timescale.com/use-timescale/latest/data-tiering/enabling-data-tiering/#disable-tiering).
