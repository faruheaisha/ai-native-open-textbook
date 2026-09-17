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
pageSha256: "b15d90108af8be960502b07032a527bc85c10fd0497332e57e28d0f7deab68cd"
contentMode: "local-full"
zh: ""
---

## Setting parameters at the command prompt

If you don't want to open the configuration file to make changes, you can also
set parameters directly from the command prompt inside your Docker container,
using the `-c` option. For example:

===== PAGE: https://docs.tigerdata.com/self-hosted/configuration/configuration/ =====

**Examples:**

Example 1 (bash):
```bash
docker start timescaledb
```

Example 2 (bash):
```bash
docker exec -i -t timescaledb /bin/bash
```

Example 3 (bash):
```bash
vi /var/lib/postgresql/data/postgresql.conf
```

Example 4 (bash):
```bash
docker restart timescaledb
```
