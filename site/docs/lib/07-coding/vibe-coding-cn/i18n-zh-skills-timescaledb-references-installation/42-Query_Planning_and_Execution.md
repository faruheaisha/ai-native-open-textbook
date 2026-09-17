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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "e231bb1a2a6df0bb814f64f5ba5952e882045b9965af030717a5d57f8a89ad6b"
contentMode: "local-full"
zh: ""
---

## Query Planning and Execution

### `timescaledb.enable_chunkwise_aggregation (bool)`
If enabled, aggregations are converted into partial aggregations during query
planning. The first part of the aggregation is executed on a per-chunk basis.
Then, these partial results are combined and finalized. Splitting aggregations
decreases the size of the created hash tables and increases data locality, which
speeds up queries.

### `timescaledb.vectorized_aggregation (bool)`
Enables or disables the vectorized optimizations in the query executor. For
example, the `sum()` aggregation function on compressed chunks can be optimized
in this way.

### `timescaledb.enable_merge_on_cagg_refresh  (bool)`

Set to `ON` to dramatically decrease the amount of data written on a continuous aggregate
in the presence of a small number of changes, reduce the i/o cost of refreshing a
[continuous aggregate][continuous-aggregates], and generate fewer Write-Ahead Logs (WAL). Only works for continuous aggregates that don't have compression enabled.

Please refer to the [Grand Unified Configuration (GUC) parameters][gucs] for a complete list.

### `timescaledb.max_background_workers (int)`

Max background worker processes allocated to TimescaleDB. Set to at least 1 +
the number of databases loaded with the TimescaleDB extension in a Postgres instance. Default value is 16.
