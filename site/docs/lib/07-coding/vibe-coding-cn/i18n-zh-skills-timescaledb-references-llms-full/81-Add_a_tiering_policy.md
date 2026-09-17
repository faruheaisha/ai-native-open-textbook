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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "40b99bba7bd5aa1a8e7bb4ef53045d9af0eaa810d6a142a5f61db3c89ef5c284"
contentMode: "local-full"
zh: ""
---

#### Add a tiering policy

To add a tiering policy, call `add_tiering_policy`:

```sql
SELECT add_tiering_policy(hypertable REGCLASS, move_after INTERVAL, if_not_exists BOOL = false);
```

For example, to tier chunks that are more than three days old in the `example` [hypertable][hypertable]:

```sql
SELECT add_tiering_policy('example', INTERVAL '3 days');
```

By default, a tiering policy runs hourly on your database. To change this interval, call `alter_job`.
