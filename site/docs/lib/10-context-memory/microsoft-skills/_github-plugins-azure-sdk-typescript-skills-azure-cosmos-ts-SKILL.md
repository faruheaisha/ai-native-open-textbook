---
title: "@azure/cosmos (TypeScript/JavaScript)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-cosmos-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-cosmos-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-cosmos-ts/SKILL.md"
sourceSha256: "352aefc8d088cdc851baf3a38d60124bbf77bc0f273c2522500967d5bd515da2"
pageSha256: "352aefc8d088cdc851baf3a38d60124bbf77bc0f273c2522500967d5bd515da2"
contentMode: "local-full"
zh: ""
---

# @azure/cosmos (TypeScript/JavaScript)

Data plane SDK for Azure Cosmos DB NoSQL API operations — CRUD on documents, queries, bulk operations.

> **⚠️ Data vs Management Plane**
> - **This SDK (@azure/cosmos)**: CRUD operations on documents, queries, stored procedures
> - **Management SDK (@azure/arm-cosmosdb)**: Create accounts, databases, containers via ARM

## Installation

```bash
npm install @azure/cosmos @azure/identity
```

**Current Version**: 4.9.0  
**Node.js**: >= 20.0.0

## Environment Variables

```bash
COSMOS_ENDPOINT=https://<account>.documents.azure.com:443/
