---
title: "Key Vault Secrets — Rust SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-secrets-rust.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-secrets-rust.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-secrets-rust.md"
sourceSha256: "e1839f9399e3b45fb459312b17f6d4ba3f0879463ba143abf273f48a3cefc5f2"
pageSha256: "e1839f9399e3b45fb459312b17f6d4ba3f0879463ba143abf273f48a3cefc5f2"
contentMode: "local-full"
zh: ""
---

# Key Vault Secrets — Rust SDK Quick Reference

> Condensed from **azure-keyvault-secrets-rust**. Full patterns (versioning,
> update properties, tags, soft delete recovery)
> in the **azure-keyvault-secrets-rust** plugin skill if installed.

## Install
cargo add azure_security_keyvault_secrets azure_identity

## Quick Start
```rust
use azure_identity::DeveloperToolsCredential;
use azure_security_keyvault_secrets::SecretClient;
let credential = DeveloperToolsCredential::new(None)?;
let client = SecretClient::new("https://<vault>.vault.azure.net/", credential.clone(), None)?;
```

## Best Practices
- Use Entra ID auth — `DeveloperToolsCredential` for dev, `ManagedIdentityCredential` for production
- Use `into_model()?` to deserialize responses
- Use `ResourceExt` trait for extracting names from IDs
- Handle soft delete — deleted secrets can be recovered within retention period
- Set content type — helps identify secret format
- Use tags for organizing and filtering secrets
- Version secrets — new values create new versions automatically

## Non-Obvious Patterns
```rust
use azure_security_keyvault_secrets::models::SetSecretParameters;
let params = SetSecretParameters { value: Some("secret-value".into()), ..Default::default() };
client.set_secret("name", params.try_into()?, None).await?.into_model()?;
```
