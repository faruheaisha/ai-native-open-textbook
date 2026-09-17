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
pageSha256: "ec205214e501f1887a2f66b22a9a3b79d44a5c645972bcc76439145cfc7effe7"
contentMode: "local-full"
zh: ""
---

#### Remove a tiering policy

To remove an existing tiering policy, call `remove_tiering_policy`:

```sql
SELECT remove_tiering_policy(hypertable REGCLASS, if_exists BOOL = false);
```

For example, to remove the tiering policy from the `example` hypertable:

```sql
SELECT remove_tiering_policy('example');
```

If you remove a tiering policy, the remaining scheduled chunks are not tiered. However, chunks in tiered storage are not untiered. You [untier chunks manually][manual-tier] to local storage.

### Manually tier and untier chunks

If tiering policies do not meet your current needs, you can tier and untier chunks manually. To do so, [connect to your service][connect-to-service] and run the queries below in the data mode, the SQL editor, or using `psql`.
