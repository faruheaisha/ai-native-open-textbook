---
title: "azure-mgmt-botservice-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-botservice-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-mgmt-botservice-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-mgmt-botservice-py/references/capabilities.md"
sourceSha256: "4b58e52b13d3ddf96e2df47c7b6cef7f137940bba0a414cc10eea457c7d3167b"
pageSha256: "4b58e52b13d3ddf96e2df47c7b6cef7f137940bba0a414cc10eea457c7d3167b"
contentMode: "local-full"
zh: ""
---

# azure-mgmt-botservice-py capability coverage

**SDK/package**: `azure-mgmt-botservice`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Create a Bot`
- `Get Bot Details`
- `List Bots in Resource Group`
- `List All Bots in Subscription`

## Non-hero scenarios

- `Update Bot`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#update-bot`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#update-bot)
- `Delete Bot`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#delete-bot`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#delete-bot)
- `Configure Channels`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#configure-channels`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#configure-channels)
- `Get Channel Details`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#get-channel-details`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#get-channel-details)
- `List Channel Keys`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#list-channel-keys`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#list-channel-keys)
- `Bot Connections (OAuth)`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#bot-connections-oauth`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#bot-connections-oauth)
- `Client Operations`: | Operation | Method |  
  See: [`non-hero-scenarios.md#client-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#client-operations)
- `SKU Options`: | SKU | Description |  
  See: [`non-hero-scenarios.md#sku-options`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#sku-options)
- `Channel Types`: | Channel | Class | Purpose |  
  See: [`non-hero-scenarios.md#channel-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios#channel-types)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-botservice-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
