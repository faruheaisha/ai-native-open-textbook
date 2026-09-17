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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "3a86c421bb87edb437c0c892d2033aa287257e581a19d2c42b816e1af9a18355"
contentMode: "local-full"
zh: ""
---

#### JOIN LATERAL

An alternative to [SELECT DISTINCT ON][select-distinct-on] is to use a `JOIN LATERAL`. By selecting your entire
sensor list from the sensors table rather than pulling the IDs out using `SELECT DISTINCT`, `JOIN LATERAL` can offer
some improvements in performance:

```sql
SELECT sensor_list.id, latest_data.ts, latest_data.d
FROM sensors sensor_list
    -- Add a WHERE clause here to downselect the sensor list, if you wish
LEFT JOIN LATERAL (
    SELECT ts, d
    FROM iot_data raw_data
    WHERE sensor_id = sensor_list.id
    ORDER BY ts DESC
    LIMIT 1
) latest_data ON true
WHERE latest_data.d is not null -- only pulling out float values ("d" column) in this example
  AND latest_data.ts > CURRENT_TIMESTAMP - interval '1 week' -- important
ORDER BY sensor_list.id, latest_data.ts;
```

Limiting the time range is important, especially if you have a lot of data. Best practice is to use these
kinds of queries for dashboards and quick status checks. To query over a much larger time range, encapsulate
the previous example into a materialized query that refreshes infrequently, perhaps once a day.

Shoutout to **Christopher Piggott** for this recipe.

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_from_timescaledb_version/ =====

It is very important that the version of the TimescaleDB extension is the same
in the source and target databases. This requires upgrading the TimescaleDB
extension in the source database before migrating.

You can determine the version of TimescaleDB in the target database with the
following command:

```bash
psql target -c "SELECT extversion FROM pg_extension WHERE extname = 'timescaledb';"
```

To update the TimescaleDB extension in your source database, first ensure that
the desired version is installed from your package repository. Then you can
upgrade the extension with the following query:

```bash
psql source -c "ALTER EXTENSION timescaledb UPDATE TO '<version here>';"
```

For more information and guidance, consult the [Upgrade TimescaleDB] page.

===== PAGE: https://docs.tigerdata.com/_partials/_since_2_18_0/ =====

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

===== PAGE: https://docs.tigerdata.com/_partials/_add-data-nyctaxis/ =====

## Load trip data

When you have your database set up, you can load the taxi trip data into the
`rides` hypertable.

This is a large dataset, so it might take a long time, depending on your network
connection.

1.  Download the dataset:

   [nyc_data.tar.gz](https://assets.timescale.com/docs/downloads/nyc_data.tar.gz)

1.  Use your file manager to decompress the downloaded dataset, and take a note
    of the path to the `nyc_data_rides.csv` file.

1.  At the psql prompt, copy the data from the `nyc_data_rides.csv` file into
    your hypertable. Make sure you point to the correct path, if it is not in
    your current working directory:

    ```sql
    \COPY rides FROM nyc_data_rides.csv CSV;
    ```

You can check that the data has been copied successfully with this command:

```sql
SELECT * FROM rides LIMIT 5;
```

You should get five records that look like this:

```sql
-[ RECORD 1 ]---------+--------------------
vendor_id             | 1
pickup_datetime       | 2016-01-01 00:00:01
dropoff_datetime      | 2016-01-01 00:11:55
passenger_count       | 1
trip_distance         | 1.20
pickup_longitude      | -73.979423522949219
pickup_latitude       | 40.744613647460938
rate_code             | 1
dropoff_longitude     | -73.992034912109375
dropoff_latitude      | 40.753944396972656
payment_type          | 2
fare_amount           | 9
extra                 | 0.5
mta_tax               | 0.5
tip_amount            | 0
tolls_amount          | 0
improvement_surcharge | 0.3
total_amount          | 10.3
```

===== PAGE: https://docs.tigerdata.com/_partials/_cloud-create-service/ =====

### Create a Tiger Cloud service

<ol>
  <li>
    <p>
      Sign in to the\{" "\}
      <a href="https://console.cloud.timescale.com/">Tiger Cloud Console</a> and click <code>Create service</code>.
    </p>
  </li>
  <li>
    <p>
      Choose if you want a Time-series or Dynamic Postgres service.
    </p>
  </li>
  \{props.demoData && (
    <li>
      <p>
        Click <code>Get started</code> to create your service with demo data, and
        launch the <code>Allmilk Factory</code> interactive demo. You can exit
        the demo at any time, and revisit it from the same point later on. You
        can also re-run the demo after you have completed it.
      </p>
        class="main-content__illustration"
        width=\{1375\} height=\{944\}
        src="https://assets.timescale.com/docs/images/tsc-create-service-demo.png"
        alt="Create a new service in the Tiger Cloud Console"
      />
    </li>
  )\}
  <li>
    <p>
      Click <code>Download the cheatsheet</code> to download an SQL file that
      contains the login details for your new service. You can also copy the
      details directly from this page. When you have copied your password,
      click <code>I stored my password, go to service overview</code>
      at the bottom of the page.
    </p>
  </li>
    <li>
    <p>
      When your service is ready to use, is shows a green <code>Running</code>
      label in the Service Overview. You also receive an email confirming that
      your service is ready to use.
    </p>
  </li>
</ol>

===== PAGE: https://docs.tigerdata.com/_partials/_caggs-real-time-historical-data-refreshes/ =====

Real-time aggregates automatically add the most recent data when you query your
continuous aggregate. In other words, they include data _more recent than_ your
last materialized bucket.

If you add new _historical_ data to an already-materialized bucket, it won't be
reflected in a real-time aggregate. You should wait for the next scheduled
refresh, or manually refresh by calling `refresh_continuous_aggregate`. You can
think of real-time aggregates as being eventually consistent for historical
data.

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_awsrds_connect_intermediary/ =====

## Create an intermediary EC2 Ubuntu instance
1. In [https://console.aws.amazon.com/rds/home#databases:][databases],
   select the RDS/Aurora Postgres instance to migrate.
1. Click `Actions` > `Set up EC2 connection`.
   Press `Create EC2 instance` and use the following settings:
    - **AMI**: Ubuntu Server.
    - **Key pair**: use an existing pair or create a new one that you will use to access the intermediary machine.
    - **VPC**: by default, this is the same as the database instance.
    - **Configure Storage**: adjust the volume to at least the size of RDS/Aurora Postgres instance you are migrating from.
    You can reduce the space used by your data on Tiger Cloud using [Hypercore][hypercore].
1. Click `Lauch instance`. AWS creates your EC2 instance, then click `Connect to instance` > `SSH client`.
   Follow the instructions to create the connection to your intermediary EC2 instance.

## Install the psql client tools on the intermediary instance

1. Connect to your intermediary EC2 instance. For example:
   ```sh
