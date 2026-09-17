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
pageSha256: "a0bbaa0c79db52d893d7611348a005d62c646102ceaf8c5b1589798a48ab980b"
contentMode: "local-full"
zh: ""
---

## Ongoing physical backups with Docker & WAL-E

**URL:** llms-txt#ongoing-physical-backups-with-docker-&-wal-e

**Contents:**
- Run the TimescaleDB container in Docker
  - Running the TimescaleDB container in Docker
- Perform the backup using the WAL-E sidecar
  - Performing the backup using the WAL-E sidecar
- Recovery
  - Restoring database files from backup
  - Relaunch the recovered database

When you run TimescaleDB in a containerized environment, you can use
[continuous archiving][pg archiving] with a [WAL-E][wale official] container.
These containers are sometimes referred to as sidecars, because they run
alongside the main container. A [WAL-E sidecar image][wale image]
works with TimescaleDB as well as regular Postgres. In this section, you
can set up archiving to your local filesystem with a main TimescaleDB
container called `timescaledb`, and a WAL-E sidecar called `wale`. When you are
ready to implement this in your production deployment, you can adapt the
instructions here to do archiving against cloud providers such as AWS S3, and
run it in an orchestration framework such as Kubernetes.

Tiger Cloud is a fully managed service with automatic backup and restore, high
availability with replication, seamless scaling and resizing, and much more. You
can try Tiger Cloud free for thirty days.
