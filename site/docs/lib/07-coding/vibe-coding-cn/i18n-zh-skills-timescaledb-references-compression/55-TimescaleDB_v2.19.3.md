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
pageSha256: "dbe13581132802a2303b7623b5b10a9d75f3cad8ff7b57b07ce929b710d57a60"
contentMode: "local-full"
zh: ""
---

### TimescaleDB v2.19.3

New services created in Timescale Cloud now use TimescaleDB v2.19.3. Existing services are in the process of being automatically upgraded to this version.

This release adds a number of bug fixes including:

- Fix segfault when running a query against columnstore chunks that group by multiple columns, including UUID segmentby columns.
- Fix hypercore table access method segfault on DELETE operations using a segmentby column.
