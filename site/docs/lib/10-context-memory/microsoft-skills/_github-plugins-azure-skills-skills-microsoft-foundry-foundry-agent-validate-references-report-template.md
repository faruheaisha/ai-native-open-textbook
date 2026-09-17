---
title: "Microsoft Foundry Agent Validation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/validate/references/report-template.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/validate/references/report-template.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/validate/references/report-template.md"
sourceSha256: "10b7db0fa337303168ea18d67bcb3ffdb080be867c90eed4c2f57aebe0809b16"
pageSha256: "10b7db0fa337303168ea18d67bcb3ffdb080be867c90eed4c2f57aebe0809b16"
contentMode: "local-full"
zh: ""
---

# Microsoft Foundry Agent Validation

| Field | Value |
|---|---|
| Report ID | `YYYYMMDDTHHMMSSZ` |
| Service | service name |
| Hosted Agent Root | hosted-agent root directory |
| Generated | ISO date-time |

## Rule results

Create one subsection for each active rule:

### `RULE-ID`: Rule title

- **Level:** error / warning / recommendation
- **Status:** pass / fail / inconclusive / skipped
- **Guidance:** Render every URL from the rule's `guidance` array as a Markdown link.

#### Details

Explain the result, cite redacted `file:line` evidence when available, and state how to fix failures or what evidence is missing for inconclusive results.

Use `inconclusive` when evidence cannot establish either `pass` or `fail`.

## Limitation

This is an automated, repository-based best-practice review. It is not Microsoft certification, a compliance attestation, penetration testing, or validation of the deployed Azure environment.
