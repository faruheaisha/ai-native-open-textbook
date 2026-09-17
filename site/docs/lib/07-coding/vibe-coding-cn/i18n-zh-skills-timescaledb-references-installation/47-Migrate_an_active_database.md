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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/installation.md"
sourceRel: "i18n/zh/skills/timescaledb/references/installation.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/installation.md"
sourceSha256: "4a7b57ccaa9a9f7e4c22cc7a4a1dcd5ddf03b101b4f1914bcb18219176632044"
pageSha256: "1eaea839a74e691975f3593e9ae04ffb1318624bfd524cc0ea1fed8b3293a3fc"
contentMode: "local-full"
zh: ""
---

## Migrate an active database

If your database is actively ingesting data, take precautions to ensure that
your self-hosted TimescaleDB instance contains the data that is ingested while the migration
is happening. Begin by running ingest in parallel on the source and target
databases. This ensures that the newest data is written to both databases. Then
backfill your data with one of the two migration methods.

===== PAGE: https://docs.tigerdata.com/self-hosted/manage-storage/ =====
