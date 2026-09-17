---
title: "Optimize Workflow"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/optimize-workflow.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/optimize-workflow.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/optimize-workflow.md"
sourceSha256: "d43f8c80576de3414598f903afba5661dc296fe63662cc6f3a9316f1ef824e98"
pageSha256: "d43f8c80576de3414598f903afba5661dc296fe63662cc6f3a9316f1ef824e98"
contentMode: "local-full"
zh: ""
---

# Optimize Workflow

Use this after azd setup and scaffold review are complete.

## 1. Prepare context

1. Resolve the hosted agent with [azd Setup](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-azd-setup).
2. If SDK wiring or `.agent_configs/baseline/` is missing, run [Scaffold Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-scaffold) first.
3. If scaffolding changed files, stop and ask the user to review before optimization.
4. Ensure `eval.yaml` exists using [eval.yaml Guidance](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-agent-optimizer-references-eval-yaml), generate it with `azd ai agent eval generate`, or ask whether to use built-in optimize defaults.
5. Before setting `--optimize-model` or `options.optimization_model`, verify the project has an existing deployment from the allowed optimizer list: `GPT-5`, `GPT-5.1`, `GPT-5.2`, `GPT-5.4`, `GPT-5.5`, `DeepSeek-V4-Pro`, or `DeepSeek-V-3.2`.

When evaluation inputs are not already selected, generate them from a reviewed seed dataset or regenerate defaults:

```bash
