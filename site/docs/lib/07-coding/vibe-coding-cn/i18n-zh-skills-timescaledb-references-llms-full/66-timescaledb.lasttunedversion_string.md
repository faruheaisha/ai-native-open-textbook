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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "10f03462d71421470503416e73742af82a1872a462da39d9930679185f8d3383"
contentMode: "local-full"
zh: ""
---

#### `timescaledb.last_tuned_version (string)`

Version of `timescaledb-tune` used to tune when it ran.

## Changing configuration with Docker

When running TimescaleDB in a [Docker container][docker], there are
two approaches to modifying your Postgres configuration. In the
following example, we modify the size of the database instance's
write-ahead-log (WAL) from 1&nbsp;GB to 2&nbsp;GB in a Docker container named
`timescaledb`.
