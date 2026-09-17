---
title: "Azure Identity SDK for Rust Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-identity-rust/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-identity-rust/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-identity-rust/acceptance-criteria.md"
sourceSha256: "64bde64206c46ca79ea8314087a2aae074ad20de042dcd4674c62731a744c703"
pageSha256: "64bde64206c46ca79ea8314087a2aae074ad20de042dcd4674c62731a744c703"
contentMode: "local-full"
zh: ""
---

# Azure Identity SDK for Rust Acceptance Criteria

**Crate**: `azure_identity`
**Repository**: <https://github.com/Azure/azure-sdk-for-rust/tree/main/sdk/identity/azure_identity>
**Purpose**: Skill testing acceptance criteria for validating generated Rust code correctness

---

## 0. Dependency Management Gate (Required)

### 0.1 ✅ CORRECT: Use cargo commands for dependency changes

```sh
cargo add azure_identity tokio
cargo add azure_core
cargo remove azure_core
```

### 0.2 ✅ CORRECT: Add `azure_core` only for direct `azure_core` imports

```rust
use azure_core::credentials::TokenCredential;
use azure_identity::DeveloperToolsCredential;
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
use azure_identity::DeveloperToolsCredential;
// No direct azure_core import here, so forcing direct azure_core dependency is unnecessary.
```

---

## 1. Correct Import Patterns

### 1.1 ✅ CORRECT: Credential Imports

```rust
use azure_identity::DeveloperToolsCredential;
use azure_identity::ManagedIdentityCredential;
use azure_identity::ClientSecretCredential;
use azure_identity::AzureCliCredential;
use azure_identity::AzureDeveloperCliCredential;
use azure_identity::WorkloadIdentityCredential;
```

### 1.2 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: DefaultAzureCredential (doesn't exist in Rust SDK)

```rust
// WRONG - use DeveloperToolsCredential instead
use azure_identity::DefaultAzureCredential;
```

---

## 2. DeveloperToolsCredential

### 2.1 ✅ CORRECT: Basic DeveloperToolsCredential

```rust
use azure_identity::DeveloperToolsCredential;

let credential = DeveloperToolsCredential::new(None)?;
```

### 2.2 ✅ CORRECT: Using with SecretClient

```rust
use azure_identity::DeveloperToolsCredential;
use azure_security_keyvault_secrets::SecretClient;

let credential = DeveloperToolsCredential::new(None)?;
let client = SecretClient::new(
    "https://my-vault.vault.azure.net/",
    credential.clone(),
    None,
)?;
```

### 2.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Hardcoded credentials

```rust
// WRONG - never hardcode credentials
let secret = "my-secret-value";
```

---

## 3. ManagedIdentityCredential

### 3.1 ✅ CORRECT: System-assigned Managed Identity

```rust
use azure_identity::ManagedIdentityCredential;

let credential = ManagedIdentityCredential::new(None)?;
```

### 3.2 ✅ CORRECT: User-assigned Managed Identity

```rust
use azure_identity::{ManagedIdentityCredential, ManagedIdentityCredentialOptions};

let options = ManagedIdentityCredentialOptions {
