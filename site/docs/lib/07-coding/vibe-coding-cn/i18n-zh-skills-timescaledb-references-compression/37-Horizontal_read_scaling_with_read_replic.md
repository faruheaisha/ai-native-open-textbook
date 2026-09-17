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
pageSha256: "e48523cff471697b5b5638233a427500986d257069c72af1c409357cbe5b6810"
contentMode: "local-full"
zh: ""
---

### Horizontal read scaling with read replica sets

[Read replica sets](https://docs.timescale.com/use-timescale/latest/ha-replicas/read-scaling/) are an improved version of read replicas. They let you scale reads horizontally by creating up to 10 replica nodes behind a single read endpoint. Just point your read queries to the endpoint and configure the number of replicas you need without changing your application logic. You can increase or decrease the number of replicas in the set dynamically, with no impact on the endpoint.

Read replica sets are used to:

- Scale reads for read-heavy workloads and dashboards.
- Isolate internal analytics and reporting from customer-facing applications.
- Provide high availability and fault tolerance for read traffic.

All existing read replicas have been automatically upgraded to a replica set with one node—no action required. Billing remains the same.

Read replica sets are available for all Scale and Enterprise customers.

![Create a read replica set in Timescale Console](https://assets.timescale.com/docs/images/create-read-replica-set-timescale-console.png)
