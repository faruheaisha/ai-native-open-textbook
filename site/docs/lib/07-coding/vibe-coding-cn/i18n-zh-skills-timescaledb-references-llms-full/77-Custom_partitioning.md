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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "41ea07efe2835dcd06266dc8e7090f482f649363d823f22a5351c96db3c0b13e"
contentMode: "local-full"
zh: ""
---

#### Custom partitioning

By default, TimescaleDB calls Postgres's internal hash function for the given type.
You use a custom partitioning function for value types that do not have a native Postgres hash function.

You can specify a custom partitioning function for both range and hash partitioning. A partitioning function should
take a `anyelement` argument as the only parameter and return a positive `integer` hash value. This hash value is
_not_ a partition identifier, but rather the inserted value's position in the dimension's key space, which is then
divided across the partitions.
