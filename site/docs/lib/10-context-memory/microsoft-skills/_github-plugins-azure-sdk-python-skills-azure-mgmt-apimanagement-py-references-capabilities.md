---
title: "azure-mgmt-apimanagement-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-apimanagement-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-mgmt-apimanagement-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-mgmt-apimanagement-py/references/capabilities.md"
sourceSha256: "a9d5292f4694da03c73c616e92e8612752e60a08ac4a7a51a107470147e60176"
pageSha256: "a9d5292f4694da03c73c616e92e8612752e60a08ac4a7a51a107470147e60176"
contentMode: "local-full"
zh: ""
---

# azure-mgmt-apimanagement-py capability coverage

**SDK/package**: `azure-mgmt-apimanagement`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Create APIM Service`
- `Import API from OpenAPI`
- `Import API from URL`
- `List APIs`

## Non-hero scenarios

- `Create Product`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#create-product`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#create-product)
- `Add API to Product`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#add-api-to-product`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#add-api-to-product)
- `Create Subscription`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#create-subscription`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#create-subscription)
- `Set API Policy`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#set-api-policy`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#set-api-policy)
- `Create Named Value (Secret)`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#create-named-value-secret`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#create-named-value-secret)
- `Create Backend`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#create-backend`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#create-backend)
- `Create User`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#create-user`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#create-user)
- `Operation Groups`: | Group | Purpose |  
  See: [`non-hero-scenarios.md#operation-groups`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios#operation-groups)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apimanagement-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
