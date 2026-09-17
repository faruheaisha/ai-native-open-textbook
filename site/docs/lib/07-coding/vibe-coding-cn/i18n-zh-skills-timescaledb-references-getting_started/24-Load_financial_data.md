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
pageSha256: "e5476e51a96208f6c4bd87058b4c61f6283c622f3eb591fbe9a463458f962bd7"
contentMode: "local-full"
zh: ""
---

## Load financial data

This tutorial uses real-time stock trade data, also known as tick data, from
[Twelve Data][twelve-data]. A direct download link is provided below.

To ingest data into the tables that you created, you need to download the
dataset and copy the data to your database.

1.  Download the `real_time_stock_data.zip` file. The file contains two `.csv`
    files; one with company information, and one with real-time stock trades for
    the past month. Download:

[real_time_stock_data.zip](https://assets.timescale.com/docs/downloads/get-started/real_time_stock_data.zip)

1.  In a new terminal window, run this command to unzip the `.csv` files:

1.  At the `psql` prompt, use the `COPY` command to transfer data into your
    Tiger Cloud service. If the `.csv` files aren't in your current directory,
    specify the file paths in these commands:

Because there are millions of rows of data, the `COPY` process could take a
    few minutes depending on your internet connection and local client
    resources.

===== PAGE: https://docs.tigerdata.com/_partials/_hypercore_policy_workflow/ =====

1. **Connect to your Tiger Cloud service**

In [Tiger Cloud Console][services-portal] open an [SQL editor][in-console-editors]. You can also connect to your service using [psql][connect-using-psql].

1. **Enable columnstore on a hypertable**

Create a [hypertable][hypertables-section] for your time-series data using [CREATE TABLE][hypertable-create-table].
   For [efficient queries][secondary-indexes] on data in the columnstore, remember to `segmentby` the column you will
   use most often to filter your data. For example:

* [Use `CREATE TABLE` for a hypertable][hypertable-create-table]

If you are self-hosting TimescaleDB v2.19.3 and below, create a [Postgres relational table][pg-create-table],
then convert it using [create_hypertable][create_hypertable]. You then enable hypercore with a call
to [ALTER TABLE][alter_table_hypercore].

* [Use `ALTER MATERIALIZED VIEW` for a continuous aggregate][compression_continuous-aggregate]
     
     Before you say `huh`, a continuous aggregate is a specialized hypertable.

1. **Add a policy to convert chunks to the columnstore at a specific time interval**

Create a [columnstore_policy][add_columnstore_policy] that automatically converts chunks in a hypertable to the columnstore at a specific time interval. For example, convert yesterday's crypto trading data to the columnstore:

TimescaleDB is optimized for fast updates on compressed data in the columnstore. To modify data in the
   columnstore, use standard SQL.

1. **Check the columnstore policy**

1. View your data space saving:

When you convert data to the columnstore, as well as being optimized for analytics, it is compressed by more than
      90%. This helps you save on storage costs and keeps your queries operating at lightning speed. To see the amount of space
      saved:

You see something like:

| before	 | after  |
      |---------|--------|
      | 194 MB  | 	24 MB |

1. View the policies that you set or the policies that already exist:

See [timescaledb_information.jobs][informational-views].

1. **Pause a columnstore policy**

See [alter_job][alter_job].

1. **Restart a columnstore policy**

See [alter_job][alter_job].

1. **Remove a columnstore policy**

See [remove_columnstore_policy][remove_columnstore_policy].

1. **Disable columnstore**

If your table has chunks in the columnstore, you have to
   [convert the chunks back to the rowstore][convert_to_rowstore] before you disable the columnstore.
   
   See [alter_table_hypercore][alter_table_hypercore].

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_dual_write_switch_production_workload/ =====

Once you've validated that all the data is present, and that the target
database can handle the production workload, the final step is to switch to the
target database as your primary. You may want to continue writing to the source
database for a period, until you are certain that the target database is
holding up to all production traffic.

===== PAGE: https://docs.tigerdata.com/_partials/_migrate_dump_roles_schema_data_multi_node/ =====

1. **Dump the roles from your source database**

Export your role-based security hierarchy. If you only use the default `postgres` role, this step is not
   necessary.

MST does not allow you to export passwords with roles. You assign passwords to these roles
   when you have uploaded them to your Tiger Cloud service.

1. **Remove roles with superuser access**

Tiger Cloud services do not support roles with superuser access. Run the following script
   to remove statements, permissions and clauses that require superuser permissions from `roles.sql`:

===== PAGE: https://docs.tigerdata.com/_partials/_cloud-create-connect-tutorials/ =====

A service in Tiger Cloud is a cloud instance which contains your database.
Each service contains a single database, named `tsdb`.
You can connect to a service from your local system using the `psql`
command-line utility. If you've used Postgres before, you might already have
`psql` installed. If not, check out the [installing psql][install-psql] section.

1.  In the [Tiger Cloud Console][timescale-portal], click `Create service`.
1.  Click `Download the cheatsheet` to download an SQL file that contains the
    login details for your new service. You can also copy the details directly
    from this page. When you have copied your password,
    click `I stored my password, go to service overview` at the bottom of the page.

When your service is ready to use, is shows a green `Running` label in the
    `Service Overview`. You also receive an email confirming that your service
    is ready to use.
1.  On your local system, at the command prompt, connect to the service using
    the `Service URL` from the SQL file that you downloaded. When you are
    prompted, enter the password:

If your connection is successful, you'll see a message like this, followed
    by the `psql` prompt:

===== PAGE: https://docs.tigerdata.com/_partials/_integration-prereqs-cloud-only/ =====

To follow the steps on this page:

* Create a target [Tiger Cloud service][create-service] with the Real-time analytics capability.

You need your [connection details][connection-info].

===== PAGE: https://docs.tigerdata.com/_partials/_grafana-connect/ =====
