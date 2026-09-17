---
title: "Azure Key Vault Certificates SDK for Rust Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-keyvault-certificates-rust/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-keyvault-certificates-rust/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-keyvault-certificates-rust/acceptance-criteria.md"
sourceSha256: "e2df84ffc23db617fb97aa49f8169d03ea60ad48deab8b52a4bc8882ff05a804"
pageSha256: "e2df84ffc23db617fb97aa49f8169d03ea60ad48deab8b52a4bc8882ff05a804"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Certificates SDK for Rust Acceptance Criteria

**Crate**: `azure_security_keyvault_certificates`
**Repository**: <https://github.com/Azure/azure-sdk-for-rust/tree/main/sdk/keyvault/azure_security_keyvault_certificates>
**Purpose**: Skill testing acceptance criteria for validating generated Rust code correctness

---

## 0. Dependency Management Gate (Required)

### 0.1 ✅ CORRECT: Use cargo commands for dependency changes

```sh
cargo add azure_security_keyvault_certificates azure_identity tokio futures
cargo add azure_core
cargo remove azure_core
```

### 0.2 ✅ CORRECT: Add `azure_core` only for direct `azure_core` imports

```rust
use azure_core::base64;
use azure_security_keyvault_certificates::CertificateClient;
// Direct azure_core import is used, so `azure_core` should be a direct dependency.
```

### 0.3 ❌ INCORRECT: Manual Cargo.toml dependency edits in generated guidance

```toml
# WRONG in generated guidance - use `cargo add` / `cargo remove` commands instead
[dependencies]
azure_core = "*"
```

### 0.4 ❌ INCORRECT: Requiring `azure_core` when no direct `azure_core` imports exist

```rust
use azure_security_keyvault_certificates::CertificateClient;
// No direct azure_core import here, so forcing direct azure_core dependency is unnecessary.
```

---

## 1. Correct Import Patterns

### 1.1 ✅ CORRECT: Client and Model Imports

```rust
use azure_security_keyvault_certificates::CertificateClient;
use azure_security_keyvault_certificates::models::{
    CreateCertificateParameters, CertificatePolicy,
    IssuerParameters, X509CertificateProperties,
    ImportCertificateParameters,
};
use azure_security_keyvault_certificates::ResourceExt;
use azure_core::base64;
use azure_identity::DeveloperToolsCredential;
```

---

## 2. Client Creation

### 2.1 ✅ CORRECT: CertificateClient with Entra ID

```rust
use azure_identity::DeveloperToolsCredential;
use azure_security_keyvault_certificates::CertificateClient;

let credential = DeveloperToolsCredential::new(None)?;
let client = CertificateClient::new(
