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
pageSha256: "4286e86ad98bfd4204993f6d4e1262e561b217081a799903c8a8428d1036a72e"
contentMode: "local-full"
zh: ""
---

## Convert continuous aggregates to the columnstore

**URL:** llms-txt#convert-continuous-aggregates-to-the-columnstore

**Contents:**
- Enable compression on continuous aggregates
  - Enabling and disabling compression on continuous aggregates
- Compression policies on continuous aggregates

Continuous aggregates are often used to downsample historical data. If the data is only used for analytical queries
and never modified, you can compress the aggregate to save on storage.

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/use-timescale/latest/continuous-aggregates/compression-on-continuous-aggregates/">Convert continuous aggregates to the columnstore</a>.

Before version
[2.18.1](https://github.com/timescale/timescaledb/releases/tag/2.18.1), you can't
refresh the compressed regions of a continuous aggregate. To avoid conflicts
between compression and refresh, make sure you set `compress_after` to a larger
interval than the `start_offset` of your [refresh
policy](https://docs.tigerdata.com/api/latest/continuous-aggregates/add_continuous_aggregate_policy).

Compression on continuous aggregates works similarly to [compression on
hypertables][compression]. When compression is enabled and no other options are
provided, the `segment_by` value will be automatically set to the group by
columns of the continuous aggregate and the `time_bucket` column will be used as
the `order_by` column in the compression configuration.
