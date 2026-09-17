---
title: "Azure Authentication Best Practices"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/auth-best-practices.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/auth-best-practices.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/auth-best-practices.md"
sourceSha256: "34f6fe88e2b5819c1a0f24aa3930a060d9504fee68ea4b363f0912a78daa5396"
pageSha256: "34f6fe88e2b5819c1a0f24aa3930a060d9504fee68ea4b363f0912a78daa5396"
contentMode: "local-full"
zh: ""
---

# Azure Authentication Best Practices

> Source: [Microsoft — Passwordless connections for Azure services](https://learn.microsoft.com/azure/developer/intro/passwordless-overview) and [Azure Identity client libraries](https://learn.microsoft.com/dotnet/azure/sdk/authentication/).

## Golden Rule

Use **managed identities** and **Azure RBAC** in production. Reserve `DefaultAzureCredential` for **local development only**.

## Authentication by Environment

| Environment | Recommended Credential | Why |
|---|---|---|
| **Production (Azure-hosted)** | `ManagedIdentityCredential` (system- or user-assigned) | No secrets to manage; auto-rotated by Azure |
| **Production (on-premises)** | `ClientCertificateCredential` or `WorkloadIdentityCredential` | Deterministic; no fallback chain overhead |
| **CI/CD pipelines** | `AzurePipelinesCredential` / `WorkloadIdentityCredential` | Scoped to pipeline identity |
| **Local development** | `DefaultAzureCredential` | Chains CLI, PowerShell, and VS Code credentials for convenience |

## Why Not `DefaultAzureCredential` in Production?

1. **Unpredictable fallback chain** — walks through multiple credential types, adding latency and making failures harder to diagnose.
2. **Broad surface area** — checks environment variables, CLI tokens, and other sources that should not exist in production.
3. **Non-deterministic** — which credential actually authenticates depends on the environment, making behavior inconsistent across deployments.
4. **Performance** — each failed credential attempt adds network round-trips before falling back to the next.

## Production Patterns

### .NET

```csharp
using Azure.Identity;

var credential = Environment.GetEnvironmentVariable("AZURE_FUNCTIONS_ENVIRONMENT") == "Development"
    ? new DefaultAzureCredential()                          // local dev — uses CLI/VS credentials
    : new ManagedIdentityCredential();                      // production — deterministic, no fallback chain
