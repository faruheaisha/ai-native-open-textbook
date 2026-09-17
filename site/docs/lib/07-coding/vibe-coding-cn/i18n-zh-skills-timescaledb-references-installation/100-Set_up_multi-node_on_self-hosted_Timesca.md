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
pageSha256: "f3155ab966600582e9693b3bc7b30be6a2b1c76bfce939b8576d8b58c6ae37fd"
contentMode: "local-full"
zh: ""
---

## Set up multi-node on self-hosted TimescaleDB

When you have installed TimescaleDB on the access node and as many data nodes as
you require, you can set up multi-node and create a distributed hypertable.

Before you begin, make sure you have considered what partitioning method you
want to use for your multi-node cluster. For more information about multi-node
and architecture, see the
[About multi-node section](https://docs.tigerdata.com/self-hosted/latest/multinode-timescaledb/about-multinode/).

### Setting up multi-node on self-hosted TimescaleDB

1.  On the access node (AN), run this command and provide the hostname of the
    first data node (DN1) you want to add:

1.  Repeat for all other data nodes:

1.  On the access node, create the distributed hypertable with your chosen
    partitioning. In this example, the distributed hypertable is called
    `example`, and it is partitioned on `time` and `location`:

1.  Insert some data into the hypertable. For example:

When you have set up your multi-node installation, you can configure your
cluster. For more information, see the [configuration section][configuration].

===== PAGE: https://docs.tigerdata.com/self-hosted/multinode-timescaledb/multinode-auth/ =====

**Examples:**

Example 1 (sql):
```sql
SELECT add_data_node('dn1', 'dn1.example.com')
```

Example 2 (sql):
```sql
SELECT add_data_node('dn2', 'dn2.example.com')
    SELECT add_data_node('dn3', 'dn3.example.com')
```

Example 3 (sql):
```sql
SELECT create_distributed_hypertable('example', 'time', 'location');
```

Example 4 (sql):
```sql
INSERT INTO example VALUES ('2020-12-14 13:45', 1, '1.2.3.4');
```
