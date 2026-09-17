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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "3c6ec6fb815b8e872739b898c9e781cf5b96160992e72f592fd09eced197b6e4"
contentMode: "local-full"
zh: ""
---

## Hyperfunctions

**URL:** llms-txt#hyperfunctions

**Contents:**
- Learn hyperfunction basics and install TimescaleDB Toolkit
- Browse hyperfunctions and TimescaleDB Toolkit features by category

Real-time analytics demands more than basic SQL functions, efficient computation becomes essential as datasets grow in size and complexity. That’s where TimescaleDB hyperfunctions come in: high-performance, SQL-native functions purpose-built for time-series analysis. They are designed to process, aggregate, and analyze large volumes of data with maximum efficiency while maintaining consistently high performance. With hyperfunctions, you can run sophisticated analytical queries and extract meaningful insights in real time.

Hyperfunctions introduce partial aggregation, letting TimescaleDB store intermediate states instead of raw data or final results. These partials can be merged later for rollups (consolidation), eliminating costly reprocessing and slashing compute overhead, especially when paired with continuous aggregates.

Take tracking p95 latency across thousands of app instances as an example:

- With standard SQL, every rollup requires rescanning and resorting massive datasets.
- With TimescaleDB, the `percentile_agg` hyperfunction stores a compact state per minute, which you simply merge to get hourly or daily percentiles—no full reprocess needed.

![Tiger Cloud hyperfunctions](https://assets.timescale.com/docs/images/tiger-cloud-console/percentile_agg_hyperfunction.svg)

The result? Scalable, real-time percentile analytics that deliver fast, accurate insights across high-ingest, high-resolution data, while keeping resource use lean.

Tiger Cloud includes all hyperfunctions by default, while self-hosted TimescaleDB includes a subset of them. To include all hyperfunctions with TimescaleDB, install the [TimescaleDB Toolkit][install-toolkit] Postgres extension on your self-hosted Postgres deployment.

For more information, read the [hyperfunctions blog post][hyperfunctions-blog].
