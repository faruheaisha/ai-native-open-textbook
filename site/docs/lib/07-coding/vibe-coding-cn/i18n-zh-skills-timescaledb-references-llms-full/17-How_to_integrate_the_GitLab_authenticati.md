---
title: "Migrate from self-hosted TimescaleDB to Managed Service for TimescaleDB"
sourceId: "07-coding/vibe-coding-cn"
sourceTitle: "Vibe Coding CN"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/2025Emma/vibe-coding-cn"
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "fa701d9780e9a7dfe43d2ec689b517e2b3014bb393be988fa772e66655453fa0"
contentMode: "local-full"
zh: ""
---

# Migrate from self-hosted TimescaleDB to Managed Service for TimescaleDB

You can migrate your data from self-hosted TimescaleDB to Managed Service for TimescaleDB and automate most of the common operational tasks.

Each service has a database named `defaultdb`, and a default user account named `tsdbadmin`. You use
MST Console to create additional users and databases using the `Users` and `Databases` tabs.

You can switch between different plan sizes in Managed Service for TimescaleDB.
However, during the migration process, choose a plan size that has the same
storage size or slightly larger than the currently allocated plan. This allows
you to limit the downtime during the migration process and have sufficient compute and storage resources.

Depending on your database size and network speed, migration can take a very
long time. During this time, any new writes that happen during the migration
process are not included. To prevent data loss, turn off all the
writes to the source self-hosted TimescaleDB database before you start migration.

Before migrating for production, do a cold run without turning off writes to the source self-hosted TimescaleDB database.
This gives you an estimate of the time the migration process takes, and helps you to practice migrating without causing
downtime to your customers.

If you prefer the features of Tiger Cloud, you can easily [migrate your data][migrate-live] from an service
to a Tiger Cloud service.

## Prerequisites

Before you migrate your data, do the following:

* Set up the migration machine:

   You run the migration commands on the migration machine. It must have enough disk space to hold the dump file.
   * Install the Postgres [`pg_dump`][pg_dump] and [`pg_restore`][pg_restore] utilities on a migration machine.

   * Install a client to connect to self-hosted TimescaleDB and Managed Service for TimescaleDB.

      These instructions use [`psql`][psql], but any client works.

*  Create a target service:

    For more information, see the [Install Managed Service for TimescaleDB][install-mst]. Provision your target service with enough
    space for all your data.

*  On the source self-hosted TimescaleDB and the target service, ensure that you are running:
   *  The same major version of Postgres.

      For information, see [upgrade Postgres][upgrading-postgresql-self-hosted].

   *  The same major version of TimescaleDB

      For more information, see [Upgrade TimescaleDB to a major version][upgrading-timescaledb].

## Migrate your data to a service

To move your data from self-hosted TimescaleDB instance to a service, run the following commands from your migration
machine:

1. **Take offline the applications that connect to the source self-hosted TimescaleDB instance**

   The duration of migration is proportional to the amount of data stored in your database. By
   disconnecting your app from your database, you avoid possible data loss.

1. **Set your connection strings**

   These variables hold the connection information for the source self-hosted TimescaleDB instance and the target service:

   ```bash
   export SOURCE="postgres://<user>:<password>@<source host>:<source port>/<db_name>"
   export TARGET="postgres://tsdbadmin:<password>@<host>:<port>/defaultdb?sslmode=require"
   ```

1. **Dump the data from your source Tiger Cloud service**

    ```bash
    pg_dump -d "source" --no-owner -Fc -v -f dump.bak
    ```

1. **Put your target service in the right state for restoring**

   ```bash
   psql -d "target" -c "SELECT timescaledb_pre_restore();"
   ```

1. **Upload your data to the target service**

    ```bash
    pg_restore -d "target" --jobs 4 -Fc dump.bak
    ```
   The `--jobs`  option specifies the number of CPUs to use to dump and restore the database concurrently.

1. **Return your target service to normal operations**

   ```bash
   psql -d "target" -c "SELECT timescaledb_post_restore();"
   ```

1.  Connect to your new database and update your table statistics by running
    [`ANALYZE`]   [analyze] on your entire dataset:

    ```sql
    psql -d "target" defaultdb=> ANALYZE;
    ```

To migrate from multiple databases, you repeat this migration procedure one database after another.

## Troubleshooting

If you see the following errors during migration, you can safely ignore them. The migration still runs
successfully.

-  For `pg_dump`:

    ```bash
    pg_dump: warning: there are circular foreign-key constraints on this table:
    pg_dump: hypertable
    pg_dump: You might not be able to restore the dump without using --disable-triggers or temporarily dropping the constraints.
    pg_dump: Consider using a full dump instead of a --data-only dump to avoid this problem.
    pg_dump: NOTICE:  hypertable data are in the chunks, no data will be copied
    DETAIL:  Data for hypertables are stored in the chunks of a hypertable so COPY TO of a hypertable will not copy any data.
    HINT:  Use "COPY (SELECT * FROM &lt;hypertable>) TO ..." to copy all data in hypertable, or copy each chunk individually.
    ```

- For `pg_restore`:

   ```bash
   pg_restore: while PROCESSING TOC:
   pg_restore: from TOC entry 4142; 0 0 COMMENT EXTENSION timescaledb
   pg_restore: error: could not execute query: ERROR:  must be owner of extension timescaledb
   Command was: COMMENT ON EXTENSION timescaledb IS 'Enables scalable inserts and complex queries for time-series data';

 ```

===== PAGE: https://docs.tigerdata.com/mst/restapi/ =====

# Using REST API in Managed Service for TimescaleDB

Managed Service for TimescaleDB has an API for integration and automation tasks.
For information about using the endpoints, see the [API Documentation][aiven-api].
MST offers an HTTP API with token authentication and JSON-formatted data. You
can use the API for all the tasks that can be performed using the MST Console.
To get started you need to first create an authentication token, and then use
the token in the header to use the API endpoints.

1.  In [Managed Service for TimescaleDB][mst-login], click `User Information` in the top right corner.
1.  In the `User Profile` page, navigate to the `Authentication`tab.
1.  Click `Generate Token`.
1.  In the `Generate access token` dialog, type a descriptive name for the
    token and leave the rest of the fields blank.
1.  Copy the generated authentication token and save it.

### Using cURL to get your details

1.  Set the environment variable `MST_API_TOKEN` with the access token that you generate:

    ```bash
    export MST_API_TOKEN="access token"
    ```

1.  To get the details about the current user session using the `/me` endpoint:

    ```bash
    curl -s -H "Authorization: aivenv1 $MST_API_TOKEN" https://api.aiven.io/v1/me|json_pp
    ```

    The output looks similar to this:

    ```bash
    \{
        "user": \{
            "auth": [],
            "create_time": "string",
            "features": \{ \},
            "intercom": \{\},
            "invitations": [],
            "project_membership": \{\},
            "project_memberships": \{\},
            "projects": [],
            "real_name": "string",
            "state": "string",
            "token_validity_begin": "string",
            "user": "string",
            "user_id": "string"
        \}
    \}
    ```

===== PAGE: https://docs.tigerdata.com/mst/identify-index-issues/ =====

# Identify and resolve issues with indexes in Managed Service for TimescaleDB

Postgres indexes can be corrupted for a variety of reasons, including
software bugs, hardware failures, or unexpected duplicated data. `REINDEX` allows
you to rebuild the index in such situations.

## Rebuild non-unique indexes

You can rebuild corrupted indexes that do not have `UNIQUE` in their definition.
You can run the `REINDEX` command for all indexes of a table (`REINDEX TABLE`),
and for all indexes in the entire database (`REINDEX DATABASE`).
For more information on the `REINDEX` command, see the [Postgres documentation][postgres-docs].

This command creates a new index that replaces the old one:

```sql
