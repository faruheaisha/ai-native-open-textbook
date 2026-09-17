---
title: "azure-monitor-opentelemetry-exporter-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-exporter-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-exporter-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-exporter-py/references/capabilities.md"
sourceSha256: "63ab7914b7edfbe1888a52c1aa0167bc26a4fa01f24da057a010a331e273f127"
pageSha256: "63ab7914b7edfbe1888a52c1aa0167bc26a4fa01f24da057a010a331e273f127"
contentMode: "local-full"
zh: ""
---

# azure-monitor-opentelemetry-exporter-py capability coverage

**SDK/package**: `azure-monitor-opentelemetry-exporter`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Trace Exporter`
- `Metric Exporter`
- `Log Exporter`
- `From Environment Variable`

## Non-hero scenarios

- `Azure AD Authentication`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#azure-ad-authentication`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios#azure-ad-authentication)
- `Sampling`: Use `ApplicationInsightsSampler` for consistent sampling:  
  See: [`non-hero-scenarios.md#sampling`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios#sampling)
- `Offline Storage`: Configure offline storage for retry:  
  See: [`non-hero-scenarios.md#offline-storage`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios#offline-storage)
- `Disable Offline Storage`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#disable-offline-storage`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios#disable-offline-storage)
- `Sovereign Clouds`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#sovereign-clouds`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios#sovereign-clouds)
- `Exporter Types`: | Exporter | Telemetry Type | Application Insights Table |  
  See: [`non-hero-scenarios.md#exporter-types`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios#exporter-types)
- `Configuration Options`: | Parameter | Description | Default |  
  See: [`non-hero-scenarios.md#configuration-options`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios#configuration-options)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-exporter-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
