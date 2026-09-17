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
pageSha256: "127ba732711fa2eee9b8ae433be72118a1219649ab17deddf44ea156fe805845"
contentMode: "local-full"
zh: ""
---

## High availability with multi-node

**URL:** llms-txt#high-availability-with-multi-node

**Contents:**
- Native replication
  - Automation
  - Configuring native replication
  - Node failures

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

A multi-node installation of TimescaleDB can be made highly available
by setting up one or more standbys for each node in the cluster, or by
natively replicating data at the chunk level.

Using standby nodes relies on streaming replication and you set it up
in a similar way to [configuring single-node HA][single-ha], although the
configuration needs to be applied to each node independently.

To replicate data at the chunk level, you can use the built-in
capabilities of multi-node TimescaleDB to avoid having to
replicate entire data nodes. The access node still relies on a
streaming replication standby, but the data nodes need no additional
configuration. Instead, the existing pool of data nodes share
responsibility to host chunk replicas and handle node failures.

There are advantages and disadvantages to each approach.
Setting up standbys for each node in the cluster ensures that
standbys are identical at the instance level, and this is a tried
and tested method to provide high availability. However, it also
requires more setting up and maintenance for the mirror cluster.

Native replication typically requires less resources, nodes, and
configuration, and takes advantage of built-in capabilities, such as
adding and removing data nodes, and different replication factors on
each distributed hypertable. However, only chunks are replicated on
the data nodes.

The rest of this section discusses native replication. To set up
standbys for each node, follow the instructions for [single node
HA][single-ha].
