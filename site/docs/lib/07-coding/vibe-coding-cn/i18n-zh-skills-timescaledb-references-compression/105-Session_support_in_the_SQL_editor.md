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
pageSha256: "d0e4650cb63a6cd2a5bd6dbba56f03ddda28d668ca31861c8e4fa1019c456af2"
contentMode: "local-full"
zh: ""
---

### Session support in the SQL editor

Last week we announced the new in-console SQL editor. However, there was a limitation where a new database session was created for each query execution.

Today we removed that limitation and added support for keeping one database session for each user logged in, which means you can do things like start transactions:

Or work with temporary tables:

Or use the `set` command:

## 😎 Query your database directly from the Console and enhanced data import and migration options
<Label type="date">August 30, 2024</Label>
