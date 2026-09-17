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
pageSha256: "ef050109fa5a3c34b0e4512f684495631ea1e81fda30f04aa788b0c07ed04966"
contentMode: "local-full"
zh: ""
---

#### pgvector HNSW index

Pgvector provides a graph-based indexing algorithm based on the popular
[HNSW algorithm](https://arxiv.org/abs/1603.09320).

To create this index, run:

The above command creates the index using smart defaults. There are
a number of parameters you could tune to adjust the accuracy/speed
trade-off.

The parameters you can set at index build time are:

| Parameter name  | Description                                                                                                                                                                                                                                                            | Default value |
|-----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `m`               | Represents the maximum number of connections per layer. Think of these connections as edges created for each node during graph construction. Increasing m increases accuracy but also increases index build time and size.                                             | 16            |
| `ef_construction` | Represents the size of the dynamic candidate list for constructing the graph. It influences the trade-off between index quality and construction speed. Increasing `ef_construction` enables more accurate search results at the expense of lengthier index build times. | 64            |

To set these parameters, you could run:

You can also set a parameter to control the accuracy vs. query speed
trade-off at query time. The parameter is set in the `search()` function
using the `query_params` argument. You can set the `ef_search`(default:
40). This parameter specifies the size of the dynamic candidate list
used during search. Higher values improve query accuracy while making
the query slower.

You can specify this value during search as follows:

To drop the index run:
