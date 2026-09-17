---
title: "Template Selection Decision Tree — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/selection.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/selection.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/selection.md"
sourceSha256: "f75f38923c87e169b72d13cc6a905141d0f28bfcbaa34e52527f52f0244800c2"
pageSha256: "f75f38923c87e169b72d13cc6a905141d0f28bfcbaa34e52527f52f0244800c2"
contentMode: "local-full"
zh: ""
---

# Template Selection Decision Tree — REFERENCE ONLY

**CRITICAL**: Check for specific scenario indicators IN ORDER before defaulting to Web API.

**Architecture**: All deployments start from a base template per language/scenario. Integrations are applied as [composable recipes](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-recipes) on top of the base. See [composition.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-recipes-composition) for the merge algorithm.

Cross-reference with [App Service overview](https://learn.microsoft.com/en-us/azure/app-service/overview) and [official AZD gallery templates](https://azure.github.io/awesome-azd/?tags=appservice).

```
1. Is this a full-stack web app with server-side rendering?
   Indicators: Razor Pages, MVC views, Next.js SSR, Nuxt, Django templates,
               server-rendered HTML, .cshtml, EJS/Pug, Jinja2
   └─► YES → web-app base template (see [web-app.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-web-app))

2. Is this a background worker or WebJob?
   Indicators: WebJob, IHostedService, BackgroundService, worker,
               queue processor, scheduled task (no HTTP endpoints)
   └─► YES → Use Worker Service template (out of scope — see Functions or Container Apps)

3. Does it use Azure SQL or PostgreSQL?
   Indicators: DbContext, EF Core, Prisma, SQLAlchemy, connection string,
               Microsoft.EntityFrameworkCore, @prisma/client, psycopg2
   └─► YES → Web API base + sql recipe (IaC + RBAC + source)
   Recipe: recipes/sql/ ✅ Available

4. Does it use Cosmos DB?
   Indicators: CosmosClient, @azure/cosmos, azure-cosmos, CosmosDBConnection,
               Microsoft.Azure.Cosmos, container.read_item
   └─► YES → Web API base + cosmos recipe (IaC + RBAC + source)
   Recipe: recipes/cosmos/ ✅ Available

5. Does it require authentication?
   Indicators: [Authorize], Microsoft.Identity.Web, passport-azure-ad,
               msal, EasyAuth, /.auth/login, authsettingsV2
   └─► YES → base + auth recipe (Easy Auth or MSAL config)
   Recipe: recipes/auth/ ✅ Available

6. Does it use Redis caching?
   Indicators: IDistributedCache, StackExchange.Redis, ioredis, redis,
               azure-cache-redis, aioredis
   └─► YES → base + redis recipe (IaC + RBAC + source)
   Recipe: recipes/redis/ ✅ Available

7. DEFAULT → Web API base template by runtime (see [web-api.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-web-api))
```

## Base Templates

| Scenario | Template Reference |
|----------|-------------------|
| Full-stack web app with server-side rendering | [web-app.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-web-app) |
| REST API / headless backend (default) | [web-api.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-web-api) |

## Recipe Types

| Type | IaC Delta? | Examples |
|------|-----------|----------|
| **Full recipe** | Yes — Bicep module + RBAC + networking | sql, cosmos, redis, auth |
| **Source-only** | No — only application code patterns | health checks |

## Critical Rules

> See [Critical Rules](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-app-service-templates-recipes-composition#critical-rules) in composition.md (canonical).
