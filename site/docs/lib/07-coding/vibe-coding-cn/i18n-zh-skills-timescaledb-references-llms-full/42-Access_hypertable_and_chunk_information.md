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
pageSha256: "3a4dc06b9bd4c142d62cbdb3abe6785d29dbe8492c99df13d6393dfc8a2c363d"
contentMode: "local-full"
zh: ""
---

#### Access hypertable and chunk information

- View chunk or hypertable information:

    ```ruby
    PageLoad.chunks.count
    PageLoad.hypertable.detailed_size
    ```

- Compress/Decompress chunks:

    ```ruby
    PageLoad.chunks.uncompressed.first.compress!  # Compress the first uncompressed chunk
    PageLoad.chunks.compressed.first.decompress!  # Decompress the oldest chunk
    PageLoad.hypertable.compression_stats # View compression stats

    ```
