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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceRel: "i18n/zh/skills/timescaledb/references/getting_started.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/getting_started.md"
sourceSha256: "d89ee1583c1ea9641e14a8f176f27150301b48061cbde17049ed1e459820f0d5"
pageSha256: "14905c803b55637355c3ff27e2ec0b306013ece4bd50e2c1207d02a08b61850b"
contentMode: "local-full"
zh: ""
---

## Query another data source

To query another data source:

You create Postgres FDWs with the `postgres_fdw` extension, which is enabled by default in Tiger Cloud.

1. **Connect to your service**

See [how to connect][connect].

1. **Create a server**

Run the following command using your [connection details][connection-info]:

1. **Create user mapping**

Run the following command using your [connection details][connection-info]:

1. **Import a foreign schema (recommended) or create a foreign table**

- Import the whole schema:

- Alternatively, import a limited number of tables:

- Create a foreign table. Skip if you are importing a schema:

A user with the `tsdbadmin` role assigned already has the required `USAGE` permission to create Postgres FDWs. You can enable another user, without the `tsdbadmin` role assigned, to query foreign data. To do so, explicitly grant the permission. For example, for a new `grafana` user:

You create Postgres FDWs with the `postgres_fdw` extension. See [documenation][enable-fdw-docs] on how to enable it.

1. **Connect to your database**

Use [`psql`][psql] to connect to your database.

1. **Create a server**

Run the following command using your [connection details][connection-info]:

1. **Create user mapping**

Run the following command using your [connection details][connection-info]:

1. **Import a foreign schema (recommended) or create a foreign table**

- Import the whole schema:

- Alternatively, import a limited number of tables:

- Create a foreign table. Skip if you are importing a schema:

===== PAGE: https://docs.tigerdata.com/_partials/_cookbook-iot/ =====

This section contains recipes for IoT issues:

### Work with columnar IoT data

Narrow and medium width tables are a great way to store IoT data. A lot of reasons are outlined in
[Designing Your Database Schema: Wide vs. Narrow Postgres Tables][blog-wide-vs-narrow].

One of the key advantages of narrow tables is that the schema does not have to change when you add new
sensors. Another big advantage is that each sensor can sample at different rates and times. This helps
support things like hysteresis, where new values are written infrequently unless the value changes by a
certain amount.

#### Narrow table format example

Working with narrow table data structures presents a few challenges. In the IoT world one concern is that
many data analysis approaches - including machine learning as well as more traditional data analysis -
require that your data is resampled and synchronized to a common time basis. Fortunately, TimescaleDB provides
you with [hyperfunctions][hyperfunctions] and other tools to help you work with this data.

An example of a narrow table format is:

| ts                      | sensor_id | value |
|-------------------------|-----------|-------|
| 2024-10-31 11:17:30.000 | 1007      | 23.45 |

Typically you would couple this with a sensor table:

| sensor_id | sensor_name  | units                    |
|-----------|--------------|--------------------------|
| 1007      | temperature  | degreesC                 |
| 1012      | heat_mode    | on/off                   |
| 1013      | cooling_mode | on/off                   |
| 1041      | occupancy    | number of people in room |

A medium table retains the generic structure but adds columns of various types so that you can
use the same table to store float, int, bool, or even JSON (jsonb) data:

| ts                      | sensor_id | d     | i    | b    | t    | j    |
|-------------------------|-----------|-------|------|------|------|------|
| 2024-10-31 11:17:30.000 | 1007      | 23.45 | null | null | null | null |
| 2024-10-31 11:17:47.000 | 1012      | null  | null | TRUE | null | null |
| 2024-10-31 11:18:01.000 | 1041      | null  | 4    | null | null | null |

To remove all-null entries, use an optional constraint such as:

#### Get the last value of every sensor

There are several ways to get the latest value of every sensor. The following examples use the
structure defined in [Narrow table format example][setup-a-narrow-table-format] as a reference:

- [SELECT DISTINCT ON][select-distinct-on]
- [JOIN LATERAL][join-lateral]

##### SELECT DISTINCT ON

If you have a list of sensors, the easy way to get the latest value of every sensor is to use
`SELECT DISTINCT ON`:

The common table expression (CTE) used above is not strictly necessary. However, it is an elegant way to join
to the sensor list to get a sensor name in the output.  If this is not something you care about,
you can leave it out:

It is important to take care when down-selecting this data. In the previous examples,
the time that the query would scan back was limited. However, if there any sensors that have either
not reported in a long time or in the worst case, never reported, this query devolves to a full table scan.
In a database with 1000+ sensors and 41 million rows, an unconstrained query takes over an hour.

An alternative to [SELECT DISTINCT ON][select-distinct-on] is to use a `JOIN LATERAL`. By selecting your entire
sensor list from the sensors table rather than pulling the IDs out using `SELECT DISTINCT`, `JOIN LATERAL` can offer
some improvements in performance:

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

To update the TimescaleDB extension in your source database, first ensure that
the desired version is installed from your package repository. Then you can
upgrade the extension with the following query:

For more information and guidance, consult the [Upgrade TimescaleDB] page.

===== PAGE: https://docs.tigerdata.com/_partials/_since_2_18_0/ =====

Since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0)

===== PAGE: https://docs.tigerdata.com/_partials/_add-data-nyctaxis/ =====

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

You can check that the data has been copied successfully with this command:

You should get five records that look like this:

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
