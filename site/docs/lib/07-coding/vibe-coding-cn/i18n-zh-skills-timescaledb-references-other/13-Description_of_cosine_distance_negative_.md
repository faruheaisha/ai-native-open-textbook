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
pageSha256: "829b1b5b65d2b1e28905115cc3374f9a422319ea4c14873e968e37a158180ac5"
contentMode: "local-full"
zh: ""
---

#### Description of cosine distance, negative inner product, and Euclidean distance

Here's a succinct description of three common vector distance measures

- **Cosine distance a.k.a. angular distance**: This measures the cosine of the angle between two vectors. It's not a true "distance" in the mathematical sense but a similarity measure, where a smaller angle corresponds to a higher similarity. The cosine distance is particularly useful in high-dimensional spaces where the magnitude of the vectors (their length) is less important, such as in text analysis or information retrieval. It ranges from -1 (meaning exactly opposite) to 1 (exactly the same), with 0 typically indicating orthogonality (no similarity). See here for more on [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity).

- **Negative inner product**: This is simply the negative of the inner product (also known as the dot product) of two vectors. The inner product measures vector similarity based on the vectors' magnitudes and the cosine of the angle between them. A higher inner product indicates greater similarity. However, it's important to note that, unlike cosine similarity, the magnitude of the vectors influences the inner product.

- **Euclidean distance**: This is the "ordinary" straight-line distance between two points in Euclidean space. In terms of vectors, it's the square root of the sum of the squared differences between corresponding elements of the vectors. This measure is sensitive to the magnitude of the vectors and is widely used in various fields such as clustering and nearest neighbor search.

Many embedding systems (for example OpenAI's ada-002) use vectors with length 1 (unit vectors). For those systems, the rankings (ordering) of all three measures is the same. In particular,
- The cosine distance is `1−dot product`.
- The negative inner product is `−dot product`.
- The Euclidean distance is related to the dot product, where the squared Euclidean distance is `2(1−dot product)`.
