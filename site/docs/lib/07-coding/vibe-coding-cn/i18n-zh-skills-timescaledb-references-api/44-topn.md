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
pageSha256: "c9b771c0dc84b5aed1fc7b45ad9dec6e25be159b25cd435b7fcfe82fc84894ab"
contentMode: "local-full"
zh: ""
---

## topn()

**URL:** llms-txt#topn()

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/freq_agg/intro/ =====

Get the most common elements of a set and their relative frequency. The
estimation uses the [SpaceSaving][spacingsaving-algorithm] algorithm.

This group of functions contains two aggregate functions, which let you set the
cutoff for keeping track of a value in different ways. [`freq_agg`](#freq_agg)
allows you to specify a minimum frequency, and [`mcv_agg`](#mcv_agg) allows
you to specify the target number of values to keep.

To estimate the absolute number of times a value appears, use [`count_min_sketch`][count_min_sketch].

===== PAGE: https://docs.tigerdata.com/api/_hyperfunctions/freq_agg/min_frequency/ =====
