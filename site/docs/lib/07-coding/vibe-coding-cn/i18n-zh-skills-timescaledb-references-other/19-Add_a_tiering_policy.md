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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/other.md"
sourceRel: "i18n/zh/skills/timescaledb/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/other.md"
sourceSha256: "b53764abbdaf16beaf22420ad0a62ac75d41058fb99968403f1bbd067870709e"
pageSha256: "dea5628e079c3e2a30176d3b724ff91bfa6ccac230760a1a99d80231f438e2ef"
contentMode: "local-full"
zh: ""
---

#### Add a tiering policy

To add a tiering policy, call `add_tiering_policy`:

For example, to tier chunks that are more than three days old in the `example` [hypertable][hypertable]:

By default, a tiering policy runs hourly on your database. To change this interval, call `alter_job`.
