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
pageSha256: "f7c0401a56ec882d4a7ee2773f27605e85fbd3fd25bd18bd8d9b51faca8ef0cc"
contentMode: "local-full"
zh: ""
---

## Uninstalling TimescaleDB using Homebrew

1.  At the `psql` prompt, remove the TimescaleDB extension:

1.  At the command prompt, remove `timescaledb` from `shared_preload_libraries`
    in the `postgresql.conf` configuration file:

1.  Save the changes to the `postgresql.conf` file.

1.  Restart Postgres:

1.  Check that the TimescaleDB extension is uninstalled by using the `\dx`
    command at the `psql` prompt. Output is similar to:

1.  Uninstall TimescaleDB:

1.  Remove all the dependencies and related files:
