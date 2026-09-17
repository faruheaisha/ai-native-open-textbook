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
pageSha256: "31dc2bbab00a3ccf9277cc5825cbc254eeae00b91ddda040f19dfb9ca3c7d1b6"
contentMode: "local-full"
zh: ""
---

### Decompress chunks by time

To decompress a set of chunks based on a time range, you can use the output of
`show_chunks` to decompress each one:

For more information about the `decompress_chunk` function, see the `decompress_chunk`
[API reference][api-reference-decompress].
