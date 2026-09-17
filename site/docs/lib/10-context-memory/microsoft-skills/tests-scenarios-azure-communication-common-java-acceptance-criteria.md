---
title: "Azure Communication Common SDK for Java Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-communication-common-java/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-communication-common-java/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-communication-common-java/acceptance-criteria.md"
sourceSha256: "c405d6d1656fe5d5505314065333a8554c29b14c638b800a67e09811df699518"
pageSha256: "c405d6d1656fe5d5505314065333a8554c29b14c638b800a67e09811df699518"
contentMode: "local-full"
zh: ""
---

# Azure Communication Common SDK for Java Acceptance Criteria

**SDK**: `com.azure:azure-communication-common`
**Repository**: https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/communication/azure-communication-common
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Credential Imports

#### ✅ CORRECT: Token Credential
```java
import com.azure.communication.common.CommunicationTokenCredential;
import com.azure.communication.common.CommunicationTokenRefreshOptions;
```

### 1.2 Identifier Imports

#### ✅ CORRECT: Communication Identifiers
```java
import com.azure.communication.common.CommunicationIdentifier;
import com.azure.communication.common.CommunicationUserIdentifier;
import com.azure.communication.common.PhoneNumberIdentifier;
import com.azure.communication.common.MicrosoftTeamsUserIdentifier;
import com.azure.communication.common.UnknownIdentifier;
import com.azure.communication.common.CommunicationCloudEnvironment;
```

---

## 2. Token Credential Patterns

### 2.1 ✅ CORRECT: Static Token
```java
String userToken = System.getenv("AZURE_COMMUNICATION_USER_TOKEN");
CommunicationTokenCredential credential = new CommunicationTokenCredential(userToken);
```

### 2.2 ✅ CORRECT: Proactive Token Refresh
```java
import java.util.concurrent.Callable;

Callable<String> tokenRefresher = () -> {
    return fetchNewTokenFromServer();
};

CommunicationTokenRefreshOptions refreshOptions = new CommunicationTokenRefreshOptions(tokenRefresher)
    .setRefreshProactively(true)
    .setInitialToken(currentToken);

CommunicationTokenCredential credential = new CommunicationTokenCredential(refreshOptions);
```

### 2.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Hardcoded token
```java
// WRONG - hardcoded token
CommunicationTokenCredential credential = new CommunicationTokenCredential("eyJ...");
```

---

## 3. Identifier Patterns

### 3.1 ✅ CORRECT: CommunicationUserIdentifier
```java
CommunicationUserIdentifier user = new CommunicationUserIdentifier("8:acs:resource-id_user-id");
String rawId = user.getId();
```

### 3.2 ✅ CORRECT: PhoneNumberIdentifier
```java
PhoneNumberIdentifier phone = new PhoneNumberIdentifier("+14255551234");
String phoneNumber = phone.getPhoneNumber();
```

### 3.3 ✅ CORRECT: MicrosoftTeamsUserIdentifier
```java
