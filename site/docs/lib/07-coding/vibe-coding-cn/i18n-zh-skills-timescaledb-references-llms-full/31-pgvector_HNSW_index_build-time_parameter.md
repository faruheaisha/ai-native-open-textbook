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
pageSha256: "ac5f87f9b25592aed6304c9628f81a885382ebb2fa71cdbaec455a6db4b438e0"
contentMode: "local-full"
zh: ""
---

#### pgvector HNSW index build-time parameters

These parameters can be set at index build time:

| Parameter name   | Description                                                                                                                                                    | Default value |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `m`    | Represents the maximum number of connections per layer. Think of these connections as edges created for each node during graph construction. Increasing m increases accuracy but also increases index build time and size.                                       | 16            |
| `ef_construction` | Represents the size of the dynamic candidate list for constructing the graph. It influences the trade-off between index quality and construction speed. Increasing `ef_construction` enables more accurate search results at the expense of lengthier index build times. | 64 |

An example of how to set the m parameter is:

```sql
CREATE INDEX document_embedding_idx ON document_embedding
USING hnsw(embedding vector_cosine_ops) WITH (m = 20);
```
