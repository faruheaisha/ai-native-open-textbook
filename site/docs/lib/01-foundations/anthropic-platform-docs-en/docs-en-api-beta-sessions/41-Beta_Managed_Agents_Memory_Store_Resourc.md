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
sourceRel: "docs/en/api/beta/sessions.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/sessions.md"
sourceSha256: "e4a8446bb6d4b0344d7f996b22b5ecbd47536df1d7800ee2865d8dc67a16abc2"
pageSha256: "8328f103791937b96a7af560b1c46b6fd9ac89ba9653efed4b4e02a951fda664"
contentMode: "local-full"
zh: ""
---

### Beta Managed Agents Memory Store Resource Param

- `BetaManagedAgentsMemoryStoreResourceParam object`

  Parameters for attaching a memory store to an agent session.

  - `type: "memory_store"`

  - `memory_store_id: string`

    The memory store ID (memstore_...). Must belong to the caller's organization and workspace.

  - `access: optional "read_write" or "read_only" or null`

    Access mode for an attached memory store.

    - `"read_write"`

    - `"read_only"`

  - `instructions: optional string or null`

    Per-attachment guidance for the agent on how to use this store. Rendered into the memory section of the system prompt. Max 4096 chars.

    maxLength: 4096
