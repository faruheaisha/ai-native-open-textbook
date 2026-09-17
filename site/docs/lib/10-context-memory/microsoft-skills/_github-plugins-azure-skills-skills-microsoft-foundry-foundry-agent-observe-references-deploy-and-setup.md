---
title: "Step 1 - Auto-Setup Evaluation Suite"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/deploy-and-setup.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/deploy-and-setup.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/observe/references/deploy-and-setup.md"
sourceSha256: "428684a36932b8f4cf08b21c667960b8a286c6894e4e456a00a80486466d820e"
pageSha256: "428684a36932b8f4cf08b21c667960b8a286c6894e4e456a00a80486466d820e"
contentMode: "local-full"
zh: ""
---

# Step 1 - Auto-Setup Evaluation Suite

> **This step runs automatically after deployment.** If the agent was deployed via the [deploy skill](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-deploy-deploy), `.foundry` cache and metadata may already be configured. Check `.foundry/evaluators/`, `.foundry/datasets/`, and the selected metadata file under the selected agent root before re-creating them.

## Auto-Generate Suite

After deployment, immediately prepare a Foundry evaluation suite and local references for the selected environment without waiting for the user to request it.

### 1. Resolve Context

Use [Common Project Context Resolution](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-SKILL#agent-common-project-context-resolution) to compute effective context. In azd projects, prefer `azd env get-values` for deployment context and use the selected `.foundry/agent-metadata*.yaml` file only as an overlay/cache. Use `agent_get`, the local `azure.yaml` service block, and matching `eval.yaml` as needed to resolve:

| Value | Source |
|-------|--------|
| `projectEndpoint` | azd env, then metadata override |
| `agentName` / `agentVersion` | azd agent vars, then metadata/`agent_get` |
