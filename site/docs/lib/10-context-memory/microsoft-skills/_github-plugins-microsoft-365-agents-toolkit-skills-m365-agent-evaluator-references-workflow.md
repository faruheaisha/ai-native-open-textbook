---
title: "M365 Copilot eval workflow"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/workflow.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/m365-agent-evaluator/references/workflow.md"
sourceSha256: "aeb5eab90ae6115824c61649e084d2c10ce7ccdc8d48c999b6f93a0a34418fbf"
pageSha256: "aeb5eab90ae6115824c61649e084d2c10ce7ccdc8d48c999b6f93a0a34418fbf"
contentMode: "local-full"
zh: ""
---

# M365 Copilot eval workflow

Use this workflow when the user wants to set up, author, run, or analyze evaluations with the public preview `@microsoft/m365-copilot-eval` CLI.

## Canonical command

Always invoke the CLI through the public npm package:

```powershell
npx -y --package @microsoft/m365-copilot-eval@latest runevals
```

Do not use private-preview installers, global installs, bare `runevals`, bare `npx runevals`, or retired flags such as `--input` and `--html`.

## 1. Detect project shape

Default to the Agents Toolkit path, but support explicit agent IDs for non-ATK projects.

| Project shape | Signals | Agent ID source |
|---|---|---|
| ATK / Teams Toolkit | `.env.local`, `.env.local.user`, `env\.env.local.user`, `m365agents.yml`, `appPackage\declarativeAgent.json` | `M365_TITLE_ID` from `.env.local`, or `M365_AGENT_ID` |
| Non-ATK | Eval dataset plus named env files or explicit CLI args | `M365_AGENT_ID` or `--m365-agent-id` |

If no agent ID can be found, ask the user for the deployed M365 Copilot agent ID or tell them to add it to a local env file.

## 2. Verify local prerequisites

Run safe checks that do not reveal secret values:

```powershell
node --version
npx -y --package @microsoft/m365-copilot-eval@latest runevals --version
npx -y --package @microsoft/m365-copilot-eval@latest runevals --help
```

Current public docs require Node.js 24.12.0 or newer and describe authentication support as Windows-first. The user also needs a Microsoft 365 Copilot license, a deployed M365 Copilot agent, tenant admin consent for the WorkIQ Client App, and Azure OpenAI in Foundry Models configuration.

Also check for stale global/PATH installs before troubleshooting the agent:

```powershell
Get-Command runevals -All
npm list -g @microsoft/m365-copilot-eval --depth=0
npm view @microsoft/m365-copilot-eval version
npx -y --package @microsoft/m365-copilot-eval@latest where runevals
```

If bare `runevals` reports `This version of the M365 Evals CLI has stopped working and must be updated`, the shell is resolving an outdated global shim. Use the package-scoped `npx --package @microsoft/m365-copilot-eval@latest` command, and only remove the global package after user confirmation.

## 3. Accept the EULA and initialize

Use these commands for first-time setup:

```powershell
npx -y --package @microsoft/m365-copilot-eval@latest runevals accept-eula
npx -y --package @microsoft/m365-copilot-eval@latest runevals --init-only
```

`--init-only` validates setup and can create starter files without running a full tenant-dependent evaluation.

## 4. Prepare env files

Use `references\azure-setup.md` for full setup details. Keep secrets out of `.env.local`.

Minimal ATK layout:

```text
.env.local              # non-secret ATK values, for example M365_TITLE_ID
.env.local.user         # local secrets
env\.env.local.user     # alternate local secrets path
```

Minimal non-ATK layout:

```text
env\.env.dev            # named environment selected with --env dev
evals\evals.json        # evaluation dataset
```

Required values are:

```text
