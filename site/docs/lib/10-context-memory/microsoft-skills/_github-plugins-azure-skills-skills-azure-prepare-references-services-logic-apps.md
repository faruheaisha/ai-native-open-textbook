---
title: "Azure Logic Apps"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/logic-apps/README.md"
sourceSha256: "b577faa4399bde961245eaf42c6c06a74de0696ae9103977e183efb5cb681b8a"
pageSha256: "b577faa4399bde961245eaf42c6c06a74de0696ae9103977e183efb5cb681b8a"
contentMode: "local-full"
zh: ""
---

# Azure Logic Apps

Low-code workflow automation and integration platform.

## When to Use

- Integration-heavy workloads
- Business process automation
- Connecting multiple SaaS services
- Approval and human workflow processes
- Low-code/visual workflow design
- Event-driven orchestration

## Deployment Note

Logic Apps are typically deployed as infrastructure, not application services:

```yaml
# Logic Apps are defined in Bicep infrastructure
```

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| Storage Account | Workflow state (Standard only) |
| Log Analytics | Monitoring |
| API Connections | External service connections |

## Consumption vs Standard

| Feature | Consumption | Standard |
|---------|-------------|----------|
| Pricing | Per execution | App Service Plan |
| VNET | Limited | Full support |
| State | Azure-managed | Custom storage |
| Deployment | ARM/Bicep | VS Code deployment |
| Multi-workflow | One per resource | Multiple per app |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-logic-apps-bicep)
- [Triggers](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-logic-apps-triggers)
