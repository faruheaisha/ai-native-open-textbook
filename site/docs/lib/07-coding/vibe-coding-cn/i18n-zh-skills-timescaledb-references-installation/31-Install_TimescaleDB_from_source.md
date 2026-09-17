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
pageSha256: "429e20a49a4faba3c6376f732b807a5d67d6906068270bd56333e7c7b7e0ade5"
contentMode: "local-full"
zh: ""
---

## Install TimescaleDB from source

**URL:** llms-txt#install-timescaledb-from-source

**Contents:**
  - Prerequisites
- Install and configure TimescaleDB on Postgres
- Add the TimescaleDB extension to your database
- Where to next

TimescaleDB is a [Postgres extension](https://www.postgresql.org/docs/current/external-extensions.html) for
time series and demanding workloads that ingest and query high volumes of data. You can install a TimescaleDB
instance on any local system, from source.

This section shows you how to:

* [Install and configure TimescaleDB on Postgres](#install-and-configure-timescaledb-on-postgres) - set up
  a self-hosted Postgres instance to efficiently run TimescaleDB1.
* [Add the TimescaleDB extension to your database](#add-the-timescaledb-extension-to-your-database) - enable TimescaleDB features and
  performance improvements on a database.

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

To install TimescaleDB from source, you need the following on your developer environment:

Install a [supported version of Postgres][compatibility-matrix] using the [Postgres installation instructions][postgres-download].

We recommend not using TimescaleDB with Postgres 17.1, 16.5, 15.9, 14.14, 13.17, 12.21.
    These minor versions [introduced a breaking binary interface change][postgres-breaking-change] that,
    once identified, was reverted in subsequent minor Postgres versions 17.2, 16.6, 15.10, 14.15, 13.18, and 12.22.
    When you build from source, best practice is to build with Postgres 17.2, 16.6, etc and higher.
    Users of [Tiger Cloud](https://console.cloud.timescale.com/) and Platform packages built and
    distributed by Tiger Data are unaffected.

*   [CMake version 3.11 or later][cmake-download]
  *   C language compiler for your operating system, such as `gcc` or `clang`.

If you are using a Microsoft Windows system, you can install Visual Studio 2015
      or later instead of CMake and a C language compiler. Ensure you install the
      Visual Studio components for CMake and Git when you run the installer.
