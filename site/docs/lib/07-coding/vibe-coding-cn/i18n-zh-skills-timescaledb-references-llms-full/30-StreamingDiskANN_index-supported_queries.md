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
pageSha256: "1b0baf00c581b7fd279f8df418ee83999553cccbff06f6109b9a8b494f807147"
contentMode: "local-full"
zh: ""
---

#### StreamingDiskANN index-supported queries

You need to use the cosine-distance embedding measure (`<=>`) in your `ORDER BY` clause. A canonical query would be:

```sql
SELECT *
FROM document_embedding
ORDER BY embedding <=> $1
LIMIT 10
```

### pgvector HNSW

Pgvector provides a graph-based indexing algorithm based on the popular [HNSW algorithm](https://arxiv.org/abs/1603.09320).

To create an index named `document_embedding_idx` on table `document_embedding` having a vector column named `embedding`, run:
```sql
CREATE INDEX document_embedding_idx ON document_embedding
USING hnsw(embedding vector_cosine_ops);
```

This command creates an index for cosine-distance queries because of `vector_cosine_ops`. There are also "ops" classes for Euclidean distance and negative inner product:

| Distance type          | Query operator | Index ops class  |
|------------------------|----------------|-------------------|
| Cosine / Angular       | `<=>`            | `vector_cosine_ops` |
| Euclidean / L2         | `<->`            | `vector_ip_ops`     |
| Negative inner product | `<#>`            | `vector_l2_ops`     |

Pgvector HNSW also includes several index build-time and query-time parameters.
