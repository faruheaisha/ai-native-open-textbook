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
pageSha256: "85864f22cb95f6ba319500e3109d37d7aab752622908bd08fe5fbd797c980fd5"
contentMode: "local-full"
zh: ""
---

## Update TimescaleDB Toolkit

Update Toolkit by installing the latest version and running `ALTER EXTENSION`.

1.  Update your local repository list:

1. Install the latest version of TimescaleDB Toolkit:

1.  [Connect to the database][connect] where you want to use the new version of Toolkit.
1.  Update the Toolkit extension in the database:

For some Toolkit versions, you might need to disconnect and reconnect active
    sessions.

To follow this procedure:

- [Install TimescaleDB][red-hat-install].
- Create a TimescaleDB repository in your `yum` `repo.d` directory.
