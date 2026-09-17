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
pageSha256: "c5bb1ed75638a82caea2330964fe59db1b8acc8cd642a2a3589023e39b3c2e35"
contentMode: "local-full"
zh: ""
---

## View logs in Docker

If you have TimescaleDB installed in a Docker container, you can view your logs
using Docker, instead of looking in `/var/lib/logs` or `/var/logs`. For more
information, see the [Docker documentation on logs][docker-logs].

1.  **Run the TimescaleDB Docker image**

The light-weight [TimescaleDB](https://hub.docker.com/r/timescale/timescaledb) Docker image uses [Alpine][alpine] and does not contain [TimescaleDB Toolkit](https://github.com/timescale/timescaledb-toolkit) or support for PostGIS and Patroni.

To install the latest release based on Postgres 17:

TimescaleDB is pre-created in the default Postgres database and added by default to any new database you create in this image.

1.  **Run the container**

If you are running multiple container instances, change the port each Docker instance runs on.

On UNIX-based systems, Docker modifies Linux IP tables to bind the container. If your system uses Linux Uncomplicated Firewall (UFW), Docker may [override your UFW port binding settings][override-binding]. To prevent this, add `DOCKER_OPTS="--iptables=false"` to `/etc/default/docker`.

1.  **Connect to a database on your Postgres instance**

The default user and database are both `postgres`. You set the password in `POSTGRES_PASSWORD` in the previous step. The default command to connect to Postgres in this image is:

1.  **Check that TimescaleDB is installed**

You see the list of installed extensions:

Press `q` to exit the list of extensions.
