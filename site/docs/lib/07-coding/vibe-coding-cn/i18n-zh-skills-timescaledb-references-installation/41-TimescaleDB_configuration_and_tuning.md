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
pageSha256: "0553dda87c95cd5467d037a7382d7d019af0c1e66ecaf1b6e8a4d178dc652122"
contentMode: "local-full"
zh: ""
---

## TimescaleDB configuration and tuning

**URL:** llms-txt#timescaledb-configuration-and-tuning

**Contents:**
- Query Planning and Execution
  - `timescaledb.enable_chunkwise_aggregation (bool)`
  - `timescaledb.vectorized_aggregation (bool)`
  - `timescaledb.enable_merge_on_cagg_refresh  (bool)`
- Policies
  - `timescaledb.max_background_workers (int)`
- Tiger Cloud service tuning
  - `timescaledb.disable_load (bool)`
- Administration
  - `timescaledb.restoring (bool)`

Just as you can tune settings in Postgres, TimescaleDB provides a number of configuration
settings that may be useful to your specific installation and performance needs. These can
also be set within the `postgresql.conf` file or as command-line parameters
when starting Postgres.
