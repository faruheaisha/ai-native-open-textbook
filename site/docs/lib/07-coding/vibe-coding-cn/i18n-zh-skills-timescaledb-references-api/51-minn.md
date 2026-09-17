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
pageSha256: "5a7360e3301aa90e46a083dbfa500ce59a7c39306e11cfb8ca37e060d2575eb6"
contentMode: "local-full"
zh: ""
---

## min_n()

**URL:** llms-txt#min_n()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/min_n/intro/ =====

Get the N smallest values from a column.

The `min_n()` functions give the same results as the regular SQL query `SELECT
... ORDER BY ... LIMIT n`. But unlike the SQL query, they can be composed and
combined like other aggregate hyperfunctions.

To get the N largest values, use [`max_n()`][max_n]. To get the N smallest
values with accompanying data, use [`min_n_by()`][min_n_by].

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/min_n/into_array/ =====
