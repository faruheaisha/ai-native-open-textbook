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
pageSha256: "4c4540be77c36ce6f557ea53f3c4e651d78bbf61b354d66ff847a5f7eaa2190b"
contentMode: "local-full"
zh: ""
---

#### Tier chunks

Tiering a chunk is an asynchronous process that schedules the chunk to be tiered. In the following example, you tier chunks older than three days in the `example` hypertable. You then list the tiered chunks.

1. **Select all chunks in `example` that are older than three days:**

   ```sql
   SELECT show_chunks('example', older_than => INTERVAL '3 days');
   ```

   This returns a list of chunks. Take a note of the chunk names:

   ```sql
   _timescaledb_internal._hyper_1_1_chunk
   _timescaledb_internal._hyper_1_2_chunk
   ```

1. **Call `tier_chunk` to manually tier each chunk:**

   ```sql
   SELECT tier_chunk('_timescaledb_internal._hyper_1_1_chunk');
   ```

1. **Repeat for all chunks you want to tier.**

   Tiering a chunk schedules it for migration to the object storage tier, but the migration won't happen immediately. Chunks are tiered one at a time in order to minimize database resource consumption. A chunk is marked as migrated and deleted from the standard storage only after it has been durably stored in the object storage tier. You can continue to query a chunk during migration.

1. **To see which chunks are tiered into the object storage tier, use the `tiered_chunks` informational view:**

    ```sql
    SELECT * FROM timescaledb_osm.tiered_chunks;
    ```

To see which chunks are scheduled for tiering either by policy or by a manual call, but have not yet been tiered, use this view:

```sql
SELECT * FROM timescaledb_osm.chunks_queued_for_tiering ;
```
