---
title: "azure-ai-translation-document-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-translation-document-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-translation-document-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-translation-document-py/references/capabilities.md"
sourceSha256: "97f6b6c08edfa43b336d10e897b65c1c4e21b45adb40c40b1988d1e63073f5b2"
pageSha256: "97f6b6c08edfa43b336d10e897b65c1c4e21b45adb40c40b1988d1e63073f5b2"
contentMode: "local-full"
zh: ""
---

# azure-ai-translation-document-py capability coverage

**SDK/package**: `azure-ai-translation-document`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Basic Document Translation`
- `Multiple Target Languages`
- `Translate Single Document`
- `Check Translation Status`

## Non-hero scenarios

- `List Document Statuses`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#list-document-statuses`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#list-document-statuses)
- `Cancel Translation`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#cancel-translation`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#cancel-translation)
- `Using Glossary`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#using-glossary`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#using-glossary)
- `Supported Document Formats`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#supported-document-formats`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#supported-document-formats)
- `Supported Languages`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#supported-languages`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#supported-languages)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#async-client)
- `Supported Formats`: | Category | Formats |  
  See: [`non-hero-scenarios.md#supported-formats`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#supported-formats)
- `Storage Requirements`: - Source and target containers must be Azure Blob Storage  
  See: [`non-hero-scenarios.md#storage-requirements`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios#storage-requirements)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-document-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
