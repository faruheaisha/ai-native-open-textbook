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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceRel: "i18n/zh/skills/timescaledb/references/llms-full.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/llms-full.md"
sourceSha256: "5b223f41e9b421d89aa3ada311e079bfcf943fd79ec6f83793d0e93a29f910da"
pageSha256: "0ff640c0d32a7d032516378d63ef346fc43494ca9be6e4f94a689745ce3c6384"
contentMode: "local-full"
zh: ""
---

#### Filter your search by time

When using `time-partitioning` (see below) you can very efficiently
filter your search by time. Time-partitioning associates the timestamp embedded
in a UUID-based ID with an embedding. First,
create a collection with time partitioning and insert some data (one
item from January 2018 and another in January 2019):

``` python
tpvec = client.Sync(service_url, "time_partitioned_table", 2, time_partition_interval=timedelta(hours=6))
tpvec.create_tables()

specific_datetime = datetime(2018, 1, 1, 12, 0, 0)
tpvec.upsert([\
    (client.uuid_from_time(specific_datetime), {"animal":"fox", "action": "sit", "times":1}, "the brown fox", [1.0,1.3]),\
    (client.uuid_from_time(specific_datetime+timedelta(days=365)),  {"animal":"fox", "action": "jump", "times":100}, "jumped over the", [1.0,10.8]),\
])
```

Then, you can filter using the timestamps by specifying a
`uuid_time_filter`:

``` python
tpvec.search([1.0, 9.0], limit=4, uuid_time_filter=client.UUIDTimeRange(specific_datetime, specific_datetime+timedelta(days=1)))
```

    [[UUID('33c52800-ef15-11e7-be03-4f1f9a1bde5a'),
      \{'times': 1, 'action': 'sit', 'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

A
[`UUIDTimeRange`](https://timescale.github.io/python-vector/vector.html#uuidtimerange)
can specify a `start_date` or `end_date` or both(as in the example above).
Specifying only the `start_date` or `end_date` leaves the other end
unconstrained.

``` python
tpvec.search([1.0, 9.0], limit=4, uuid_time_filter=client.UUIDTimeRange(start_date=specific_datetime))
```

    [[UUID('ac8be800-0de6-11e9-889a-5eec84ba8a7b'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456],
     [UUID('33c52800-ef15-11e7-be03-4f1f9a1bde5a'),
      \{'times': 1, 'action': 'sit', 'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

You have the option to define whether the start and end dates
are inclusive with the `start_inclusive` and `end_inclusive` parameters. Setting
`start_inclusive` to true results in comparisons using the `>=`
operator, whereas setting it to false applies the `>` operator. By
default, the start date is inclusive, while the end date is exclusive.
One example:

``` python
tpvec.search([1.0, 9.0], limit=4, uuid_time_filter=client.UUIDTimeRange(start_date=specific_datetime, start_inclusive=False))
```

    [[UUID('ac8be800-0de6-11e9-889a-5eec84ba8a7b'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]

Notice how the results are different when using the
`start_inclusive=False` option because the first row has the exact
timestamp specified by `start_date`.

It is also easy to integrate time filters using the `filter` and
`predicates` parameters described above using special reserved key names
to make it appear that the timestamps are part of your metadata. This
is useful when integrating with other systems that just want to
specify a set of filters (often these are "auto retriever" type
systems). The reserved key names are `__start_date` and `__end_date` for
filters and `__uuid_timestamp` for predicates. Some examples below:

``` python
tpvec.search([1.0, 9.0], limit=4, filter={ "__start_date": specific_datetime, "__end_date": specific_datetime+timedelta(days=1)})
```

    [[UUID('33c52800-ef15-11e7-be03-4f1f9a1bde5a'),
      \{'times': 1, 'action': 'sit', 'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

``` python
tpvec.search([1.0, 9.0], limit=4,
             predicates=client.Predicates("__uuid_timestamp", ">", specific_datetime) & client.Predicates("__uuid_timestamp", "<", specific_datetime+timedelta(days=1)))
```

    [[UUID('33c52800-ef15-11e7-be03-4f1f9a1bde5a'),
      \{'times': 1, 'action': 'sit', 'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

### Indexing

Indexing speeds up queries over your data. By default, the system creates indexes
to query your data by the UUID and the metadata.

To speed up similarity search based on the embeddings, you have to
create additional indexes.

Note that if performing a query without an index, you always get an
exact result, but the query is slow (it has to read all of the data
you store for every query). With an index, your queries are
order-of-magnitude faster, but the results are approximate (because there
are no known indexing techniques that are exact).

Luckily, TimescaleDB provides 3 excellent approximate indexing algorithms,
StreamingDiskANN, HNSW, and ivfflat.

Below are the trade-offs between these algorithms:

| Algorithm        | Build speed | Query speed | Need to rebuild after updates |
|------------------|-------------|-------------|-------------------------------|
| StreamingDiskAnn | Fast        | Fastest     | No                            |
| HNSW    | Fast   | Faster      | No                            |
| ivfflat | Fastest     | Slowest     | Yes                           |

You can see
[benchmarks](https://www.timescale.com/blog/how-we-made-postgresql-the-best-vector-database/)
on the blog.

You should use the StreamingDiskANN index for most use cases. This
can be created with:

``` python
vec.create_embedding_index(client.TimescaleVectorIndex())
```

Indexes are created for a particular distance metric type. So it is
important that the same distance metric is set on the client during
index creation as it is during queries. See the `distance type` section
below.

Each of these indexes has a set of build-time options for controlling
the speed/accuracy trade-off when creating the index and an additional
query-time option for controlling accuracy during a particular query. The
library uses smart defaults for all of these options. The
details for how to adjust these options manually are below.
