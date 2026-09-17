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
pageSha256: "783225fbb0d104c1e3eae5f0d81cf71f1aca802dfb82dd156b7402bd839aaa6f"
contentMode: "local-full"
zh: ""
---

### Livesync for S3 (beta)

[Livesync for S3](https://docs.timescale.com/migrate/latest/livesync-for-s3/) is our second livesync offering in
Timescale Console, following livesync for Postgres. This feature helps users sync data in their S3 buckets to a
Timescale Cloud service, and simplifies data importing. Livesync handles both existing and new data in real time,
automatically syncing everything into a Timescale Cloud service. Users can integrate Timescale Cloud alongside S3, where
S3 stores data in raw form as the source for multiple destinations.

![Timescale Console new livesync](https://assets.timescale.com/docs/images/livesync-s3-start-new-livesync.png)

With livesync, users can connect Timescale Cloud with S3 in minutes, rather than spending days setting up and maintaining
an ingestion layer.

![Timescale Console livesync view status](https://assets.timescale.com/docs/images/livesync-s3-view-status.png)
