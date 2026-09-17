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
pageSha256: "2aa6cf580dd173a9ad4cffe6efb6441aafb9810fba78657423491cfe59d4838b"
contentMode: "local-full"
zh: ""
---

## Set up multi-node on self-hosted TimescaleDB

**URL:** llms-txt#set-up-multi-node-on-self-hosted-timescaledb

**Contents:**
- Set up multi-node on self-hosted TimescaleDB
  - Setting up multi-node on self-hosted TimescaleDB

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

To set up multi-node on a self-hosted TimescaleDB instance, you need:

*   A Postgres instance to act as an access node (AN)
*   One or more Postgres instances to act as data nodes (DN)
*   TimescaleDB [installed][install] and [set up][setup] on all nodes
*   Access to a superuser role, such as `postgres`, on all nodes

The access and data nodes must begin as individual TimescaleDB instances.
They should be hosts with a running Postgres server and a loaded TimescaleDB
extension. For more information about installing self-hosted TimescaleDB
instances, see the [installation instructions][install]. Additionally, you
can configure [high availability with multi-node][multi-node-ha] to
increase redundancy and resilience.

The multi-node TimescaleDB architecture consists of an access node (AN) which
stores metadata for the distributed hypertable and performs query planning
across the cluster, and a set of data nodes (DNs) which store subsets of the
distributed hypertable dataset and execute queries locally. For more information
about the multi-node architecture, see [about multi-node][about-multi-node].

If you intend to use continuous aggregates in your multi-node environment, check
the additional considerations in the [continuous aggregates][caggs] section.
