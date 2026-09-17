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
pageSha256: "25a069998689376dc4876d2db7212f25c1b0c7a92e99b8f32b1a52b4c62443a4"
contentMode: "local-full"
zh: ""
---

## Install TimescaleDB on Linux

**URL:** llms-txt#install-timescaledb-on-linux

**Contents:**
- Install and configure TimescaleDB on Postgres
- Add the TimescaleDB extension to your database
- Supported platforms
- Where to next

TimescaleDB is a [Postgres extension](https://www.postgresql.org/docs/current/external-extensions.html) for
time series and demanding workloads that ingest and query high volumes of data.

This section shows you how to:

* [Install and configure TimescaleDB on Postgres](#install-and-configure-timescaledb-on-postgresql) - set up
  a self-hosted Postgres instance to efficiently run TimescaleDB.
* [Add the TimescaleDB extension to your database](#add-the-timescaledb-extension-to-your-database) - enable TimescaleDB
  features and performance improvements on a database.

The following instructions are for development and testing installations. For a production environment, we strongly recommend
that you implement the following, many of which you can achieve using Postgres tooling:

- Incremental backup and database snapshots, with efficient point-in-time recovery.
- High availability replication, ideally with nodes across multiple availability zones.
- Automatic failure detection with fast restarts, for both non-replicated and replicated deployments.
- Asynchronous replicas for scaling reads when needed.
- Connection poolers for scaling client connections.
- Zero-down-time minor version and extension upgrades.
- Forking workflows for major version upgrades and other feature testing.
- Monitoring and observability.

Deploying for production?  With a Tiger Cloud service we tune your database for performance and handle scalability, high
availability, backups, and management, so you can relax.
