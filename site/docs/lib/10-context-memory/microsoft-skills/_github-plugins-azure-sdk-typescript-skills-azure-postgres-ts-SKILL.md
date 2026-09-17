---
title: "Azure PostgreSQL for TypeScript (node-postgres)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-postgres-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-postgres-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-postgres-ts/SKILL.md"
sourceSha256: "b2098d835acf3cf6cee62ae79044c0180aee037231ef0afa1589fed1fc9c4ab3"
pageSha256: "b2098d835acf3cf6cee62ae79044c0180aee037231ef0afa1589fed1fc9c4ab3"
contentMode: "local-full"
zh: ""
---

# Azure PostgreSQL for TypeScript (node-postgres)

Connect to Azure Database for PostgreSQL Flexible Server using the `pg` (node-postgres) package with support for password and Microsoft Entra ID (passwordless) authentication.

## Installation

```bash
npm install pg @azure/identity
npm install -D @types/pg
```

## Environment Variables

```bash
# Required
AZURE_POSTGRESQL_HOST=<server>.postgres.database.azure.com
AZURE_POSTGRESQL_DATABASE=<database>
AZURE_POSTGRESQL_PORT=5432

# For password authentication
AZURE_POSTGRESQL_USER=<username>
AZURE_POSTGRESQL_PASSWORD=<password>

# For Entra ID authentication
