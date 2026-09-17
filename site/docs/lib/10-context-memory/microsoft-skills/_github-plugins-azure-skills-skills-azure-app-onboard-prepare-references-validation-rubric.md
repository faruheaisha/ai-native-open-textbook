---
title: "Validation Rubric"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/prepare/references/validation-rubric.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/prepare/references/validation-rubric.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/prepare/references/validation-rubric.md"
sourceSha256: "9f36164b9aa58fe3c4571cf8e375e7f67ab73490c6bb7afdadaf97a4ac09df56"
pageSha256: "9f36164b9aa58fe3c4571cf8e375e7f67ab73490c6bb7afdadaf97a4ac09df56"
contentMode: "local-full"
zh: ""
---

# Validation Rubric

Run all 4 dimensions before writing `prepare-plan.json`. All must pass — a failure in any dimension triggers the [Error Handling](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-prepare-SKILL#error-handling) procedures.

## Dimensions

| Dimension | Pass Criteria |
|-----------|---------------|
| **Goal Alignment** | Every `context.json.intent` field reflected in service/SKU choice. No orphaned services (every service maps to a component or supporting role). `overrides[]` honored. |
| **WAF Alignment** | **Cost:** SKU matches budget; alternatives document cost tradeoffs. **Reliability:** Production plans include zone-redundant SKUs, GRS storage. **Security:** Managed identity + Key Vault; private endpoints where budget allows. **Ops:** Log Analytics + App Insights included. **Performance:** SKU right-sized to scale — no over/under-provisioning. See [Azure WAF Service Guides](https://learn.microsoft.com/en-us/azure/well-architected/service-guides/) for per-service alignment. |
| **Dependency Completeness** | Every service has its dependencies present (Container Apps → Log Analytics; SQL → Key Vault for connection strings; App Service → App Insights for monitoring; all services → Managed Identity for auth). Cross-service references consistent (App Insights → Log Analytics workspace). |
| **Deployment Viability** | SKUs exist in target region (validated by quota/region check). No policy-blocked resources. Resource names conform to Azure naming rules. Quota sufficient or flagged with remediation. No conflicting configs (free-tier SKU with paid-only features). |

## Applying

- **During plan creation (steps 3–7):** Use Goal Alignment and WAF Alignment as selection criteria. Use Dependency Completeness as cross-check after mapping.
- **Before writing (step 10):** Run all 4 as validation pass. Deployment Viability catches issues that surface after quota/naming.
- **On failure:** Fix inline via the [Error Handling](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-app-onboard-prepare-SKILL#error-handling) procedures. Document tradeoffs (e.g., WAF Reliability vs cost-optimized budget) in `assumptions[]`.

## References

- [Azure Well-Architected Framework](https://learn.microsoft.com/en-us/azure/well-architected/) — pillar definitions and tradeoff guidance
- [WAF Service Guides](https://learn.microsoft.com/en-us/azure/well-architected/service-guides/) — per-service WAF alignment checklists
