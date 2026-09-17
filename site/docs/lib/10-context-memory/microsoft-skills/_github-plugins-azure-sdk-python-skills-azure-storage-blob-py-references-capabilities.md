---
title: "azure-storage-blob-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-blob-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-storage-blob-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-storage-blob-py/references/capabilities.md"
sourceSha256: "5f07b3f4925a40b16c7f5aaa4ad7e61524142a72a7d88de4031773297d67b942"
pageSha256: "5f07b3f4925a40b16c7f5aaa4ad7e61524142a72a7d88de4031773297d67b942"
contentMode: "local-full"
zh: ""
---

# azure-storage-blob-py capability coverage

**SDK/package**: `azure-storage-blob`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Client Hierarchy`
- `Core Workflow`
- `Performance Tuning`
- `SAS Tokens (User Delegation)`

## Non-hero scenarios

- `Blob Properties and Metadata`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#blob-properties-and-metadata`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-blob-py-references-non-hero-scenarios#blob-properties-and-metadata)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-blob-py-references-non-hero-scenarios#async-client)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-blob-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
