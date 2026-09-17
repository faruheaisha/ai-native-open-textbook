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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceRel: "i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceSha256: "2fc13047cc1286afec41d05f8c09c0c452219a02da65b4ba1b4a06c4663c93ed"
pageSha256: "448381b473603085b5ee709131abd448e80f97a2fdfca4a2f107314fb325aa69"
contentMode: "local-full"
zh: ""
---

## Continuous aggregates on continuous aggregates

**URL:** llms-txt#continuous-aggregates-on-continuous-aggregates

**Contents:**
- Create a continuous aggregate on top of another continuous aggregate
- Use real-time aggregation with hierarchical continuous aggregates
- Roll up calculations
- Restrictions

The more data you have, the more likely you are to run a more sophisticated analysis on it. When a simple one-level aggregation is not enough, TimescaleDB lets you create continuous aggregates on top of other continuous aggregates. This way, you summarize data at different levels of granularity, while still saving resources with precomputing.

For example, you might have an hourly continuous aggregate that summarizes minute-by-minute
data. To get a daily summary, you can create a new continuous aggregate on top
of your hourly aggregate. This is more efficient than creating the daily
aggregate on top of the original hypertable, because you can reuse the
calculations from the hourly aggregate.

This feature is available in TimescaleDB v2.9 and later.
