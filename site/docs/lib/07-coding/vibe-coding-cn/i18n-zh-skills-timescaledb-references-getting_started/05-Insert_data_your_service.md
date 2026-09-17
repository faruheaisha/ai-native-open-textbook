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
pageSha256: "ca46e026b62a3ed94b32e4984d95187ec4e2c3d1a3873356fab7032249065ad1"
contentMode: "local-full"
zh: ""
---

## Insert data your service

The TimescaleDB gem provides efficient ways to insert data into hypertables. This section
shows you how to ingest test data into your hypertable.

1.  **Create a controller to handle page loads**

Create a new file called `<my_app_home>/app/controllers/application_controller.rb` and add the following code:

1.  **Generate some test data**

Use `bin/console` to join a Rails console session and run the following code
    to define some random page load access data:

1. **Insert the generated data into your Tiger Cloud service**

1.  **Validate the test data in your Tiger Cloud service**

This section lists the most common tasks you might perform with the TimescaleDB gem.

The TimescaleDB gem provides several convenient scopes for querying your time-series data.

- Built-in time-based scopes:

- Browser-specific scopes:

- Query continuous aggregates:

This query fetches the average and standard deviation from the performance stats for the `/products` path over the last day.

### TimescaleDB features

The TimescaleDB gem provides utility methods to access hypertable and chunk information. Every model that uses
the `acts_as_hypertable` method has access to these methods.

#### Access hypertable and chunk information

- View chunk or hypertable information:

- Compress/Decompress chunks:

#### Access hypertable stats

You collect hypertable stats using methods that provide insights into your hypertable's structure, size, and compression
status:

- Get basic hypertable information:

- Get detailed size information:

#### Continuous aggregates

The `continuous_aggregates` method generates a class for each continuous aggregate.

- Get all the continuous aggregate classes:

- Manually refresh a continuous aggregate:

- Create or drop a continuous aggregate:

Create or drop all the continuous aggregates in the proper order to build them hierarchically. See more about how it
  works in this [blog post][ruby-blog-post].

Now that you have integrated the ruby gem into your app:

* Learn more about the [TimescaleDB gem](https://github.com/timescale/timescaledb-ruby).
* Check out the [official docs](https://timescale.github.io/timescaledb-ruby/).
* Follow the [LTTB][LTTB], [Open AI long-term storage][open-ai-tutorial], and [candlesticks][candlesticks] tutorials.

===== PAGE: https://docs.tigerdata.com/_partials/_add-data-energy/ =====
