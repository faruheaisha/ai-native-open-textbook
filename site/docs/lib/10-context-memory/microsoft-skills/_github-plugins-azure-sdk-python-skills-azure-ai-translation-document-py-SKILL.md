---
title: "Azure AI Document Translation SDK for Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-translation-document-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-translation-document-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-translation-document-py/SKILL.md"
sourceSha256: "6dd015ac34065253ff022f579a3c5af02aed4e495a587895acbe7a33f1c8205d"
pageSha256: "6dd015ac34065253ff022f579a3c5af02aed4e495a587895acbe7a33f1c8205d"
contentMode: "local-full"
zh: ""
---

# Azure AI Document Translation SDK for Python

Client library for Azure AI Translator document translation service for batch document translation with format preservation.

## Installation

```bash
pip install azure-ai-translation-document
```

## Environment Variables

```bash
AZURE_DOCUMENT_TRANSLATION_ENDPOINT=https://<resource>.cognitiveservices.azure.com  # Required for all auth methods
# Storage for source and target documents
AZURE_SOURCE_CONTAINER_URL=https://<storage>.blob.core.windows.net/<container>?<sas>  # Required for all auth methods
AZURE_TARGET_CONTAINER_URL=https://<storage>.blob.core.windows.net/<container>?<sas>  # Required for all auth methods
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
