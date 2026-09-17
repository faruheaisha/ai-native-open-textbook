---
title: "azure-ai-contentsafety-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/references/capabilities.md"
sourceSha256: "b3b3a25a652486ee668ada055e3ec03b09e1a01ebac0d4202e374670d6c663a5"
pageSha256: "b3b3a25a652486ee668ada055e3ec03b09e1a01ebac0d4202e374670d6c663a5"
contentMode: "local-full"
zh: ""
---

# azure-ai-contentsafety-py capability coverage

**SDK/package**: `azure-ai-contentsafety`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Analyze Text`
- `Analyze Image`
- `Text Blocklist Management`
- `Severity Levels`

## Non-hero scenarios

- `Harm Categories`: | Category | Description |  
  See: [`non-hero-scenarios.md#harm-categories`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentsafety-py-references-non-hero-scenarios#harm-categories)
- `Severity Scale`: | Level | Text Range | Image Range | Meaning |  
  See: [`non-hero-scenarios.md#severity-scale`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentsafety-py-references-non-hero-scenarios#severity-scale)
- `Client Types`: | Client | Purpose |  
  See: [`non-hero-scenarios.md#client-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentsafety-py-references-non-hero-scenarios#client-types)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-contentsafety-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
