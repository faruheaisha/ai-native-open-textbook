---
title: "Azure Identity library for Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-identity-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-identity-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-identity-py/SKILL.md"
sourceSha256: "b10709c8cadc23134bfee415010f9f0292e39f06c216df3f3dd6fc826897414c"
pageSha256: "b10709c8cadc23134bfee415010f9f0292e39f06c216df3f3dd6fc826897414c"
contentMode: "local-full"
zh: ""
---

# Azure Identity library for Python

Authentication library for Azure SDK clients using Microsoft Entra ID.

Use this skill when:
- An app needs to authenticate to Azure services from Python
- You need `DefaultAzureCredential` for local dev + Azure deployment
- You need `ManagedIdentityCredential` for Azure-hosted workloads
- You need service principal auth with secret or certificate
- You need direct token acquisition with `get_token()`
- You need to troubleshoot credential chain failures

## Installation

```bash
pip install azure-identity
```

For VS Code or broker-based desktop auth:

```bash
pip install azure-identity-broker
```

## Python Version

`azure-identity` supports Python 3.9+.

## Environment Variables

```bash
# Service principal with client secret
