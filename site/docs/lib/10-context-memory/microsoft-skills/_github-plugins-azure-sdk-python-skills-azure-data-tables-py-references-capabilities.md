---
title: "azure-data-tables-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-data-tables-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-data-tables-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-data-tables-py/references/capabilities.md"
sourceSha256: "85f71185bb124f051c6c2213c12512155670d516a3270be35db032677d73e7c4"
pageSha256: "85f71185bb124f051c6c2213c12512155670d516a3270be35db032677d73e7c4"
contentMode: "local-full"
zh: ""
---

# azure-data-tables-py capability coverage

**SDK/package**: `azure-data-tables`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Client Types`
- `Table Operations`
- `Entity Operations`
- `Query Entities`

## Non-hero scenarios

- `Batch Operations`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#batch-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-data-tables-py-references-non-hero-scenarios#batch-operations)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-data-tables-py-references-non-hero-scenarios#async-client)
- `Data Types`: | Python Type | Table Storage Type |  
  See: [`non-hero-scenarios.md#data-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-data-tables-py-references-non-hero-scenarios#data-types)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-data-tables-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
