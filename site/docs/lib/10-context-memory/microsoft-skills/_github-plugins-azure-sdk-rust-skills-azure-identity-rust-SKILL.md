---
title: "Azure Identity library for Rust"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-rust/skills/azure-identity-rust/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-rust/skills/azure-identity-rust/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-rust/skills/azure-identity-rust/SKILL.md"
sourceSha256: "a8012a1c4324eee8b38daf43ce1f6400ecb3fa8c64763399f4247155627024ac"
pageSha256: "a8012a1c4324eee8b38daf43ce1f6400ecb3fa8c64763399f4247155627024ac"
contentMode: "local-full"
zh: ""
---

# Azure Identity library for Rust

Microsoft Entra ID authentication for Azure SDK clients.

Use this skill when:

- An app needs to authenticate to Azure services from Rust
- You need `DeveloperToolsCredential` for local development
- You need `ManagedIdentityCredential` for Azure-hosted workloads
- You need service principal auth with secret or certificate

> **IMPORTANT:** Only use official `azure_*` crates published by the [azure-sdk](https://crates.io/users/azure-sdk) crates.io user. Do NOT use the deprecated `azure_sdk_*` crates (MindFlavor/AzureSDKForRust) or community crates. Official crates use underscores in names and none have version 0.21.0.

> **Note:** The Rust SDK does not have `DefaultAzureCredential`. Use `DeveloperToolsCredential` for local development and `ManagedIdentityCredential` for production.

```rust
// Incorrect in Rust: this type does not exist in azure_identity
use azure_identity::DefaultAzureCredential;
```

## Installation

```sh
cargo add azure_identity azure_core tokio
```

> If your code uses `azure_core` types directly, add `azure_core` to `Cargo.toml`. If you only use service-crate re-exports, direct `azure_core` dependency is optional.

## Environment Variables

```bash
