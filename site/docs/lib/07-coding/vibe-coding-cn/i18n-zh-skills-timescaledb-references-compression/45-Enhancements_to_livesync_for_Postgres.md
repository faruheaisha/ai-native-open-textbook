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
pageSha256: "518004dd22a844f8c231a18606f9507ae920bc0c9e79c512053b2cc83ff5688e"
contentMode: "local-full"
zh: ""
---

### Enhancements to livesync for Postgres

You now can:
* Edit a running livesync to add and drop tables from an existing configuration:
  - For existing tables, Timescale Console stops the livesync while keeping the target table intact.
  - Newly added tables sync their existing data and transition into the Change Data Capture (CDC) state.
* Create multiple livesync instances for Postgres per service. This is an upgrade from our initial launch which
  limited users to one LiveSync per service.

This enables you to sync data from multiple Postgres source databases into a single Timescale Cloud service.
* No more hassle looking up schema and table names for livesync configuration from the source. Starting today, all
  schema and table names are available in a dropdown menu for seamless source table selection.

## ➕ More storage types and IOPS
<Label type="date">May 22, 2025</Label>
