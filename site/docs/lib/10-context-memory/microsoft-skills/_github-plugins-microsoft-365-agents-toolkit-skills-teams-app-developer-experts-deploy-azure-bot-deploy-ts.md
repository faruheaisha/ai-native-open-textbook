---
title: "azure-bot-deploy-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/azure-bot-deploy-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/azure-bot-deploy-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/deploy/azure-bot-deploy-ts.md"
sourceSha256: "dfcfc843a62bebfb6e4ab4cdf39081e95f0ad9aede0113f363c9c2c753afdab0"
pageSha256: "dfcfc843a62bebfb6e4ab4cdf39081e95f0ad9aede0113f363c9c2c753afdab0"
contentMode: "local-full"
zh: ""
---

# azure-bot-deploy-ts

## purpose

Step-by-step deployment of a Slack bot, Teams bot, or dual bot to Azure. Covers CLI setup, App Registration, Bot Service registration, compute provisioning (App Service / Functions / Container Apps), environment configuration, and verification.

## rules

1. **Install prerequisites before anything else.** You need: Node.js 20 LTS, Azure CLI (`az`), and optionally the Agents Toolkit CLI (`npm install -g @microsoft/m365agentstoolkit-cli`). Verify with `az --version` and `node --version`. [learn.microsoft.com/cli/azure/install-azure-cli](https://learn.microsoft.com/cli/azure/install-azure-cli)
