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
pageSha256: "73b0ff05036b00e2139bdda2b8c2e278835c3abd74d8b382eec8fd26138040e7"
contentMode: "local-full"
zh: ""
---

### TimescaleDB v2.18.2 on Timescale Cloud

New services created in Timescale Cloud now use [TimescaleDB v2.18.2](https://github.com/timescale/timescaledb/releases/tag/2.18.2). Existing services are in the process of being automatically upgraded to this version.

This new release fixes a number of bugs including:

- Fix `ExplainHook` breaking the call chain.
- Respect `ExecutorStart` hooks of other extensions.
- Block dropping internal compressed chunks with `drop_chunk()`.
