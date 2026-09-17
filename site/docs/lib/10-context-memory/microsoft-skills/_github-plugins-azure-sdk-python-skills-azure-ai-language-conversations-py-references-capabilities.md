---
title: "azure-ai-language-conversations-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-language-conversations-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-language-conversations-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-language-conversations-py/references/capabilities.md"
sourceSha256: "8fe8ae6c05235fa6d6a705715231910e50729188f6d41eb5d4185043db695383"
pageSha256: "8fe8ae6c05235fa6d6a705715231910e50729188f6d41eb5d4185043db695383"
contentMode: "local-full"
zh: ""
---

# azure-ai-language-conversations-py capability coverage

**SDK/package**: `azure-ai-language-conversations`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Core workflow`

## Non-hero scenarios

- `Operational hardening`: Use this section for retries, timeouts, pagination, and cleanup patterns specific to this SDK.  
  See: [`non-hero-scenarios.md#operational-hardening`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-language-conversations-py-references-non-hero-scenarios#operational-hardening)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-language-conversations-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
