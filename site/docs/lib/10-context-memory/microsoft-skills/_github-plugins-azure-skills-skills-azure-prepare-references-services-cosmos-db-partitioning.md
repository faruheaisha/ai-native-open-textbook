---
title: "Cosmos DB Partition Key Selection"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/partitioning.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/partitioning.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/cosmos-db/partitioning.md"
sourceSha256: "deddddc96ec924f74b8f425d8d5819bf1c5c0510fcdcb5a42802a0bcb23922fe"
pageSha256: "deddddc96ec924f74b8f425d8d5819bf1c5c0510fcdcb5a42802a0bcb23922fe"
contentMode: "local-full"
zh: ""
---

# Cosmos DB Partition Key Selection

## Good Partition Keys

A good partition key should have:

- **High cardinality** - Many distinct values
- **Even data distribution** - No hot partitions
- **Even request distribution** - Balanced workload
- **Used in most queries** - Enables efficient routing

## Examples by Scenario

| Scenario | Partition Key | Reason |
|----------|---------------|--------|
| User-centric data | `/userId` | Queries typically filter by user |
| Multi-tenant apps | `/tenantId` | Isolates tenant data |
| E-commerce orders | `/customerId` | Orders queried by customer |
| IoT telemetry | `/deviceId` | High cardinality, even distribution |

## Hierarchical Partition Keys

For complex scenarios, use hierarchical keys:

```bicep
partitionKey: \{
  paths: ['/tenantId', '/userId']
  kind: 'MultiHash'
\}
```

## Anti-Patterns

Avoid these partition key choices:

| Bad Choice | Problem |
|------------|---------|
| Timestamp | Creates hot partitions |
| Boolean values | Only 2 partitions |
| Low cardinality enums | Uneven distribution |
| Random GUID | Can't query efficiently |
