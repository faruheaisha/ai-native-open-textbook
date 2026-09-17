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
pageSha256: "a3b3b28d83b38105190ac871ae29916b346fa93d70552aa6d15e6096336751d1"
contentMode: "local-full"
zh: ""
---

### SQL Editor in Timescale Console
We've added a new tab to the service screen that allows users to query their database directly, without having to leave the console interface.

* For existing services on Timescale, this is an opt-in feature. For all newly created services, the SQL Editor will be enabled by default.
* Users can disable the SQL Editor at any time by toggling the option under the Operations tab.
* The editor supports all DML and DDL operations (any single-statement SQL query), but doesn't support multiple SQL statements in a single query.

![SQL Editor](https://s3.amazonaws.com/assets.timescale.com/docs/images/sql-editor-query.png)
