---
title: "azure-mgmt-apicenter-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-apicenter-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-mgmt-apicenter-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-mgmt-apicenter-py/references/capabilities.md"
sourceSha256: "93d6bfeed4155875237820ab51fba4caa94f98a6b8168b8d657a9269d4dda31e"
pageSha256: "93d6bfeed4155875237820ab51fba4caa94f98a6b8168b8d657a9269d4dda31e"
contentMode: "local-full"
zh: ""
---

# azure-mgmt-apicenter-py capability coverage

**SDK/package**: `azure-mgmt-apicenter`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Create API Center`
- `List API Centers`
- `Register an API`
- `Create API Version`

## Non-hero scenarios

- `Add API Definition`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#add-api-definition`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#add-api-definition)
- `Import API Specification`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#import-api-specification`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#import-api-specification)
- `List APIs`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#list-apis`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#list-apis)
- `Create Environment`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#create-environment`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#create-environment)
- `Create Deployment`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#create-deployment`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#create-deployment)
- `Define Custom Metadata`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#define-custom-metadata`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#define-custom-metadata)
- `Client Types`: | Client | Purpose |  
  See: [`non-hero-scenarios.md#client-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#client-types)
- `Operations`: | Operation Group | Purpose |  
  See: [`non-hero-scenarios.md#operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios#operations)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-apicenter-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
