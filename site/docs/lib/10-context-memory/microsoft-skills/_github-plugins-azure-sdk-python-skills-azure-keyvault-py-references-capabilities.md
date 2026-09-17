---
title: "azure-keyvault-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-keyvault-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-keyvault-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-keyvault-py/references/capabilities.md"
sourceSha256: "46d0a786957f19e87e0e1ade56bd94e1e77cfb6db20421ad53438d80bbc58377"
pageSha256: "46d0a786957f19e87e0e1ade56bd94e1e77cfb6db20421ad53438d80bbc58377"
contentMode: "local-full"
zh: ""
---

# azure-keyvault-py capability coverage

**SDK/package**: `azure-keyvault-secrets, azure-keyvault-keys, azure-keyvault-certificates`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Secrets`
- `Keys`
- `Certificates`
- `Client Types Table`

## Non-hero scenarios

- `Async Clients`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-clients`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-keyvault-py-references-non-hero-scenarios#async-clients)
- `Error Handling`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#error-handling`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-keyvault-py-references-non-hero-scenarios#error-handling)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-keyvault-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
