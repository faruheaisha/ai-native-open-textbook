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
entryUrl: "https://github.com/2025Emma/vibe-coding-cn/blob/9b42dd10ddf3fff58f8c7a4d347175db107d7bf9/i18n/zh/skills/timescaledb/references/api.md"
sourceRel: "i18n/zh/skills/timescaledb/references/api.md"
rawUrl: "/raw/07-coding/vibe-coding-cn/i18n/zh/skills/timescaledb/references/api.md"
sourceSha256: "3e08a12386bc1c2c2965dda885ab8b9b9b30d35e89d8c00a2f2d70066d208a6e"
pageSha256: "5f214133932f9a968accf377a260cb2b48f7d7718246210bc90547c5c4b25888"
contentMode: "local-full"
zh: ""
---

## UUIDv7 functions

**URL:** llms-txt#uuidv7-functions

**Contents:**
- Examples
- Functions

UUIDv7 is a time-ordered UUID that includes a Unix timestamp (with millisecond precision) in its first 48 bits. Like
other UUIDs, it uses 6 bits for version and variant info, and the remaining 74 bits are random.

![UUIDv7 microseconds](https://assets.timescale.com/docs/images/uuidv7-structure-microseconds.svg)

UUIDv7 is ideal anywhere you create lots of records over time, not only observability. Advantages are:

- **No extra column required to partition by time with sortability**: you can sort UUIDv7 instances by their value. This
   is useful for ordering records by creation time without the need for a separate timestamp column.
- **Indexing performance**: UUIDv7s increase with time, so new rows append near the end of a B-tree instead of
   This results in fewer page splits, less fragmentation, faster inserts, and efficient time-range scans.
- **Easy keyset pagination**: `WHERE id > :cursor` and natural sharding.
- **UUID**: safe across services, replicas, and unique across distributed systems.

UUIDv7 also increases query speed by reducing the number of chunks scanned during queries. For example, in a database
with 25 million rows, the following query runs in 25 seconds:

Using UUIDv7 excludes chunks at startup and reduces the query time to 550ms:

You use UUIDvs for events, orders, messages, uploads, runs, jobs, spans, and more.

- **High-rate event logs for observability and metrics**:

UUIDv7 gives you globally unique IDs (for traceability) and time windows (“last hour”), without the need for a
   separate `created_at` column. UUIDv7 create less churn because inserts land at the end of the index, and you can
   filter by time using UUIDv7 objects.

- Last hour:
      
  - Keyset pagination

- **Workflow / durable execution runs**:

Each run needs a stable ID for joins and retries, and you often ask “what started since X?”. UUIDs help by serving
   both as the primary key and a time cursor across services. For example:

- **Orders / activity feeds / messages (SaaS apps)**:

Human-readable timestamps are not mandatory in a table. However, you still need time-ordered pages and day/week ranges.
    UUIDv7 enables clean date windows and cursor pagination with just the ID. For example:

- [generate_uuidv7()][generate_uuidv7]: generate a version 7 UUID based on current time
- [to_uuidv7()][to_uuidv7]: create a version 7 UUID from a PostgreSQL timestamp
- [to_uuidv7_boundary()][to_uuidv7_boundary]: create a version 7 "boundary" UUID from a PostgreSQL timestamp
- [uuid_timestamp()][uuid_timestamp]: extract a PostgreSQL timestamp from a version 7 UUID
- [uuid_timestamp_micros()][uuid_timestamp_micros]: extract a PostgreSQL timestamp with microsecond precision from a version 7 UUID
- [uuid_version()][uuid_version]: extract the version of a UUID

===== PAGE: https://docs.tigerdata.com/api/approximate_row_count/ =====

**Examples:**

Example 1 (sql):
```sql
WITH ref AS (SELECT now() AS t0)
SELECT count(*) AS cnt_ts_filter
FROM events e, ref
WHERE uuid_timestamp(e.event_id) >= ref.t0 - INTERVAL '2 days';
```

Example 2 (sql):
```sql
WITH ref AS (SELECT now() AS t0)
SELECT count(*) AS cnt_boundary_filter
FROM events e, ref
WHERE e.event_id >= to_uuidv7_boundary(ref.t0 - INTERVAL '2 days')
```

Example 3 (sql):
```sql
SELECT count(*) FROM logs WHERE id >= to_uuidv7_boundary(now() - interval '1 hour');
```

Example 4 (sql):
```sql
SELECT * FROM logs WHERE id > to_uuidv7($last_seen'::timestamptz, true) ORDER BY id LIMIT 1000;
```
