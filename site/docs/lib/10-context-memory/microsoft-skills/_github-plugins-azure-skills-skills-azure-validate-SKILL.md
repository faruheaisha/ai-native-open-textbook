---
title: "Azure Validate"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/SKILL.md"
sourceSha256: "ed8d372f2a428f57ec7a2b19d081c1004bc2dfacb55fdde645b3b2faa45f3d9b"
pageSha256: "ed8d372f2a428f57ec7a2b19d081c1004bc2dfacb55fdde645b3b2faa45f3d9b"
contentMode: "local-full"
zh: ""
---

# Azure Validate

> **AUTHORITATIVE GUIDANCE** — Follow these instructions exactly unless they contradict security policies given to you.

> **⛔ STOP — PREREQUISITE CHECK REQUIRED**
>
> Before proceeding, verify this prerequisite is met:
>
> **azure-prepare** was invoked and completed → `.azure/deployment-plan.md` exists with status `Approved` or later
>
> If the plan is missing, **STOP IMMEDIATELY** and invoke **azure-prepare** first.
>
> The complete workflow ensures success:
>
> `azure-prepare` → `azure-validate` → `azure-deploy`

## Triggers

- Check if app is ready to deploy
- Validate azure.yaml or Bicep
- Run preflight checks
- Troubleshoot deployment errors

## Rules

1. Run after azure-prepare, before azure-deploy
2. All checks must pass—do not deploy with failures
3. ⛔ **Destructive actions require `ask_user`** — [global-rules](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-validate-references-global-rules)

## Steps

Run the workflow script and follow its instructions. It walks you through each validation step one at a time, recording progress in `.azure/validate-status.json`. Use [references/scripts/workflow.ps1](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/scripts/workflow.ps1) on Windows or [references/scripts/workflow.sh](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/scripts/workflow.sh) on macOS/Linux.

Start by calling the script **without** the completed-step argument:

```bash
