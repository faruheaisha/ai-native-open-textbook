---
title: "API Management — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/sdk/azure-mgmt-apimanagement-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-aigateway/references/sdk/azure-mgmt-apimanagement-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-aigateway/references/sdk/azure-mgmt-apimanagement-py.md"
sourceSha256: "2096c2199a2861d4e6fad37b7850d32fabfd3e75c323436d51746565ef349949"
pageSha256: "2096c2199a2861d4e6fad37b7850d32fabfd3e75c323436d51746565ef349949"
contentMode: "local-full"
zh: ""
---

# API Management — Python SDK Quick Reference

> Condensed from **azure-mgmt-apimanagement-py**. Full patterns (APIs,
> products, subscriptions, policies, backends, named values)
> in the **azure-mgmt-apimanagement-py** plugin skill if installed.

## Install
pip install azure-mgmt-apimanagement azure-identity

## Quick Start
> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/auth-best-practices.md) for production patterns.

```python
import os
from azure.mgmt.apimanagement import ApiManagementClient
from azure.identity import DefaultAzureCredential
client = ApiManagementClient(DefaultAzureCredential(), os.environ["AZURE_SUBSCRIPTION_ID"])
```

## Best Practices
- Use named values for secrets and configuration
- Apply policies at appropriate scopes (global, product, API, operation)
- Use products to bundle APIs and manage access
- Enable Application Insights for monitoring
- Use backends to abstract backend services
- Version your APIs using APIM's versioning features
