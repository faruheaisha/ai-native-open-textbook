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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "605bb30186ddbddb20edd103b5c5180597c324be7e44afb4afd0d39363d04377"
contentMode: "local-full"
zh: ""
---

### TimescaleDB v2.18.1
New services created in Timescale Cloud now use [TimescaleDB v2.18.1](https://github.com/timescale/timescaledb/releases/tag/2.18.1). Existing services will be automatically upgraded in their next maintenance window starting next week.

This new release includes a number of bug fixes and small improvements including:

* Faster columnar scans when using the hypercore table access method
* Ensure all constraints are always applied when deleting data on the columnstore
* Pushdown all filters on scans for UPDATE/DELETE operations on the columnstore
