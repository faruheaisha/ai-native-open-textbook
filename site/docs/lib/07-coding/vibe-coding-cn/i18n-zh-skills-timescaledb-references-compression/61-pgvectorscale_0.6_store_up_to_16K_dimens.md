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
pageSha256: "82da21dfe2b109d21386778f011c25654b9844aad0af7555c3282e26d9f6e871"
contentMode: "local-full"
zh: ""
---

### pgvectorscale 0.6 — store up to 16K dimension embeddings

pgvectorscale 0.6.0 now supports storing vectors with up to 16,000 dimensions, removing the previous limitation of 2,000 from pgvector. This lets you use larger embedding models like OpenAI's text-embedding-3-large (3072 dim) with Postgres as your vector database. This release also includes key performance and capability enhancements, including NEON support for SIMD distance calculations on aarch64 processors, improved inner product distance metric implementation, and improved index statistics. See the release details [here](https://github.com/timescale/pgvectorscale/releases/tag/0.6.0).
