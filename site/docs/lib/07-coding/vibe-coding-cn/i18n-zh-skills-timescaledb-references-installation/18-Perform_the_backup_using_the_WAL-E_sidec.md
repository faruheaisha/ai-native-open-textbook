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
pageSha256: "b96a4ecda756ede4de747b411af2fbe91b00977a50a6d0bf4fbd644a1034933e"
contentMode: "local-full"
zh: ""
---

## Perform the backup using the WAL-E sidecar

The [WAL-E Docker image][wale image] runs a web endpoint that accepts WAL-E
commands across an HTTP API. This allows Postgres to communicate with the
WAL-E sidecar over the internal network to trigger archiving. You can also use
the container to invoke WAL-E directly. The Docker image accepts standard WAL-E
environment variables to configure the archiving backend, so you can issue
commands from services such as AWS S3. For information about configuring, see
the official [WAL-E documentation][wale official].

To enable the WAL-E docker image to perform archiving, it needs to use the same
network and data volumes as the TimescaleDB container. It also needs to know the
location of the write-ahead log and data directories. You can pass all this
information to WAL-E when you start it. In this example, the WAL-E image listens
for commands on the `timescaledb-net` internal network at port 80, and writes
backups to `~/backups` on the Docker host.

### Performing the backup using the WAL-E sidecar

1.  Start the WAL-E container with the required information about the container.
    In this example, the container is called `timescaledb-wale`:

1.  Start the backup:

Alternatively, you can start the backup using the sidecar's HTTP endpoint.
    This requires exposing the sidecar's port 80 on the Docker host by mapping
    it to an open port. In this example, it is mapped to port 8080:

You should do base backups at regular intervals daily, to minimize
the amount of WAL-E replay, and to make recoveries faster. To make new base
backups, re-trigger a base backup as shown here, either manually or on a
schedule. If you run TimescaleDB on Kubernetes, there is built-in support for
scheduling cron jobs that can invoke base backups using the WAL-E container's
HTTP API.

To recover the database instance from the backup archive, create a new TimescaleDB
container, and restore the database and configuration files from the base
backup. Then you can relaunch the sidecar and the database.

### Restoring database files from backup

1.  Create the docker container:

1.  Restore the database files from the base backup:

1.  Recreate the configuration files. These are backed up from the original
    database instance:

1.  Create a `recovery.conf` file that tells Postgres how to recover:

When you have recovered the data and the configuration files, and have created a
recovery configuration file, you can relaunch the sidecar. You might need to
remove the old one first. When you relaunch the sidecar, it replays the last WAL
segments that might be missing from the base backup. The you can relaunch the
database, and check that recovery was successful.

### Relaunch the recovered database

1.  Relaunch the WAL-E sidecar:

1.  Relaunch the TimescaleDB docker container:

1.  Verify that the database started up and recovered successfully:

Don't worry if you see some archive recovery errors in the log at this
    stage. This happens because the recovery is not completely finalized until
    no more files can be found in the archive. See the Postgres documentation
    on [continuous archiving][pg archiving] for more information.

===== PAGE: https://docs.tigerdata.com/self-hosted/uninstall/uninstall-timescaledb/ =====

**Examples:**

Example 1 (bash):
```bash
docker network create timescaledb-net
```

Example 2 (bash):
```bash
docker run \
      --name timescaledb \
      --network timescaledb-net \
      -e POSTGRES_PASSWORD=insecure \
      -e POSTGRES_INITDB_WALDIR=/var/lib/postgresql/data/pg_wal \
      -e PGDATA=/var/lib/postgresql/data/pg_data \
      timescale/timescaledb:latest-pg10 postgres \
      -cwal_level=archive \
      -carchive_mode=on \
      -carchive_command="/usr/bin/wget wale/wal-push/%f -O -" \
      -carchive_timeout=600 \
      -ccheckpoint_timeout=700 \
      -cmax_wal_senders=1
```

Example 3 (bash):
```bash
docker exec -it timescaledb psql -U postgres
```

Example 4 (bash):
```bash
docker run \
      --name wale \
      --network timescaledb-net \
      --volumes-from timescaledb \
      -v ~/backups:/backups \
      -e WALE_LOG_DESTINATION=stderr \
      -e PGWAL=/var/lib/postgresql/data/pg_wal \
      -e PGDATA=/var/lib/postgresql/data/pg_data \
      -e PGHOST=timescaledb \
      -e PGPASSWORD=insecure \
      -e PGUSER=postgres \
      -e WALE_FILE_PREFIX=file://localhost/backups \
      timescale/timescaledb-wale:latest
```
