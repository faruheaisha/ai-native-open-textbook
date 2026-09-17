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
pageSha256: "8f6319d9bf517f76347553ff63fa645567d3281e2402d695208511cf94ea5f14"
contentMode: "local-full"
zh: ""
---

## Dump TimescaleDB meta data

To help when asking for support and reporting bugs, TimescaleDB includes an SQL dump script. It outputs metadata from the internal TimescaleDB tables, along with version information.

This script is available in the source distribution in `scripts/`. To use it, run:

Inspect `dumpfile.txt` before sending it together with a bug report or support question.
