---
title: "azure-monitor-opentelemetry-py capability coverage"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-py/references/capabilities.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-py/references/capabilities.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-monitor-opentelemetry-py/references/capabilities.md"
sourceSha256: "a77bb9ba1d178a1543689630c2ec13a66597b51224513dc2c50eef38f4e48f37"
pageSha256: "a77bb9ba1d178a1543689630c2ec13a66597b51224513dc2c50eef38f4e48f37"
contentMode: "local-full"
zh: ""
---

# azure-monitor-opentelemetry-py capability coverage

**SDK/package**: `azure-monitor-opentelemetry`

This index maps hero scenarios in `SKILL.md` and links non-hero scenarios documented in dedicated reference files.

## Hero scenarios covered in SKILL.md

- `Explicit Connection String`
- `With Flask`
- `With Django`
- `With FastAPI`

## Non-hero scenarios

- `Custom Traces`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#custom-traces`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#custom-traces)
- `Custom Metrics`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#custom-metrics`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#custom-metrics)
- `Custom Logs`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#custom-logs`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#custom-logs)
- `Sampling`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#sampling`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#sampling)
- `Cloud Role Name`: Set cloud role name for Application Map:  
  See: [`non-hero-scenarios.md#cloud-role-name`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#cloud-role-name)
- `Disable Specific Instrumentations`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#disable-specific-instrumentations`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#disable-specific-instrumentations)
- `Enable Live Metrics`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#enable-live-metrics`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#enable-live-metrics)
- `Azure AD Authentication`: Dedicated example and implementation notes.  
  See: [`non-hero-scenarios.md#azure-ad-authentication`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#azure-ad-authentication)
- `Auto-Instrumentations Included`: | Library | Telemetry Type |  
  See: [`non-hero-scenarios.md#auto-instrumentations-included`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#auto-instrumentations-included)
- `Configuration Options`: | Parameter | Description | Default |  
  See: [`non-hero-scenarios.md#configuration-options`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios#configuration-options)

## Related deep-dive references

- [`non-hero-scenarios.md`](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-sdk-python-skills-azure-monitor-opentelemetry-py-references-non-hero-scenarios): Dedicated non-hero examples and implementation notes.

## API breadth checklist

- Verify client/auth mode for the environment before coding.
- Confirm operation-group/method names against current Microsoft Learn API reference.
- For Python SDKs with both sync and async clients, document both forms without a blanket preference.
- Include cleanup/delete paths for created resources in examples.
- Prefer idempotent create/update operations where available.
- Validate paging/LRO/error-handling patterns for production paths.
