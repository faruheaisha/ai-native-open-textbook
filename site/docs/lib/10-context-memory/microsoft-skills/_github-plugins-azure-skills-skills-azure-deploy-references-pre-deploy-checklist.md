---
title: "Pre-Deployment Checklist"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/pre-deploy-checklist.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/pre-deploy-checklist.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/pre-deploy-checklist.md"
sourceSha256: "b70ad5778684dfdf4a8f3b3b48bc4f3491769c0324579aac0f8a281c9f89497e"
pageSha256: "b70ad5778684dfdf4a8f3b3b48bc4f3491769c0324579aac0f8a281c9f89497e"
contentMode: "local-full"
zh: ""
---

# Pre-Deployment Checklist

> **CRITICAL**: Before running ANY provisioning commands, you MUST complete this checklist IN ORDER.
>
> ⛔ **DO NOT** run `azd up` until ALL steps are complete. Trial-and-error wastes time and creates orphan resources.

## Step 1: Check Current Subscription

Use the Azure MCP tool to get current subscription:

```
mcp_azure_mcp_subscription_list
```

**CLI fallback:**
```bash
az account show --query "{name:name, id:id}" -o json
```

## Step 2: Prompt User for Subscription

**You MUST use `ask_user`** to confirm the subscription. Find the default subscription (marked `isDefault: true`) from Step 1 results and present it as the recommended choice.

✅ **Correct — show actual name and ID as a choice:**
```
ask_user(
  question: "Which Azure subscription would you like to deploy to?",
  choices: [
