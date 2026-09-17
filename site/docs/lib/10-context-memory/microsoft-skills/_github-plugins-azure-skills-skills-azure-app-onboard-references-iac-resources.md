---
title: "IaC Resources — Official Documentation & Tools"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/references/iac-resources.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/references/iac-resources.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/references/iac-resources.md"
sourceSha256: "49d8cb5820da4ecd2db81b6dc0b0b86fdc099ab7ffc1eaf23021a40ac3cc2379"
pageSha256: "49d8cb5820da4ecd2db81b6dc0b0b86fdc099ab7ffc1eaf23021a40ac3cc2379"
contentMode: "local-full"
zh: ""
---

# IaC Resources — Official Documentation & Tools

Look up when stuck after 3 tries, edge cases, or validating generated code against ground truth.

## Bicep

| Resource | URL | Use When |
|----------|-----|----------|
| Bicep Documentation | https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/ | Syntax, file structure, deployment scopes, install |
| Azure Resource Reference | https://learn.microsoft.com/en-us/azure/templates/ | Resource properties, API versions, schema per type |

## Terraform

| Resource | URL | Use When |
|----------|-----|----------|
| Terraform Registry — azurerm | https://registry.terraform.io/providers/hashicorp/azurerm/latest | Resource type properties, argument reference, import blocks |
| Terraform Registry — azapi | https://registry.terraform.io/providers/azure/azapi/latest | Preview resources not yet in azurerm; maps to ARM REST APIs |

## Validation Tools

| Tool | Format | Purpose |
|------|--------|---------|
| `bicep build` | Bicep | Syntax + schema validation |
| `az deployment group create --what-if` | Bicep | ARM-level dry run with change preview |
| `terraform validate` | Terraform | Syntax + schema validation |
| `terraform plan` | Terraform | Provider-level dry run |

## Deploy Troubleshooting

> ⛔ **Primary lookup path:** Call `mcp_azure_mcp_documentation` with the error message first. Use the table below as fallback when MCP is unavailable or returns no results.
>
> **On repeat failures (same error 2+ consecutive attempts):** `fetch_webpage` the matching URL below with the error message as query. Apply the documented fix — do not retry the same approach.

| Resource | URL | Use When |
|----------|-----|----------|
| Common ARM Deployment Errors | https://learn.microsoft.com/en-us/azure/azure-resource-manager/troubleshooting/common-deployment-errors | `InvalidTemplateDeployment`, `SkuNotAvailable`, `QuotaExceeded`, any ARM error code |
| App Service Troubleshooting | https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/ | Startup crashes, Kudu/Oryx build failures, health probe issues |
| App Service Zip Deploy Guide | https://learn.microsoft.com/en-us/azure/app-service/deploy-zip | Zip deploy, SCM_DO_BUILD_DURING_DEPLOYMENT, Kudu publish API |
| Container Apps Troubleshooting | https://learn.microsoft.com/en-us/azure/container-apps/troubleshooting | Revision failures, ingress errors, secret resolution, image pull failures |
| Quota Increase Portal | https://portal.azure.com/#blade/Microsoft_Azure_Capacity/QuotaMenuBlade/myQuotas | Direct link for quota increase requests |

> **Source:** Official Microsoft Learn, HashiCorp Developer, and Azure documentation.
