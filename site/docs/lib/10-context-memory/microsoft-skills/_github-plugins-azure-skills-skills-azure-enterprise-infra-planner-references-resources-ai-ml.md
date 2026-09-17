---
title: "AI & ML Resources"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/ai-ml.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/ai-ml.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/ai-ml.md"
sourceSha256: "a4f0ddf86ca87dab5a5938db0113f2ecb17ed1662dcddc58464383b894798fb1"
pageSha256: "a4f0ddf86ca87dab5a5938db0113f2ecb17ed1662dcddc58464383b894798fb1"
contentMode: "local-full"
zh: ""
---

# AI & ML Resources

| Resource | ARM Type | API Version | CAF Prefix | Naming Scope | Region |
|----------|----------|-------------|------------|--------------|--------|
| Cognitive Services | `Microsoft.CognitiveServices/accounts` | `2025-06-01` | varies by kind | Resource group | Mainstream |
| ML Workspace | `Microsoft.MachineLearningServices/workspaces` | `2025-06-01` | `mlw`/`hub`/`proj` | Resource group | Mainstream |
| AI Search | `Microsoft.Search/searchServices` | `2025-05-01` | `srch` | Global | Mainstream |

## Documentation

| Resource | Bicep Reference | Service Overview | Naming Rules | Additional |
|----------|----------------|------------------|--------------|------------|
| Cognitive Services | [2025-06-01](https://learn.microsoft.com/azure/templates/microsoft.cognitiveservices/accounts?pivots=deployment-language-bicep) | [Custom subdomain names](https://learn.microsoft.com/azure/ai-services/cognitive-services-custom-subdomains) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftcognitiveservices) | [All API versions](https://learn.microsoft.com/azure/templates/microsoft.cognitiveservices/allversions) |
| ML Workspace | [2025-06-01](https://learn.microsoft.com/azure/templates/microsoft.machinelearningservices/workspaces?pivots=deployment-language-bicep) | [ML Services](https://learn.microsoft.com/azure/templates/microsoft.machinelearningservices/allversions) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftmachinelearningservices) | [All API versions](https://learn.microsoft.com/azure/templates/microsoft.machinelearningservices/allversions) |
| AI Search | [2025-05-01](https://learn.microsoft.com/azure/templates/microsoft.search/searchservices?pivots=deployment-language-bicep) | [Service limits](https://learn.microsoft.com/azure/search/search-limits-quotas-capacity) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftsearch) | [All API versions](https://learn.microsoft.com/azure/templates/microsoft.search/allversions) |
