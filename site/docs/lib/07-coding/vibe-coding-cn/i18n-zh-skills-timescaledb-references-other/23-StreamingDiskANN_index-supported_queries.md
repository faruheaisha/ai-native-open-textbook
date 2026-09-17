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
pageSha256: "aa791ac1dc415533660fe9b9c895b2e2c957ec616a252ab8527eb54e00ee0656"
contentMode: "local-full"
zh: ""
---

#### StreamingDiskANN index-supported queries

You need to use the cosine-distance embedding measure (`<=>`) in your `ORDER BY` clause. A canonical query would be:

Pgvector provides a graph-based indexing algorithm based on the popular [HNSW algorithm](https://arxiv.org/abs/1603.09320).

To create an index named `document_embedding_idx` on table `document_embedding` having a vector column named `embedding`, run:

This command creates an index for cosine-distance queries because of `vector_cosine_ops`. There are also "ops" classes for Euclidean distance and negative inner product:

| Distance type          | Query operator | Index ops class  |
|------------------------|----------------|-------------------|
| Cosine / Angular       | `<=>`            | `vector_cosine_ops` |
| Euclidean / L2         | `<->`            | `vector_ip_ops`     |
| Negative inner product | `<#>`            | `vector_l2_ops`     |

Pgvector HNSW also includes several index build-time and query-time parameters.
