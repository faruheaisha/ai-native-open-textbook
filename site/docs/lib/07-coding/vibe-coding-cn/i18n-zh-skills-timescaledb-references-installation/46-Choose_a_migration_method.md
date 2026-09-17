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
pageSha256: "f080fb0dd1d727119baa575d8743e7146c34819da1d15a8952a09e15e43252ce"
contentMode: "local-full"
zh: ""
---

## Choose a migration method

Which method you choose depends on your database size, network upload and
download speeds, existing continuous aggregates, and tolerance for failure
recovery.

If you are migrating from an Amazon RDS service, Amazon charges for the amount
of data transferred out of the service. You could be charged by Amazon for all
data egressed, even if the migration fails.

If your database is smaller than 100&nbsp;GB, choose to migrate your entire
database at once. You can also migrate larger databases using this method, but
the copying process must keep running, potentially over days or weeks. If the
copy is interrupted, the process needs to be restarted. If you think an
interruption in the copy is possible, choose to migrate your schema and data
separately instead.

Migrating your schema and data separately does not retain continuous aggregates
calculated using already-deleted data. For example, if you delete raw data after
a month but retain downsampled data in a continuous aggregate for a year, the
continuous aggregate loses any data older than a month upon migration. If you
must keep continuous aggregates calculated using deleted data, migrate your
entire database at once regardless of database size.

If you aren't sure which method to use, try copying the entire database at once
to estimate the time required. If the time estimate is very long, stop the
migration and switch to the other method.
