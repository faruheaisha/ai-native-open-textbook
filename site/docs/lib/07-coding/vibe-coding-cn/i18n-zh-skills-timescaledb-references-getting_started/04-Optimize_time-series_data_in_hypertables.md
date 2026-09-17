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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceRel: "i18n/zh/skills/timescaledb/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceSha256: "d89ee1583c1ea9641e14a8f176f27150301b48061cbde17049ed1e459820f0d5"
pageSha256: "fc5cc91a6504b9513542781f3983ca38dc09c1049a0200de0e5012f78f5086bb"
contentMode: "local-full"
zh: ""
---

## Optimize time-series data in hypertables

Hypertables are Postgres tables designed to simplify and accelerate data analysis. Anything
you can do with regular Postgres tables, you can do with hypertables - but much faster and more conveniently.

In this section, you use the helpers in the TimescaleDB gem to create and manage a [hypertable][about-hypertables].

1.  **Generate a migration to create the page loads table**
