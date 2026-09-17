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
pageSha256: "8da5a82a38e9161963a00eb4c37ad022ebc86a909795195bb66b64fb213972c0"
contentMode: "local-full"
zh: ""
---

### 🏗️ Live Migrations v1.0 Release

Last year, we began developing a solution for low-downtime migration from Postgres and TimescaleDB. Since then, this solution has evolved significantly, featuring enhanced functionality, improved reliability, and performance optimizations. We're now proud to announce that **live migration is production-ready** with the release of version 1.0.

Many of our customers have successfully migrated databases to Timescale using [live migration](https://docs.timescale.com/migrate/latest/live-migration/), with some databases as large as a few terabytes in size.

As part of the service creation flow, we offer the following:

- Connect to services from different sources
- Import and migrate data from various sources
- Create hypertables

Previously, these actions were only visible during the service creation process and couldn't be accessed later. Now, these actions are **persisted within the service**, allowing users to leverage them on-demand whenever they're ready to perform these tasks.

![Timescale Console Actions tab](https://assets.timescale.com/docs/images/timescale-console-actions-tab.png)
