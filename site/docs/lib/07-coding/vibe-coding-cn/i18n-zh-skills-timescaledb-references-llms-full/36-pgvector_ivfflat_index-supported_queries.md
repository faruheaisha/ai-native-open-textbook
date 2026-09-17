---
title: "Python interface for pgvector and pgvectorscale"
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
pageSha256: "691df1cf488253394bea91cd4f7f06f19466e80d5c369e7e06c978f6b20f5c48"
contentMode: "local-full"
zh: ""
---

# Python interface for pgvector and pgvectorscale

You use pgai to power production grade AI applications. `timescale_vector` is the
 Python interface you use to interact with a pgai on Tiger Cloud service programmatically.

Before you get started with `timescale_vector`:

- [Sign up for pgai on Tiger Cloud](https://console.cloud.timescale.com/signup?utm_campaign=vectorlaunch&utm_source=docs&utm_medium=direct): Get 90 days free to try pgai on Tiger Cloud.
- [Follow the Get Started Tutorial](https://timescale.github.io/python-vector/tsv_python_getting_started_tutorial.html):
Learn how to use pgai on Tiger Cloud for semantic search on a real-world dataset.

If you prefer to use an LLM development or data framework, see pgai's integrations with [LangChain](https://python.langchain.com/docs/integrations/vectorstores/timescalevector) and [LlamaIndex](https://gpt-index.readthedocs.io/en/stable/examples/vector_stores/Timescalevector.html).

## Prerequisites

`timescale_vector` depends on the source distribution of `psycopg2` and adheres
to [best practices for psycopg2](https://www.psycopg.org/docs/install.html#psycopg-vs-psycopg-binary).

Before you install `timescale_vector`:

* Follow the [psycopg2 build prerequisites](https://www.psycopg.org/docs/install.html#build-prerequisites).

## Install

To interact with pgai on Tiger Cloud using Python:

1. Install `timescale_vector`:

    ```bash
    pip install timescale_vector
    ```
1. Install `dotenv`:

    ```bash
    pip install python-dotenv
    ```

    In these examples, you use `dotenv` to pass secrets and keys.

That is it, you are ready to go.

## Basic usage of the timescale_vector library

First, import all the necessary libraries:

``` python
from dotenv import load_dotenv, find_dotenv
import os
from timescale_vector import client
import uuid
from datetime import datetime, timedelta
```

Load up your Postgres credentials, the safest way is with a `.env` file:

``` python
_ = load_dotenv(find_dotenv(), override=True)
service_url  = os.environ['TIMESCALE_SERVICE_URL']
```

Next, create the client. This tutorial, uses the sync client. But the library has an async client as well (with an identical interface that
uses async functions).

The client constructor takes three required arguments:

| name           | description                                                                               |
|----------------|-------------------------------------------------------------------------------------------|
| `service_url`    | Tiger Cloud service URL / connection string                                                     |
| `table_name`     | Name of the table to use for storing the embeddings. Think of this as the collection name |
| `num_dimensions` | Number of dimensions in the vector                                                        |

``` python
vec  = client.Sync(service_url, "my_data", 2)
```

Next, create the tables for the collection:

``` python
vec.create_tables()
```

Next, insert some data. The data record contains:

- A UUID to uniquely identify the embedding
- A JSON blob of metadata about the embedding
- The text the embedding represents
- The embedding itself

Because this data includes UUIDs which become primary keys, upserts should be used for ingest.

``` python
vec.upsert([\
    (uuid.uuid1(), {"animal": "fox"}, "the brown fox", [1.0,1.3]),\
    (uuid.uuid1(), {"animal": "fox", "action":"jump"}, "jumped over the", [1.0,10.8]),\
])
```

You can now create a vector index to speed up similarity search:

``` python
vec.create_embedding_index(client.TimescaleVectorIndex())
```

Then, you can query for similar items:

``` python
vec.search([1.0, 9.0])
```

    [[UUID('73d05df0-84c1-11ee-98da-6ee10b77fd08'),
      \{'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456],
     [UUID('73d05d6e-84c1-11ee-98da-6ee10b77fd08'),
      \{'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

There are many search options which are covered below in the
`Advanced search` section.

A simple search example that returns one item using a similarity search
constrained by a metadata filter is shown below:

``` python
vec.search([1.0, 9.0], limit=1, filter={"action": "jump"})
```

    [[UUID('73d05df0-84c1-11ee-98da-6ee10b77fd08'),
      \{'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]

The returned records contain 5 fields:

| name      | description                                             |
|-----------|---------------------------------------------------------|
| id        | The UUID of the record                                  |
| metadata  | The JSON metadata associated with the record            |
| contents  | the text content that was embedded                      |
| embedding | The vector embedding                                    |
| distance  | The distance between the query embedding and the vector |

You can access the fields by simply using the record as a dictionary
keyed on the field name:

``` python
records = vec.search([1.0, 9.0], limit=1, filter={"action": "jump"})
(records[0]["id"],records[0]["metadata"], records[0]["contents"], records[0]["embedding"], records[0]["distance"])
```

    (UUID('73d05df0-84c1-11ee-98da-6ee10b77fd08'),
     \{'action': 'jump', 'animal': 'fox'\},
     'jumped over the',
     array([ 1. , 10.8], dtype=float32),
     0.00016793422934946456)

You can delete by ID:

``` python
vec.delete_by_ids([records[0]["id"]])
```

Or you can delete by metadata filters:

``` python
vec.delete_by_metadata({"action": "jump"})
```

To delete all records use:

``` python
vec.delete_all()
```

## Advanced usage

This section goes into more detail about the Python interface. It covers:

1.  Search filter options - how to narrow your search by additional
    constraints
2.  Indexing - how to speed up your similarity queries
3.  Time-based partitioning - how to optimize similarity queries that
    filter on time
4.  Setting different distance types to use in distance calculations

### Search options

The `search` function is very versatile and allows you to search for the right vector in a wide variety of ways. This section describes the search option in 3 parts:

1.  Basic similarity search.
2.  How to filter your search based on the associated metadata.
3.  Filtering on time when time-partitioning is enabled.

The following examples are based on this data:

``` python
vec.upsert([\
    (uuid.uuid1(), {"animal":"fox", "action": "sit", "times":1}, "the brown fox", [1.0,1.3]),\
    (uuid.uuid1(),  {"animal":"fox", "action": "jump", "times":100}, "jumped over the", [1.0,10.8]),\
])
```

The basic query looks like this:

``` python
vec.search([1.0, 9.0])
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456],
     [UUID('7487af14-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 1, 'action': 'sit', 'animal': 'fox'\},
      'the brown fox',
      array([1. , 1.3], dtype=float32),
      0.14489260377438218]]

You could provide a limit for the number of items returned:

``` python
vec.search([1.0, 9.0], limit=1)
```

    [[UUID('7487af96-84c1-11ee-98da-6ee10b77fd08'),
      \{'times': 100, 'action': 'jump', 'animal': 'fox'\},
      'jumped over the',
      array([ 1. , 10.8], dtype=float32),
      0.00016793422934946456]]
