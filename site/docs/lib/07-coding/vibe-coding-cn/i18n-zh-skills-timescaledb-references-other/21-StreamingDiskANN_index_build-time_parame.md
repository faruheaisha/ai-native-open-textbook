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
pageSha256: "2a094b47ad806252d21fad7a37c031d8ca05ab4e3ae8425c0187c91ee1b68ca2"
contentMode: "local-full"
zh: ""
---

#### StreamingDiskANN index build-time parameters

These parameters can be set when an index is created.

| Parameter name   | Description                                                                                                                                                    | Default value |
|------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `storage_layout` | `memory_optimized` which uses SBQ to compress vector data or `plain` which stores data uncompressed | memory_optimized
| `num_neighbors`    | Sets the maximum number of neighbors per node. Higher values increase accuracy but make the graph traversal slower.                                           | 50            |
| `search_list_size` | This is the S parameter used in the greedy search algorithm used during construction. Higher values improve graph quality at the cost of slower index builds. | 100           |
| `max_alpha`        | Is the alpha parameter in the algorithm. Higher values improve graph quality at the cost of slower index builds.                                              | 1.2           |
| `num_dimensions` | The number of dimensions to index. By default, all dimensions are indexed. But you can also index less dimensions to make use of [Matryoshka embeddings](https://huggingface.co/blog/matryoshka) | 0 (all dimensions)
| `num_bits_per_dimension` | Number of bits used to encode each dimension when using SBQ | 2 for less than 900 dimensions, 1 otherwise

An example of how to set the `num_neighbors` parameter is:
