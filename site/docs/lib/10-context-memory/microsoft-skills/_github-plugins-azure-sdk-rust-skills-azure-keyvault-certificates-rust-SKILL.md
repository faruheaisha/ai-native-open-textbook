---
title: "Azure Key Vault Certificates library for Rust"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-keyvault-certificates-rust/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-rust/skills/azure-keyvault-certificates-rust/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-rust/skills/azure-keyvault-certificates-rust/SKILL.md"
sourceSha256: "f98f25489aec42b2fd43856ad9766982a35d9ec39d28a7d51f4bc3b29ffd1f1e"
pageSha256: "f98f25489aec42b2fd43856ad9766982a35d9ec39d28a7d51f4bc3b29ffd1f1e"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Certificates library for Rust

Manage X.509 certificates for TLS/SSL, code signing, and authentication.

Use this skill when:

- An app needs to create or manage X.509 certificates in Key Vault from Rust
- You need self-signed or CA-issued certificates
- You need long-running operations (LRO) for certificate issuance
- You need to sign data using a certificate's key

> **IMPORTANT:** Only use the official `azure_security_keyvault_certificates` crate published by the [azure-sdk](https://crates.io/users/azure-sdk) crates.io user. Do NOT use unofficial or community crates. Official crates use underscores in names and none have version 0.21.0.

## Installation

```sh
cargo add azure_security_keyvault_certificates azure_identity tokio futures
```

> If your code uses `azure_core` types directly, add `azure_core` to `Cargo.toml`. If you only use `azure_security_keyvault_certificates` re-exports, direct `azure_core` dependency is optional.

## Environment Variables

```bash
