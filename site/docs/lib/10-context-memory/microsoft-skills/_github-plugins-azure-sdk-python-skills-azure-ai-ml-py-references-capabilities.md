---
title: "azure-ai-ml-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-ml-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-ml-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-ml-py/references/capabilities.md"
sourceSha256: "d355f0a328700cabb2e4fcf700b7cc2f86022be37e6c6be0216a243904bd219d"
pageSha256: "d355f0a328700cabb2e4fcf700b7cc2f86022be37e6c6be0216a243904bd219d"
contentMode: "local-full"
zh: ""
---

# azure-ai-ml-py capability coverage

**SDK/package**: `azure-ai-ml`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Workspace Management`
- `Data Assets`
- `Model Registry`
- `Compute`

## Non-hero scenarios

- `Jobs`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#jobs`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-ml-py-references-non-hero-scenarios#jobs)
- `Pipelines`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#pipelines`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-ml-py-references-non-hero-scenarios#pipelines)
- `Environments`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#environments`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-ml-py-references-non-hero-scenarios#environments)
- `Datastores`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#datastores`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-ml-py-references-non-hero-scenarios#datastores)
- `MLClient Operations`: | Property | Operations |  
  See: [`non-hero-scenarios.md#mlclient-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-ml-py-references-non-hero-scenarios#mlclient-operations)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-ml-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
