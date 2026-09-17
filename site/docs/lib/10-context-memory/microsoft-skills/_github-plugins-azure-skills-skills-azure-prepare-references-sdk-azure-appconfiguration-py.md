---
title: "App Configuration — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-py.md"
sourceSha256: "beb6f58701daa17c962118696feebbef9489a190f7e31cd57c713697377622dd"
pageSha256: "beb6f58701daa17c962118696feebbef9489a190f7e31cd57c713697377622dd"
contentMode: "local-full"
zh: ""
---

# App Configuration — Python SDK Quick Reference

> Condensed from **azure-appconfiguration-py**. Full patterns (feature flags,
> snapshots, read-only settings, async client, labels)
> in the **azure-appconfiguration-py** plugin skill if installed.

## Install
pip install azure-appconfiguration azure-identity

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/auth-best-practices.md) for production patterns.

```python
from azure.appconfiguration import AzureAppConfigurationClient
from azure.identity import DefaultAzureCredential
client = AzureAppConfigurationClient(base_url="https://<name>.azconfig.io", credential=DefaultAzureCredential())
```

## Best Practices
- Use labels for environment separation (dev, staging, prod)
- Use key prefixes for logical grouping (app:database:*, app:cache:*)
- Make production settings read-only to prevent accidental changes
- Create snapshots before deployments for rollback capability
- Use Entra ID instead of connection strings in production
- Refresh settings periodically in long-running applications
- Use feature flags for gradual rollouts and A/B testing
