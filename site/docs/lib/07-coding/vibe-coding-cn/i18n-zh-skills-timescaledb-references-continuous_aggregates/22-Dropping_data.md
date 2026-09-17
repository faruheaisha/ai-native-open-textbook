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
pageSha256: "f6b5357c67c4c19ebf08365e6d36f46ad70c47eebea97b8e82aedff4a262d90f"
contentMode: "local-full"
zh: ""
---

## Dropping data

**URL:** llms-txt#dropping-data

**Contents:**
- Drop a continuous aggregate view
  - Dropping a continuous aggregate view
- Drop raw data from a hypertable
- PolicyVisualizerDownsampling

When you are working with continuous aggregates, you can drop a view, or you can
drop raw data from the underlying hypertable or from the continuous aggregate
itself. A combination of [refresh][cagg-refresh] and data retention policies
can help you downsample your data. This lets you keep historical data at a
lower granularity than recent data.

However, you should be aware if a retention policy is likely to drop raw data
from your hypertable that you need in your continuous aggregate.

To simplify the process of setting up downsampling, you can use
the [visualizer and code generator][visualizer].
