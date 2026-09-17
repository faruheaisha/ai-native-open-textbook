---
title: "azure-ai-translation-text-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-translation-text-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-translation-text-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-translation-text-py/references/capabilities.md"
sourceSha256: "507a19ec049eec3321ea5f07e467988b39fb3d555c65cf8c7575d439483d1cc4"
pageSha256: "507a19ec049eec3321ea5f07e467988b39fb3d555c65cf8c7575d439483d1cc4"
contentMode: "local-full"
zh: ""
---

# azure-ai-translation-text-py capability coverage

**SDK/package**: `azure-ai-translation-text`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Basic Translation`
- `Translate to Multiple Languages`
- `Specify Source Language`
- `Language Detection`

## Non-hero scenarios

- `Transliteration`: Convert text from one script to another:  
  See: [`non-hero-scenarios.md#transliteration`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#transliteration)
- `Dictionary Lookup`: Find alternate translations and definitions:  
  See: [`non-hero-scenarios.md#dictionary-lookup`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#dictionary-lookup)
- `Dictionary Examples`: Get usage examples for translations:  
  See: [`non-hero-scenarios.md#dictionary-examples`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#dictionary-examples)
- `Get Supported Languages`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#get-supported-languages`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#get-supported-languages)
- `Break Sentence`: Identify sentence boundaries:  
  See: [`non-hero-scenarios.md#break-sentence`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#break-sentence)
- `Translation Options`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#translation-options`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#translation-options)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#async-client)
- `Client Methods`: | Method | Description |  
  See: [`non-hero-scenarios.md#client-methods`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios#client-methods)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-translation-text-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
