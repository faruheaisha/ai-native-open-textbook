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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/other.md"
sourceRel: "i18n/zh/skills/timescaledb/references/other.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/other.md"
sourceSha256: "b53764abbdaf16beaf22420ad0a62ac75d41058fb99968403f1bbd067870709e"
pageSha256: "89930660ca94660b6cad0b2d91054d970914db08f89f565409581a3d4c355617"
contentMode: "local-full"
zh: ""
---

#### pgvector HNSW index-supported queries

You need to use the distance operator (`<=>`, `<->`, or `<#>`) matching the ops class you used during index creation in your `ORDER BY` clause. A canonical query would be:

Pgvector provides a clustering-based indexing algorithm. The [blog post](https://www.timescale.com/blog/nearest-neighbor-indexes-what-are-ivfflat-indexes-in-pgvector-and-how-do-they-work) describes how it works in detail. It provides the fastest index-build speed but the slowest query speeds of any indexing algorithm.

To create an index named `document_embedding_idx` on table `document_embedding` having a vector column named `embedding`, run:

This command creates an index for cosine-distance queries because of `vector_cosine_ops`. There are also "ops" classes for Euclidean distance and negative inner product:

| Distance type          | Query operator | Index ops class  |
|------------------------|----------------|-------------------|
| Cosine / Angular       | `<=>`            | `vector_cosine_ops` |
| Euclidean / L2         | `<->`            | `vector_ip_ops`     |
| Negative inner product | `<#>`            | `vector_l2_ops`     |

Note: *ivfflat should never be created on empty tables* because it needs to cluster data, and that only happens when an index is first created, not when new rows are inserted or modified. Also, if your table undergoes a lot of modifications, you need to rebuild this index occasionally to maintain good accuracy. See the [blog post](https://www.timescale.com/blog/nearest-neighbor-indexes-what-are-ivfflat-indexes-in-pgvector-and-how-do-they-work) for details.

Pgvector ivfflat has a `lists` index parameter that should be set. See the next section.
