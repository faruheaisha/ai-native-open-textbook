---
title: "Re-host an Existing Agent from other platforms"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/re-host.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/re-host.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/re-host.md"
sourceSha256: "2a3aee7c564d9a56820fbf4164f3668fd0ea725ba67f84435410c05278e96ad5"
pageSha256: "2a3aee7c564d9a56820fbf4164f3668fd0ea725ba67f84435410c05278e96ad5"
contentMode: "local-full"
zh: ""
---

# Re-host an Existing Agent from other platforms

## Step 1: Collect information

Resolve two independent choices before initialization or edits:

1. **Model** -- keep the existing model or use a Foundry model.
2. **Agent framework** -- keep the existing framework or migrate it.

Infer these choices from the user's request and current code. Ask only for information that remains unclear; skip questions when the intent is explicit or evident, such as an existing Foundry model integration. Do not switch or deploy a model, or migrate the framework, without user intent.

## Step 2: Initialize and adapt

To scaffold a Foundry agent project with existing agent codes, run:

```bash
azd ai agent init --no-prompt \
  --src ./src/my-agent \
  --agent-name my-agent \
  --deploy-mode code \
  --runtime python_3_13 \
