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
pageSha256: "6c4cf5e6ad3288c8939dba19a229de531a12ab4798f89e7b4f98c6df126c60ec"
contentMode: "local-full"
zh: ""
---

### Create a window function

To use a window function in a continuous aggregate:

1. Create a simple table with to store a value at a specific time:

1. Enable window functions.

As window functions are experimental, in order to create continuous aggregates with window functions.
   you have to `enable_cagg_window_functions`.

1. Bucket your data by `time` and calculate the delta between time buckets using the `lag` window function:

Window functions must stay within the time bucket. Any query that tries to look beyond the current
    time bucket will produce incorrect results around the refresh boundaries.
   
   Window functions that partition by time_bucket should be safe even with LAG()/LEAD()
