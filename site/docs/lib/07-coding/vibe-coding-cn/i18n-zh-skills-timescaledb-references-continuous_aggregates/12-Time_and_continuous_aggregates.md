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
pageSha256: "00a5ee10031fa2a2bc0c3cfaeaed90566e1b17cad0bf50859c91572326924619"
contentMode: "local-full"
zh: ""
---

## Time and continuous aggregates

**URL:** llms-txt#time-and-continuous-aggregates

**Contents:**
- Declare an explicit timezone
- Integer-based time

Functions that depend on a local timezone setting inside a continuous aggregate
are not supported. You cannot adjust to a local time because the timezone setting
changes from user to user.

To manage this, you can use explicit timezones in the view definition.
Alternatively, you can create your own custom aggregation scheme for tables that
use an integer time column.
