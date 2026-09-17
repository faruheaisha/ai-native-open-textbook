---
title: "Azure Communication Chat SDK for Java Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-communication-chat-java/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-communication-chat-java/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-communication-chat-java/acceptance-criteria.md"
sourceSha256: "cd82e7efdfeef45a963274d0a6f9cf71108bdcc54093f5c0f8181c431473626e"
pageSha256: "cd82e7efdfeef45a963274d0a6f9cf71108bdcc54093f5c0f8181c431473626e"
contentMode: "local-full"
zh: ""
---

# Azure Communication Chat SDK for Java Acceptance Criteria

**SDK**: `com.azure:azure-communication-chat`
**Repository**: https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/communication/azure-communication-chat
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: Client and Builder
```java
import com.azure.communication.chat.ChatClient;
import com.azure.communication.chat.ChatClientBuilder;
import com.azure.communication.chat.ChatAsyncClient;
import com.azure.communication.chat.ChatThreadClient;
```

#### ✅ CORRECT: Authentication
```java
import com.azure.communication.common.CommunicationTokenCredential;
```

### 1.2 Model Imports

#### ✅ CORRECT: Chat Models
```java
import com.azure.communication.chat.models.ChatParticipant;
import com.azure.communication.chat.models.ChatMessage;
import com.azure.communication.chat.models.ChatMessageType;
import com.azure.communication.chat.models.ChatThreadProperties;
import com.azure.communication.chat.models.CreateChatThreadOptions;
import com.azure.communication.chat.models.CreateChatThreadResult;
import com.azure.communication.chat.models.SendChatMessageOptions;
import com.azure.communication.chat.models.SendChatMessageResult;
import com.azure.communication.chat.models.ChatMessageReadReceipt;
```

#### ✅ CORRECT: Communication Identifiers
```java
import com.azure.communication.common.CommunicationUserIdentifier;
```

### 1.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Wrong import paths
```java
// WRONG - Models not in main package
import com.azure.communication.chat.ChatParticipant;
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Builder with CommunicationTokenCredential
```java
String endpoint = System.getenv("AZURE_COMMUNICATION_ENDPOINT");
String userAccessToken = System.getenv("AZURE_COMMUNICATION_USER_TOKEN");

CommunicationTokenCredential credential = new CommunicationTokenCredential(userAccessToken);

ChatClient chatClient = new ChatClientBuilder()
    .endpoint(endpoint)
    .credential(credential)
    .buildClient();
```

### 2.2 ✅ CORRECT: Async Client
```java
ChatAsyncClient chatAsyncClient = new ChatClientBuilder()
    .endpoint(endpoint)
    .credential(credential)
    .buildAsyncClient();
```

### 2.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Hardcoded credentials
```java
// WRONG - hardcoded values
ChatClient chatClient = new ChatClientBuilder()
    .endpoint("https://myresource.communication.azure.com")
    .credential(new CommunicationTokenCredential("hardcoded-token"))
    .buildClient();
```

---

## 3. Chat Thread Operations

### 3.1 ✅ CORRECT: Create Chat Thread
```java
List<ChatParticipant> participants = new ArrayList<>();

ChatParticipant participant1 = new ChatParticipant()
