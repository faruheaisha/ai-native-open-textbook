---
title: "Azure Web PubSub SDK Acceptance Criteria (TypeScript)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-web-pubsub-ts/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-web-pubsub-ts/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-web-pubsub-ts/acceptance-criteria.md"
sourceSha256: "456ba388460475214b33baaaa81a21ffcf0f601a761912d4048c35f1c329e372"
pageSha256: "456ba388460475214b33baaaa81a21ffcf0f601a761912d4048c35f1c329e372"
contentMode: "local-full"
zh: ""
---

# Azure Web PubSub SDK Acceptance Criteria (TypeScript)

**SDK**: `@azure/web-pubsub`, `@azure/web-pubsub-client`
**Repository**: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/web-pubsub
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Server-Side Imports

#### ✅ CORRECT: WebPubSubServiceClient Import
```typescript
import { WebPubSubServiceClient, AzureKeyCredential } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";
```

### 1.2 Client-Side Imports

#### ✅ CORRECT: WebPubSubClient Import
```typescript
import { WebPubSubClient } from "@azure/web-pubsub-client";
```

### 1.3 Express Middleware Imports

#### ✅ CORRECT: Express Handler Import
```typescript
import { WebPubSubEventHandler } from "@azure/web-pubsub-express";
```

### 1.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Wrong package name
```typescript
// WRONG - package is @azure/web-pubsub
import { WebPubSubServiceClient } from "@azure/webpubsub";
import { WebPubSubClient } from "@azure/web-pubsub";  // WRONG - client is separate package
```

---

## 2. Server-Side Authentication Patterns

### 2.1 ✅ CORRECT: Connection String
```typescript
import { WebPubSubServiceClient } from "@azure/web-pubsub";

const client = new WebPubSubServiceClient(
  process.env.WEBPUBSUB_CONNECTION_STRING!,
  "chat"  // hub name
);
```

### 2.2 ✅ CORRECT: DefaultAzureCredential (Recommended)
```typescript
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";

const client = new WebPubSubServiceClient(
  process.env.WEBPUBSUB_ENDPOINT!,
  new DefaultAzureCredential(),
  "chat"
);
```

### 2.3 ✅ CORRECT: AzureKeyCredential
```typescript
import { WebPubSubServiceClient, AzureKeyCredential } from "@azure/web-pubsub";

const client = new WebPubSubServiceClient(
  process.env.WEBPUBSUB_ENDPOINT!,
  new AzureKeyCredential(process.env.WEBPUBSUB_KEY!),
  "chat"
);
```

### 2.4 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Hardcoded credentials
```typescript
// WRONG - hardcoded access key
const client = new WebPubSubServiceClient(
  "Endpoint=https://myresource.webpubsub.azure.com;AccessKey=secret123;Version=1.0;",
  "chat"
);
```

---

## 3. Client Access Token Patterns

### 3.1 ✅ CORRECT: Basic Token Generation
```typescript
const token = await client.getClientAccessToken();
console.log(token.url);  // wss://...?access_token=...
```

### 3.2 ✅ CORRECT: Token with User ID
```typescript
const userToken = await client.getClientAccessToken({
  userId: "user123",
});
```

### 3.3 ✅ CORRECT: Token with Permissions
```typescript
const permToken = await client.getClientAccessToken({
  userId: "user123",
  roles: [
    "webpubsub.joinLeaveGroup",
    "webpubsub.sendToGroup",
    "webpubsub.sendToGroup.chat-room",
  ],
  groups: ["chat-room"],
  expirationTimeInMinutes: 60,
});
```

---

## 4. Message Sending Patterns

### 4.1 ✅ CORRECT: Broadcast to All
```typescript
await client.sendToAll({ message: "Hello everyone!" });
await client.sendToAll("Plain text", { contentType: "text/plain" });
```

### 4.2 ✅ CORRECT: Send to User
```typescript
await client.sendToUser("user123", { message: "Hello!" });
```

### 4.3 ✅ CORRECT: Send to Connection
```typescript
await client.sendToConnection("connectionId", { data: "Direct message" });
```

### 4.4 ✅ CORRECT: Send with Filter
```typescript
await client.sendToAll({ message: "Filtered" }, {
  filter: "userId ne 'admin'",
});
```

---

## 5. Group Management Patterns

### 5.1 ✅ CORRECT: Group Operations
```typescript
const group = client.group("chat-room");

// Add user/connection to group
await group.addUser("user123");
await group.addConnection("connectionId");

// Remove from group
await group.removeUser("user123");

// Send to group
await group.sendToAll({ message: "Group message" });

// Close all connections in group
await group.closeAllConnections({ reason: "Maintenance" });
```

---

## 6. Connection Management Patterns

### 6.1 ✅ CORRECT: Check Existence
```typescript
const userExists = await client.userExists("user123");
const connExists = await client.connectionExists("connectionId");
```

### 6.2 ✅ CORRECT: Close Connections
```typescript
await client.closeConnection("connectionId", { reason: "Kicked" });
await client.closeUserConnections("user123");
await client.closeAllConnections();
```

### 6.3 ✅ CORRECT: Manage Permissions
```typescript
await client.grantPermission("connectionId", "sendToGroup", { targetName: "chat" });
await client.revokePermission("connectionId", "sendToGroup", { targetName: "chat" });
```

---

## 7. Client-Side Patterns

### 7.1 ✅ CORRECT: Connect with URL
```typescript
import { WebPubSubClient } from "@azure/web-pubsub-client";
