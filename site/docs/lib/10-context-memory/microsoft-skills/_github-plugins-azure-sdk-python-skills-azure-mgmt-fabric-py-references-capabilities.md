---
title: "azure-mgmt-fabric-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-mgmt-fabric-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-mgmt-fabric-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-mgmt-fabric-py/references/capabilities.md"
sourceSha256: "fc97e16f18b7b8944869e70f30fea7b31f7e2acef9abf724a5a4db11b8f46af5"
pageSha256: "fc97e16f18b7b8944869e70f30fea7b31f7e2acef9abf724a5a4db11b8f46af5"
contentMode: "local-full"
zh: ""
---

# azure-mgmt-fabric-py capability coverage

**SDK/package**: `azure-mgmt-fabric`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Create Fabric Capacity`
- `Get Capacity Details`
- `List Capacities in Resource Group`
- `List All Capacities in Subscription`

## Non-hero scenarios

- `Update Capacity`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#update-capacity`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#update-capacity)
- `Suspend Capacity`: Pause capacity to stop billing:  
  See: [`non-hero-scenarios.md#suspend-capacity`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#suspend-capacity)
- `Resume Capacity`: Resume a paused capacity:  
  See: [`non-hero-scenarios.md#resume-capacity`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#resume-capacity)
- `Delete Capacity`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#delete-capacity`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#delete-capacity)
- `Check Name Availability`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#check-name-availability`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#check-name-availability)
- `List Available SKUs`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#list-available-skus`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#list-available-skus)
- `Client Operations`: | Operation | Method |  
  See: [`non-hero-scenarios.md#client-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#client-operations)
- `Fabric SKUs`: | SKU | Description | CUs |  
  See: [`non-hero-scenarios.md#fabric-skus`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#fabric-skus)
- `Capacity States`: | State | Description |  
  See: [`non-hero-scenarios.md#capacity-states`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#capacity-states)
- `Long-Running Operations`: All mutating operations are long-running (LRO). Use `.result()` to wait:  
  See: [`non-hero-scenarios.md#long-running-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios#long-running-operations)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-mgmt-fabric-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
