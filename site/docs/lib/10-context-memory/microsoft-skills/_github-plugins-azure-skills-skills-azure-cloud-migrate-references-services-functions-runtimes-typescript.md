---
title: "TypeScript — Azure Functions v4 Triggers & Bindings"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/runtimes/typescript.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/runtimes/typescript.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cloud-migrate/references/services/functions/runtimes/typescript.md"
sourceSha256: "5bb512f35c08314826ffb1091ce42b042600d19de88600db9a372578091c4e68"
pageSha256: "5bb512f35c08314826ffb1091ce42b042600d19de88600db9a372578091c4e68"
contentMode: "local-full"
zh: ""
---

# TypeScript — Azure Functions v4 Triggers & Bindings

> **Model**: Node.js v4 programming model (TypeScript). Same as JavaScript v4 with type annotations.
> **NO** `function.json` files.
> Import: `import \{ app, HttpRequest, HttpResponseInit, InvocationContext, input, output \} from '@azure/functions';`

TypeScript uses the same `app.*()` registration as JavaScript. See [javascript.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-functions-runtimes-javascript) for all trigger/binding patterns. Below are TypeScript-specific type signatures.

## HTTP Trigger

```typescript
import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';

app.http('httpFunction', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: async (request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> => {
    const name = request.query.get('name') || (await request.text());
    return { body: `Hello, ${name}!` };
  }
});
```

## Blob Storage Trigger

```typescript
import { app, InvocationContext } from '@azure/functions';

app.storageBlob('blobTrigger', {
  path: 'samples-workitems/{name}',
  connection: 'AzureWebJobsStorage',
  source: 'EventGrid',
  handler: async (blob: Buffer, context: InvocationContext): Promise<void> => {
    context.log(`Blob: ${context.triggerMetadata.name}, Size: ${blob.length}`);
  }
});
```

## Queue Storage Trigger

```typescript
app.storageQueue('queueTrigger', {
  queueName: 'myqueue-items',
  connection: 'AzureWebJobsStorage',
  handler: async (queueItem: unknown, context: InvocationContext): Promise<void> => {
    context.log('Queue item:', queueItem);
  }
});
```

## Timer Trigger

```typescript
import { app, InvocationContext, Timer } from '@azure/functions';

app.timer('timerFunction', {
  schedule: '0 */5 * * * *',
  handler: async (myTimer: Timer, context: InvocationContext): Promise<void> => {
    context.log('Timer fired at:', myTimer.scheduleStatus?.last);
  }
});
```

## Cosmos DB Trigger

```typescript
app.cosmosDB('cosmosDBTrigger', {
  connectionStringSetting: 'CosmosDBConnection',
  databaseName: 'mydb',
  containerName: 'mycontainer',
  createLeaseContainerIfNotExists: true,
  handler: async (documents: unknown[], context: InvocationContext): Promise<void> => {
    documents.forEach(doc => context.log('Changed doc:', doc));
  }
});
```

## Service Bus Queue Trigger

```typescript
app.serviceBusQueue('sbQueueTrigger', {
  queueName: 'myqueue',
  connection: 'ServiceBusConnection',
  handler: async (message: unknown, context: InvocationContext): Promise<void> => {
    context.log('Message:', message);
  }
});
```

## Event Grid Trigger

```typescript
import { app, EventGridEvent, InvocationContext } from '@azure/functions';

app.eventGrid('eventGridTrigger', {
  handler: async (event: EventGridEvent, context: InvocationContext): Promise<void> => {
    context.log('Event:', event.subject, event.eventType);
  }
});
```

## Event Hubs Trigger

```typescript
app.eventHub('eventHubTrigger', {
  eventHubName: 'myeventhub',
  connection: 'EventHubConnection',
  cardinality: 'many',
  handler: async (events: unknown[], context: InvocationContext): Promise<void> => {
    events.forEach(event => context.log('Event:', event));
  }
});
```

## Input/Output Bindings

TypeScript uses the same `input.*()` and `output.*()` helpers as JavaScript. See [javascript.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cloud-migrate-references-services-functions-runtimes-javascript) for full binding examples — all patterns are identical with added type annotations.

> Full reference: [Azure Functions TypeScript developer guide](https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=typescript)
