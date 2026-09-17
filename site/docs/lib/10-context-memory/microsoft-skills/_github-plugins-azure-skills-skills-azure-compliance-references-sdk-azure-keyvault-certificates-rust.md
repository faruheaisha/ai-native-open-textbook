---
title: "Key Vault Certificates — Rust SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-certificates-rust.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-certificates-rust.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-certificates-rust.md"
sourceSha256: "c2b1ea2c7a6370c7692e517aa35cbc981dbb6195dcbdf66d05a11db658ebd56a"
pageSha256: "c2b1ea2c7a6370c7692e517aa35cbc981dbb6195dcbdf66d05a11db658ebd56a"
contentMode: "local-full"
zh: ""
---

# Key Vault Certificates — Rust SDK Quick Reference

> Condensed from **azure-keyvault-certificates-rust**. Full patterns
> (certificate policies, import, lifecycle management)
> in the **azure-keyvault-certificates-rust** plugin skill if installed.

## Install
cargo add azure_security_keyvault_certificates azure_identity

## Quick Start
```rust
use azure_identity::DeveloperToolsCredential;
use azure_security_keyvault_certificates::CertificateClient;
let credential = DeveloperToolsCredential::new(None)?;
let client = CertificateClient::new("https://<vault>.vault.azure.net/", credential.clone(), None)?;
```

## Best Practices
- Use Entra ID auth — `DeveloperToolsCredential` for dev
- Use managed certificates — auto-renewal with supported issuers
- Set proper validity period — balance security and maintenance
- Use certificate policies — define renewal and key properties
- Monitor expiration — set up alerts for expiring certificates
- Enable soft delete — required for production vaults
