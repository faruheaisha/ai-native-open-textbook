---
title: "azure-monitor-ingestion-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-ingestion-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-monitor-ingestion-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-monitor-ingestion-py/references/capabilities.md"
sourceSha256: "d8638365a194e41c18c9ebadb5c035da72e2a34288b0ba5d9474967b59f97434"
pageSha256: "d8638365a194e41c18c9ebadb5c035da72e2a34288b0ba5d9474967b59f97434"
contentMode: "local-full"
zh: ""
---

# azure-monitor-ingestion-py capability coverage

**SDK/package**: `azure-monitor-ingestion`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Upload Custom Logs`
- `Upload from JSON File`
- `Custom Error Handling`
- `Ignore Errors`

## Non-hero scenarios

- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-ingestion-py-references-non-hero-scenarios#async-client)
- `Sovereign Clouds`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#sovereign-clouds`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-ingestion-py-references-non-hero-scenarios#sovereign-clouds)
- `Batching Behavior`: The SDK automatically:  
  See: [`non-hero-scenarios.md#batching-behavior`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-ingestion-py-references-non-hero-scenarios#batching-behavior)
- `Client Types`: | Client | Purpose |  
  See: [`non-hero-scenarios.md#client-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-ingestion-py-references-non-hero-scenarios#client-types)
- `Key Concepts`: | Concept | Description |  
  See: [`non-hero-scenarios.md#key-concepts`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-ingestion-py-references-non-hero-scenarios#key-concepts)
- `DCR Stream Name Format`: Stream names follow patterns:  
  See: [`non-hero-scenarios.md#dcr-stream-name-format`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-ingestion-py-references-non-hero-scenarios#dcr-stream-name-format)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-ingestion-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
