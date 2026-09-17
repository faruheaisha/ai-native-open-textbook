---
title: "azure-storage-file-datalake-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-storage-file-datalake-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-storage-file-datalake-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-storage-file-datalake-py/references/capabilities.md"
sourceSha256: "e4344ff6d4c9ae5008bdd43035bcf827c98ed3d84aa8a67c2ec6eaa8e99b2ead"
pageSha256: "e4344ff6d4c9ae5008bdd43035bcf827c98ed3d84aa8a67c2ec6eaa8e99b2ead"
contentMode: "local-full"
zh: ""
---

# azure-storage-file-datalake-py capability coverage

**SDK/package**: `azure-storage-file-datalake`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Client Hierarchy`
- `File System Operations`
- `Directory Operations`
- `File Operations`

## Non-hero scenarios

- `List Contents`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#list-contents`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-datalake-py-references-non-hero-scenarios#list-contents)
- `File/Directory Properties`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#filedirectory-properties`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-datalake-py-references-non-hero-scenarios#filedirectory-properties)
- `Access Control (ACL)`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#access-control-acl`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-datalake-py-references-non-hero-scenarios#access-control-acl)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-datalake-py-references-non-hero-scenarios#async-client)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-storage-file-datalake-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
