---
title: "Vector Stores"
sourceId: "01-foundations/openai-api-reference-en"
sourceTitle: "OpenAI API 参考（字段级）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/reference"
entryUrl: "https://developers.openai.com/api/reference"
sourceRel: "api/reference/resources/vector_stores.md"
rawUrl: "/raw/01-foundations/openai-api-reference-en/api/reference/resources/vector_stores.md"
sourceSha256: "c28fa6b8bca516c69c62da541e4b81d62aac144ac2cb8d70199c3be1396dad39"
pageSha256: "a344e4e00bfc1e41d032c34ed295998ea54d5ed242baccbacae60ed7df2b40e9"
contentMode: "local-full"
zh: ""
---

# Vector Stores

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Create vector store

**post** `/vector_stores`

Create a vector store.

### Body Parameters

- `chunking_strategy: optional AutoFileChunkingStrategyParam or StaticFileChunkingStrategyObjectParam`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy. Only applicable if `file_ids` is non-empty.

  - `AutoFileChunkingStrategyParam object \{ type \}`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: "auto"`

      Always `auto`.

      - `"auto"`

  - `StaticFileChunkingStrategyObjectParam object \{ static, type \}`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: number`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: number`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: "static"`

      Always `static`.

      - `"static"`

- `description: optional string`

  A description for the vector store. Can be used to describe the vector store's purpose.

- `expires_after: optional object \{ anchor, days \}`

  The expiration policy for a vector store.

  - `anchor: "last_active_at"`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

    - `"last_active_at"`

  - `days: number`

    The number of days after the anchor time that the vector store will expire.

- `file_ids: optional array of string`

  A list of [File](https://developers.openai.com/api/reference/resources/files) IDs that the vector store should use. Useful for tools like `file_search` that can access files.

- `metadata: optional Metadata or null`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: optional string`

  The name of the vector store.

### Returns

- `VectorStore object \{ id, created_at, file_counts, 8 more \}`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: object \{ cancelled, completed, failed, 2 more \}`

    - `cancelled: number`

      The number of files that were cancelled.

    - `completed: number`

      The number of files that have been successfully processed.

    - `failed: number`

      The number of files that have failed to process.

    - `in_progress: number`

      The number of files that are currently being processed.

    - `total: number`

      The total number of files.

  - `last_active_at: number or null`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Metadata or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: string`

    The name of the vector store.

  - `object: "vector_store"`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: "expired" or "in_progress" or "completed"`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: number`

    The total number of bytes used by the files in the vector store.

  - `expires_after: optional object \{ anchor, days \}`

    The expiration policy for a vector store.

    - `anchor: "last_active_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: number`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: optional number or null`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```http
curl https://api.openai.com/v1/vector_stores \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "file_counts": {
    "cancelled": 0,
    "completed": 0,
    "failed": 0,
    "in_progress": 0,
    "total": 0
  },
  "last_active_at": 0,
  "metadata": {
    "foo": "string"
  },
  "name": "name",
  "object": "vector_store",
  "status": "expired",
  "usage_bytes": 0,
  "expires_after": {
    "anchor": "last_active_at",
    "days": 1
  },
  "expires_at": 0
}
```

### Example

```http
curl https://api.openai.com/v1/vector_stores \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "name": "Support FAQ"
  }'
```

#### Response

```json
{
  "id": "vs_abc123",
  "object": "vector_store",
  "created_at": 1699061776,
  "name": "Support FAQ",
  "description": "Contains commonly asked questions and answers, organized by topic.",
  "bytes": 139920,
  "file_counts": {
    "in_progress": 0,
    "completed": 3,
    "failed": 0,
    "cancelled": 0,
    "total": 3
  }
}
```

## Delete vector store

**delete** `/vector_stores/\{vector_store_id\}`

Delete a vector store.

### Path Parameters

- `vector_store_id: string`

### Returns

- `VectorStoreDeleted object \{ id, deleted, object \}`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.deleted"`

    - `"vector_store.deleted"`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID \
    -X DELETE \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "deleted": true,
  "object": "vector_store.deleted"
}
```

### Example

```http
curl https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -X DELETE
```

#### Response

```json
{
  id: "vs_abc123",
  object: "vector_store.deleted",
  deleted: true
}
```

## List vector stores

**get** `/vector_stores`

Returns a list of vector stores.

### Query Parameters

- `after: optional string`

  A cursor for use in pagination. `after` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, ending with obj_foo, your subsequent call can include after=obj_foo in order to fetch the next page of the list.

- `before: optional string`

  A cursor for use in pagination. `before` is an object ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, starting with obj_foo, your subsequent call can include before=obj_foo in order to fetch the previous page of the list.

- `limit: optional number`

  A limit on the number of objects to be returned. Limit can range between 1 and 100, and the default is 20.

- `order: optional "asc" or "desc"`

  Sort order by the `created_at` timestamp of the objects. `asc` for ascending order and `desc` for descending order.

  - `"asc"`

  - `"desc"`

### Returns

- `data: array of VectorStore`

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: object \{ cancelled, completed, failed, 2 more \}`

    - `cancelled: number`

      The number of files that were cancelled.

    - `completed: number`

      The number of files that have been successfully processed.

    - `failed: number`

      The number of files that have failed to process.

    - `in_progress: number`

      The number of files that are currently being processed.

    - `total: number`

      The total number of files.

  - `last_active_at: number or null`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Metadata or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: string`

    The name of the vector store.

  - `object: "vector_store"`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: "expired" or "in_progress" or "completed"`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: number`

    The total number of bytes used by the files in the vector store.

  - `expires_after: optional object \{ anchor, days \}`

    The expiration policy for a vector store.

    - `anchor: "last_active_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: number`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: optional number or null`

    The Unix timestamp (in seconds) for when the vector store will expire.

- `first_id: string`

- `has_more: boolean`

- `last_id: string`

- `object: string`

### Example

```http
curl https://api.openai.com/v1/vector_stores \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "data": [
    {
      "id": "id",
      "created_at": 0,
      "file_counts": {
        "cancelled": 0,
        "completed": 0,
        "failed": 0,
        "in_progress": 0,
        "total": 0
      },
      "last_active_at": 0,
      "metadata": {
        "foo": "string"
      },
      "name": "name",
      "object": "vector_store",
      "status": "expired",
      "usage_bytes": 0,
      "expires_after": {
        "anchor": "last_active_at",
        "days": 1
      },
      "expires_at": 0
    }
  ],
  "first_id": "vs_abc123",
  "has_more": false,
  "last_id": "vs_abc456",
  "object": "list"
}
```

### Example

```http
curl https://api.openai.com/v1/vector_stores \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Response

```json
{
  "object": "list",
  "data": [
    {
      "id": "vs_abc123",
      "object": "vector_store",
      "created_at": 1699061776,
      "name": "Support FAQ",
      "description": "Contains commonly asked questions and answers, organized by topic.",
      "bytes": 139920,
      "file_counts": {
        "in_progress": 0,
        "completed": 3,
        "failed": 0,
        "cancelled": 0,
        "total": 3
      }
    },
    {
      "id": "vs_abc456",
      "object": "vector_store",
      "created_at": 1699061776,
      "name": "Support FAQ v2",
      "description": null,
      "bytes": 139920,
      "file_counts": {
        "in_progress": 0,
        "completed": 3,
        "failed": 0,
        "cancelled": 0,
        "total": 3
      }
    }
  ],
  "first_id": "vs_abc123",
  "last_id": "vs_abc456",
  "has_more": false
}
```

## Retrieve vector store

**get** `/vector_stores/\{vector_store_id\}`

Retrieves a vector store.

### Path Parameters

- `vector_store_id: string`

### Returns

- `VectorStore object \{ id, created_at, file_counts, 8 more \}`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: object \{ cancelled, completed, failed, 2 more \}`

    - `cancelled: number`

      The number of files that were cancelled.

    - `completed: number`

      The number of files that have been successfully processed.

    - `failed: number`

      The number of files that have failed to process.

    - `in_progress: number`

      The number of files that are currently being processed.

    - `total: number`

      The total number of files.

  - `last_active_at: number or null`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Metadata or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: string`

    The name of the vector store.

  - `object: "vector_store"`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: "expired" or "in_progress" or "completed"`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: number`

    The total number of bytes used by the files in the vector store.

  - `expires_after: optional object \{ anchor, days \}`

    The expiration policy for a vector store.

    - `anchor: "last_active_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: number`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: optional number or null`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY"
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "file_counts": {
    "cancelled": 0,
    "completed": 0,
    "failed": 0,
    "in_progress": 0,
    "total": 0
  },
  "last_active_at": 0,
  "metadata": {
    "foo": "string"
  },
  "name": "name",
  "object": "vector_store",
  "status": "expired",
  "usage_bytes": 0,
  "expires_after": {
    "anchor": "last_active_at",
    "days": 1
  },
  "expires_at": 0
}
```

### Example

```http
curl https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2"
```

#### Response

```json
{
  "id": "vs_abc123",
  "object": "vector_store",
  "created_at": 1699061776
}
```

## Search vector store

**post** `/vector_stores/\{vector_store_id\}/search`

Search a vector store for relevant chunks based on a query and file attributes filter.

### Path Parameters

- `vector_store_id: string`

### Body Parameters

- `query: string or array of string`

  A query string for a search

  - `string`

  - `array of string`

- `filters: optional ComparisonFilter or CompoundFilter`

  A filter to apply based on file attributes.

  - `ComparisonFilter object \{ key, type, value \}`

    A filter used to compare a specified attribute key to a given value using a defined comparison operation.

    - `key: string`

      The key to compare against the value.

    - `type: "eq" or "ne" or "gt" or 5 more`

      Specifies the comparison operator: `eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `nin`.

      - `eq`: equals
      - `ne`: not equal
      - `gt`: greater than
      - `gte`: greater than or equal
      - `lt`: less than
      - `lte`: less than or equal
      - `in`: in
      - `nin`: not in

      - `"eq"`

      - `"ne"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

      - `"in"`

      - `"nin"`

    - `value: string or number or boolean or array of string or number`

      The value to compare against the attribute key; supports string, number, or boolean types.

      - `string`

      - `number`

      - `boolean`

      - `array of string or number`

        - `string`

        - `number`

  - `CompoundFilter object \{ filters, type \}`

    Combine multiple filters using `and` or `or`.

    - `filters: array of ComparisonFilter or unknown`

      Array of filters to combine. Items can be `ComparisonFilter` or `CompoundFilter`.

      - `ComparisonFilter object \{ key, type, value \}`

        A filter used to compare a specified attribute key to a given value using a defined comparison operation.

      - `unknown`

    - `type: "and" or "or"`

      Type of operation: `and` or `or`.

      - `"and"`

      - `"or"`

- `max_num_results: optional number`

  The maximum number of results to return. This number should be between 1 and 50 inclusive.

- `ranking_options: optional object \{ ranker, score_threshold \}`

  Ranking options for search.

  - `ranker: optional "none" or "auto" or "default-2024-11-15"`

    Enable re-ranking; set to `none` to disable, which can help reduce latency.

    - `"none"`

    - `"auto"`

    - `"default-2024-11-15"`

  - `score_threshold: optional number`

- `rewrite_query: optional boolean`

  Whether to rewrite the natural language query for vector search.

### Returns

- `data: array of object \{ attributes, content, file_id, 2 more \}`

  The list of search result items.

  - `attributes: map[string or number or boolean] or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `string`

    - `number`

    - `boolean`

  - `content: array of object \{ text, type \}`

    Content chunks from the file.

    - `text: string`

      The text content returned from search.

    - `type: "text"`

      The type of content.

      - `"text"`

  - `file_id: string`

    The ID of the vector store file.

  - `filename: string`

    The name of the vector store file.

  - `score: number`

    The similarity score for the result.

- `has_more: boolean`

  Indicates if there are more results to fetch.

- `next_page: string or null`

  The token for the next page, if any.

- `object: "vector_store.search_results.page"`

  The object type, which is always `vector_store.search_results.page`

  - `"vector_store.search_results.page"`

- `search_query: array of string`

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID/search \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
          "query": "string"
        }'
```

#### Response

```json
{
  "data": [
    {
      "attributes": {
        "foo": "string"
      },
      "content": [
        {
          "text": "text",
          "type": "text"
        }
      ],
      "file_id": "file_id",
      "filename": "filename",
      "score": 0
    }
  ],
  "has_more": true,
  "next_page": "next_page",
  "object": "vector_store.search_results.page",
  "search_query": [
    "string"
  ]
}
```

### Example

```http
curl -X POST \
https://api.openai.com/v1/vector_stores/vs_abc123/search \
-H "Authorization: Bearer $OPENAI_API_KEY" \
-H "Content-Type: application/json" \
-d '{"query": "What is the return policy?", "filters": {...}}'
```

#### Response

```json
{
  "object": "vector_store.search_results.page",
  "search_query": "What is the return policy?",
  "data": [
    {
      "file_id": "file_123",
      "filename": "document.pdf",
      "score": 0.95,
      "attributes": {
        "author": "John Doe",
        "date": "2023-01-01"
      },
      "content": [
        {
          "type": "text",
          "text": "Relevant chunk"
        }
      ]
    },
    {
      "file_id": "file_456",
      "filename": "notes.txt",
      "score": 0.89,
      "attributes": {
        "author": "Jane Smith",
        "date": "2023-01-02"
      },
      "content": [
        {
          "type": "text",
          "text": "Sample text content from the vector store."
        }
      ]
    }
  ],
  "has_more": false,
  "next_page": null
}
```

## Modify vector store

**post** `/vector_stores/\{vector_store_id\}`

Modifies a vector store.

### Path Parameters

- `vector_store_id: string`

### Body Parameters

- `expires_after: optional object \{ anchor, days \}  or null`

  The expiration policy for a vector store.

  - `anchor: "last_active_at"`

    Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

    - `"last_active_at"`

  - `days: number`

    The number of days after the anchor time that the vector store will expire.

- `metadata: optional Metadata or null`

  Set of 16 key-value pairs that can be attached to an object. This can be
  useful for storing additional information about the object in a structured
  format, and querying for objects via API or the dashboard.

  Keys are strings with a maximum length of 64 characters. Values are strings
  with a maximum length of 512 characters.

- `name: optional string or null`

  The name of the vector store.

### Returns

- `VectorStore object \{ id, created_at, file_counts, 8 more \}`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: object \{ cancelled, completed, failed, 2 more \}`

    - `cancelled: number`

      The number of files that were cancelled.

    - `completed: number`

      The number of files that have been successfully processed.

    - `failed: number`

      The number of files that have failed to process.

    - `in_progress: number`

      The number of files that are currently being processed.

    - `total: number`

      The total number of files.

  - `last_active_at: number or null`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Metadata or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: string`

    The name of the vector store.

  - `object: "vector_store"`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: "expired" or "in_progress" or "completed"`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: number`

    The total number of bytes used by the files in the vector store.

  - `expires_after: optional object \{ anchor, days \}`

    The expiration policy for a vector store.

    - `anchor: "last_active_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: number`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: optional number or null`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Example

```http
curl https://api.openai.com/v1/vector_stores/$VECTOR_STORE_ID \
    -H 'Content-Type: application/json' \
    -H 'OpenAI-Beta: assistants=v2' \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{}'
```

#### Response

```json
{
  "id": "id",
  "created_at": 0,
  "file_counts": {
    "cancelled": 0,
    "completed": 0,
    "failed": 0,
    "in_progress": 0,
    "total": 0
  },
  "last_active_at": 0,
  "metadata": {
    "foo": "string"
  },
  "name": "name",
  "object": "vector_store",
  "status": "expired",
  "usage_bytes": 0,
  "expires_after": {
    "anchor": "last_active_at",
    "days": 1
  },
  "expires_at": 0
}
```

### Example

```http
curl https://api.openai.com/v1/vector_stores/vs_abc123 \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2"
  -d '{
    "name": "Support FAQ"
  }'
```

#### Response

```json
{
  "id": "vs_abc123",
  "object": "vector_store",
  "created_at": 1699061776,
  "name": "Support FAQ",
  "description": "Contains commonly asked questions and answers, organized by topic.",
  "bytes": 139920,
  "file_counts": {
    "in_progress": 0,
    "completed": 3,
    "failed": 0,
    "cancelled": 0,
    "total": 3
  }
}
```

## Domain Types

### Auto File Chunking Strategy Param

- `AutoFileChunkingStrategyParam object \{ type \}`

  The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

  - `type: "auto"`

    Always `auto`.

    - `"auto"`

### File Chunking Strategy Param

- `FileChunkingStrategyParam = AutoFileChunkingStrategyParam or StaticFileChunkingStrategyObjectParam`

  The chunking strategy used to chunk the file(s). If not set, will use the `auto` strategy.

  - `AutoFileChunkingStrategyParam object \{ type \}`

    The default strategy. This strategy currently uses a `max_chunk_size_tokens` of `800` and `chunk_overlap_tokens` of `400`.

    - `type: "auto"`

      Always `auto`.

      - `"auto"`

  - `StaticFileChunkingStrategyObjectParam object \{ static, type \}`

    Customize your own chunking strategy by setting chunk size and chunk overlap.

    - `static: StaticFileChunkingStrategy`

      - `chunk_overlap_tokens: number`

        The number of tokens that overlap between chunks. The default value is `400`.

        Note that the overlap must not exceed half of `max_chunk_size_tokens`.

      - `max_chunk_size_tokens: number`

        The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

    - `type: "static"`

      Always `static`.

      - `"static"`

### Other File Chunking Strategy Object

- `OtherFileChunkingStrategyObject object \{ type \}`

  This is returned when the chunking strategy is unknown. Typically, this is because the file was indexed before the `chunking_strategy` concept was introduced in the API.

  - `type: "other"`

    Always `other`.

    - `"other"`

### Static File Chunking Strategy

- `StaticFileChunkingStrategy object \{ chunk_overlap_tokens, max_chunk_size_tokens \}`

  - `chunk_overlap_tokens: number`

    The number of tokens that overlap between chunks. The default value is `400`.

    Note that the overlap must not exceed half of `max_chunk_size_tokens`.

  - `max_chunk_size_tokens: number`

    The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

### Static File Chunking Strategy Object

- `StaticFileChunkingStrategyObject object \{ static, type \}`

  - `static: StaticFileChunkingStrategy`

    - `chunk_overlap_tokens: number`

      The number of tokens that overlap between chunks. The default value is `400`.

      Note that the overlap must not exceed half of `max_chunk_size_tokens`.

    - `max_chunk_size_tokens: number`

      The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

  - `type: "static"`

    Always `static`.

    - `"static"`

### Static File Chunking Strategy Object Param

- `StaticFileChunkingStrategyObjectParam object \{ static, type \}`

  Customize your own chunking strategy by setting chunk size and chunk overlap.

  - `static: StaticFileChunkingStrategy`

    - `chunk_overlap_tokens: number`

      The number of tokens that overlap between chunks. The default value is `400`.

      Note that the overlap must not exceed half of `max_chunk_size_tokens`.

    - `max_chunk_size_tokens: number`

      The maximum number of tokens in each chunk. The default value is `800`. The minimum value is `100` and the maximum value is `4096`.

  - `type: "static"`

    Always `static`.

    - `"static"`

### Vector Store

- `VectorStore object \{ id, created_at, file_counts, 8 more \}`

  A vector store is a collection of processed files can be used by the `file_search` tool.

  - `id: string`

    The identifier, which can be referenced in API endpoints.

  - `created_at: number`

    The Unix timestamp (in seconds) for when the vector store was created.

  - `file_counts: object \{ cancelled, completed, failed, 2 more \}`

    - `cancelled: number`

      The number of files that were cancelled.

    - `completed: number`

      The number of files that have been successfully processed.

    - `failed: number`

      The number of files that have failed to process.

    - `in_progress: number`

      The number of files that are currently being processed.

    - `total: number`

      The total number of files.

  - `last_active_at: number or null`

    The Unix timestamp (in seconds) for when the vector store was last active.

  - `metadata: Metadata or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard.

    Keys are strings with a maximum length of 64 characters. Values are strings
    with a maximum length of 512 characters.

  - `name: string`

    The name of the vector store.

  - `object: "vector_store"`

    The object type, which is always `vector_store`.

    - `"vector_store"`

  - `status: "expired" or "in_progress" or "completed"`

    The status of the vector store, which can be either `expired`, `in_progress`, or `completed`. A status of `completed` indicates that the vector store is ready for use.

    - `"expired"`

    - `"in_progress"`

    - `"completed"`

  - `usage_bytes: number`

    The total number of bytes used by the files in the vector store.

  - `expires_after: optional object \{ anchor, days \}`

    The expiration policy for a vector store.

    - `anchor: "last_active_at"`

      Anchor timestamp after which the expiration policy applies. Supported anchors: `last_active_at`.

      - `"last_active_at"`

    - `days: number`

      The number of days after the anchor time that the vector store will expire.

  - `expires_at: optional number or null`

    The Unix timestamp (in seconds) for when the vector store will expire.

### Vector Store Deleted

- `VectorStoreDeleted object \{ id, deleted, object \}`

  - `id: string`

  - `deleted: boolean`

  - `object: "vector_store.deleted"`

    - `"vector_store.deleted"`

### Vector Store Search Response

- `VectorStoreSearchResponse object \{ attributes, content, file_id, 2 more \}`

  - `attributes: map[string or number or boolean] or null`

    Set of 16 key-value pairs that can be attached to an object. This can be
    useful for storing additional information about the object in a structured
    format, and querying for objects via API or the dashboard. Keys are strings
    with a maximum length of 64 characters. Values are strings with a maximum
    length of 512 characters, booleans, or numbers.

    - `string`

    - `number`

    - `boolean`

  - `content: array of object \{ text, type \}`

    Content chunks from the file.

    - `text: string`

      The text content returned from search.

    - `type: "text"`

      The type of content.

      - `"text"`

  - `file_id: string`

    The ID of the vector store file.

  - `filename: string`

    The name of the vector store file.

  - `score: number`

    The similarity score for the result.
