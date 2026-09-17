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
pageSha256: "ed44532e5d50c63e51c6d6e2c5df246a93c0112a91f88a9d1e46722ae6955168"
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
