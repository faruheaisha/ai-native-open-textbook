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
pageSha256: "51a5c73d702d14b9a55d007dc0c89e0cc3091bfcfd2067d05feaa6caeb9a428b"
contentMode: "local-full"
zh: ""
---

## Run the TimescaleDB container in Docker

To make TimescaleDB use the WAL-E sidecar for archiving, the two containers need
to share a network. To do this, you need to create a Docker  network and then
launch TimescaleDB with archiving turned on, using the newly created network.
When you launch TimescaleDB, you need to explicitly set the location of the
write-ahead log (`POSTGRES_INITDB_WALDIR`) and data directory (`PGDATA`) so that
you can share them with the WAL-E sidecar. Both must reside in a Docker volume,
by default a volume is created for `/var/lib/postgresql/data`. When you have
started TimescaleDB, you can log in and create tables and data.

This section describes a feature that is deprecated. We strongly
recommend that you do not use this feature in a production environment. If you
need more information, [contact us](https://www.tigerdata.com/contact/).

### Running the TimescaleDB container in Docker

1.  Create the docker container:

1.  Launch TimescaleDB, with archiving turned on:

1.  Run TimescaleDB within Docker:
