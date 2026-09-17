---
title: "Azure Policy Validation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-validate/references/policy-validation.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-validate/references/policy-validation.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-validate/references/policy-validation.md"
sourceSha256: "f65dde86f358afa14815ab3d974538723f24c7879464e6688665acf2edc11ffa"
pageSha256: "f65dde86f358afa14815ab3d974538723f24c7879464e6688665acf2edc11ffa"
contentMode: "local-full"
zh: ""
---

# Azure Policy Validation

## How to Validate Policies

### 1. Get Subscription ID

Retrieve your current Azure subscription ID:

```bash
az account show --query id -o tsv
```

### 2. Validate Policies

Call the Azure MCP Policy tool to retrieve policies for your subscription:

```
