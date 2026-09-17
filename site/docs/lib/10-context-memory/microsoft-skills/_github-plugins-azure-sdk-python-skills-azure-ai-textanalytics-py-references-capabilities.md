---
title: "azure-ai-textanalytics-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-textanalytics-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-textanalytics-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-textanalytics-py/references/capabilities.md"
sourceSha256: "59fe1f50cf5fcb1b160350844b0ee6771902819794a4118baeb3b264e59a3383"
pageSha256: "59fe1f50cf5fcb1b160350844b0ee6771902819794a4118baeb3b264e59a3383"
contentMode: "local-full"
zh: ""
---

# azure-ai-textanalytics-py capability coverage

**SDK/package**: `azure-ai-textanalytics`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Sentiment Analysis`
- `Entity Recognition`
- `PII Detection`
- `Key Phrase Extraction`

## Non-hero scenarios

- `Language Detection`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#language-detection`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-textanalytics-py-references-non-hero-scenarios#language-detection)
- `Healthcare Text Analytics`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#healthcare-text-analytics`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-textanalytics-py-references-non-hero-scenarios#healthcare-text-analytics)
- `Multiple Analysis (Batch)`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#multiple-analysis-batch`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-textanalytics-py-references-non-hero-scenarios#multiple-analysis-batch)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-textanalytics-py-references-non-hero-scenarios#async-client)
- `Client Types`: | Client | Purpose |  
  See: [`non-hero-scenarios.md#client-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-textanalytics-py-references-non-hero-scenarios#client-types)
- `Available Operations`: | Method | Description |  
  See: [`non-hero-scenarios.md#available-operations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-textanalytics-py-references-non-hero-scenarios#available-operations)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-textanalytics-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
