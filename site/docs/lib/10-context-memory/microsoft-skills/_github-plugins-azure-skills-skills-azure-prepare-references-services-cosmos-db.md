---
title: "Azure Cosmos DB"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/README.md"
sourceSha256: "526776da0424d891bf3012920428b4129e128b618fdce02bbc149be24986682c"
pageSha256: "526776da0424d891bf3012920428b4129e128b618fdce02bbc149be24986682c"
contentMode: "local-full"
zh: ""
---

# Azure Cosmos DB

Globally distributed, multi-model database for low-latency data at scale.

## When to Use

- Global distribution requirements
- Multi-model data (document, graph, key-value)
- Variable and unpredictable throughput
- Low-latency reads/writes at scale
- Flexible schema requirements

## Required Supporting Resources

| Resource | Purpose |
|----------|---------|
| None required | Cosmos DB is fully managed |
| Key Vault | Store connection strings (recommended) |

## Capacity Modes

| Mode | Use Case | Billing |
|------|----------|---------|
| **Serverless** | Variable/low traffic, dev/test | Per request |
| **Provisioned** | Predictable workloads | Per RU/s |
| **Autoscale** | Variable but predictable peaks | Per max RU/s |

## Consistency Levels

| Level | Latency | Consistency |
|-------|---------|-------------|
| Strong | Highest | Linearizable |
| Bounded Staleness | High | Bounded |
| Session | Medium | Session-scoped |
| Consistent Prefix | Low | Prefix ordering |
| Eventual | Lowest | Eventually consistent |

Recommendation: Use **Session** for most applications.

## Environment Variables

| Variable | Value |
|----------|-------|
| `COSMOS_CONNECTION_STRING` | Primary connection string (Key Vault reference) |
| `COSMOS_ENDPOINT` | Account endpoint URL |
| `COSMOS_DATABASE` | Database name |

## References

- [Bicep Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db-bicep)
- [Partition Key Selection](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db-partitioning)
- [SDK Connection Patterns](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-cosmos-db-sdk)
