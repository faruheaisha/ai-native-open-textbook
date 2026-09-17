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
pageSha256: "c9bbdcb53609e772dda130b7cb5c395147620ee32bf6365a4ab91a2507c6494c"
contentMode: "local-full"
zh: ""
---

## Jobs in TimescaleDB

**URL:** llms-txt#jobs-in-timescaledb

TimescaleDB natively includes some job-scheduling policies, such as:

*   [Continuous aggregate policies][caggs] to automatically refresh continuous aggregates
*   [Hypercore policies][setup-hypercore] to optimize and compress historical data
*   [Retention policies][retention] to drop historical data
*   [Reordering policies][reordering] to reorder data within chunks

If these don't cover your use case, you can create and schedule custom-defined jobs to run within
your database. They help you automate periodic tasks that aren't covered by the native policies.

In this section, you see how to:

*   [Create and manage jobs][create-jobs]
*   Set up a [generic data retention][generic-retention] policy that applies across all hypertables
*   Implement [automatic moving of chunks between tablespaces][manage-storage]
*   Automatically [downsample and compress][downsample-compress] older chunks

===== PAGE: https://docs.tigerdata.com/use-timescale/security/ =====
