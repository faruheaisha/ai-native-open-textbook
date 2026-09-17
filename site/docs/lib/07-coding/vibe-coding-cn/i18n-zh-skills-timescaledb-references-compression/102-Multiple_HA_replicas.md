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
pageSha256: "535ae42402c8d872c50ca3a9c49b395627a6f8d689df31f134b0c9b1c28098c4"
contentMode: "local-full"
zh: ""
---

### Multiple HA replicas

Scale and Enterprise customers can now configure two new multiple high availability (HA) replica options directly through Timescale Console:

* Two HA replicas (both asynchronous) - our highest availability configuration.
* Two HA replicas (one asynchronous, one synchronous) - our highest data integrity configuration.

Previously, Timescale offered only a single synchronous replica for customers seeking high availability. The single HA option is still available.

![Change Replica Configuration](https://s3.amazonaws.com/assets.timescale.com/docs/images/change-replica-configuration.png)

![High Availability](https://s3.amazonaws.com/assets.timescale.com/docs/images/high-availability.png)

For more details on multiple HA replicas, see [Manage high availability](https://docs.timescale.com/use-timescale/latest/ha-replicas/high-availability/).
