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
pageSha256: "9bcf559fd86e725fac9c3404f434ccb18025ff5f42ecdecd92b5a900a328f99d"
contentMode: "local-full"
zh: ""
---

### Highlighted features

* **Configurable sparse indexes:** manually configure sparse indexes (min-max or bloom) on one or more columns of compressed hypertables, optimizing query performance for specific workloads and reducing I/O. In previous versions, these were automatically created based on heuristics and could not be modified.

* **UUIDv7 support:** native support for UUIDv7 for both compression and partitioning. UUIDv7 embeds a time component, improving insert locality and enabling efficient time-based range queries while maintaining global uniqueness.

* **Vectorized UUID compression:** new vectorized compression for UUIDv7 columns doubles query performance and improves storage efficiency by up to 30%.

* **UUIDv7 partitioning:** hypertables can now be partitioned on UUIDv7 columns, combining time-based chunking with globally unique IDs—ideal for large-scale event and log data.

* **Multi-column SkipScan:** expands SkipScan to support multiple distinct keys, delivering millisecond-fast deduplication and `DISTINCT ON` queries across billions of rows. Learn more in our [blog post](https://www.tigerdata.com/blog/skipscan-in-timescaledb-why-distinct-was-slow-how-we-built-it-and-how-you-can-use-it) and [documentation](https://docs.tigerdata.com/use-timescale/latest/query-data/skipscan/).
* **Compression improvements:** default `segmentby` and `orderby` settings are now applied at compression time for each chunk, automatically adapting to evolving data patterns for better performance. This was previously set at the hypertable level and fixed across all chunks.

The experimental Hypercore Table Access Method (TAM) has been removed in this release following advancements in the columnstore architecture.

For a comprehensive list of changes, refer to the TimescaleDB [2.22](https://github.com/timescale/timescaledb/releases/tag/2.22.0) & [2.22.1](https://github.com/timescale/timescaledb/releases/tag/2.22.1) release notes.

## Kafka Source Connector (beta)
<Label type="date">September 19, 2025</Label>

The new [Kafka Source Connector](https://docs.tigerdata.com/migrate/latest/livesync-for-kafka/) enables you to connect your existing Kafka clusters directly to Tiger Cloud and ingest data from Kafka topics into hypertables. Developers often build proxies or run JDBC Sink Connectors to bridge Kafka and Tiger Cloud, which is error-prone and time-consuming. With the Kafka Source Connector, you can seamlessly start ingesting your Kafka data natively without additional middleware.

- Supported formats: AVRO
- Supported platforms: Confluent Cloud and Amazon Managed Streaming for Apache Kafka

![Kafka source connector in Tiger Cloud](https://assets.timescale.com/docs/images/tiger-cloud-console/kafka-source-connector-tiger-data.png)

![Kafka source connector streaming in Tiger Cloud](https://assets.timescale.com/docs/images/tiger-cloud-console/kafka-source-connector-streaming.png)

## Phased update rollouts, `pg_cron`, larger compute options, and backup reports
<Label type="date">September 12, 2025</Label>
