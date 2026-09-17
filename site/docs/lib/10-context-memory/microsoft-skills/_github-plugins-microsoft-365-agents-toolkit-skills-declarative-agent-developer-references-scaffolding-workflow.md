---
title: "Scaffolding Workflow"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/scaffolding-workflow.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/scaffolding-workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/scaffolding-workflow.md"
sourceSha256: "fcc4934cea185f5b7fdb15892239ea3d32cdbe675dbc9cd289b483d6a0a1dc9c"
pageSha256: "fcc4934cea185f5b7fdb15892239ea3d32cdbe675dbc9cd289b483d6a0a1dc9c"
contentMode: "local-full"
zh: ""
---

# Scaffolding Workflow

Step-by-step instructions for scaffolding a new M365 Copilot agent project.

## ⛔ STOP — READ THIS FIRST

### ATK CLI Setup

Check if ATK CLI is available by running `npx -y --package @microsoft/m365agentstoolkit-cli atk --version`. If the command is not found, **STOP and tell the user** that the ATK CLI is required but not installed. Do NOT attempt to install it yourself — the user must install ATK separately before you can proceed.

### The Only Valid Command
