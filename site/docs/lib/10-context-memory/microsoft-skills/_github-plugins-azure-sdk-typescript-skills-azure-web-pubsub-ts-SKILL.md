---
title: "Azure Web PubSub SDKs for TypeScript"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-typescript/skills/azure-web-pubsub-ts/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-typescript/skills/azure-web-pubsub-ts/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-typescript/skills/azure-web-pubsub-ts/SKILL.md"
sourceSha256: "e422b13b05cb0b17c35c49d75f307127dbe1cc65735f07556d46daee82f0bdc5"
pageSha256: "e422b13b05cb0b17c35c49d75f307127dbe1cc65735f07556d46daee82f0bdc5"
contentMode: "local-full"
zh: ""
---

# Azure Web PubSub SDKs for TypeScript

Real-time messaging with WebSocket connections and pub/sub patterns.

## Installation

```bash
# Server-side management
npm install @azure/web-pubsub @azure/identity

# Client-side real-time messaging
npm install @azure/web-pubsub-client

# Express middleware for event handlers
npm install @azure/web-pubsub-express
```

## Environment Variables

```bash
WEBPUBSUB_CONNECTION_STRING=Endpoint=https://<resource>.webpubsub.azure.com;AccessKey=<key>;Version=1.0;
WEBPUBSUB_ENDPOINT=https://<resource>.webpubsub.azure.com
AZURE_TOKEN_CREDENTIALS=prod # Required only if DefaultAzureCredential is used in production
```

## Server-Side: WebPubSubServiceClient

### Authentication

```typescript
import { WebPubSubServiceClient, AzureKeyCredential } from "@azure/web-pubsub";
import { DefaultAzureCredential, ManagedIdentityCredential } from "@azure/identity";

// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
const credential = new DefaultAzureCredential({requiredEnvVars: ["AZURE_TOKEN_CREDENTIALS"]});
// Or use a specific credential directly in production:
// See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest#credential-classes
// const credential = new ManagedIdentityCredential();

// Connection string
const client = new WebPubSubServiceClient(
  process.env.WEBPUBSUB_CONNECTION_STRING!,
  "chat"  // hub name
);

// Microsoft Entra Token Credential (recommended)
const client2 = new WebPubSubServiceClient(
  process.env.WEBPUBSUB_ENDPOINT!,
  credential,
  "chat"
);

// AzureKeyCredential
const client3 = new WebPubSubServiceClient(
  process.env.WEBPUBSUB_ENDPOINT!,
