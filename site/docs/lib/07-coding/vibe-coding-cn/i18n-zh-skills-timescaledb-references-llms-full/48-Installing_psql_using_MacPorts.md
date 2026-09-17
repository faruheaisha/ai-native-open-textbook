---
title: "hypertabledetailedsize()"
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
pageSha256: "2fd048a660ae4f0dae94ecc3b2cbb42e2e3191e451fb6c6c766685345f26cc7d"
contentMode: "local-full"
zh: ""
---

# hypertable_detailed_size()

Get detailed information about disk space used by a hypertable or
continuous aggregate, returning size information for the table
itself, any indexes on the table, any toast tables, and the total
size of all. All sizes are reported in bytes. If the function is
executed on a distributed hypertable, it returns size information
as a separate row per node, including the access node.

When a continuous aggregate name is provided, the function
transparently looks up the backing hypertable and returns its statistics
instead.

For more information about using hypertables, including chunk size partitioning,
see the [hypertable section][hypertable-docs].

## Samples

Get the size information for a hypertable.

```sql
-- disttable is a distributed hypertable --
SELECT * FROM hypertable_detailed_size('disttable') ORDER BY node_name;

 table_bytes | index_bytes | toast_bytes | total_bytes |  node_name
-------------+-------------+-------------+-------------+-------------
       16384 |       40960 |           0 |       57344 | data_node_1
        8192 |       24576 |           0 |       32768 | data_node_2
           0 |        8192 |           0 |        8192 |

```

The access node is listed without a user-given node name. Normally,
the access node holds no data, but still maintains, for example, index
information that occupies a small amount of disk space.

## Required arguments

|Name|Type|Description|
|---|---|---|
| `hypertable` | REGCLASS | Hypertable or continuous aggregate to show detailed size of. |

## Returns

|Column|Type|Description|
|-|-|-|
|table_bytes|BIGINT|Disk space used by main_table (like `pg_relation_size(main_table)`)|
|index_bytes|BIGINT|Disk space used by indexes|
|toast_bytes|BIGINT|Disk space of toast tables|
|total_bytes|BIGINT|Total disk space used by the specified table, including all indexes and TOAST data|
|node_name|TEXT|For distributed hypertables, this is the user-given name of the node for which the size is reported. `NULL` is returned for the access node and non-distributed hypertables.|

If executed on a relation that is not a hypertable, the function
returns `NULL`.

===== PAGE: https://docs.tigerdata.com/_partials/_billing-for-inactive-services/ =====

You are charged for all active services in your account, even if you are not actively using them. To reduce costs, pause or delete your unused services.

===== PAGE: https://docs.tigerdata.com/_partials/_devops-cli-install/ =====

1. **Install Tiger CLI**

   Use the terminal to install the CLI:

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.deb.sh | sudo os=any dist=any bash
    sudo apt-get install tiger-cli
    ```

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.deb.sh | sudo os=any dist=any bash
    sudo apt-get install tiger-cli
    ```

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.rpm.sh | sudo os=rpm_any dist=rpm_any bash
    sudo yum install tiger-cli
    ```

    ```shell
    curl -s https://packagecloud.io/install/repositories/timescale/tiger-cli/script.rpm.sh | sudo os=rpm_any dist=rpm_any bash
    sudo yum install tiger-cli
    ```

    ```shell
    brew install --cask timescale/tap/tiger-cli
    ```

    ```shell
    curl -fsSL https://cli.tigerdata.com | sh
    ```

1. **Set up API credentials**

   1. Log Tiger CLI into your Tiger Data account:

      ```shell
      tiger auth login
      ```
      Tiger CLI opens Console in your browser. Log in, then click `Authorize`.

      You can have a maximum of 10 active client credentials. If you get an error, open [credentials][rest-api-credentials]
      and delete an unused credential.

   1. Select a Tiger Cloud project:

      ```terminaloutput
      Auth URL is: https://console.cloud.timescale.com/oauth/authorize?client_id=lotsOfURLstuff
      Opening browser for authentication...
      Select a project:

      > 1. Tiger Project (tgrproject)
      2. YourCompany (Company wide project) (cpnproject)
      3. YourCompany Department (dptproject)

      Use ↑/↓ arrows or number keys to navigate, enter to select, q to quit
      ```
      If only one project is associated with your account, this step is not shown.

      Where possible, Tiger CLI stores your authentication information in the system keychain/credential manager.
      If that fails, the credentials are stored in `~/.config/tiger/credentials` with restricted file permissions (600).
      By default, Tiger CLI stores your configuration in `~/.config/tiger/config.yaml`.

1. **Test your authenticated connection to Tiger Cloud by listing services**

    ```bash
    tiger service list
    ```

   This call returns something like:
    - No services:
      ```terminaloutput
      🏜️  No services found! Your project is looking a bit empty.
      🚀 Ready to get started? Create your first service with: tiger service create
      ```
    - One or more services:

      ```terminaloutput
      ┌────────────┬─────────────────────┬────────┬─────────────┬──────────────┬──────────────────┐
      │ SERVICE ID │        NAME         │ STATUS │    TYPE     │    REGION    │     CREATED      │
      ├────────────┼─────────────────────┼────────┼─────────────┼──────────────┼──────────────────┤
      │ tgrservice │ tiger-agent-service │ READY  │ TIMESCALEDB │ eu-central-1 │ 2025-09-25 16:09 │
      └────────────┴─────────────────────┴────────┴─────────────┴──────────────┴──────────────────┘
      ```

===== PAGE: https://docs.tigerdata.com/_partials/_graphing-ohlcv-data/ =====

## Graph OHLCV data

When you have extracted the raw OHLCV data, you can use it to graph the result
in a candlestick chart, using Grafana. To do this, you need to have Grafana set
up to connect to your self-hosted TimescaleDB instance.

### Graphing OHLCV data

1.  Ensure you have Grafana installed, and you are using the TimescaleDB
    database that contains the Twelve Data dataset set up as a
    data source.
1.  In Grafana, from the `Dashboards` menu, click `New Dashboard`. In the
    `New Dashboard` page, click `Add a new panel`.
1.  In the `Visualizations` menu in the top right corner, select `Candlestick`
    from the list. Ensure you have set the Twelve Data dataset as
    your data source.
1.  Click `Edit SQL` and paste in the query you used to get the OHLCV values.
1.  In the `Format as` section, select `Table`.
1.  Adjust elements of the table as required, and click `Apply` to save your
    graph to the dashboard.

    &lt;img class="main-content__illustration"
         width=\{1375\} height=\{944\}
         src="https://assets.timescale.com/docs/images/Grafana_candlestick_1day.webp"
         alt="Creating a candlestick graph in Grafana using 1-day OHLCV tick data"
    />

===== PAGE: https://docs.tigerdata.com/_partials/_create-hypertable-nyctaxis/ =====

## Optimize time-series data in hypertables

Time-series data represents how a system, process, or behavior changes over time. [Hypertables][hypertables-section]
are Postgres tables that help you improve insert and query performance by automatically partitioning your data by
time. Each hypertable is made up of child tables called chunks. Each chunk is assigned a range of time, and only
contains data from that range.

Hypertables exist alongside regular Postgres tables. You interact with hypertables and regular Postgres tables in the
same way. You use regular Postgres tables for relational data.

1. **Create a hypertable to store the taxi trip data**

    ```sql
    CREATE TABLE "rides"(
        vendor_id TEXT,
        pickup_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        dropoff_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
        passenger_count NUMERIC,
        trip_distance NUMERIC,
        pickup_longitude  NUMERIC,
        pickup_latitude   NUMERIC,
        rate_code         INTEGER,
        dropoff_longitude NUMERIC,
        dropoff_latitude  NUMERIC,
        payment_type INTEGER,
        fare_amount NUMERIC,
        extra NUMERIC,
        mta_tax NUMERIC,
        tip_amount NUMERIC,
        tolls_amount NUMERIC,
        improvement_surcharge NUMERIC,
        total_amount NUMERIC
    ) WITH (
       tsdb.hypertable,
       tsdb.partition_column='pickup_datetime',
       tsdb.create_default_indexes=false
    );
    ```
    If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

1.  **Add another dimension to partition your hypertable more efficiently**

    ```sql
    SELECT add_dimension('rides', by_hash('payment_type', 2));
    ```

1.  **Create an index to support efficient queries**

    Index by vendor, rate code, and passenger count:
    ```sql
    CREATE INDEX ON rides (vendor_id, pickup_datetime DESC);
    CREATE INDEX ON rides (rate_code, pickup_datetime DESC);
    CREATE INDEX ON rides (passenger_count, pickup_datetime DESC);
    ```

## Create standard Postgres tables for relational data

When you have other relational data that enhances your time-series data, you can
create standard Postgres tables just as you would normally. For this dataset,
there are two other tables of data, called `payment_types` and `rates`.

1.  **Add a relational table to store the payment types data**

    ```sql
    CREATE TABLE IF NOT EXISTS "payment_types"(
        payment_type INTEGER,
        description TEXT
    );
    INSERT INTO payment_types(payment_type, description) VALUES
    (1, 'credit card'),
    (2, 'cash'),
    (3, 'no charge'),
    (4, 'dispute'),
    (5, 'unknown'),
    (6, 'voided trip');
    ```

1. **Add a relational table to store the rates data**

    ```sql
    CREATE TABLE IF NOT EXISTS "rates"(
        rate_code   INTEGER,
        description TEXT
    );
    INSERT INTO rates(rate_code, description) VALUES
    (1, 'standard rate'),
    (2, 'JFK'),
    (3, 'Newark'),
    (4, 'Nassau or Westchester'),
    (5, 'negotiated fare'),
    (6, 'group ride');
    ```

You can confirm that the scripts were successful by running the `\dt` command in
the `psql` command line. You should see this:

```sql
           List of relations
 Schema |     Name      | Type  |  Owner
--------+---------------+-------+----------
 public | payment_types | table | tsdbadmin
 public | rates         | table | tsdbadmin
 public | rides         | table | tsdbadmin
(3 rows)
```

===== PAGE: https://docs.tigerdata.com/_partials/_integration-debezium-docker/ =====

1. **Run Zookeeper in Docker**

   In another Terminal window, run the following command:
   ```bash
   docker run -it --rm --name zookeeper -p 2181:2181 -p 2888:2888 -p 3888:3888 quay.io/debezium/zookeeper:3.0
   ```
   Check the output log to see that zookeeper is running.

1. **Run Kafka in Docker**

   In another Terminal window, run the following command:
   ```bash
   docker run -it --rm --name kafka -p 9092:9092 --link zookeeper:zookeeper quay.io/debezium/kafka:3.0
   ```
   Check the output log to see that Kafka is running.

1. **Run Kafka Connect in Docker**

   In another Terminal window, run the following command:
   ```bash
   docker run -it --rm --name connect \
   -p 8083:8083 \
   -e GROUP_ID=1 \
   -e CONFIG_STORAGE_TOPIC=accounts \
   -e OFFSET_STORAGE_TOPIC=offsets \
   -e STATUS_STORAGE_TOPIC=storage \
   --link kafka:kafka \
   --link timescaledb:timescaledb \
   quay.io/debezium/connect:3.0
   ```
   Check the output log to see that Kafka Connect is running.

1. **Register the Debezium Postgres source connector**
