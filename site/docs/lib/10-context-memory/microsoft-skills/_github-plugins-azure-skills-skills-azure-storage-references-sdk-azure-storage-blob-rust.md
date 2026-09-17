---
title: "Blob Storage — Rust SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-rust.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-rust.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-storage/references/sdk/azure-storage-blob-rust.md"
sourceSha256: "0c0e37e728cc1115e74286d38c7f8ae1489b627f1231dab26a2229a43e8e0bcd"
pageSha256: "0c0e37e728cc1115e74286d38c7f8ae1489b627f1231dab26a2229a43e8e0bcd"
contentMode: "local-full"
zh: ""
---

# Blob Storage — Rust SDK Quick Reference

> Condensed from **azure-storage-blob-rust**. Full patterns (container ops,
> blob properties, RBAC permissions)
> in the **azure-storage-blob-rust** plugin skill if installed.

## Install
cargo add azure_storage_blob azure_identity

## Quick Start
```rust
use azure_identity::DeveloperToolsCredential;
use azure_storage_blob::BlobClient;
let credential = DeveloperToolsCredential::new(None)?;
let blob_client = BlobClient::new("https://<account>.blob.core.windows.net/", "container", "blob", Some(credential), None)?;
```

## Best Practices
- Use Entra ID auth — `DeveloperToolsCredential` for dev, `ManagedIdentityCredential` for production
- Specify content length — required for uploads
- Use `RequestContent::from()` to wrap upload data
- Handle async operations — use `tokio` runtime
- Check RBAC permissions — ensure "Storage Blob Data Contributor" role

## Non-Obvious Patterns
```rust
use azure_core::http::RequestContent;
blob_client.upload(RequestContent::from(data.to_vec()), false, u64::try_from(data.len())?, None).await?;
```
