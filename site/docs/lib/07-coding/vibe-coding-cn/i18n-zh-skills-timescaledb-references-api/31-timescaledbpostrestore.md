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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "2d4f7de653b1c561d9fee4cba500a398a8e61e117c700d9ce8c9824605cd3dae"
contentMode: "local-full"
zh: ""
---

## timescaledb_post_restore()

Perform the required operations after you have finished restoring the database using `pg_restore`. Specifically, this resets the `timescaledb.restoring` GUC and restarts any background workers.

For more information, see [Migrate using pg_dump and pg_restore].

Prepare the database for normal use after a restore:
