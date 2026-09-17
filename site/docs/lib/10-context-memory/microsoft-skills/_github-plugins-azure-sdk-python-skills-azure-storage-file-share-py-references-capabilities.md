---
title: "azure-storage-file-share-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-file-share-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-storage-file-share-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-storage-file-share-py/references/capabilities.md"
sourceSha256: "983c7542e01a5a82cba7d83b6765e9f5bac84861806f59d2947955afe2f81c3b"
pageSha256: "983c7542e01a5a82cba7d83b6765e9f5bac84861806f59d2947955afe2f81c3b"
contentMode: "local-full"
zh: ""
---

# azure-storage-file-share-py capability coverage

**SDK/package**: `azure-storage-file-share`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Share Operations`
- `Directory Operations`
- `File Operations`
- `Range Operations`

## Non-hero scenarios

- `Snapshot Operations`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#snapshot-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-share-py-references-non-hero-scenarios#snapshot-operations)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-share-py-references-non-hero-scenarios#async-client)
- `Client Types`: | Client | Purpose |  
  See: [`non-hero-scenarios.md#client-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-share-py-references-non-hero-scenarios#client-types)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-share-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
