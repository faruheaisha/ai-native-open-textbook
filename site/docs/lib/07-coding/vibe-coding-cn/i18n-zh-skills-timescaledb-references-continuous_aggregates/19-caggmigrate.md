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
pageSha256: "1a88be4cb38c8b40c4f16de638fcb1ecc8115ab91a6d61dfcd156a35bc3b820f"
contentMode: "local-full"
zh: ""
---

## cagg_migrate()

**URL:** llms-txt#cagg_migrate()

**Contents:**
- Required arguments
- Optional arguments

Migrate a continuous aggregate from the old format to  the new format introduced
in TimescaleDB 2.7.

TimescaleDB 2.7 introduced a new format for continuous aggregates that improves
performance. It also makes continuous aggregates compatible with more types of
SQL queries.

The new format, also called the finalized format, stores the continuous
aggregate data exactly as it appears in the final view. The old format, also
called the partial format, stores the data in a partially aggregated state.

Use this procedure to migrate continuous aggregates from the old format to the
new format.

For more information, see the [migration how-to guide][how-to-migrate].

There are known issues with `cagg_migrate()` in version TimescaleDB 2.8.0.
Upgrade to version 2.8.1 or above before using it.
