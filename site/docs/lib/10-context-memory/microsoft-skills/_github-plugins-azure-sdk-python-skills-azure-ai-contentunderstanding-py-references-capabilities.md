---
title: "azure-ai-contentunderstanding-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-contentunderstanding-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-contentunderstanding-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-contentunderstanding-py/references/capabilities.md"
sourceSha256: "66bac1b431ea698552f1b8a83717a850ce16634f263bfd62fe1a61c6bb11380d"
pageSha256: "66bac1b431ea698552f1b8a83717a850ce16634f263bfd62fe1a61c6bb11380d"
contentMode: "local-full"
zh: ""
---

# azure-ai-contentunderstanding-py capability coverage

**SDK/package**: `azure-ai-contentunderstanding`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Core Workflow`
- `Prebuilt Analyzers`
- `Analyze Document`
- `Access Document Content Details`

## Non-hero scenarios

- `Analyze Image`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#analyze-image`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#analyze-image)
- `Analyze Video`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#analyze-video`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#analyze-video)
- `Analyze Audio`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#analyze-audio`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#analyze-audio)
- `Custom Analyzers`: Create custom analyzers with field schemas for specialized extraction:  
  See: [`non-hero-scenarios.md#custom-analyzers`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#custom-analyzers)
- `Analyzer Management`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#analyzer-management`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#analyzer-management)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#async-client)
- `Content Types`: | Class | For | Provides |  
  See: [`non-hero-scenarios.md#content-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#content-types)
- `Model Imports`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#model-imports`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#model-imports)
- `Client Types`: | Client | Purpose |  
  See: [`non-hero-scenarios.md#client-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios#client-types)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentunderstanding-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
