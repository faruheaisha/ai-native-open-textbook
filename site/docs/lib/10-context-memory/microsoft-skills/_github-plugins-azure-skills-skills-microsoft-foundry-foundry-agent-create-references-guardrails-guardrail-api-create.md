---
title: "Create a Guardrail via the REST API (az rest)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-api-create.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-api-create.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/guardrails/guardrail-api-create.md"
sourceSha256: "d8f941d59f6d928b37462ae16c1ca1358002fdf6ca2a50240641f8bba9c42623"
pageSha256: "d8f941d59f6d928b37462ae16c1ca1358002fdf6ca2a50240641f8bba9c42623"
contentMode: "local-full"
zh: ""
---

# Create a Guardrail via the REST API (`az rest`)

> Use this path only when the user explicitly asks for programmatic/CLI/CI/CD creation. Otherwise, guide them to the [portal](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-guardrails-guardrail-manage#default-path-portal).

## Prerequisites

- Azure CLI installed and logged in (`az login`)
- **Foundry Account Owner** role (or higher) on the Azure AI resource
- The Azure AI Services account name, resource group, and subscription ID

## Step 1: Set Variables

```bash
SUBSCRIPTION_ID=$(az account show --query id -o tsv)
