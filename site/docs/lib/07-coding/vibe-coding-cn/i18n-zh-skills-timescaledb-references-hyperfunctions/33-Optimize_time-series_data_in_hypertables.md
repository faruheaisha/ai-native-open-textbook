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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hyperfunctions.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hyperfunctions.md"
sourceSha256: "05b6221af2cc12adc9bdb276b06af82863fd7bcdfe4a673a0ed0f7f1a69d2184"
pageSha256: "2690f8bd8b0b8299bc93f1c4df3ad9fd06d7bdf07c5b3b6861e75046a89d6cd5"
contentMode: "local-full"
zh: ""
---

## Optimize time-series data in hypertables

Hypertables are Postgres tables in TimescaleDB that automatically partition your time-series data by time. Time-series data represents the way a system, process, or behavior changes over time. Hypertables enable TimescaleDB to work efficiently with time-series data.  Each hypertable is made up of child tables called chunks. Each chunk is assigned a range
of time, and only contains data from that range. When you run a query, TimescaleDB identifies the correct chunk and
runs the query on it, instead of going through the entire table.

[Hypercore][hypercore] is the hybrid row-columnar storage engine in TimescaleDB used by hypertables. Traditional
databases force a trade-off between fast inserts (row-based storage) and efficient analytics
(columnar storage). Hypercore eliminates this trade-off, allowing real-time analytics without sacrificing
transactional capabilities.

Hypercore dynamically stores data in the most efficient format for its lifecycle:

* **Row-based storage for recent data**: the most recent chunk (and possibly more) is always stored in the rowstore,
   ensuring fast inserts, updates, and low-latency single record queries. Additionally, row-based storage is used as a
   writethrough for inserts and updates to columnar storage.
* **Columnar storage for analytical performance**: chunks are automatically compressed into the columnstore, optimizing
   storage efficiency and accelerating analytical queries.

Unlike traditional columnar databases, hypercore allows data to be inserted or modified at any stage, making it a
flexible solution for both high-ingest transactional workloads and real-time analytics—within a single database.

Because TimescaleDB is 100% Postgres, you can use all the standard Postgres tables, indexes, stored
procedures, and other objects alongside your hypertables. This makes creating and working with hypertables similar
to standard Postgres.

1.  **Import time-series data into a hypertable**

1. Unzip [metrics.csv.gz](https://assets.timescale.com/docs/downloads/metrics.csv.gz) to a `<local folder>`.

This test dataset contains energy consumption data.

To import up to 100GB of data directly from your current Postgres based database,
       [migrate with downtime][migrate-with-downtime] using native Postgres tooling. To seamlessly import 100GB-10TB+
       of data, use the [live migration][migrate-live] tooling supplied by Tiger Data. To add data from non-Postgres
       data sources, see [Import and ingest data][data-ingest].

1. In Terminal, navigate to `<local folder>` and update the following string with [your connection details][connection-info]
      to connect to your service.

1. Create an optimized hypertable for your time-series data:

1. Create a [hypertable][hypertables-section] with [hypercore][hypercore] enabled by default for your
          time-series data using [CREATE TABLE][hypertable-create-table]. For [efficient queries][secondary-indexes]
          on data in the columnstore, remember to `segmentby` the column you will use most often to filter your data.

In your sql client, run the following command:

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

1. Upload the dataset to your service

1.  **Have a quick look at your data**

You query hypertables in exactly the same way as you would a relational Postgres table.
    Use one of the following SQL editors to run a query and see the data you uploaded:
       - **Data mode**:  write queries, visualize data, and share your results in [Tiger Cloud Console][portal-data-mode] for all your Tiger Cloud services.
       - **SQL editor**: write, fix, and organize SQL faster and more accurately in [Tiger Cloud Console][portal-ops-mode] for a Tiger Cloud service.
       - **psql**: easily run queries on your Tiger Cloud services or self-hosted TimescaleDB deployment from Terminal.

On this amount of data, this query on data in the rowstore takes about 3.6 seconds. You see something like:

| Time	                        | value |
    |------------------------------|-------|
    | 2023-05-29 22:00:00+00 | 23.1  |
    | 2023-05-28 22:00:00+00 | 19.5  |
    | 2023-05-30 22:00:00+00 | 25    |
    | 2023-05-31 22:00:00+00 | 8.1   |
