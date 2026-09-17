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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "fec7d8e47b37e326682736ad3549ad60252979afb4358887d4fa99e70c6a4f2c"
contentMode: "local-full"
zh: ""
---

## first_time()

**URL:** llms-txt#first_time()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/counter_agg/intro/ =====

Analyze data whose values are designed to monotonically increase, and where any
decreases are treated as resets. The `counter_agg` functions simplify this task,
which can be difficult to do in pure SQL.

If it's possible for your readings to decrease as well as increase, use [`gauge_agg`][gauge_agg]
instead.

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/counter_agg/irate_right/ =====
