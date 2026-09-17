---
title: "infra-storage-ts"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/bridge/infra-storage-ts.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/bridge/infra-storage-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/teams-app-developer/experts/bridge/infra-storage-ts.md"
sourceSha256: "f94cd8d9aa77baf5b64108db3ada6ceb3cefe0b3154ab6106e74be1eadd195d9"
pageSha256: "f94cd8d9aa77baf5b64108db3ada6ceb3cefe0b3154ab6106e74be1eadd195d9"
contentMode: "local-full"
zh: ""
---

# infra-storage-ts

## purpose

Bridges AWS and Azure data storage for cross-platform bot state and application data. Covers S3/DynamoDB/RDS to Azure Blob Storage/Cosmos DB/Azure SQL (and the reverse). The common direction is AWS → Azure, but the service mappings apply bidirectionally.

> **Note:** AWS → Azure is the most common direction for this expert. For Azure → AWS, reverse the mappings: Blob Storage → S3, Cosmos DB → DynamoDB, Azure SQL → RDS.

## rules

1. Map AWS S3 to Azure Blob Storage for file and object storage. Both provide tiered storage (Hot/Cool/Archive maps to S3 Standard/IA/Glacier), versioning, and lifecycle policies. Use `@azure/storage-blob` for programmatic access. Container names in Blob Storage are equivalent to S3 buckets. [learn.microsoft.com -- Blob Storage overview](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blobs-overview)
2. Map AWS DynamoDB to Azure Cosmos DB for NoSQL key-value and document storage. Cosmos DB offers multiple APIs: Core SQL (recommended for new development), Table API (closest DynamoDB migration path), and MongoDB API. Choose based on query complexity and migration effort. [learn.microsoft.com -- Cosmos DB overview](https://learn.microsoft.com/en-us/azure/cosmos-db/introduction)
3. Map AWS RDS (MySQL/PostgreSQL/SQL Server) to the equivalent Azure managed database: RDS MySQL maps to Azure Database for MySQL, RDS PostgreSQL maps to Azure Database for PostgreSQL, RDS SQL Server maps to Azure SQL Database. Schema and data can be migrated with Azure Database Migration Service. [learn.microsoft.com -- Azure SQL overview](https://learn.microsoft.com/en-us/azure/azure-sql/database/sql-database-paas-overview)
4. Implement the Teams SDK `IStorage` interface for bot state management with Cosmos DB. The `IStorage` interface requires `get(key)`, `set(key, value)`, and `delete(key)` methods. This replaces any custom DynamoDB state store used by a Slack Bolt bot. [github.com/microsoft/teams.ts](https://github.com/microsoft/teams.ts)
5. For simple bot state (conversation history, user preferences), use Cosmos DB Core SQL API with a single container partitioned by the state key. This provides single-digit millisecond reads, automatic indexing, and serverless pricing for low-traffic bots. [learn.microsoft.com -- Cosmos DB serverless](https://learn.microsoft.com/en-us/azure/cosmos-db/serverless)
6. Use managed identity or connection strings stored in Key Vault for database access. Never hardcode connection strings in source code. For Cosmos DB, use `@azure/cosmos` with `DefaultAzureCredential` for managed identity access, or store the connection string in Key Vault. [learn.microsoft.com -- Cosmos DB RBAC](https://learn.microsoft.com/en-us/azure/cosmos-db/how-to-setup-rbac)
7. For DynamoDB to Cosmos DB Table API migration, use the Azure Cosmos DB Data Migration Tool or custom scripts. Table API preserves the key-value access pattern (PartitionKey + RowKey), making it the lowest-effort migration path. However, Core SQL API offers richer querying capabilities for future needs. [learn.microsoft.com -- Cosmos DB Table API](https://learn.microsoft.com/en-us/azure/cosmos-db/table/introduction)
8. Configure Cosmos DB request units (RUs) appropriately. DynamoDB uses read/write capacity units (RCUs/WCUs); Cosmos DB uses RUs. A simple bot state read costs approximately 1 RU. Start with serverless mode (pay-per-request) for development and low traffic, switch to provisioned throughput for predictable workloads. [learn.microsoft.com -- Request units](https://learn.microsoft.com/en-us/azure/cosmos-db/request-units)
9. Plan data migration strategy: for S3 to Blob Storage, use AzCopy or Azure Data Factory for bulk migration. For DynamoDB to Cosmos DB, export to JSON from DynamoDB and import with the Cosmos DB Data Migration Tool. For RDS, use Azure Database Migration Service for online migration with minimal downtime. [learn.microsoft.com -- AzCopy](https://learn.microsoft.com/en-us/azure/storage/common/storage-use-azcopy-v10)
10. Implement retry logic and handle throttling for Cosmos DB operations. Unlike DynamoDB which returns `ProvisionedThroughputExceededException`, Cosmos DB returns HTTP 429 with a `x-ms-retry-after-ms` header. The `@azure/cosmos` SDK has built-in retry logic, but configure `maxRetryCount` and `retryAfterInMs` for your workload. [learn.microsoft.com -- Cosmos DB best practices](https://learn.microsoft.com/en-us/azure/cosmos-db/nosql/best-practice-dotnet)

## patterns

### IStorage implementation with Cosmos DB for bot state

```typescript
// src/storage/cosmos-storage.ts
import { CosmosClient, Container, Database } from "@azure/cosmos";
import { IStorage } from "@microsoft/teams.common";

export class CosmosDbStorage<T = unknown> implements IStorage<string, T> {
  private container: Container;
  private initialized = false;

  constructor(
    private cosmosClient: CosmosClient,
    private databaseId: string,
    private containerId: string,
  ) {
    this.container = this.cosmosClient
      .database(this.databaseId)
      .container(this.containerId);
  }

  async initialize(): Promise<void> {
    if (this.initialized) return;

    // Create database and container if they don't exist
    const { database } = await this.cosmosClient.databases.createIfNotExists({
      id: this.databaseId,
    });
    await database.containers.createIfNotExists({
      id: this.containerId,
      partitionKey: { paths: ["/id"] },
    });

    this.container = this.cosmosClient
      .database(this.databaseId)
      .container(this.containerId);
    this.initialized = true;
  }

  async get(key: string): Promise<T | undefined> {
    await this.initialize();
    try {
      const { resource } = await this.container.item(key, key).read<T & { id: string }>();
      if (!resource) return undefined;
      // Strip Cosmos DB metadata before returning
      const { id, _rid, _self, _etag, _attachments, _ts, ...data } = resource as Record<string, unknown>;
      return data as T;
    } catch (error: unknown) {
      if ((error as { code: number }).code === 404) return undefined;
      throw error;
    }
  }

  async set(key: string, value: T): Promise<void> {
    await this.initialize();
    await this.container.items.upsert({ id: key, ...value as object });
  }

  async delete(key: string): Promise<void> {
    await this.initialize();
    try {
      await this.container.item(key, key).delete();
    } catch (error: unknown) {
      if ((error as { code: number }).code !== 404) throw error;
    }
  }
}
```

```typescript
// src/index.ts — Using CosmosDbStorage with the Teams app
import { App } from "@microsoft/teams.apps";
import { CosmosClient } from "@azure/cosmos";
import { CosmosDbStorage } from "./storage/cosmos-storage.js";

const cosmosClient = new CosmosClient(process.env.COSMOS_CONNECTION_STRING!);
const storage = new CosmosDbStorage(cosmosClient, "teams-bot", "state");

const app = new App({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  tenantId: process.env.TENANT_ID,
  storage, // Cosmos DB backs all bot state
});

app.on("message", async ({ send, activity }) => {
  // State is now persisted to Cosmos DB via the IStorage interface
  await send(`Echo: ${activity.text}`);
});

app.start(process.env.PORT || 3978);
```

### S3 to Azure Blob Storage migration and access

```typescript
// src/storage/blob-client.ts
import { BlobServiceClient, ContainerClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

// Using managed identity (production)
const blobServiceClient = new BlobServiceClient(
  `https://${process.env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
  new DefaultAzureCredential(),
);

// Or using connection string (development)
// const blobServiceClient = BlobServiceClient.fromConnectionString(
//   process.env.AZURE_STORAGE_CONNECTION_STRING!,
// );

export async function uploadFile(
  containerName: string,
  blobName: string,
  content: Buffer,
): Promise<string> {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  await containerClient.createIfNotExists();

  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.upload(content, content.length);
  return blockBlobClient.url;
}

export async function downloadFile(
  containerName: string,
  blobName: string,
): Promise<Buffer> {
  const containerClient = blobServiceClient.getContainerClient(containerName);
  const blobClient = containerClient.getBlobClient(blobName);
  const response = await blobClient.download();

  const chunks: Buffer[] = [];
  for await (const chunk of response.readableStreamBody!) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

// Migration command: bulk copy from S3 to Blob Storage
// azcopy copy "https://s3.amazonaws.com/my-bucket" \
//   "https://mystorageaccount.blob.core.windows.net/my-container?SAS_TOKEN" \
//   --recursive
```

### Cosmos DB with managed identity (replacing DynamoDB IAM role access)

```typescript
// src/storage/cosmos-managed.ts
import { CosmosClient } from "@azure/cosmos";
import { DefaultAzureCredential } from "@azure/identity";

// Managed identity access — no connection string needed
// Requires Cosmos DB RBAC role assignment:
// az cosmosdb sql role assignment create \
//   --account-name my-cosmos-db \
//   --resource-group my-bot-rg \
//   --scope "/" \
