---
title: "Foundry Model Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/foundry-model.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/foundry-model.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/foundry-model.md"
sourceSha256: "1aeb7d857715bd887a28cc657be884704c20130cd2c89b6b62bff8bd7a2e9032"
pageSha256: "1aeb7d857715bd887a28cc657be884704c20130cd2c89b6b62bff8bd7a2e9032"
contentMode: "local-full"
zh: ""
---

# Foundry Model Reference

Use this reference to query Microsoft Foundry model-related data.

## Model information

Query the regional model catalog to obtain the model version, format, capabilities, lifecycle status, and supported SKUs:

**PowerShell:**

```pwsh
$region = "<REGION>"
$subscription = "<SUBSCRIPTION_ID_OR_NAME>"

az cognitiveservices model list `
  --location $region `
  --subscription $subscription `
  -o json
```

**Bash:**

```bash
REGION="<REGION>"
SUBSCRIPTION="<SUBSCRIPTION_ID_OR_NAME>"

az cognitiveservices model list \
  --location "$REGION" \
  --subscription "$SUBSCRIPTION" \
  -o json
```

The result provides:

- Model name, version, format, default-version status, and lifecycle status.
- Capabilities such as Responses, chat completions, and agents support.
- Supported SKUs, capacity ranges, and usage names.

## Model quota

Query the regional usage record for the exact model and SKU, then calculate the currently available quota:

**PowerShell:**

```pwsh
$region = "<REGION>"
$subscription = "<SUBSCRIPTION_ID_OR_NAME>"

az cognitiveservices usage list `
  --location $region `
  --subscription $subscription `
  -o json
```

**Bash:**

```bash
REGION="<REGION>"
SUBSCRIPTION="<SUBSCRIPTION_ID_OR_NAME>"

az cognitiveservices usage list \
  --location "$REGION" \
  --subscription "$SUBSCRIPTION" \
  -o json
```

The result provides quota usage names, current usage, limits, and units for the subscription and region.
