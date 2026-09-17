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
pageSha256: "9d509770c7fe62e5f0dd858c0bf692693737c64315804aabf4640895c4772524"
contentMode: "local-full"
zh: ""
---

## Import data into your service

To import data from a CSV file:

1. **Set up your service connection string**

This variable holds the connection information for the target Tiger Cloud service.

In the terminal on the source machine, set the following:

See where to [find your connection details][connection-info].

1. **Create a [hypertable][hypertable-docs] to hold your data**

Create a hypertable with a schema that is compatible with the data in your parquet file. For example, if your parquet file contains the columns `ts`, `location`, and `temperature` with types`TIMESTAMP`, `STRING`, and `DOUBLE`:

- TimescaleDB v2.20 and above:

sql
         psql target -c  "CREATE TABLE  ( \
            ts          TIMESTAMPTZ         NOT NULL,  \
            location    TEXT                NOT NULL,  \
            temperature DOUBLE PRECISION    NULL  \
         );"
         sql
         psql target -c  "SELECT create_hypertable('', by_range('&lt;COLUMN_NAME>'))"
         bash
        timescaledb-parallel-copy \
        --connection target \
        --table  \
        --file &lt;FILE_NAME>.csv \
        --workers &lt;NUM_WORKERS> \
        --reporting-period 30s
      bash
       psql target
       \c &lt;DATABASE_NAME>
       \COPY  FROM &lt;FILENAME>.csv CSV"
       bash
export TARGET=postgres://tsdbadmin:&lt;PASSWORD>@&lt;HOST>:&lt;PORT>/tsdb?sslmode=require
bash
   SOURCE="mysql://&lt;mysql_username>:&lt;mysql_password>@&lt;mysql_host>:&lt;mysql_port>/&lt;mysql_database>?sslmode=require"
   docker
    docker run -it ghcr.io/dimitri/pgloader:latest pgloader
    --no-ssl-cert-verification \
    "source" \
    "target"
    bash
export TARGET=postgres://tsdbadmin:&lt;PASSWORD>@&lt;HOST>:&lt;PORT>/tsdb?sslmode=require
sql
      psql target -c "CREATE TABLE  ( \
      ts          TIMESTAMPTZ         NOT NULL, \
      location    TEXT                NOT NULL, \
      temperature DOUBLE PRECISION    NULL \
      ) WITH (timescaledb.hypertable, timescaledb.partition_column = 'ts');"

- TimescaleDB v2.19.3 and below:

1.  Create a new regular table:

1.  Convert the empty table to a hypertable:

In the following command, replace `` with the name of the table you just created, and `<COLUMN_NAME>` with the partitioning column in ``.

1. **Set up a DuckDB connection to your service**

1.  In a terminal on the source machine with your Parquet files, start a new DuckDB interactive session:

1. Connect to your service in your DuckDB session:

`target` is the connection string you used to connect to your service using psql.

1. **Import data from Parquet to your service**

1. In DuckDB, upload the table data to your service
       
       Where:

- ``: the hypertable you created to import data to
        - `<FILENAME>`: the Parquet file to import data from

1. Exit the DuckDB session:

1. **Verify the data was imported correctly into your service**

In your `psql` session, view the data in ``:

And that is it, you have imported your data from a Parquet file to your Tiger Cloud service.

===== PAGE: https://docs.tigerdata.com/migrate/pg-dump-and-restore/ =====

**Examples:**

Example 1 (bash):
```bash
export TARGET=postgres://tsdbadmin:<PASSWORD>@<HOST>:<PORT>/tsdb?sslmode=require
```

Example 2 (sql):
```sql
psql target -c "CREATE TABLE  ( \
     ts          TIMESTAMPTZ         NOT NULL, \
     location    TEXT                NOT NULL, \
     temperature DOUBLE PRECISION    NULL \
     ) WITH (timescaledb.hypertable, timescaledb.partition_column = 'ts');"

   - TimescaleDB v2.19.3 and below:

     1.  Create a new regular table:
```

Example 3 (unknown):
```unknown
1.  Convert the empty table to a hypertable:

         In the following command, replace `` with the name of the table you just created, and `<COLUMN_NAME>` with the partitioning column in ``.
```

Example 4 (unknown):
```unknown
1. **Import your data**

   In the folder containing your CSV files, either:

    - Use [timescaledb-parallel-copy][install-parallel-copy]:
```
