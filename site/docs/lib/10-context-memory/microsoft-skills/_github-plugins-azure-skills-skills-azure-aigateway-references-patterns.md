---
title: "AI Gateway Configuration Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-aigateway/references/patterns.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-aigateway/references/patterns.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-aigateway/references/patterns.md"
sourceSha256: "7a701fc8bee643ec4a4a8f77e19fb45b5101ce830da7740ed6641233b3df4470"
pageSha256: "7a701fc8bee643ec4a4a8f77e19fb45b5101ce830da7740ed6641233b3df4470"
contentMode: "local-full"
zh: ""
---

# AI Gateway Configuration Patterns

Step-by-step patterns for configuring Azure API Management as an AI Gateway.

---

## Pattern 1: Add AI Model Backend

Connect Azure OpenAI or AI Foundry models to your APIM instance.

### Prerequisites

- APIM instance deployed (use **azure-prepare** skill to deploy APIM — see [APIM deployment guide](https://learn.microsoft.com/azure/api-management/get-started-create-service-instance))
- Azure OpenAI or AI Foundry resource provisioned
- System-assigned or user-assigned managed identity enabled on APIM

### Steps

#### 1. Discover AI Resources

```bash
# Find Azure OpenAI resources
az cognitiveservices account list --query "[?kind=='OpenAI'].{name:name, rg:resourceGroup, endpoint:properties.endpoint}" -o table

# Find AI Foundry resources (if using)
az cognitiveservices account list --query "[?kind=='AIServices'].{name:name, rg:resourceGroup}" -o table
```

#### 2. Enable Managed Identity on APIM

```bash
# Enable system-assigned identity
