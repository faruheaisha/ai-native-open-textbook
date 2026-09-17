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
pageSha256: "0bf4c050b6a8f830017aa40be0192ea2e629c0ced08a85def5cd8ed2ef487b68"
contentMode: "local-full"
zh: ""
---

### Dictionary compression

One of the earliest lossless compression algorithms, dictionary compression is
the basis of many popular compression methods. Dictionary compression can also
be found in areas outside of computer science, such as medical coding.

Instead of storing values directly, dictionary compression works by making a
list of the possible values that can appear, and then storing an index into a
dictionary containing the unique values. This technique is quite versatile, can
be used regardless of data type, and works especially well when you have a
limited set of values that repeat frequently.

For example, if you had the list of temperatures shown earlier, but you wanted
an additional column storing a city location for each measurement, you might
have a set of values like this:

|City|
|-|
|New York|
|San Francisco|
|San Francisco|
|Los Angeles|

Instead of storing all the city names directly, you can instead store a
dictionary, like this:

&lt;CodeBlock canCopy=\{false\} showLineNumbers=\{false\} children=\{`
\{0: "New York", 1: "San Francisco", 2: "Los Angeles",\}
`\} />

You can then store just the indices in your column, like this:

|City|
|-|
|0|
|1|
|1|
|2|

For a dataset with a lot of repetition, this can offer significant compression.
In the example, each city name is on average 11 bytes in length, while the
indices are never going to be more than 4 bytes long, reducing space usage
nearly 3 times. In TimescaleDB, the list of indices is compressed even further
with the Simple-8b+RLE method, making the storage cost even smaller.

Dictionary compression doesn't always result in savings. If your dataset doesn't
have a lot of repeated values, then the dictionary is the same size as the
original data. TimescaleDB automatically detects this case, and falls back to
not using a dictionary in that scenario.

===== PAGE: https://docs.tigerdata.com/use-timescale/compression/modify-a-schema/ =====

---

## Changelog

**URL:** llms-txt#changelog

**Contents:**
- TimescaleDB 2.22.1 – configurable indexing, enhanced partitioning, and faster queries
  - Highlighted features
  - Deprecations
- Kafka Source Connector (beta)
- Phased update rollouts, `pg_cron`, larger compute options, and backup reports
  - 🛡️ Phased rollouts for TimescaleDB minor releases
  - ⏰ pg_cron extension
  - ⚡️ Larger compute options: 48 and 64 CPU
  - 📋 Backup report for compliance
  - 🗺️ New router for Tiger Cloud Console

All the latest features and updates to Tiger Cloud.

## TimescaleDB 2.22.1 – configurable indexing, enhanced partitioning, and faster queries
<Label type="date">October 10, 2025</Label>

[TimescaleDB 2.22.1](https://github.com/timescale/timescaledb/releases) introduces major performance and flexibility improvements across indexing, compression, and query execution. TimescaleDB 2.22.1 was released on September 30th and is now available to all users of Tiger.
