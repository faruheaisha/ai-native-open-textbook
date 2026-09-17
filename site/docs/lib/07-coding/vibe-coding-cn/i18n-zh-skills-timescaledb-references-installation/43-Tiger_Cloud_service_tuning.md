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
pageSha256: "398ba4c294a6c23a60a7fef869cc344ebf58879690d660fc31af87595be4e8be"
contentMode: "local-full"
zh: ""
---

## Tiger Cloud service tuning

### `timescaledb.disable_load (bool)`
Disable the loading of the actual extension

### `timescaledb.restoring (bool)`

Set TimescaleDB in restoring mode. It is disabled by default.

### `timescaledb.license (string)`

Change access to features based on the TimescaleDB license in use. For example,
setting `timescaledb.license` to `apache` limits TimescaleDB to features that
are implemented under the Apache 2 license. The default value is `timescale`,
which allows access to all features.

### `timescaledb.telemetry_level (enum)`

Telemetry settings level. Level used to determine which telemetry to
send. Can be set to `off` or `basic`. Defaults to `basic`.

### `timescaledb.last_tuned (string)`

Records last time `timescaledb-tune` ran.

### `timescaledb.last_tuned_version (string)`

Version of `timescaledb-tune` used to tune when it runs.

===== PAGE: https://docs.tigerdata.com/api/configuration/gucs/ =====
