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
pageSha256: "75573f84a2636450470f316bd8279f03d15ab7123abe6fd34bdcf86c2c2c99f7"
contentMode: "local-full"
zh: ""
---

### 🏎️ TimescaleDB v2.21—ingest millions of rows/second and faster columnstore UPSERTs and DELETEs

TimescaleDB v2.21 was released on July 8 and is now available to all developers on Tiger Cloud.

Highlighted features in TimescaleDB v2.21 include:
- **High-scale ingestion performance (tech preview)**: introducing a new approach that compresses data directly into the columnstore during ingestion, demonstrating over 1.2M rows/second in tests with bursts over 50M rows/second. We are actively seeking design partners for this feature.
- **Faster data updates (UPSERTs)**: columnstore UPSERTs are now 2.5x faster for heavily constrained tables, building on the 10x improvement from v2.20.
- **Faster data deletion**: DELETE operations on non-segmentby columns are 42x faster, reducing I/O and bloat.
- **Reduced bloat after recompression**: optimized recompression processes lead to less bloat and more efficient storage.
- **Enhanced continuous aggregates**:
  - Concurrent refresh policies enable multiple continuous aggregates to update concurrently.
  - Batched refreshes are now enabled by default for more efficient processing.
- **Complete chunk management**: full support for splitting columnstore chunks, complementing the existing merge capabilities.

For a comprehensive list of changes, refer to the [TimescaleDB v2.21 release notes](https://github.com/timescale/timescaledb/releases/tag/2.21.0).
