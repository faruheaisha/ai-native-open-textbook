---
title: "Authentication — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-py.md"
sourceSha256: "87730a9669cfa561efd23cf98da106a90b12a94872c8fe9f27a7a5b582af3ce0"
pageSha256: "87730a9669cfa561efd23cf98da106a90b12a94872c8fe9f27a7a5b582af3ce0"
contentMode: "local-full"
zh: ""
---

# Authentication — Python SDK Quick Reference

> Condensed from **azure-identity-py**. Full patterns (async,
> ChainedTokenCredential, token caching, all credential types)
> in the **azure-identity-py** plugin skill if installed.

## Install
```bash
pip install azure-identity
```

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md) for production patterns.

```python
from azure.identity import DefaultAzureCredential
credential = DefaultAzureCredential()
```

## Best Practices
- Use DefaultAzureCredential for **local development only** (CLI, PowerShell, VS Code). In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md)
- Never hardcode credentials — use environment variables or managed identity
- Prefer managed identity in production Azure deployments
- Use ChainedTokenCredential when you need a custom credential order
- Close async credentials explicitly or use context managers
- Set AZURE_CLIENT_ID env var for user-assigned managed identities
- Exclude unused credentials to speed up authentication
