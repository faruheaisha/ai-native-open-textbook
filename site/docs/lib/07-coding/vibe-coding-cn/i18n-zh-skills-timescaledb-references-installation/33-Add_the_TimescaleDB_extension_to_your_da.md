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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "558c3340d13c21b5b8c99ac7a6cfb3ec89042ca25b44e844684c21635fc37fb4"
contentMode: "local-full"
zh: ""
---

## Add the TimescaleDB extension to your database

For improved performance, you enable TimescaleDB on each database on your self-hosted Postgres instance.
This section shows you how to enable TimescaleDB for a new database in Postgres using `psql` from the command line.

1. **Connect to a database on your Postgres instance**

In Postgres, the default user and database are both `postgres`. To use a
