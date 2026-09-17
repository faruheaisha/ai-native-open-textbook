---
title: "SQL Database Recipe — REFERENCE ONLY"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/app-service/templates/recipes/sql/README.md"
sourceSha256: "013e51c2cf7d233533f68d29f49fdd2aebb2528aba1eb11531519da1e6f4860f"
pageSha256: "013e51c2cf7d233533f68d29f49fdd2aebb2528aba1eb11531519da1e6f4860f"
contentMode: "local-full"
zh: ""
---

# SQL Database Recipe — REFERENCE ONLY

Adds Azure SQL Database integration to an App Service base template.

## Overview

This recipe composes with a Web API or Web App base template to add Azure SQL Database connectivity. It provides the IaC delta (SQL Server, database, firewall, RBAC) and per-language source code using EF Core, Prisma, or SQLAlchemy.

## Integration Type

| Aspect | Value |
|--------|-------|
| **Database** | Azure SQL Database (Serverless or Provisioned) |
| **Auth** | Managed identity (passwordless) |
| **ORM** | EF Core (.NET), Prisma (Node.js), SQLAlchemy (Python) |
| **Hosting** | App Service (from base template) |
| **Local Auth** | Disabled in Azure (Entra ID only); local dev may use SQL auth |

## Composition Steps
