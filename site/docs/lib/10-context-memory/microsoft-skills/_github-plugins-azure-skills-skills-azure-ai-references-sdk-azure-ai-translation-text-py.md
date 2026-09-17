---
title: "Azure AI Text Translation — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-translation-text-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-translation-text-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-translation-text-py.md"
sourceSha256: "db1a6b5b63ce54b7d55124976fe242ee69d05dcd05ef1af9af02fd9bbad6eb59"
pageSha256: "db1a6b5b63ce54b7d55124976fe242ee69d05dcd05ef1af9af02fd9bbad6eb59"
contentMode: "local-full"
zh: ""
---

# Azure AI Text Translation — Python SDK Quick Reference

> Condensed from **azure-ai-translation-text-py**. Full patterns (transliteration, dictionary lookup, sentence boundaries)
> in the **azure-ai-translation-text-py** plugin skill if installed.

## Install
```bash
pip install azure-ai-translation-text
```

## Quick Start
```python
from azure.ai.translation.text import TextTranslationClient
from azure.core.credentials import AzureKeyCredential
client = TextTranslationClient(credential=AzureKeyCredential(key), region=region)
```

## Non-Obvious Patterns
- API key auth requires `region` param: `TextTranslationClient(credential=..., region="eastus")`
- Source language param: `from_parameter="fr"` (not `from` — reserved word)
- Dict example model: `from azure.ai.translation.text.models import DictionaryExampleTextItem`
- Async: `from azure.ai.translation.text.aio import TextTranslationClient`

## Best Practices
1. Batch translations — send multiple texts in one request (up to 100)
2. Specify source language when known to improve accuracy
3. Use async client for high-throughput scenarios
4. Cache language list — supported languages change infrequently
5. Handle profanity appropriately for your application
6. Use `html` text_type when translating HTML content
7. Include alignment for applications needing word mapping
