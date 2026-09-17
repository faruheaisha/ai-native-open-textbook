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
pageSha256: "dd36ae1192c3cb82f710c054485313dbdbdd834a91e521c00b8c7dd8475e1a13"
contentMode: "local-full"
zh: ""
---

### 🏄 TimescaleDB v2.17 - performance improvements for analytical queries and continuous aggregate refreshes

Starting this week, all new services created on Timescale Cloud use [TimescaleDB v2.17](https://github.com/timescale/timescaledb/releases/tag/2.17.0). Existing services are upgraded gradually during their maintenance windows.

TimescaleDB v2.17 significantly improves the performance of [continuous aggregate refreshes](https://docs.timescale.com/use-timescale/latest/continuous-aggregates/refresh-policies/), and contains performance improvements for [analytical queries and delete operations](https://docs.timescale.com/use-timescale/latest/compression/modify-compressed-data/) over compressed hypertables.

Best practice is to upgrade at the next available opportunity.

Highlighted features in TimescaleDB v2.17 are:

* Significant performance improvements for continuous aggregate policies:

* Continuous aggregate refresh now uses `merge` instead of deleting old materialized data and re-inserting.

* Continuous aggregate policies are now more lightweight, use less system resources, and complete faster. This update:

* Decreases dramatically the amount of data that must be written on the continuous aggregate in the presence of a small number of changes
      * Reduces the i/o cost of refreshing a continuous aggregate
      * Generates fewer Write-Ahead Logs (`WAL`)

* Increased performance for real-time analytical queries over compressed hypertables:

* We are excited to introduce additional Single Instruction, Multiple Data (SIMD) vectorization optimization to TimescaleDB. This release supports vectorized execution for queries that _group by_ using the `segment_by` column(s), and _aggregate_ using the `sum`, `count`, `avg`, `min`, and `max` basic aggregate functions.

* Stay tuned for more to come in follow-up releases! Support for grouping on additional columns, filtered aggregation, vectorized expressions, and `time_bucket` is coming soon.

* Improved performance of deletes on compressed hypertables when a large amount of data is affected.

This improvement speeds up operations that delete whole segments by skipping the decompression step. It is enabled for all deletes that filter by the `segment_by` column(s).

Timescale Cloud's [Enterprise plan](https://docs.timescale.com/about/latest/pricing-and-account-management/#features-included-in-each-pricing-plan) is now HIPAA (Health Insurance Portability and Accountability Act) compliant. This allows organizations to securely manage and analyze sensitive healthcare data, ensuring they meet regulatory requirements while building compliant applications.
