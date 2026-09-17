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
pageSha256: "2cc9df8a0566892f7a6a7f89bd9d0a70990ed856bbed03668ca8382a04544258"
contentMode: "local-full"
zh: ""
---

#### Access hypertable stats

You collect hypertable stats using methods that provide insights into your hypertable's structure, size, and compression
status:

- Get basic hypertable information:

    ```ruby
    hypertable = PageLoad.hypertable
    hypertable.hypertable_name  # The name of your hypertable
    hypertable.schema_name      # The schema where the hypertable is located
    ```

- Get detailed size information:

    ```ruby
    hypertable.detailed_size # Get detailed size information for the hypertable
    hypertable.compression_stats # Get compression statistics
    hypertable.chunks_detailed_size # Get chunk information
    hypertable.approximate_row_count # Get approximate row count
    hypertable.dimensions.map(&:column_name) # Get dimension information
    hypertable.continuous_aggregates.map(&:view_name) # Get continuous aggregate view names
    ```
