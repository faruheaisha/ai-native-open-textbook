---
title: "M365 Agents Toolkit"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/README.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/README.md"
sourceSha256: "2209f83b15bc16e3d32bcdaaefab46811725aa9696d0998e5f5c0e7e9f554a24"
pageSha256: "2209f83b15bc16e3d32bcdaaefab46811725aa9696d0998e5f5c0e7e9f554a24"
contentMode: "local-full"
zh: ""
---

# M365 Agents Toolkit

Toolkit for building Microsoft 365 Copilot declarative agents.

## Installation

### Via GitHub Copilot CLI Plugin Marketplace

```bash
/plugin install microsoft-365-agents-toolkit@work-iq
```

## Usage

```
# Develop an agent
"Scaffold a new declarative agent for HR FAQ"

# Configure capabilities
"Add web search to my agent"

# Deploy
"Deploy my agent with ATK"

# Create evals
"Create an eval suite for my  agent based on it's capabilities."

# Run evals
"Run my evals for the agent"

# Analyze and improve
"Analyze the evaluation failures by root cause, and recommend targeted agent instruction changes"

# Regression check after agent changes
"I changed my agent instructions. Re-run the evals with stable concurrency and compare the new results to .evals\baseline.json"
```

The evaluator skill uses the public preview M365 Copilot eval CLI through package-scoped `npx`. Learn more about the preview, docs, issues, and feedback channels in the public [m365-copilot-eval repository](https://github.com/microsoft/m365-copilot-eval).

```powershell
npx -y --package @microsoft/m365-copilot-eval@latest runevals --prompts-file evals\evals.json --output .evals\latest.json
```

## Skills

| Skill | What It Does |
|-------|-------------|
| [**install-atk**](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-install-atk-SKILL) | Install or update the ATK CLI and VS Code extension |
| [**declarative-agent-developer**](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-SKILL) | Scaffolding, JSON manifest authoring, capability configuration, security patterns, deployment via ATK CLI |
| [**ui-widget-developer**](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-ui-widget-developer-SKILL) | Build MCP servers with OpenAI Apps SDK widget rendering for Copilot Chat |
| [**m365-agent-evaluator**](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-m365-agent-evaluator-SKILL) | Generate, run, and analyze evaluation suites for M365 Copilot declarative agents |
