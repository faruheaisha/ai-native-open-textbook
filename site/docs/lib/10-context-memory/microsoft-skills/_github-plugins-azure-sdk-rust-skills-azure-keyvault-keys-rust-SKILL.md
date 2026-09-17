---
title: "Azure Key Vault Keys library for Rust"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-keyvault-keys-rust/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-rust/skills/azure-keyvault-keys-rust/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-rust/skills/azure-keyvault-keys-rust/SKILL.md"
sourceSha256: "24e1f152af7ecb5dbb37a84456b596c1ebc78773b9e1f1e32e4b223931a9a2c0"
pageSha256: "24e1f152af7ecb5dbb37a84456b596c1ebc78773b9e1f1e32e4b223931a9a2c0"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Keys library for Rust

Secure storage and management of cryptographic keys — RSA, EC, and HSM-protected.

Use this skill when:

- An app needs to create or manage cryptographic keys in Key Vault from Rust
- You need to wrap/unwrap data encryption keys (envelope encryption)
- You need to sign or verify data with Key Vault keys
- You need HSM-protected keys

> **IMPORTANT:** Only use the official `azure_security_keyvault_keys` crate published by the [azure-sdk](https://crates.io/users/azure-sdk) crates.io user. Do NOT use unofficial or community crates. Official crates use underscores in names and none have version 0.21.0.

## Installation

```sh
cargo add azure_security_keyvault_keys azure_identity tokio futures
```

> If your code uses `azure_core` types directly, add `azure_core` to `Cargo.toml`. If you only use `azure_security_keyvault_keys` re-exports, direct `azure_core` dependency is optional.

## Environment Variables

```bash
