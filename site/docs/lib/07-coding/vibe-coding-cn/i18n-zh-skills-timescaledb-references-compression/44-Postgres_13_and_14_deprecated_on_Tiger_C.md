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
pageSha256: "661db08751276ac73fdb58ad267c085bf3f2d26c6aafb044bbb89efba531bbec"
contentMode: "local-full"
zh: ""
---

### Postgres 13 and 14 deprecated on Tiger Cloud

[TimescaleDB version 2.20](https://github.com/timescale/timescaledb/releases/tag/2.20.0) is not compatible with Postgres versions v14 and below.
TimescaleDB 2.19.3 is the last bug-fix release for Postgres 14. Future fixes are for
Postgres 15+ only. To continue receiving critical fixes and security patches, and to take
advantage of the latest TimescaleDB features, you must upgrade to Postgres 15 or newer.
This deprecation affects all Tiger Cloud services currently running Postgres 13 or
Postgres 14.

The timeline for the Postgres 13 and 14 deprecation is as follows:

- **Deprecation notice period begins**: starting in early June 2025, you will receive email communication.
- **Customer self-service upgrade window**: June 2025 through September 14, 2025. We strongly encourage you to
  [manually upgrade Postgres](https://docs.tigerdata.com/use-timescale/latest/upgrades/#manually-upgrade-postgresql-for-a-service)
  during this period.
- **Automatic upgrade deadline**: your service will be
  [automatically upgraded](https://docs.timescale.com/use-timescale/latest/upgrades/#automatic-postgresql-upgrades-for-a-service)
  from September 15, 2025.
