---
title: "Azure Cost Management Skill"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/SKILL.md"
sourceSha256: "bb338e57ad45c423c7ecd77c1a5a9cf4e2f7bb1d9aaea1aec136f349f2a6ae02"
pageSha256: "bb338e57ad45c423c7ecd77c1a5a9cf4e2f7bb1d9aaea1aec136f349f2a6ae02"
contentMode: "local-full"
zh: ""
---

# Azure Cost Management Skill

Query historical costs, forecast future spending, optimize to reduce waste.

## Routing

| User Intent | Workflow |
|-------------|----------|
| Understand current costs | [Cost Query](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-workflow) |
| Reduce costs / find waste | [Cost Optimization](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-optimization-workflow) |
| Project future costs | [Cost Forecast](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-forecast-workflow) |

## Quick Reference

| Property | Value |
|----------|-------|
| **Query API** | `POST \{scope\}/providers/Microsoft.CostManagement/query?api-version=2023-11-01` |
| **Forecast API** | `POST \{scope\}/providers/Microsoft.CostManagement/forecast?api-version=2023-11-01` |
| **Required Role** | Cost Management Reader + Monitoring Reader + Reader (on target scope) |

## Scope Patterns

- Subscription: `/subscriptions/<id>`
- Resource Group: `/subscriptions/<id>/resourceGroups/<name>`
- Management Group: `/providers/Microsoft.Management/managementGroups/<id>`
- Billing Account: `/providers/Microsoft.Billing/billingAccounts/<id>`

## Service-Specific Optimization

- [Redis](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-optimization-services-redis-azure-cache-for-redis)
- [Storage](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-optimization-services-storage-azure-storage)

## References

- [MCP Tools, Best Practices, Safety](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-references-tools-and-best-practices)
- [SDK: Redis .NET](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-optimization-sdk-azure-resource-manager-redis-dotnet)
