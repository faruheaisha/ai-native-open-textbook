---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/api/beta/memory_stores.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/memory_stores.md"
sourceSha256: "c57fcb0703fbc54c5032b15534389c9ca40af9aca44eb7c58cc1bbdd3ed1f2c0"
pageSha256: "86ec8adad6a89f09f4e30a9cb869480e0957301019604aeab7d7a7ba5bdf7781"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Managed Agents Deleted Memory Store

- `BetaManagedAgentsDeletedMemoryStore object`

  Confirmation that a `memory_store` was deleted.

  - `type: "memory_store_deleted"`

  - `id: string`

    ID of the deleted memory store (a `memstore_...` identifier). The store and all its memories and versions are no longer retrievable.

### Beta Managed Agents Memory Store

- `BetaManagedAgentsMemoryStore object`

  A `memory_store`: a named container for agent memories, scoped to a workspace. Attach a store to a session via `resources[]` to mount it as a directory the agent can read and write.

  - `type: "memory_store"`

  - `id: string`

    Unique identifier for the memory store (a `memstore_...` tagged ID). Use this when attaching the store to a session, or in the `\{memory_store_id\}` path parameter of subsequent calls.

  - `created_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `name: string`

    Human-readable name for the store. 1–255 characters. The store's mount-path slug under `/mnt/memory/` is derived from this name.

  - `updated_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `archived_at: optional string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `description: optional string`

    Free-text description of what the store contains, up to 1024 characters. Included in the agent's system prompt when the store is attached, so word it to be useful to the agent. Empty string when unset.

  - `metadata: optional map[string]`

    Arbitrary key-value tags for your own bookkeeping (such as the end user a store belongs to). Up to 16 pairs; keys 1–64 characters; values up to 512 characters. Returned on retrieve/list but not filterable.
