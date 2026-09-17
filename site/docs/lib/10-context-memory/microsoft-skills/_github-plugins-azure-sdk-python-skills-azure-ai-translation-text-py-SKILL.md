---
title: "Azure AI Text Translation SDK for Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-translation-text-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-translation-text-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-translation-text-py/SKILL.md"
sourceSha256: "d0560012981e8e97f68c2eb69a1ad0875ec87a4d9e1f5c59fc6366b1d78dae06"
pageSha256: "d0560012981e8e97f68c2eb69a1ad0875ec87a4d9e1f5c59fc6366b1d78dae06"
contentMode: "local-full"
zh: ""
---

# Azure AI Text Translation SDK for Python

Client library for Azure AI Translator text translation service for real-time text translation, transliteration, and language operations.

## Installation

```bash
pip install azure-ai-translation-text
```

## Environment Variables

```bash
AZURE_TRANSLATOR_ENDPOINT=https://<resource>.cognitiveservices.azure.com  # Required for Entra ID auth (must be a custom subdomain endpoint)
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
# Only required for the legacy API-key auth path below:
