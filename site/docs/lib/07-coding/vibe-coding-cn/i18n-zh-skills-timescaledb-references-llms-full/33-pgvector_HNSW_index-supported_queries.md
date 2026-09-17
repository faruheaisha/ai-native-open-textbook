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
pageSha256: "053c368428ba1f92cf879d41ee661d416826d89743b55702405ffa700049a786"
contentMode: "local-full"
zh: ""
---

#### pgvector HNSW index-supported queries

You need to use the distance operator (`<=>`, `<->`, or `<#>`) matching the ops class you used during index creation in your `ORDER BY` clause. A canonical query would be:

```sql
SELECT *
FROM document_embedding
ORDER BY embedding <=> $1
LIMIT 10
```

### pgvector ivfflat

Pgvector provides a clustering-based indexing algorithm. The [blog post](https://www.timescale.com/blog/nearest-neighbor-indexes-what-are-ivfflat-indexes-in-pgvector-and-how-do-they-work) describes how it works in detail. It provides the fastest index-build speed but the slowest query speeds of any indexing algorithm.

To create an index named `document_embedding_idx` on table `document_embedding` having a vector column named `embedding`, run:
```sql
CREATE INDEX document_embedding_idx ON document_embedding
USING ivfflat(embedding vector_cosine_ops) WITH (lists = 100);
```

This command creates an index for cosine-distance queries because of `vector_cosine_ops`. There are also "ops" classes for Euclidean distance and negative inner product:

| Distance type          | Query operator | Index ops class  |
|------------------------|----------------|-------------------|
| Cosine / Angular       | `<=>`            | `vector_cosine_ops` |
| Euclidean / L2         | `<->`            | `vector_ip_ops`     |
| Negative inner product | `<#>`            | `vector_l2_ops`     |

Note: *ivfflat should never be created on empty tables* because it needs to cluster data, and that only happens when an index is first created, not when new rows are inserted or modified. Also, if your table undergoes a lot of modifications, you need to rebuild this index occasionally to maintain good accuracy. See the [blog post](https://www.timescale.com/blog/nearest-neighbor-indexes-what-are-ivfflat-indexes-in-pgvector-and-how-do-they-work) for details.

Pgvector ivfflat has a `lists` index parameter that should be set. See the next section.
