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
pageSha256: "f8ab6a3a0ac7f967ed533a3c1bbad4eb1c03c49a8e4e11b29b49c9fc88279265"
contentMode: "local-full"
zh: ""
---

## Distributed hypertables ( Sunsetted v2.14.x )

**URL:** llms-txt#distributed-hypertables-(-sunsetted-v2.14.x-)

[Multi-node support is sunsetted][multi-node-deprecation].

TimescaleDB v2.13 is the last release that includes multi-node support for Postgres
versions 13, 14, and 15.

Distributed hypertables are an extension of regular hypertables, available when
using a [multi-node installation][getting-started-multi-node] of TimescaleDB.
Distributed hypertables provide the ability to store data chunks across multiple
data nodes for better scale-out performance.

Most management APIs used with regular hypertable chunks also work with distributed
hypertables as documented in this section. There are a number of APIs for
specifically dealing with data nodes and a special API for executing SQL commands
on data nodes.

===== PAGE: https://docs.tigerdata.com/self-hosted/install/ =====
