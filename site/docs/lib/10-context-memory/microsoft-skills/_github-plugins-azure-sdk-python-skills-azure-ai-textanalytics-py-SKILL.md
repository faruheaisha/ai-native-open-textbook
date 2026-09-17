---
title: "Azure AI Text Analytics SDK for Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-textanalytics-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-textanalytics-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-textanalytics-py/SKILL.md"
sourceSha256: "6d4a9cbb3889a3dd6beca505dbc6c240454a7432f9460195c68f9b54f0a89396"
pageSha256: "6d4a9cbb3889a3dd6beca505dbc6c240454a7432f9460195c68f9b54f0a89396"
contentMode: "local-full"
zh: ""
---

# Azure AI Text Analytics SDK for Python

Client library for Azure AI Language service NLP capabilities including sentiment, entities, key phrases, and more.

## Installation

```bash
pip install azure-ai-textanalytics
```

## Environment Variables

```bash
AZURE_LANGUAGE_ENDPOINT=https://<resource>.cognitiveservices.azure.com  # Required for all auth methods
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
