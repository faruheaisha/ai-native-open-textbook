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
pageSha256: "29efc5aafab1b2afa5803bc1096e84276f77fe874016717ea824cc76aa430a49"
contentMode: "local-full"
zh: ""
---

## Required arguments

|Name|Type|Description|
|-|-|-|
|`continuous_aggregate`|REGCLASS|The continuous aggregate to refresh.|
|`window_start`|INTERVAL, TIMESTAMPTZ, INTEGER|Start of the window to refresh, has to be before `window_end`.|
|`window_end`|INTERVAL, TIMESTAMPTZ, INTEGER|End of the window to refresh, has to be after `window_start`.|

You must specify the `window_start` and `window_end` parameters differently,
depending on the type of the time column of the hypertable. For hypertables with
`TIMESTAMP`, `TIMESTAMPTZ`, and `DATE` time columns, set the refresh window as
an `INTERVAL` type. For hypertables with integer-based timestamps, set the
refresh window as an `INTEGER` type.

A `NULL` value for `window_start` is equivalent to the lowest changed element
in the raw hypertable of the CAgg. A `NULL` value for `window_end` is
equivalent to the largest changed element in raw hypertable of the CAgg. As
changed element tracking is performed after the initial CAgg refresh, running
CAgg refresh without `window_start` and `window_end` covers the entire time
range.

Note that it's not guaranteed that all buckets will be updated: refreshes will
not take place when buckets are materialized with no data changes or with
changes that only occurred in the secondary table used in the JOIN.
