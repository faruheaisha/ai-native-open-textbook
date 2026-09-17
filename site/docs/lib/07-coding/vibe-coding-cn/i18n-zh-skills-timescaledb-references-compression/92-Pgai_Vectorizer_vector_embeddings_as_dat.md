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
pageSha256: "e808a1a4ea4b704196d3d4aeb2ed3246a08f047f1e74b9b8060dc87fdcf708cb"
contentMode: "local-full"
zh: ""
---

### Pgai Vectorizer: vector embeddings as database indexes (early access)
This early access feature enables you to automatically create, update, and maintain embeddings as your data changes. Just like an index, Timescale handles all the complexity: syncing, versioning, and cleanup happen automatically.
This means no manual tracking, zero maintenance burden, and the freedom to rapidly experiment with different embedding models and chunking strategies without building new pipelines.
Navigate to the AI tab in your service overview and follow the instructions to add your OpenAI API key and set up your first vectorizer or read our [guide to automate embedding generation with pgai Vectorizer](https://github.com/timescale/pgai/blob/main/docs/vectorizer/overview.md) for more details.

![Vectorizer setup](https://s3.amazonaws.com/assets.timescale.com/docs/images/vectorizer-setup.png)
