---
title: "Azure Workload Identity for AKS"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/workload-identity.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/workload-identity.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/workload-identity.md"
sourceSha256: "342284fd3ad2a24f2c35f3c60a739a76bed44c59341819d55b70849f006977ed"
pageSha256: "342284fd3ad2a24f2c35f3c60a739a76bed44c59341819d55b70849f006977ed"
contentMode: "local-full"
zh: ""
---

# Azure Workload Identity for AKS

> **Last updated:** 2026-04-02

## What Is Workload Identity?

Workload Identity lets pods in AKS authenticate to Azure services (Key Vault, Storage,
PostgreSQL, etc.) without storing any secrets. Instead of injecting connection strings or
passwords, your pod proves its identity through a short-lived token issued by the
cluster's OIDC provider, which Microsoft Entra ID trusts because you've set up a federation
between the cluster and a Managed Identity. The pod gets a token automatically — your
app code just uses the standard Azure SDK credential chain.

---

## Three Components

### 1. User-Assigned Managed Identity

A Managed Identity in Azure that has RBAC role assignments on the target resources
(e.g., `Key Vault Secrets User`, `Storage Blob Data Contributor`).

```
Managed Identity
  ├── Client ID: <AZURE_CLIENT_ID>
  ├── Tenant ID: <AZURE_TENANT_ID>
  └── Role assignments:
       ├── Key Vault Secrets User  → /subscriptions/.../vaults/my-kv
       ├── Storage Blob Data Contributor → /subscriptions/.../storageAccounts/my-sa
       └── ...
```

### 2. Federated Identity Credential

A trust relationship that says: "When the AKS cluster's OIDC issuer presents a token
