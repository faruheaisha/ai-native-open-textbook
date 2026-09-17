---
title: "azure-ai-contentsafety-py non-hero scenarios"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/references/non-hero-scenarios.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/references/non-hero-scenarios.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-ai-contentsafety-py/references/non-hero-scenarios.md"
sourceSha256: "04a4cd123158fc993a4f0abd454200420bbf90546d8122d0b5386ac57aa0fbd3"
pageSha256: "04a4cd123158fc993a4f0abd454200420bbf90546d8122d0b5386ac57aa0fbd3"
contentMode: "local-full"
zh: ""
---

# azure-ai-contentsafety-py non-hero scenarios

These scenarios are intentionally separate from hero flows in `SKILL.md`.
They cover secondary/advanced patterns typically used after the primary end-to-end path is working.

## Harm Categories

| Category | Description |
|----------|-------------|
| `Hate` | Attacks based on identity (race, religion, gender, etc.) |
| `Sexual` | Sexual content, relationships, anatomy |
| `Violence` | Physical harm, weapons, injury |
| `SelfHarm` | Self-injury, suicide, eating disorders |

## Severity Scale

| Level | Text Range | Image Range | Meaning |
|-------|------------|-------------|---------|
| 0 | Safe | Safe | No harmful content |
| 2 | Low | Low | Mild references |
| 4 | Medium | Medium | Moderate content |
| 6 | High | High | Severe content |

## Client Types

| Client | Purpose |
|--------|---------|
| `ContentSafetyClient` | Analyze text and images |
| `BlocklistClient` | Manage custom blocklists |
