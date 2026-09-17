---
title: "Azure AI Voice Live SDK"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-voicelive-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-voicelive-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-voicelive-py/SKILL.md"
sourceSha256: "8a765d22c122b71f8726aded787a45e248ed3823fdf373cc041d3adc2a5814f5"
pageSha256: "8a765d22c122b71f8726aded787a45e248ed3823fdf373cc041d3adc2a5814f5"
contentMode: "local-full"
zh: ""
---

# Azure AI Voice Live SDK

Build real-time voice AI applications with bidirectional WebSocket communication.

## Installation

```bash
pip install azure-ai-voicelive aiohttp azure-identity
```

## Environment Variables

```bash
AZURE_COGNITIVE_SERVICES_ENDPOINT=https://<region>.api.cognitive.microsoft.com  # Required for all auth methods
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
