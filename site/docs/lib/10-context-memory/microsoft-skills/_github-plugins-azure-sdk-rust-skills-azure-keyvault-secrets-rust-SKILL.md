---
title: "Azure Key Vault Secrets library for Rust"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-keyvault-secrets-rust/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-rust/skills/azure-keyvault-secrets-rust/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-rust/skills/azure-keyvault-secrets-rust/SKILL.md"
sourceSha256: "d246f8bf17b28cca1e9d06548bb64e71b0945ea5aadfdfb3e1327e7bff30c7a2"
pageSha256: "d246f8bf17b28cca1e9d06548bb64e71b0945ea5aadfdfb3e1327e7bff30c7a2"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Secrets library for Rust

Secure storage for passwords, API keys, and connection strings.

Use this skill when:

- An app needs to store or retrieve secrets from Azure Key Vault in Rust
- You need to set, get, update, or delete secrets
- You need to list secret properties with pagination
- You need error handling for missing secrets

> **IMPORTANT:** Only use the official `azure_security_keyvault_secrets` crate published by the [azure-sdk](https://crates.io/users/azure-sdk) crates.io user. Do NOT use unofficial or community crates. Official crates use underscores in names and none have version 0.21.0.

## Installation

```sh
cargo add azure_security_keyvault_secrets azure_identity tokio futures
```

> If your code uses `azure_core` types directly, add `azure_core` to `Cargo.toml`. If you only use `azure_security_keyvault_secrets` re-exports, direct `azure_core` dependency is optional.

## Environment Variables

```bash
