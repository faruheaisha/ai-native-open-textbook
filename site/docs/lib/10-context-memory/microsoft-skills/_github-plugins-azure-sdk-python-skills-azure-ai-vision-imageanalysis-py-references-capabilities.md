---
title: "azure-ai-vision-imageanalysis-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-vision-imageanalysis-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-vision-imageanalysis-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-vision-imageanalysis-py/references/capabilities.md"
sourceSha256: "960a7fbd228256952991c2a27c904b992d100b7810567186e7c17e287e190771"
pageSha256: "960a7fbd228256952991c2a27c904b992d100b7810567186e7c17e287e190771"
contentMode: "local-full"
zh: ""
---

# azure-ai-vision-imageanalysis-py capability coverage

**SDK/package**: `azure-ai-vision-imageanalysis`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Analyze Image from URL`
- `Analyze Image from File`
- `Image Caption`
- `Dense Captions (Multiple Regions)`

## Non-hero scenarios

- `Tags`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#tags`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#tags)
- `Object Detection`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#object-detection`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#object-detection)
- `OCR (Text Extraction)`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#ocr-text-extraction`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#ocr-text-extraction)
- `People Detection`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#people-detection`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#people-detection)
- `Smart Cropping`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#smart-cropping`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#smart-cropping)
- `Async Client`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#async-client`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#async-client)
- `Visual Features`: | Feature | Description |  
  See: [`non-hero-scenarios.md#visual-features`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#visual-features)
- `Error Handling`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#error-handling`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#error-handling)
- `Image Requirements`: - Formats: JPEG, PNG, GIF, BMP, WEBP, ICO, TIFF, MPO  
  See: [`non-hero-scenarios.md#image-requirements`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios#image-requirements)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-ai-vision-imageanalysis-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
