---
title: "Azure AI Content Safety SDK for Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/SKILL.md"
sourceSha256: "a87b5c2b469ddb77776770d12b7a3a1a481c72af6300b6aac96887825df063fb"
pageSha256: "a87b5c2b469ddb77776770d12b7a3a1a481c72af6300b6aac96887825df063fb"
contentMode: "local-full"
zh: ""
---

# Azure AI Content Safety SDK for Python

Detect harmful user-generated and AI-generated content in applications.

## Installation

```bash
pip install azure-ai-contentsafety
```

## Environment Variables

```bash
CONTENT_SAFETY_ENDPOINT=https://<resource>.cognitiveservices.azure.com  # Required for all auth methods
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
