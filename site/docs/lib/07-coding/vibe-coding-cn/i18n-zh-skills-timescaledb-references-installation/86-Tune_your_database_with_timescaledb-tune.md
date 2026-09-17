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
pageSha256: "2fb8234be6257705c76d70aeba916b35f47207f9a8150cadd9b79efbbe29bbd8"
contentMode: "local-full"
zh: ""
---

## Tune your database with timescaledb-tune

Run `timescaledb-tune` from the command line. The tool analyzes your
`postgresql.conf` file to provide recommendations for memory, parallelism,
write-ahead log, and other settings. These changes are written to your
`postgresql.conf`. They take effect on the next restart.

1.  At the command line, run `timescaledb-tune`. To accept all recommendations
    automatically, include the `--yes` flag.

1.  If you didn't use the `--yes` flag, respond to each prompt to accept or
    reject the recommendations.
1.  The changes are written to your `postgresql.conf`.

For detailed instructions and other options, see the documentation in the
[Github repository](https://github.com/timescale/timescaledb-tune).

===== PAGE: https://docs.tigerdata.com/self-hosted/install/installation-windows/ =====

**Examples:**

Example 1 (bash):
```bash
timescaledb-tune
```
