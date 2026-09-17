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
pageSha256: "d2c97560e790965757582b9e84c57fd0a2f7a6516a2648b2af5f8888b1ace01a"
contentMode: "local-full"
zh: ""
---

#### Secondary partition exclusion (columnar)

Min/max metadata allows queries filtering on correlated dimensions (e.g., `order_id` or secondary timestamps) to exclude chunks that don’t contain relevant data.

<center>
  class="main-content__illustration"
  width="80%"
  src="https://assets.timescale.com/docs/images/chunk-skipping-on-secondary-columns.png"
  alt=""
/>
</center>
