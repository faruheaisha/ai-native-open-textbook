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
pageSha256: "a6f1e9da97c0b09e30143affefb02be72f96d9f315d7f47aa48aa5c802d910a8"
contentMode: "local-full"
zh: ""
---

### TimescaleDB v2.19—query performance and concurrency improvements

Starting this week, all new services created on Timescale Cloud use [TimescaleDB v2.19](https://github.com/timescale/timescaledb/releases/tag/2.19.0). Existing services will be upgraded gradually during their maintenance window.

Highlighted features in TimescaleDB v2.19 include:

- Improved concurrency of `INSERT`, `UPDATE`, and `DELETE` operations on the columnstore by no longer blocking DML statements during the recompression of a chunk.
- Improved system performance during continuous aggregate refreshes by breaking them into smaller batches. This reduces systems pressure and minimizes the risk of spilling to disk.
- Faster and more up-to-date results for queries against continuous aggregates by materializing the most recent data first, as opposed to old data first in prior versions.
- Faster analytical queries with SIMD vectorization of aggregations over text columns and `GROUP BY` over multiple columns.
- Enable chunk size optimization for better query performance in the columnstore by merging them with `merge_chunk`.
