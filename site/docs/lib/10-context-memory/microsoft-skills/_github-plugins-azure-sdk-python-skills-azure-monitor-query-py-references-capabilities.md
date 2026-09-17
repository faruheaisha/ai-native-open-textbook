---
title: "azure-monitor-query-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-query-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-monitor-query-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-monitor-query-py/references/capabilities.md"
sourceSha256: "34bae8188f7a80b55d852633f95e86e30448386e4003b8a4ecdb444670abbc16"
pageSha256: "34bae8188f7a80b55d852633f95e86e30448386e4003b8a4ecdb444670abbc16"
contentMode: "local-full"
zh: ""
---

# azure-monitor-query-py capability coverage

**SDK/package**: `azure-monitor-query`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Logs Query Client`
- `Metrics Query Client`
- `Async Clients`
- `Common Kusto Queries`

## Non-hero scenarios

- `Client Types`: | Client | Purpose |  
  See: [`non-hero-scenarios.md#client-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-query-py-references-non-hero-scenarios#client-types)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-query-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
