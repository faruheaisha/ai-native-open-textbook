---
title: "Cosmos DB Service Implementation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-python/skills/azure-cosmos-db-py/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-python/skills/azure-cosmos-db-py/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-python/skills/azure-cosmos-db-py/SKILL.md"
sourceSha256: "3dd01706390b4b1765ae1a7b3829878c4d0ba8485228f824e817287c4f8990d4"
pageSha256: "3dd01706390b4b1765ae1a7b3829878c4d0ba8485228f824e817287c4f8990d4"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Service Implementation

Build production-grade Azure Cosmos DB NoSQL services following clean code, security best practices, and TDD principles.

## Installation

```bash
pip install azure-cosmos azure-identity
```

## Environment Variables

```bash
COSMOS_ENDPOINT=https://<account>.documents.azure.com:443/  # Required for all auth methods
