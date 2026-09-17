---
title: "Research Components"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/research.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/research.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/research.md"
sourceSha256: "1f8d733a40cc70b2dd9855c42d9b6930bb2f8e5647366facb795f867feef2e67"
pageSha256: "1f8d733a40cc70b2dd9855c42d9b6930bb2f8e5647366facb795f867feef2e67"
contentMode: "local-full"
zh: ""
---

# Research Components

After architecture planning, research each selected component to gather best practices before generating artifacts.

## Process

1. **Identify Components** — List all Azure services from architecture plan
2. **Load Service References** — For each service, load `services/<service>/README.md` first, then specific references as needed
3. **Check Resource Naming Rules** — For each resource type, check [resource naming rules](https://learn.microsoft.com/azure/azure-resource-manager/management/resource-name-rules) for valid characters, length limits, and uniqueness scopes
4. **Load Recipe References** — Load the selected recipe's guide (e.g., [AZD](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd)) and its IAC rules, MCP best practices, and schema tools listed in its "Before Generation" table
5. **Check Region Availability** — Verify all selected services are available in the target region per [region-availability.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-region-availability)
6. **Check Provisioning Limits** — Invoke **azure-quotas** skill to validate that the selected subscription and region have sufficient quota/capacity for all planned resources. Complete [Step 6 of the plan template](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-plan-template#6-provisioning-limit-checklist) in two phases: (1) prepare resource inventory with deployment quantities, (2) fetch quotas and validate capacity using azure-quotas skill
7. **Load Runtime References** — For containerized apps, load language-specific production settings (e.g., [Node.js](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-runtimes-nodejs))
8. **Invoke Related Skills** — For deeper guidance, invoke mapped skills from the table below
9. **Document Findings** — Record key insights in `.azure/deployment-plan.md`

## Service-to-Reference Mapping

| Azure Service | Reference | Related Skills |
|---------------|-----------|----------------|
| **Hosting** | | |
| Container Apps | [Container Apps](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps) | `azure-diagnostics`, `azure-observability`, `azure-nodejs-production` |
| App Service | [App Service](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service) | `azure-diagnostics`, `azure-observability`, `azure-nodejs-production` |
| Azure Functions | [Functions](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions) | — |
| Static Web Apps | [Static Web Apps](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-static-web-apps) | — |
| AKS | [AKS](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-aks) | `azure-networking` |
| **Data** | | |
| Azure SQL | [SQL Database](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database) | — |
| Cosmos DB | [Cosmos DB](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db) | — |
| PostgreSQL | — | — |
| Storage (Blob/Files) | [Storage](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-storage) | `azure-storage` |
| **Messaging** | | |
| Service Bus | [Service Bus](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-service-bus) | — |
| Event Grid | [Event Grid](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-event-grid) | — |
| Event Hubs | — | — |
| **Integration** | | |
| API Management | [APIM](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-apim) | `azure-aigateway` (invoke for AI Gateway policies) |
| Logic Apps | [Logic Apps](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-logic-apps) | — |
| **Workflow & Orchestration** | | |
| Durable Functions | [Durable Functions](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-durable), [Durable Task Scheduler](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-durable-task-scheduler) | — |
| Durable Task Scheduler | [Durable Task Scheduler](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-durable-task-scheduler) | — |
| **Security & Identity** | | |
| Key Vault | [Key Vault](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-key-vault) | `azure-keyvault-expiration-audit` |
| Managed Identity | — | `entra-app-registration` |
| **Observability** | | |
| Application Insights | [App Insights](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-insights) | `appinsights-instrumentation` (invoke for instrumentation) |
| Log Analytics | — | `azure-observability`, `azure-kusto` |
| **AI Services** | | |
| Azure OpenAI | [Foundry](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-foundry) | `microsoft-foundry` (invoke for AI patterns and model guidance) |
| AI Search | — | `azure-ai` (invoke for search configuration) |

## Research Instructions

### Step 1: Load Internal References (Progressive Loading)

For each selected service, load the README.md first, then load specific files as needed:

```
Selected: Container Apps, Cosmos DB, Key Vault

→ Load: services/container-apps/README.md (overview)
  → If need Bicep: services/container-apps/bicep.md
  → If need Terraform: services/container-apps/terraform.md
  → If need scaling: services/container-apps/scaling.md
  → If need health probes: services/container-apps/health-probes.md

→ Load: services/cosmos-db/README.md (overview)
  → If need partitioning: services/cosmos-db/partitioning.md
  → If need SDK: services/cosmos-db/sdk.md

→ Load: services/key-vault/README.md (overview)
  → If need SDK: services/key-vault/sdk.md
```

### Step 2: Invoke Related Skills (When Deeper Guidance Needed)

Invoke related skills for specialized scenarios:

| Scenario | Action |
|----------|--------|
| Using Azure Functions | Stay in **azure-prepare** — load [selection.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-selection) → Follow [composition.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-composition) algorithm |
| PostgreSQL with passwordless auth | Handle directly without a separate skill |
| Need detailed security hardening | Handle directly with service-specific security guidance and platform best practices |
| Setting up App Insights instrumentation | `appinsights-instrumentation` |
| Building AI applications | `microsoft-foundry` |
| Cost-sensitive deployment | `azure-cost` |

**Skill/Reference Invocation Pattern:**

For **Azure Functions**:
1. Load: [selection.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-selection) (decision tree)
2. Follow: [composition.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-recipes-composition) (algorithm)
3. Result: Base template + recipe composition (never synthesize IaC)

For **PostgreSQL**:
1. Handle passwordless auth patterns directly without a separate skill

### Step 3: Document in Plan

Add research findings to `.azure/deployment-plan.md` under a `## Research Summary` section with source references and key insights per component.

## Common Research Patterns

### Web Application + API + Database (Cosmos DB)

1. Load: [services/container-apps/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps) → [bicep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-bicep) or [terraform.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-terraform), [scaling.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-scaling)
2. Load: [services/cosmos-db/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db) → [partitioning.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db-partitioning)
3. Load: [services/key-vault/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-key-vault)
4. Invoke: `azure-observability` (monitoring setup)
5. Review service-specific security guidance directly before generation

### Container Apps + API + SQL Database

1. Load: [services/container-apps/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps) → [bicep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-bicep) or [terraform.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-terraform), [scaling.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-scaling)
2. Load: [services/sql-database/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database) → [bicep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database-bicep), [auth.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database-auth)
3. Load: [services/key-vault/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-key-vault)
4. Review [auth.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database-auth) directly for Entra-only auth configuration

### App Service + API + SQL Database

1. Load: [services/app-service/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service) → [bicep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-bicep)
2. Load: [services/sql-database/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database) → [bicep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database-bicep), [auth.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database-auth)
3. Load: [services/key-vault/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-key-vault)
4. Review [auth.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-sql-database-auth) directly for Entra-only auth configuration

### Serverless Event-Driven

1. Load: [services/functions/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions) (contains mandatory composition workflow)
2. Load: [services/event-grid/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-event-grid) or [services/service-bus/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-service-bus) (if using messaging)
3. Load: [services/storage/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-storage) (if using queues/blobs)
4. Invoke: `azure-observability` (distributed tracing)

### AI Application

1. Invoke: `microsoft-foundry` (AI patterns and best practices)
2. Load: [services/container-apps/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps) → [bicep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-bicep) or [terraform.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-container-apps-terraform)
3. Load: [services/cosmos-db/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db) → [partitioning.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db-partitioning) (vector storage)
4. Review Key Vault and Foundry references directly for API key management

## After Research

Proceed to **Generate Artifacts** step with research findings applied.
