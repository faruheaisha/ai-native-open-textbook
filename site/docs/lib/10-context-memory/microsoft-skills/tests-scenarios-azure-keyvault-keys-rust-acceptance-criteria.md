---
title: "Azure Key Vault Keys SDK for Rust Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-keyvault-keys-rust/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-keyvault-keys-rust/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-keyvault-keys-rust/acceptance-criteria.md"
sourceSha256: "714ee157fb84721c939e3dd6639f6e8b238c008bd13c8befc8e3286bd1cd7e50"
pageSha256: "714ee157fb84721c939e3dd6639f6e8b238c008bd13c8befc8e3286bd1cd7e50"
contentMode: "local-full"
zh: ""
---

# Azure Key Vault Keys SDK for Rust Acceptance Criteria

**Crate**: `azure_security_keyvault_keys`
**Repository**: <https://github.com/Azure/azure-sdk-for-rust/tree/main/sdk/keyvault/azure_security_keyvault_keys>
**Purpose**: Skill testing acceptance criteria for validating generated Rust code correctness

---

## 0. Dependency Management Gate (Required)

### 0.1 ✅ CORRECT: Use cargo commands for dependency changes

```sh
cargo add azure_security_keyvault_keys azure_identity tokio futures
cargo add azure_core
cargo remove azure_core
```

### 0.2 ✅ CORRECT: Add `azure_core` only for direct `azure_core` imports

```rust
use azure_core::error::ErrorKind;
use azure_security_keyvault_keys::KeyClient;
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
use azure_security_keyvault_keys::KeyClient;
// No direct azure_core import here, so forcing direct azure_core dependency is unnecessary.
```

---

## 1. Correct Import Patterns

### 1.1 ✅ CORRECT: Client and Model Imports

```rust
use azure_security_keyvault_keys::KeyClient;
use azure_security_keyvault_keys::models::{CreateKeyParameters, KeyType, CurveName};
use azure_security_keyvault_keys::ResourceExt;
use azure_identity::DeveloperToolsCredential;
```

---

## 2. Client Creation

### 2.1 ✅ CORRECT: KeyClient with Entra ID

```rust
use azure_identity::DeveloperToolsCredential;
use azure_security_keyvault_keys::KeyClient;

let credential = DeveloperToolsCredential::new(None)?;
let client = KeyClient::new(
