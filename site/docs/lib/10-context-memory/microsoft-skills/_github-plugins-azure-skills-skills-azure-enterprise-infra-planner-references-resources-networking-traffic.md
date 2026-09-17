---
title: "Networking (Traffic) Resources"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/networking-traffic.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/networking-traffic.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/resources/networking-traffic.md"
sourceSha256: "ee899d2ffe8160879bc0954e7bc58086756b751430c9c35f20f56b53253f9a3b"
pageSha256: "ee899d2ffe8160879bc0954e7bc58086756b751430c9c35f20f56b53253f9a3b"
contentMode: "local-full"
zh: ""
---

# Networking (Traffic) Resources

| Resource | ARM Type | API Version | CAF Prefix | Naming Scope | Region |
|----------|----------|-------------|------------|--------------|--------|
| API Management | `Microsoft.ApiManagement/service` | `2024-05-01` | `apim` | Global | Mainstream |
| Application Gateway | `Microsoft.Network/applicationGateways` | `2024-07-01` | `agw` | Resource group | Foundational |
| Front Door | `Microsoft.Cdn/profiles` | `2025-06-01` | `afd` | Resource group | Foundational |
| Load Balancer | `Microsoft.Network/loadBalancers` | `2024-07-01` | `lbi`/`lbe` | Resource group | Foundational |

## Documentation

| Resource | Bicep Reference | Service Overview | Naming Rules | Additional |
|----------|----------------|------------------|--------------|------------|
| API Management | [2024-05-01](https://learn.microsoft.com/azure/templates/microsoft.apimanagement/service?pivots=deployment-language-bicep) | [APIM overview](https://learn.microsoft.com/azure/api-management/api-management-key-concepts) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftapimanagement) | [VNet integration](https://learn.microsoft.com/azure/api-management/virtual-network-concepts) |
| Application Gateway | [2024-07-01](https://learn.microsoft.com/azure/templates/microsoft.network/applicationgateways?pivots=deployment-language-bicep) | [App Gateway overview](https://learn.microsoft.com/azure/application-gateway/overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftnetwork) | [v2 features](https://learn.microsoft.com/azure/application-gateway/application-gateway-autoscaling-zone-redundant) |
| Front Door | [2025-06-01](https://learn.microsoft.com/azure/templates/microsoft.cdn/profiles?pivots=deployment-language-bicep) | [Front Door overview](https://learn.microsoft.com/azure/frontdoor/front-door-overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftcdn) | [Routing architecture](https://learn.microsoft.com/azure/frontdoor/front-door-routing-architecture) |
| Load Balancer | [2024-07-01](https://learn.microsoft.com/azure/templates/microsoft.network/loadbalancers?pivots=deployment-language-bicep) | [LB overview](https://learn.microsoft.com/azure/load-balancer/load-balancer-overview) | [Naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules#microsoftnetwork) | [Standard LB](https://learn.microsoft.com/azure/load-balancer/load-balancer-standard-overview) |
