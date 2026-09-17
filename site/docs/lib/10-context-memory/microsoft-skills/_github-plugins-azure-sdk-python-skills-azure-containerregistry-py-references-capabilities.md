---
title: "azure-containerregistry-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-containerregistry-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-containerregistry-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-containerregistry-py/references/capabilities.md"
sourceSha256: "979d61d84dd9bdd8c33faba7a2ce3af1a6e3c824081b3e3d0ad8cd60f75f0249"
pageSha256: "979d61d84dd9bdd8c33faba7a2ce3af1a6e3c824081b3e3d0ad8cd60f75f0249"
contentMode: "local-full"
zh: ""
---

# azure-containerregistry-py capability coverage

**SDK/package**: `azure-containerregistry`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `List Repositories`
- `Repository Operations`
- `List Tags`
- `Manifest Operations`

## Non-hero scenarios

- `Tag Operations`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#tag-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-containerregistry-py-references-non-hero-scenarios#tag-operations)
- `Upload and Download Artifacts`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#upload-and-download-artifacts`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-containerregistry-py-references-non-hero-scenarios#upload-and-download-artifacts)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-containerregistry-py-references-non-hero-scenarios#async-client)
- `Clean Up Old Images`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#clean-up-old-images`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-containerregistry-py-references-non-hero-scenarios#clean-up-old-images)
- `Client Operations`: | Operation | Description |  
  See: [`non-hero-scenarios.md#client-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-containerregistry-py-references-non-hero-scenarios#client-operations)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-containerregistry-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
