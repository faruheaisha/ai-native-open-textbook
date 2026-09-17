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
pageSha256: "e565dc904f0a2d46c261dd2b04f230ff4c2787696fcf924cd3954d8c928657fa"
contentMode: "local-full"
zh: ""
---

### UX improvements to livesync for Postgres

In [livesync for Postgres](https://docs.timescale.com/migrate/latest/livesync-for-postgresql/), getting started
requires setting the `WAL_LEVEL` to `logical`, and granting specific permissions to start a publication
on the source database. To simplify this setup process, we have added a detailed two-step checklist with comprehensive
configuration instructions to Timescale Console.

![Timescale Console livesync Postgres instructions](https://assets.timescale.com/docs/images/livesync-postgres-console-config-instuctions.png)
