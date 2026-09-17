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
pageSha256: "da75f612e58d5225ec486938f4831895e43a390aab9470d7e9786910c659a1c8"
contentMode: "local-full"
zh: ""
---

## Time-weighted average functions

**URL:** llms-txt#time-weighted-average-functions

This section contains functions related to time-weighted averages and integrals.
Time weighted averages and integrals are commonly used in cases where a time
series is not evenly sampled, so a traditional average gives misleading results.
For more information about these functions, see the
[hyperfunctions documentation][hyperfunctions-time-weight-average].

Some hyperfunctions are included in the default TimescaleDB product. For
additional hyperfunctions, you need to install the
[TimescaleDB Toolkit][install-toolkit] Postgres extension.

&lt;HyperfunctionTable
    hyperfunctionFamily='time-weighted averages'
    includeExperimental
    sortByType
/>

===== PAGE: https://docs.tigerdata.com/api/counter_aggs/ =====
