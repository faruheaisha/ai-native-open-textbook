---
title: "Environment and Azure setup"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/azure-setup.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/azure-setup.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/azure-setup.md"
sourceSha256: "da2a31e35589791c09d7b22ff224e554f63567c4072186079591c9b35554d90c"
pageSha256: "da2a31e35589791c09d7b22ff224e554f63567c4072186079591c9b35554d90c"
contentMode: "local-full"
zh: ""
---

# Environment and Azure setup

Use this reference when the user needs prerequisites, env files, admin consent, authentication, or Azure OpenAI configuration for `@microsoft/m365-copilot-eval`.

## Prerequisites

| Requirement | Notes |
|---|---|
| Node.js | Node.js 24.12.0 or newer. |
| Operating system | Public docs describe authentication as Windows-first. If another OS fails during auth, validate on Windows before diagnosing the agent. |
| Microsoft 365 Copilot | The signed-in user needs a Microsoft 365 Copilot license. |
| Deployed agent | Evaluate a deployed Microsoft 365 Copilot declarative agent, not only a local manifest. |
| Tenant admin consent | Tenant admin consent is required for the WorkIQ Client App before first use. |
| Azure OpenAI in Foundry Models | The evaluator model endpoint and key are required for LLM-based metrics. |

## Recommended CLI checks

```powershell
node --version
npx -y --package @microsoft/m365-copilot-eval@latest runevals --version
npx -y --package @microsoft/m365-copilot-eval@latest runevals --help
npx -y --package @microsoft/m365-copilot-eval@latest runevals accept-eula
npx -y --package @microsoft/m365-copilot-eval@latest runevals --init-only
```

Do not print environment variable values while checking setup.

## Version and PATH checks

The public preview CLI can retire older versions. Check both the package-scoped version and any bare `runevals` shim before troubleshooting:

```powershell
Get-Command runevals -All
npm list -g @microsoft/m365-copilot-eval --depth=0
npm view @microsoft/m365-copilot-eval version
npx -y --package @microsoft/m365-copilot-eval@latest runevals --version
npx -y --package @microsoft/m365-copilot-eval@latest where runevals
```

If `runevals` without `npx --package` fails with `This version of the M365 Evals CLI has stopped working and must be updated`, a stale global install is being resolved from PATH. Continue with the package-scoped `@latest` command and ask before removing global installs.

## Required configuration values

| Variable | Required | Secret | Purpose |
|---|---:|---:|---|
| `TENANT_ID` | Yes | No | Microsoft Entra tenant ID for the evaluation run. |
| `AZURE_AI_OPENAI_ENDPOINT` | Yes | No | Azure OpenAI in Foundry Models endpoint. |
| `AZURE_AI_API_KEY` | Yes | Yes | Key used by the evaluator model client. |
| `M365_TITLE_ID` | ATK path | No | Agents Toolkit title ID auto-detected from `.env.local`. |
| `M365_AGENT_ID` | Non-ATK or override | No | Deployed M365 Copilot agent ID. |
| `AZURE_AI_API_VERSION` | No | No | Defaults to `2024-12-01-preview`. |
| `AZURE_AI_MODEL_NAME` | No | No | Defaults/recommended value: `gpt-4o-mini`. |

## File placement

### Agents Toolkit project

Use `.env.local` for non-secret project configuration:

```text
