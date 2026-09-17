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
pageSha256: "5fa58717ca066f4e12bb1d629f824549fd5ac09bc01597bb03b746bf417bda5b"
contentMode: "local-full"
zh: ""
---

## Configure replication

**URL:** llms-txt#configure-replication

**Contents:**
- Configure the primary database
  - Configuring the primary database
- Configure replication parameters
  - Configuring replication parameters
- Create replication slots
  - Creating replication slots
- Configure host-based authentication parameters
  - Configuring host-based authentication parameters
- Create a base backup on the replica
  - Creating a base backup on the replica

This section outlines how to set up asynchronous streaming replication on one or
more database replicas.

Tiger Cloud is a fully managed service with automatic backup and restore, high
availability with replication, seamless scaling and resizing, and much more. You
can try Tiger Cloud free for thirty days.

Before you begin, make sure you have at least two separate instances of
TimescaleDB running. If you installed TimescaleDB using a Docker container, use
a [Postgres entry point script][docker-postgres-scripts] to run the
configuration. For more advanced examples, see the
[TimescaleDB Helm Charts repository][timescale-streamrep-helm].

To configure replication on self-hosted TimescaleDB, you need to perform these
procedures:

1.  [Configure the primary database][configure-primary-db]
1.  [Configure replication parameters][configure-params]
1.  [Create replication slots][create-replication-slots]
1.  [Configure host-based authentication parameters][configure-pghba]
1.  [Create a base backup on the replica][create-base-backup]
1.  [Configure replication and recovery settings][configure-replication]
1.  [Verify that the replica is working][verify-replica]
