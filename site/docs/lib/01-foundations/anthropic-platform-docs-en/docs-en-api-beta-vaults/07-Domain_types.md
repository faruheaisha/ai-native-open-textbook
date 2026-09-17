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
sourceRel: "docs/en/api/beta/vaults.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/api/beta/vaults.md"
sourceSha256: "f7fe7cbc423fbdf4f550db27f5983590b20354e201461a1d6140118f3f73c970"
pageSha256: "a4daf52f85dcad1a0e697c143d25bade36ed4d68e7e6e2c7a9cd84c565bb67d7"
contentMode: "local-full"
zh: ""
---

## Domain types

### Beta Managed Agents Deleted Vault

- `BetaManagedAgentsDeletedVault object`

  Confirmation of a deleted vault.

  - `type: "vault_deleted"`

  - `id: string`

    Unique identifier of the deleted vault.

### Beta Managed Agents Vault

- `BetaManagedAgentsVault object`

  A vault that stores credentials for use by agents during sessions.

  - `type: "vault"`

  - `id: string`

    Unique identifier for the vault.

  - `archived_at: string or null`

    A timestamp in RFC 3339 format

    format: date-time

  - `created_at: string`

    A timestamp in RFC 3339 format

    format: date-time

  - `display_name: string`

    Human-readable name for the vault.

  - `metadata: map[string]`

    Arbitrary key-value metadata attached to the vault.

  - `updated_at: string`

    A timestamp in RFC 3339 format

    format: date-time
