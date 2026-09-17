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
pageSha256: "bc7c04df1d558bca2fc3028913cc761465c373e16e899d2c92a21ed14265bfb4"
contentMode: "local-full"
zh: ""
---

### TimescaleDB v2.18 - dense indexes in the columnstore and query vectorization improvements
Starting this week, all new services created on Timescale Cloud use [TimescaleDB v2.18](https://github.com/timescale/timescaledb/releases/tag/2.18.0). Existing services will be upgraded gradually during their maintenance window.

Highlighted features in TimescaleDB v2.18.0 include:

* The ability to add dense indexes (btree and hash) to the columnstore through the new hypercore table access method.
* Significant performance improvements through vectorization (SIMD) for aggregations using a group by with one column and/or using a filter clause when querying the columnstore.
* Hypertables support triggers for transition tables, which is one of the most upvoted community feature requests.
* Updated methods to manage Timescale's hybrid row-columnar store (hypercore). These methods highlight columnstore usage. The columnstore includes an optimized columnar format as well as compression.
