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
pageSha256: "dedf4fc6fb542da08de3e3f669ba9185e3a9feb4c7e435e88b6fb506af98c45b"
contentMode: "local-full"
zh: ""
---

### When to enable chunk skipping

You can enable chunk skipping on as many columns as you need. However, best practice is to enable it on columns that
are both:

- Correlated, that is, related to the partitioning column in some way.
- Referenced in the `WHERE` clauses of the queries.

In the satellite example, the time of adding data to a database inevitably follows the time of gathering.
Sequential IDs and the creation timestamp for both entities also increase synchronously. This means those two
columns are correlated.

For a more in-depth look on chunk skipping, see [our blog post](https://www.timescale.com/blog/boost-postgres-performance-by-7x-with-chunk-skipping-indexes).
