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
pageSha256: "123b934c6ed7656daed99e28be29f760dbaabcdaa9fc08b26980ab94d09715ad"
contentMode: "local-full"
zh: ""
---

## Hierarchical continuous aggregate fails with incompatible bucket width

**URL:** llms-txt#hierarchical-continuous-aggregate-fails-with-incompatible-bucket-width

If you attempt to create a hierarchical continuous aggregate, you must use
compatible time buckets. You can't create a continuous aggregate with a
fixed-width time bucket on top of a continuous aggregate with a variable-width
time bucket. For more information, see the restrictions section in
[hierarchical continuous aggregates][h-caggs-restrictions].

===== PAGE: https://docs.tigerdata.com/_troubleshooting/caggs-migrate-permissions/ =====
