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
pageSha256: "e81a9bb1c5d7c63157dc02bcbd9211172c45b6e58a5d0ec22f27397fda0de003"
contentMode: "local-full"
zh: ""
---

## gp_lttb()

**URL:** llms-txt#gp_lttb()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/saturating-math-intro/ =====

The saturating math hyperfunctions help you perform saturating math on integers.
In saturating math, the final result is bounded. If the result of a normal
mathematical operation exceeds either the minimum or maximum bound, the result
of the corresponding saturating math operation is capped at the bound. For
example, `2 + (-3) = -1`. But in a saturating math function with a lower bound
of `0`, such as [`saturating_add_pos`](#saturating_add_pos), the result is `0`.

You can use saturating math to make sure your results don't overflow the allowed
range of integers, or to force a result to be greater than or equal to zero.

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/lttb/ =====
