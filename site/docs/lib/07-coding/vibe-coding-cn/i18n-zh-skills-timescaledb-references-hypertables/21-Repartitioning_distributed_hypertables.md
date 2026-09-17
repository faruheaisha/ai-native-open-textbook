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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceRel: "i18n/zh/skills/timescaledb/references/hypertables.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/hypertables.md"
sourceSha256: "2b1f8e46c900f47b6a11c8e246b0d222b1dd95793bf063ebaafd0fb65c96841c"
pageSha256: "b503e658e0b28f01c76ab021220f392b436d491c122ee91521a26c35c67e4174"
contentMode: "local-full"
zh: ""
---

### Repartitioning distributed hypertables

You can expand distributed hypertables by adding additional data nodes. If you
now have fewer space partitions than data nodes, you need to increase the
number of space partitions to make use of your new nodes. The new partitioning
configuration only affects new chunks. In this diagram, an extra data node
was added during the third time interval. The fourth time interval now includes
four chunks, while the previous time intervals still include three:

&lt;img class="main-content__illustration"
width=\{1375\} height=\{944\}
src="https://assets.timescale.com/docs/images/repartitioning.webp"
alt="Diagram showing repartitioning on a distributed hypertable"
/>

This can affect queries that span the two different partitioning configurations.
For more information, see the section on
[limitations of query push down][limitations].

## Replicating distributed hypertables

To replicate distributed hypertables at the chunk level, configure the
hypertables to write each chunk to multiple data nodes. This native replication
ensures that a distributed hypertable is protected against data node failures
and provides an alternative to fully replicating each data node using streaming
replication to provide high availability. Only the data nodes are replicated
using this method. The access node is not replicated.

For more information about replication and high availability, see the
[multi-node HA section][multi-node-ha].

## Performance of distributed hypertables

A distributed hypertable horizontally scales your data storage, so you're not
limited by the storage of any single machine. It also increases performance for
some queries.

Whether, and by how much, your performance increases depends on your query
patterns and data partitioning. Performance increases when the access node can
push down query processing to data nodes. For example, if you query with a
`GROUP BY` clause, and the data is partitioned by the `GROUP BY` column, the
data nodes can perform the processing and send only the final results to the
access node.

If processing can't be done on the data nodes, the access node needs to pull in
raw or partially processed data and do the processing locally. For more
information, see the [limitations of pushing down
queries][limitations-pushing-down].

The access node can use a full or a partial method to push down queries.
Computations that can be pushed down include sorts and groupings. Joins on data
nodes aren't currently supported.

To see how a query is pushed down to a data node, use `EXPLAIN VERBOSE` to
inspect the query plan and the remote SQL statement sent to each data node.

In the full push-down method, the access node offloads all computation to the
data nodes. It receives final results from the data nodes and appends them. To
fully push down an aggregate query, the `GROUP BY` clause must include either:

*   All the partitioning columns _or_
*   Only the first space-partitioning column

For example, say that you want to calculate the `max` temperature for each
location:

If `location` is your only space partition, each data node can compute the
maximum on its own subset of the data.
