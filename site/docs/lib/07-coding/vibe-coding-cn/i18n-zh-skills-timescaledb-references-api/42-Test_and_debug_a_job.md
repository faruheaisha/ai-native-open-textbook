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
pageSha256: "b1e86d6beb4371e7a705ccc5d04bed6fe5f364cb8158cab278c0ec42d441e473"
contentMode: "local-full"
zh: ""
---

## Test and debug a job

To debug a job, increase the log level and run the job manually with [`run_job`][api-run_job] in the foreground. Because `run_job` is a stored procedure and not a function, run it with [`CALL`][postgres-call] instead of `SELECT`.

1.  **Set the minimum log level to `DEBUG1`**

Replace `1000` with your `job_id`:
