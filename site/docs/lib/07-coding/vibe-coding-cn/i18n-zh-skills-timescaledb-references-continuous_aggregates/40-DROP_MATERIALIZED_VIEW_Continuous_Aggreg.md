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
pageSha256: "1fd6deee1d02e2d24aa7c594d7132923bcc14321bb570d8825ecc08a52c922c3"
contentMode: "local-full"
zh: ""
---

## DROP MATERIALIZED VIEW (Continuous Aggregate)

**URL:** llms-txt#drop-materialized-view-(continuous-aggregate)

**Contents:**
- Samples
- Parameters

Continuous aggregate views can be dropped using the `DROP MATERIALIZED VIEW` statement.

This statement deletes the continuous aggregate and all its internal
objects. It also removes refresh policies for that
aggregate. To delete other dependent objects, such as a view
defined on the continuous aggregate, add the `CASCADE`
option. Dropping a continuous aggregate does not affect the data in
the underlying hypertable from which the continuous aggregate is
derived.

Drop existing continuous aggregate.

|Name|Type|Description|
|---|---|---|
| `<view_name>` | TEXT | Name (optionally schema-qualified) of continuous aggregate view to be dropped.|

===== PAGE: https://docs.tigerdata.com/api/continuous-aggregates/remove_all_policies/ =====

**Examples:**

Example 1 (unknown):
```unknown
## Samples

Drop existing continuous aggregate.
```
