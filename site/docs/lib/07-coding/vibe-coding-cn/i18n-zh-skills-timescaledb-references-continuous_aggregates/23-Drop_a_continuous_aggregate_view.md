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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceRel: "i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/continuous_aggregates.md"
sourceSha256: "2fc13047cc1286afec41d05f8c09c0c452219a02da65b4ba1b4a06c4663c93ed"
pageSha256: "52e3d7edb7ea1fe38506b0ffcfd3828de9ce2c99328ae6b3f3ca78a858846820"
contentMode: "local-full"
zh: ""
---

## Drop a continuous aggregate view

You can drop a continuous aggregate view using the `DROP MATERIALIZED VIEW`
command. This command also removes refresh policies defined on the continuous
aggregate. It does not drop the data from the underlying hypertable.

### Dropping a continuous aggregate view

1.  From the `psql`prompt, drop the view:
