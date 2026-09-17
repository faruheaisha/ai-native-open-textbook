---
title: "azure-eventgrid-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-eventgrid-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-eventgrid-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-eventgrid-py/references/capabilities.md"
sourceSha256: "240a660af1c8a413dc2991a70614356dafb37c26db6284fa0ad766be9b19fd27"
pageSha256: "240a660af1c8a413dc2991a70614356dafb37c26db6284fa0ad766be9b19fd27"
contentMode: "local-full"
zh: ""
---

# azure-eventgrid-py capability coverage

**SDK/package**: `azure-eventgrid`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Event Types`
- `Publish CloudEvents`
- `Publish EventGridEvents`
- `Event Properties`

## Non-hero scenarios

- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-eventgrid-py-references-non-hero-scenarios#async-client)
- `Namespace Topics (Event Grid Namespaces)`: For Event Grid Namespaces (pull delivery):  
  See: [`non-hero-scenarios.md#namespace-topics-event-grid-namespaces`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-eventgrid-py-references-non-hero-scenarios#namespace-topics-event-grid-namespaces)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-eventgrid-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
