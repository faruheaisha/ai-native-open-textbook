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
pageSha256: "355c61740399a88eedbc64b8db7eb00c503be5eca89e6220837eea49007629d4"
contentMode: "local-full"
zh: ""
---

## Upgrade TimescaleDB within Docker

To upgrade TimescaleDB within Docker, you need to download the upgraded image,
stop the old container, and launch the new container pointing to your existing
data.

1.  **Pull the latest TimescaleDB image**

This command pulls the latest version of TimescaleDB running on Postgres 17:

If you're using another version of Postgres, look for the relevant tag in the [TimescaleDB HA](https://hub.docker.com/r/timescale/timescaledb-ha/tags) repository on Docker Hub.

1.  **Stop the old container, and remove it**

1. **Launch a new container with the upgraded Docker image**

Launch based on your mount point type:

1.  **Connect to the upgraded instance using `psql` with the `-X` flag**

1.  **At the psql prompt, use the `ALTER` command to upgrade the extension**

The [TimescaleDB Toolkit][toolkit] extension is packaged with TimescaleDB HA, it includes additional
hyperfunctions to help you with queries and data analysis.

If you have multiple databases, update each database separately.

1.  **Pull the latest TimescaleDB image**

This command pulls the latest version of TimescaleDB running on Postgres 17.

If you're using another version of Postgres, look for the relevant tag in the [TimescaleDB light](https://hub.docker.com/r/timescale/timescaledb) repository on Docker Hub.

1.  **Stop the old container, and remove it**

1. **Launch a new container with the upgraded Docker image**

Launch based on your mount point type:

1.  **Connect to the upgraded instance using `psql` with the `-X` flag**

1.  **At the psql prompt, use the `ALTER` command to upgrade the extension**

If you have multiple databases, you need to update each database separately.

===== PAGE: https://docs.tigerdata.com/self-hosted/upgrades/major-upgrade/ =====

**Examples:**

Example 1 (bash):
```bash
docker inspect timescaledb --format='{{range .Mounts }}{{.Type}}{{end}}'
```

Example 2 (bash):
```bash
docker inspect timescaledb --format='{{range .Mounts }}{{.Name}}{{end}}'
```

Example 3 (unknown):
```unknown
069ba64815f0c26783b81a5f0ca813227fde8491f429cf77ed9a5ae3536c0b2c
```

Example 4 (bash):
```bash
docker inspect timescaledb --format='{{range .Mounts }}{{.Source}}{{end}}'
```
