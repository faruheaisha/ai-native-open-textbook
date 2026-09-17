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
pageSha256: "c85afe2c2ea71cea93e2db818d93807b34e4cca6d0f29c055b18a71c66c39177"
contentMode: "local-full"
zh: ""
---

### Adjust chunk interval
Customers can now adjust their chunk interval for their hypertables and continuous aggregates through the Timescale UI. In the Explorer, select the corresponding hypertable you would like to adjust the chunk interval for. Under *Chunk information*, you can change the chunk interval. Note that this only changes the chunk interval going forward, and does not retroactively change existing chunks.

![Edit chunk interval](https://s3.amazonaws.com/assets.timescale.com/docs/images/edit-chunk-interval.png)
