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
pageSha256: "7891ee551f2da521988caaa3f6e3775cd0dcbde1fdf066e02bb5d3f13143b797"
contentMode: "local-full"
zh: ""
---

#### Postgres indexes (row and columnar)

Unlike many databases, TimescaleDB supports sparse indexes on columnstore data, allowing queries to efficiently locate specific values within both row-based and compressed columnar storage. These indexes enable fast lookups, range queries, and filtering operations that further reduce unnecessary data scans.

<center>
  class="main-content__illustration"
  width="80%"
  src="https://assets.timescale.com/docs/images/rowstore-indexes.png"
  alt=""
/>
</center>
