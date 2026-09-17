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
pageSha256: "6d749bba8cba607aaa97b85105d84cb00d53614643b0e182450bc9165d16a921"
contentMode: "local-full"
zh: ""
---

## View logs in Docker

If you have TimescaleDB installed in a Docker container, you can view your logs
using Docker, instead of looking in `/var/log`. For more
information, see the [Docker documentation on logs][docker-logs].

And that is it! You have TimescaleDB running on a database on a self-hosted instance of Postgres.

What next? [Try the key features offered by Tiger Data][try-timescale-features], see the [tutorials][tutorials],
interact with the data in your Tiger Cloud service using [your favorite programming language][connect-with-code], integrate
your Tiger Cloud service with a range of [third-party tools][integrations], plain old [Use Tiger Data products][use-timescale], or dive
into the [API reference][use-the-api].

===== PAGE: https://docs.tigerdata.com/self-hosted/replication-and-ha/configure-replication/ =====

**Examples:**

Example 1 (unknown):
```unknown
docker pull timescale/timescaledb-ha:pg17
```

Example 2 (unknown):
```unknown
docker run -d --name timescaledb -p 5432:5432  -v </a/local/data/folder>:/pgdata -e PGDATA=/pgdata -e POSTGRES_PASSWORD=password timescale/timescaledb-ha:pg17
```

Example 3 (bash):
```bash
psql -d "postgres://postgres:password@localhost/postgres"
```

Example 4 (sql):
```sql
\dx
```
