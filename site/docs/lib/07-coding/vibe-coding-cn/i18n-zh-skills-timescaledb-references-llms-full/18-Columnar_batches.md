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
pageSha256: "85e10bd1fab852e978cf8d7df9862e7a9141a3026f2698da380b3087452a50a0"
contentMode: "local-full"
zh: ""
---

#### Columnar batches

TimescaleDB uses columnar collocation and columnar compression within row-based storage to optimize analytical query performance while maintaining full Postgres compatibility. This approach ensures efficient storage, high compression ratios, and rapid query execution.

<center>
  class="main-content__illustration"
  width="80%"
  src="https://assets.timescale.com/docs/images/columnstore.png"
  alt=""
/>
</center>

A rowstore chunk is converted to a columnstore chunk by successfully grouping together sets of rows (typically up to 1000) into a single batch, then converting the batch into columnar form.

Each compressed batch does the following:

* Encapsulates columnar data in compressed arrays of up to 1,000 values per column, stored as a single entry in the underlying compressed table
* Uses a column-major format within the batch, enabling efficient scans by co-locating values of the same column and allowing the selection of individual columns without reading the entire batch
* Applies advanced compression techniques at the column level, including run-length encoding, delta encoding, and Gorilla compression, to significantly reduce storage footprint (by up to 95%) and improve I/O performance.

While the chunk interval of rowstore and columnstore batches usually remains the same, TimescaleDB can also combine columnstore batches so they use a different chunk interval.

This architecture provides the benefits of columnar storage—optimized scans, reduced disk I/O, and improved analytical performance—while seamlessly integrating with Postgres’s row-based execution model.
