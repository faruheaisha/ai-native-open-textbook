---
title: "Key Vault — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compliance/references/sdk/azure-keyvault-py.md"
sourceSha256: "27f350103a537eeeadf57e88dc6159283313d1e01c803d2f547f4bc4047035bc"
pageSha256: "27f350103a537eeeadf57e88dc6159283313d1e01c803d2f547f4bc4047035bc"
contentMode: "local-full"
zh: ""
---

# Key Vault — Python SDK Quick Reference

> Condensed from **azure-keyvault-py**. Full patterns (async clients,
> cryptographic operations, certificate management, error handling)
> in the **azure-keyvault-py** plugin skill if installed.

## Install
pip install azure-keyvault-secrets azure-keyvault-keys azure-keyvault-certificates azure-identity

## Quick Start
```python
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
client = SecretClient(vault_url="https://<vault>.vault.azure.net/", credential=DefaultAzureCredential())
```

## Best Practices
- Use DefaultAzureCredential for **local development only**. In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compliance/references/auth-best-practices.md)
- Use managed identity in Azure-hosted applications
- Enable soft-delete for recovery (enabled by default)
- Use RBAC over access policies for fine-grained control
- Rotate secrets regularly using versioning
- Use Key Vault references in App Service/Functions config
- Cache secrets appropriately to reduce API calls
- Use async clients for high-throughput scenarios
