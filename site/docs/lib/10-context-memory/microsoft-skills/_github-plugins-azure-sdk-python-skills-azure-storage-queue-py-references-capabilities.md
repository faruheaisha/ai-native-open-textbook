---
title: "azure-storage-queue-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-queue-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-storage-queue-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-storage-queue-py/references/capabilities.md"
sourceSha256: "a5d7c3fb5e84b54acbe547f78f2777f4e34f643fff973ab9691909c8f5b64235"
pageSha256: "a5d7c3fb5e84b54acbe547f78f2777f4e34f643fff973ab9691909c8f5b64235"
contentMode: "local-full"
zh: ""
---

# azure-storage-queue-py capability coverage

**SDK/package**: `azure-storage-queue`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Queue Operations`
- `Send Messages`
- `Receive Messages`
- `Peek Messages`

## Non-hero scenarios

- `Update Message`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#update-message`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-queue-py-references-non-hero-scenarios#update-message)
- `Delete Message`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#delete-message`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-queue-py-references-non-hero-scenarios#delete-message)
- `Clear Queue`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#clear-queue`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-queue-py-references-non-hero-scenarios#clear-queue)
- `Queue Properties`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#queue-properties`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-queue-py-references-non-hero-scenarios#queue-properties)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-queue-py-references-non-hero-scenarios#async-client)
- `Base64 Encoding`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#base64-encoding`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-queue-py-references-non-hero-scenarios#base64-encoding)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-queue-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
