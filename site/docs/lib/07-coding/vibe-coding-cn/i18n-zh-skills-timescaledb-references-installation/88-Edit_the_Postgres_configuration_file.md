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
pageSha256: "183bbfb6cf347e24217790e1cd043c352ad4c7f2c4410ae33efec161f7b28d4d"
contentMode: "local-full"
zh: ""
---

## Edit the Postgres configuration file

The location of the Postgres configuration file depends on your operating
system and installation.

1. **Find the location of the config file for your Postgres instance**
   1. Connect to your database:
      
   1. Retrieve the database file location from the database internal configuration.
      
      Postgres returns the path to your configuration file. For example:

1. **Open the config file, then [edit your Postgres configuration][pg-config]**

1. **Save your updated configuration**

When you have saved the changes you make to the configuration file, the new configuration is
   not applied immediately. The configuration file is automatically reloaded when the server
   receives a `SIGHUP` signal. To manually reload the file, use the `pg_ctl` command.
