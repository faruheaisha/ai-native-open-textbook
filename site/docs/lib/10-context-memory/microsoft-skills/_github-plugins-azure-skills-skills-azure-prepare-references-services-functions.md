---
title: "Azure Functions"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/README.md"
sourceSha256: "f4faf4fefa4c7a6068cebf8ce760abb596d311e405f7ee7517f28d5f8293dae4"
pageSha256: "f4faf4fefa4c7a6068cebf8ce760abb596d311e405f7ee7517f28d5f8293dae4"
contentMode: "local-full"
zh: ""
---

# Azure Functions

Serverless compute for event-driven workloads, APIs, and scheduled tasks.

> **⚠️ MANDATORY: Use Composition Algorithm**
>
> **NEVER synthesize Bicep or Terraform from scratch for Azure Functions.**
>
> You MUST follow the base + recipe composition workflow:
> 1. Load [selection.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-selection) — decision tree for choosing base template + recipe
> 2. Follow [composition.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-composition) — the algorithm for fetching and composing
>
> This ensures proven IaC patterns, correct RBAC, and Flex Consumption defaults.

## When to Use

- Event-driven workloads
- Scheduled tasks (cron jobs)
- HTTP APIs with variable traffic
- Message/queue processing
- Real-time file processing
- MCP servers for AI agents
- Real-time streaming and event processing
- Orchestrations and workflows (Durable Functions)

## Service Type in azure.yaml

```yaml
services:
  my-function:
    host: function
    project: ./src/my-function
```

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| Storage Account | Function runtime state |
| App Service Plan | Hosting (Consumption or Premium) |
| Application Insights | Monitoring |

## Hosting Plans

**Use Flex Consumption for new deployments** (all AZD templates default to Flex).

For the full comparison matrix (scale limits, instance sizing, deployment slots, cost model, and a decision tree), see **[hosting-plans.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-hosting-plans)**. For mitigating cold starts on any plan, see **[cold-start.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-cold-start)**.

## Runtime Stacks

> **⚠️ ALWAYS QUERY OFFICIAL DOCUMENTATION FOR VERSIONS**
>
> Do NOT use hardcoded versions. Query for latest GA versions before generating code:
>
> **Primary Source:** [Azure Functions Supported Languages](https://learn.microsoft.com/en-us/azure/azure-functions/supported-languages)
>
> Use the azure-documentation MCP tool to fetch current supported versions:
> ```yaml
> intent: "Azure Functions supported language runtime versions"
> learn: true
> ```

### Version Selection Priority
1. **Latest GA** — For new projects (best features, longest support window)
2. **LTS** — For enterprise/compliance requirements
3. **User-specified** — When explicitly requested

| Language | FUNCTIONS_WORKER_RUNTIME | linuxFxVersion |
|----------|-------------------------|----------------|
| Node.js | `node` | `Node\|<version>` |
| Python | `python` | `Python\|<version>` |
| .NET | `dotnet-isolated` | `DOTNET-ISOLATED\|<version>` |
| Java | `java` | `Java\|<version>` |
| PowerShell | `powershell` | `PowerShell\|<version>` |

## References

- **[Selection Guide](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-selection)** — Start here: decision tree for base + recipe
- **[Composition Algorithm](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-composition)** — How to fetch and compose templates
- [AZD Templates](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates) — Template overview
- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-bicep)
- [Terraform Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-terraform)
- [Durable Functions](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-durable)
- [Aspire + Container Apps](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-aspire-containerapps)
- [Hosting Plans Comparison](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-hosting-plans) — Consumption vs Flex vs Premium vs Dedicated vs Container Apps
- [Cold Start Mitigation](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-cold-start) — Per-plan strategies and CLI/Bicep examples
