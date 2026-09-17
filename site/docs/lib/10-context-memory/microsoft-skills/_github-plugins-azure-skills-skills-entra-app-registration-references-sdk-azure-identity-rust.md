---
title: "Authentication — Rust SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-identity-rust.md"
sourceRel: ".github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-identity-rust.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/entra-app-registration/references/sdk/azure-identity-rust.md"
sourceSha256: "59d1d971670247bba0f403d6a308403ca7c8541597dc5b802385eb74fb5949bc"
pageSha256: "59d1d971670247bba0f403d6a308403ca7c8541597dc5b802385eb74fb5949bc"
contentMode: "local-full"
zh: ""
---

# Authentication — Rust SDK Quick Reference

> Condensed from **azure-identity-rust**. Full patterns (ClientSecret,
> ClientCertificate, WorkloadIdentity, AzurePipelines credentials)
> in the **azure-identity-rust** plugin skill if installed.

## Install
cargo add azure_identity

## Quick Start
```rust
use azure_identity::DeveloperToolsCredential;
let credential = DeveloperToolsCredential::new(None)?;
```

## Best Practices
- Use DeveloperToolsCredential for local dev — automatically picks up Azure CLI
- Use ManagedIdentityCredential in production — no secrets to manage
- Clone credentials — credentials are Arc-wrapped and cheap to clone
- Reuse credential instances — same credential can be used with multiple clients
- Use tokio feature — `cargo add azure_identity --features tokio`
