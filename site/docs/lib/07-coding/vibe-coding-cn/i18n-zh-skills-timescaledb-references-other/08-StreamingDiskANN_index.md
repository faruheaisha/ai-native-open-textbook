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
pageSha256: "9d56f3c22e9310606faf0322fe41fcd89fc0adcdb653ab2a60dc46408faf1c79"
contentMode: "local-full"
zh: ""
---

#### StreamingDiskANN index

The StreamingDiskANN index is a graph-based algorithm that uses the
[DiskANN](https://github.com/microsoft/DiskANN) algorithm. You can read
more about it in the
[blog](https://www.timescale.com/blog/how-we-made-postgresql-the-best-vector-database/)
announcing its release.

To create this index, run:

The above command creates the index using smart defaults. There are
a number of parameters you could tune to adjust the accuracy/speed
trade-off.

The parameters you can set at index build time are:

| Parameter name   | Description                                                                                                                                                   | Default value |
|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| `num_neighbors`    | Sets the maximum number of neighbors per node. Higher values increase accuracy but make the graph traversal slower.                                           | 50            |
| `search_list_size` | This is the S parameter used in the greedy search algorithm used during construction. Higher values improve graph quality at the cost of slower index builds. | 100           |
| `max_alpha`        | Is the alpha parameter in the algorithm. Higher values improve graph quality at the cost of slower index builds.                                              | 1.0           |

To set these parameters, you could run:

You can also set a parameter to control the accuracy vs. query speed
trade-off at query time. The parameter is set in the `search()` function
using the `query_params` argument. You can set the
`search_list_size`(default: 100). This is the number of additional
candidates considered during the graph search at query time. Higher
values improve query accuracy while making the query slower.

You can specify this value during search as follows:

To drop the index, run:
