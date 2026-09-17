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
pageSha256: "a0bd2356c6ccb0e05ab2002d11f80ffa04b3a6ff5a86c7f9b45f5fd538647d5b"
contentMode: "local-full"
zh: ""
---

## Install and configure TimescaleDB on Postgres

This section shows you how to install the latest version of Postgres and
TimescaleDB on a [supported platform](#supported-platforms) using containers supplied by Tiger Data.

1.  **Run the TimescaleDB Docker image**

The [TimescaleDB HA](https://hub.docker.com/r/timescale/timescaledb-ha) Docker image offers the most complete
    TimescaleDB experience. It uses [Ubuntu][ubuntu], includes
    [TimescaleDB Toolkit](https://github.com/timescale/timescaledb-toolkit), and support for PostGIS and Patroni.

To install the latest release based on Postgres 17:

TimescaleDB is pre-created in the default Postgres database and is added by default to any new database you create in this image.

1.  **Run the container**

Replace `</a/local/data/folder>` with the path to the folder you want to keep your data in the following command.

If you are running multiple container instances, change the port each Docker instance runs on.

On UNIX-based systems, Docker modifies Linux IP tables to bind the container. If your system uses Linux Uncomplicated Firewall (UFW), Docker may
    [override your UFW port binding settings][override-binding]. To prevent this, add `DOCKER_OPTS="--iptables=false"` to `/etc/default/docker`.

1.  **Connect to a database on your Postgres instance**

The default user and database are both `postgres`. You set the password in `POSTGRES_PASSWORD` in the previous step. The default command to connect to Postgres is:

1.  **Check that TimescaleDB is installed**

You see the list of installed extensions:

Press `q` to exit the list of extensions.
