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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/compression.md"
sourceRel: "i18n/zh/skills/timescaledb/references/compression.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/compression.md"
sourceSha256: "488dd1571052c58332a963deed8b1dbd3633dc2724e884eef2085c4098409ec7"
pageSha256: "96e9bff716680844f4d10a6929190a585f610d7b9a126ba32c4c0458d98613e9"
contentMode: "local-full"
zh: ""
---

### Live migration release v0.0.24
Improvements:
- Automatic retries are now available for the initial data copy of the migration
- Now uses pgcopydb for initial data copy for PG to TSDB migrations also (already did for TS to TS) which has a significant performance boost.
- Fixes issues with TimescaleDB v2.13.x migrations
- Support for chunk mapping for hypertables with custom schema and table prefixes

## ⚡ Performance and stability improvements for Timescale Cloud and TimescaleDB
<Label type="date">July 12, 2024</Label>

The following improvements have been made to Timescale products:

- **Timescale Cloud**:
  - The connection pooler has been updated and now avoids multiple reloads
  - The tsdbadmin user can now grant the following roles to other users: `pg_checkpoint`,`pg_monitor`,`pg_signal_backend`,`pg_read_all_stats`,`pg_stat_scan_tables`
  - Timescale Console is far more reliable.

- **TimescaleDB**
  - The TimescaleDB v2.15.3 patch release improves handling of multiple unique indexes in a compressed INSERT,
    removes the recheck of ORDER when querying compressed data, improves memory management in DML functions, improves
    the tuple lock acquisition for tiered chunks on replicas, and fixes an issue with ORDER BY/GROUP BY in our
    HashAggregate optimization on PG16. For more information, see the [release note](https://github.com/timescale/timescaledb/releases/tag/2.15.3).
  - The TimescaleDB v2.15.2 patch release improves sort pushdown for partially compressed chunks, and compress_chunk with
    a primary space partition. The metadata function is removed from the update script, and hash partitioning on a
    primary column is disallowed. For more information, see the [release note](https://github.com/timescale/timescaledb/releases/tag/2.15.2).

## ⚡ Performance improvements for live migration to Timescale Cloud
<Label type="date">June 27, 2024</Label>

The following improvements have been made to the Timescale [live-migration docker image](https://hub.docker.com/r/timescale/live-migration/tags):

- Table-based filtering is now available during live migration.
- Improvements to pbcopydb increase performance and remove unhelpful warning messages.
- The user notification log enables you to always select the most recent release for a migration run.

For improved stability and new features, update to the latest [timescale/live-migration](https://hub.docker.com/r/timescale/live-migration/tags) docker image. To learn more, see the [live migration docs](https://docs.timescale.com/migrate/latest/live-migration/).

## 🦙Ollama integration in pgai

<Label type="date">June 21, 2024</Label>

Ollama is now integrated with [pgai](https://github.com/timescale/pgai).

Ollama is the easiest and most popular way to get up and running with open-source
language models. Think of Ollama as _Docker for LLMs_, enabling easy access and usage
of a variety of open-source models like Llama 3, Mistral, Phi 3, Gemma, and more.

With the pgai extension integrated in your database, embed Ollama AI into your app using
SQL. For example:

To learn more, see the [pgai Ollama documentation](https://github.com/timescale/pgai/blob/main/docs/vectorizer/quick-start.md).

## 🧙 Compression Wizard

<Label type="date">June 13, 2024</Label>

The compression wizard is now available on Timescale Cloud. Select a hypertable and be guided through enabling compression through the UI!

To access the compression wizard, navigate to `Explorer`, and select the hypertable you would like to compress. In the top right corner, hover where it says `Compression off`, and open the wizard. You will then be guided through the process of configuring compression for your hypertable, and can compress it directly through the UI.

![Run the compression wizard in Timescale Console](https://assets.timescale.com/docs/images/compress-data-in-console.png)

## 🏎️💨 High Performance AI Apps With pgvectorscale

<Label type="date">June 11, 2024</Label>

The [vectorscale extension][pgvectorscale] is now available on [Timescale Cloud][signup].

pgvectorscale complements pgvector, the open-source vector data extension for Postgres, and introduces the
following key innovations for pgvector data:

- A new index type called StreamingDiskANN, inspired by the DiskANN algorithm, based on research from Microsoft.
- Statistical Binary Quantization: developed by Timescale researchers, This compression method improves on
  standard Binary Quantization.

On benchmark dataset of 50 million Cohere embeddings (768 dimensions each), Postgres with pgvector and
pgvectorscale achieves 28x lower p95 latency and 16x higher query throughput compared to Pinecone's storage
optimized (s1) index for approximate nearest neighbor queries at 99% recall, all at 75% less cost when
self-hosted on AWS EC2.

To learn more, see the [pgvectorscale documentation][pgvectorscale].

## 🧐Integrate AI Into Your Database Using pgai

<Label type="date">June 11, 2024</Label>

The [pgai extension][pgai] is now available on [Timescale Cloud][signup].

pgai brings embedding and generation AI models closer to the database. With pgai, you can now do the following directly
from within Postgres in a SQL query:

* Create embeddings for your data.
* Retrieve LLM chat completions from models like OpenAI GPT4o.
* Reason over your data and facilitate use cases like classification, summarization, and data enrichment on your existing relational data in Postgres.

To learn more, see the [pgai documentation][pgai].

## 🐅Continuous Aggregate and Hypertable Improvements for TimescaleDB
<Label type="date">June 7, 2024</Label>

The 2.15.x releases contains performance improvements and bug fixes. Highlights in these releases are:

- Continuous Aggregate now supports `time_bucket` with origin and/or offset.
- Hypertable compression has the following improvements:
  - Recommend optimized defaults for segment by and order by when configuring compression through analysis of table configuration and statistics.
  - Added planner support to check more kinds of WHERE conditions before decompression.
    This reduces the number of rows that have to be decompressed.
  - You can now use minmax sparse indexes when you compress columns with btree indexes.
  - Vectorize filters in the WHERE clause that contain text equality operators and LIKE expressions.

To learn more, see the [TimescaleDB release notes](https://github.com/timescale/timescaledb/releases).

## 🔍 Database Audit Logging with pgaudit
<Label type="date">May 31, 2024</Label>

The [Postgres Audit extension(pgaudit)](https://github.com/pgaudit/pgaudit/) is now available on [Timescale Cloud][signup].
pgaudit provides detailed database session and object audit logging in the Timescale
Cloud logs.

If you have strict security and compliance requirements and need to log all operations
on the database level, pgaudit can help. You can also export these audit logs to
[Amazon CloudWatch](https://aws.amazon.com/cloudwatch/).

To learn more, see the [pgaudit documentation](https://github.com/pgaudit/pgaudit/).

## 🌡 International System of Unit Support with postgresql-unit
<Label type="date">May 31, 2024</Label>

The [SI Units for Postgres extension(unit)](https://github.com/df7cb/postgresql-unit) provides support for the
[ISU](https://en.wikipedia.org/wiki/International_System_of_Units) in [Timescale Cloud][signup].

You can use Timescale Cloud to solve day-to-day questions. For example, to see what 50°C is in °F, run the following
query in your Timescale Cloud service:

To learn more, see the [postgresql-unit documentation](https://github.com/df7cb/postgresql-unit).

===== PAGE: https://docs.tigerdata.com/about/timescaledb-editions/ =====

**Examples:**

Example 1 (unknown):
```unknown
SELECT * FROM  hypertable WHERE timestamp_col > now() - '100 days'::interval
```

Example 2 (unknown):
```unknown
begin;
insert into users (name, email) values ('john doe', 'john@example.com');
abort; -- nothing inserted
```

Example 3 (unknown):
```unknown
create temporary table temp_users (email text);
insert into temp_sales (email) values ('john@example.com');
-- table will automatically disappear after your session ends
```

Example 4 (unknown):
```unknown
set search_path to 'myschema', 'public';
```

---

## Create a compression policy

**URL:** llms-txt#create-a-compression-policy

**Contents:**
- Enable a compression policy
  - Enabling compression
- View current compression policy
- Pause compression policy
- Remove compression policy
- Disable compression

Old API since [TimescaleDB v2.18.0](https://github.com/timescale/timescaledb/releases/tag/2.18.0) Replaced by <a href="https://docs.tigerdata.com/use-timescale/latest/hypercore/real-time-analytics-in-hypercore/">Optimize your data for real-time analytics</a>.

You can enable compression on individual hypertables, by declaring which column
you want to segment by.

## Enable a compression policy

This page uses an example table, called `example`, and segments it by the
`device_id` column. Every chunk that is more than seven days old is then marked
to be automatically compressed. The source data is organized like this:

|time|device_id|cpu|disk_io|energy_consumption|
|-|-|-|-|-|
|8/22/2019 0:00|1|88.2|20|0.8|
|8/22/2019 0:05|2|300.5|30|0.9|
