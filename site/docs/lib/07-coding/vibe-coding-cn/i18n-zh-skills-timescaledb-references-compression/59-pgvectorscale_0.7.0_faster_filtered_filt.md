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
pageSha256: "00f79bfcbcbf657930904b48e95355bb6fcb2f1cf9fe863507d366709dd13fed"
contentMode: "local-full"
zh: ""
---

### pgvectorscale 0.7.0: faster filtered filtered vector search with filtered indexes

This pgvectorscale release adds label-based filtered vector search to the StreamingDiskANN index.
This enables you to return more precise and efficient results by combining vector
similarity search with label filtering while still uitilizing the ANN index. This is a common need for large-scale RAG and Agentic applications
that rely on vector searches with metadata filters to return relevant results. Filtered indexes add
even more capabilities for filtered search at scale, complementing the high accuracy streaming filtering already
present in pgvectorscale. The implementation is inspired by Microsoft's Filtered DiskANN research.
For more information, see the [pgvectorscale release notes][log-28032025-pgvectorscale-rn] and a
[usage example][log-28032025-pgvectorscale-example].
