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
pageSha256: "6d9df14f8654a6d5713a2596af290c06005327a864147ab91d7c25fe5b12aea9"
contentMode: "local-full"
zh: ""
---

## Configure host-based authentication parameters

There are several replication settings that need to be added or edited to the
`pg_hba.conf` configuration file. In this example, the settings restrict
replication connections to traffic coming from `REPLICATION_HOST_IP` as the
Postgres user `repuser` with a valid password. `REPLICATION_HOST_IP` can
initiate streaming replication from that machine without additional credentials.
You can change the `address` and `method` values to match your security and
network settings.

For more information about `pg_hba.conf`, see the
[`pg_hba` documentation][pg-hba-docs].

### Configuring host-based authentication parameters

1.  Open the `pg_hba.conf` configuration file and add or edit this line:

1.  Restart Postgres to pick up the changes.
