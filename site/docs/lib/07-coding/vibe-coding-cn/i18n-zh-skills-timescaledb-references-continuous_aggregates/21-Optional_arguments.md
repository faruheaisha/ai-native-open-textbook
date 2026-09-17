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
pageSha256: "3b69c4248022a3e8fe2691d4cc304aea89d83c8d168aa5237f468e5ac722332f"
contentMode: "local-full"
zh: ""
---

## Optional arguments

|Name|Type|Description|
|-|-|-|
|`override`|`BOOLEAN`|If false, the old continuous aggregate keeps its name. The new continuous aggregate is named `<OLD_CONTINUOUS_AGGREGATE_NAME>_new`. If true, the new continuous aggregate gets the old name. The old continuous aggregate is renamed `<OLD_CONTINUOUS_AGGREGATE_NAME>_old`. Defaults to `false`.|
|`drop_old`|`BOOLEAN`|If true, the old continuous aggregate is deleted. Must be used together with `override`. Defaults to `false`.|

===== PAGE: https://docs.tigerdata.com/api/continuous-aggregates/drop_materialized_view/ =====

**Examples:**

Example 1 (sql):
```sql
CALL cagg_migrate (
    cagg REGCLASS,
    override BOOLEAN DEFAULT FALSE,
    drop_old BOOLEAN DEFAULT FALSE
);
```
