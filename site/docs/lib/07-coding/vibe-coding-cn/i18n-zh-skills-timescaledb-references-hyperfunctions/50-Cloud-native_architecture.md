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
pageSha256: "1e75be60608882e2edd1b7e698894470d7c87840f479af3239d768b5626c96b2"
contentMode: "local-full"
zh: ""
---

## Cloud-native architecture

Real-time analytics requires a scalable, high-performance, and cost-efficient database that can handle high-ingest rates and low-latency queries without overprovisioning. Tiger Cloud is designed for elasticity, enabling independent scaling of storage and compute, workload isolation, and intelligent data tiering.

### Independent storage and compute scaling

Real-time applications generate continuous data streams while requiring instant querying of both fresh and historical data. Traditional databases force users to pre-provision fixed storage, leading to unnecessary costs or unexpected limits. Tiger Cloud eliminates this constraint by dynamically scaling storage based on actual usage:

* Storage expands and contracts automatically as data is added or deleted, avoiding manual intervention.
* Usage-based billing ensures costs align with actual storage consumption, eliminating large upfront allocations.
* Compute can be scaled independently to optimize query execution, ensuring fast analytics across both recent and historical data.

With this architecture, databases grow alongside data streams, enabling seamless access to real-time and historical insights while efficiently managing storage costs.

### Workload isolation for real-time performance

Balancing high-ingest rates and low-latency analytical queries on the same system can create contention, slowing down performance. Tiger Cloud mitigates this by allowing read and write workloads to scale independently:

* The primary database efficiently handles both ingestion and real-time rollups without disruption.
* Read replicas scale query performance separately, ensuring fast analytics even under heavy workloads.

<center>
  class="main-content__illustration"
  width="80%"
  src="https://assets.timescale.com/docs/images/compute-compute-seperation.png"
  alt=""
/>
</center>

This separation ensures that frequent queries on fresh data don’t interfere with ingestion, making it easier to support live monitoring, anomaly detection, interactive dashboards, and alerting systems.

### Intelligent data tiering for cost-efficient real-time analytics

Not all real-time data is equally valuable—recent data is queried constantly, while older data is accessed less frequently. Tiger Cloud can be configured to automatically tier data to cheaper bottomless object storage, ensuring that hot data remains instantly accessible, while historical data is still available.

<center>
  class="main-content__illustration"
  width="80%"
  src="https://assets.timescale.com/docs/images/tiering.png"
  alt=""
/>
</center>

* **Recent, high-velocity data** stays in high-performance storage for ultra-fast queries.
* **Older, less frequently accessed data** is automatically moved to cost-efficient object storage but remains queryable and available for building continuous aggregates.

While many systems support this concept of data cooling, TimescaleDB ensures that the data can still be queried from the same hypertable regardless of its current location. For real-time analytics, this means applications can analyze live data streams without worrying about storage constraints, while still maintaining access to long-term trends when needed.

### Cloud-native database observability

Real-time analytics doesn’t just require fast queries—it requires the ability to understand why queries are fast or slow, where resources are being used, and how performance changes over time. That’s why Tiger Cloud is built with deep observability features, giving developers and operators full visibility into their database workloads.

At the core of this observability is Insights, Tiger Cloud’s built-in query monitoring tool. Insights captures
per-query
statistics from our whole fleet in real time, showing you exactly how your database is behaving under load. It tracks key metrics like execution time, planning time, number of rows read and returned, I/O usage, and buffer cache hit rates—not just for the database as a whole, but for each individual query.

Insights lets you do the following:

* Identify slow or resource-intensive queries instantly
* Spot long-term performance regressions or trends
* Understand query patterns and how they evolve over time
* See the impact of schema changes, indexes, or continuous aggregates on workload performance
* Monitor and compare different versions of the same query to optimize execution

All this is surfaced through an intuitive interface, available directly in Tiger Cloud, with no instrumentation or external monitoring infrastructure required.

Beyond query-level visibility, Tiger Cloud also exposes metrics around service resource consumption, compression, continuous aggregates, and data tiering, allowing you to track how data moves through the system—and how those background processes impact storage and query performance.

Together, these observability features give you the insight and control needed to operate a real-time analytics database at scale, with confidence, clarity, and performance you can trust**.**
