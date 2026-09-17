---
title: "Azure AI Vision Image Analysis SDK for Python"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-vision-imageanalysis-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-vision-imageanalysis-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-vision-imageanalysis-py/SKILL.md"
sourceSha256: "b6bcdb76e29ccc125741a75a07f0f65ee971086749a72a87d0b83c20bf9f6ea5"
pageSha256: "b6bcdb76e29ccc125741a75a07f0f65ee971086749a72a87d0b83c20bf9f6ea5"
contentMode: "local-full"
zh: ""
---

# Azure AI Vision Image Analysis SDK for Python

Client library for Azure AI Vision 4.0 image analysis including captions, tags, objects, OCR, and more.

## Installation

```bash
pip install azure-ai-vision-imageanalysis
```

## Environment Variables

```bash
VISION_ENDPOINT=https://<resource>.cognitiveservices.azure.com  # Required for all auth methods
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
