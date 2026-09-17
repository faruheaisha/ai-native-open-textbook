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
pageSha256: "ff4bd8c19162dcedf92b0fe8f8d82d7f712e2fee9a3ef42836b581cab9faee36"
contentMode: "local-full"
zh: ""
---

### TimescaleDB v2.20 - query performance and faster data updates

All new services created on Timescale Cloud are created using
[TimescaleDB v2.20](https://github.com/timescale/timescaledb/releases/tag/2.20.0). Existing services will be
automatically upgraded during their maintenance window.

Highlighted features in TimescaleDB v2.20 include:
* Efficiently handle data updates and upserts (including backfills, that are now up to 10x faster).
* Up to 6x faster point queries on high-cardinality columns using new bloom filters.
* Up to 2500x faster DISTINCT operations with SkipScan, perfect for quickly getting a unique list or the latest reading
  from any device, event, or transaction.
* 8x more efficient Boolean column storage with vectorized processing, resulting in 30-45% faster queries.
* Enhanced developer flexibility with continuous aggregates now supporting window and mutable functions, plus
  customizable refresh orders.
