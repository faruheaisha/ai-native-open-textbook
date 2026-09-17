---
title: "Azure Blob Storage library for Rust"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-storage-blob-rust/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-rust/skills/azure-storage-blob-rust/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-rust/skills/azure-storage-blob-rust/SKILL.md"
sourceSha256: "6750e050df436fe23223dfe4cacaf9067f3d16ed10f6b9137453b0cb7bcd0b9b"
pageSha256: "6750e050df436fe23223dfe4cacaf9067f3d16ed10f6b9137453b0cb7bcd0b9b"
contentMode: "local-full"
zh: ""
---

# Azure Blob Storage library for Rust

Client library for Azure Blob Storage — upload, download, and manage blobs and containers.

Use this skill when:

- An app needs to upload or download blobs from Azure Storage in Rust
- You need to create or manage blob containers
- You need to list blobs with pagination
- You need RBAC-based auth for blob operations

> **IMPORTANT:** Only use the official `azure_storage_blob` crate published by the [azure-sdk](https://crates.io/users/azure-sdk) crates.io user. Do NOT use the unofficial `azure_storage`, `azure_storage_blobs`, or `azure_sdk_for_rust` community crates. Official crates use underscores in names and none have version 0.21.0.

## Installation

```sh
cargo add azure_storage_blob azure_identity azure_core tokio futures
```

> If your code uses `azure_core` types directly (for example, `azure_core::http::Url` or `azure_core::http::RequestContent`), add `azure_core` to `Cargo.toml`. If you only use `azure_storage_blob` re-exports, direct `azure_core` dependency is optional.

## Environment Variables

```bash
