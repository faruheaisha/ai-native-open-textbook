---
title: "Key Vault Keys — Rust SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-keys-rust.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-keys-rust.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-keys-rust.md"
sourceSha256: "002349d349accc158aa5022a30066cc1ac8a82bc3a32bb9f26d87bd1d2999f4f"
pageSha256: "002349d349accc158aa5022a30066cc1ac8a82bc3a32bb9f26d87bd1d2999f4f"
contentMode: "local-full"
zh: ""
---

# Key Vault Keys — Rust SDK Quick Reference

> Condensed from **azure-keyvault-keys-rust**. Full patterns (EC keys,
> backup/restore, crypto operations, RBAC permissions)
> in the **azure-keyvault-keys-rust** plugin skill if installed.

## Install
cargo add azure_security_keyvault_keys azure_identity

## Quick Start
```rust
use azure_identity::DeveloperToolsCredential;
use azure_security_keyvault_keys::KeyClient;
let credential = DeveloperToolsCredential::new(None)?;
let client = KeyClient::new("https://<vault>.vault.azure.net/", credential.clone(), None)?;
```

## Best Practices
- Use Entra ID auth — `DeveloperToolsCredential` for dev, `ManagedIdentityCredential` for production
- Use HSM keys for sensitive workloads — hardware-protected keys
- Use EC for signing — more efficient than RSA
- Use RSA for encryption — when encrypting data
- Backup keys for disaster recovery
- Enable soft delete — required for production vaults
- Use key rotation — create new versions periodically

## Non-Obvious Patterns
```rust
use azure_security_keyvault_keys::models::{CreateKeyParameters, KeyType};
let params = CreateKeyParameters { kty: KeyType::Rsa, key_size: Some(2048), ..Default::default() };
client.create_key("name", params.try_into()?, None).await?.into_model()?;
```
