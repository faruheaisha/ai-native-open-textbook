---
title: "Azure Communication Call Automation SDK for Java Acceptance Criteria"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/tests/scenarios/azure-communication-callautomation-java/acceptance-criteria.md"
sourceRel: "tests/scenarios/azure-communication-callautomation-java/acceptance-criteria.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/tests/scenarios/azure-communication-callautomation-java/acceptance-criteria.md"
sourceSha256: "1b161789eb641a7bc2f2b2064d6919d094d3ca58f31ec3fbf3e5e5fe340047c1"
pageSha256: "1b161789eb641a7bc2f2b2064d6919d094d3ca58f31ec3fbf3e5e5fe340047c1"
contentMode: "local-full"
zh: ""
---

# Azure Communication Call Automation SDK for Java Acceptance Criteria

**SDK**: `com.azure:azure-communication-callautomation`
**Repository**: https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/communication/azure-communication-callautomation
**Purpose**: Skill testing acceptance criteria for validating generated code correctness

---

## 1. Correct Import Patterns

### 1.1 Client Imports

#### ✅ CORRECT: Client and Builder
```java
import com.azure.communication.callautomation.CallAutomationClient;
import com.azure.communication.callautomation.CallAutomationClientBuilder;
import com.azure.communication.callautomation.CallConnection;
import com.azure.communication.callautomation.CallMedia;
import com.azure.communication.callautomation.CallRecording;
```

#### ✅ CORRECT: Authentication
```java
import com.azure.identity.DefaultAzureCredentialBuilder;
```

### 1.2 Model Imports

#### ✅ CORRECT: Call Models
```java
import com.azure.communication.callautomation.models.CreateCallOptions;
import com.azure.communication.callautomation.models.CreateCallResult;
import com.azure.communication.callautomation.models.AnswerCallOptions;
import com.azure.communication.callautomation.models.AnswerCallResult;
import com.azure.communication.callautomation.models.CallConnectionProperties;
```

#### ✅ CORRECT: Media Models
```java
import com.azure.communication.callautomation.models.TextSource;
import com.azure.communication.callautomation.models.FileSource;
import com.azure.communication.callautomation.models.PlayOptions;
import com.azure.communication.callautomation.models.CallMediaRecognizeDtmfOptions;
import com.azure.communication.callautomation.models.CallMediaRecognizeSpeechOptions;
import com.azure.communication.callautomation.models.DtmfTone;
```

#### ✅ CORRECT: Recording Models
```java
import com.azure.communication.callautomation.models.StartRecordingOptions;
import com.azure.communication.callautomation.models.RecordingStateResult;
import com.azure.communication.callautomation.models.RecordingChannel;
import com.azure.communication.callautomation.models.RecordingContent;
import com.azure.communication.callautomation.models.RecordingFormat;
import com.azure.communication.callautomation.models.ServerCallLocator;
```

#### ✅ CORRECT: Communication Identifiers
```java
import com.azure.communication.common.CommunicationUserIdentifier;
import com.azure.communication.common.PhoneNumberIdentifier;
```

### 1.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Using deprecated CallingServer SDK
```java
// WRONG - deprecated SDK
import com.azure.communication.callingserver.CallingServerClient;
```

---

## 2. Client Creation Patterns

### 2.1 ✅ CORRECT: Builder with DefaultAzureCredential
```java
String endpoint = System.getenv("AZURE_COMMUNICATION_ENDPOINT");

CallAutomationClient client = new CallAutomationClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

### 2.2 ✅ CORRECT: Builder with Connection String
```java
String connectionString = System.getenv("AZURE_COMMUNICATION_CONNECTION_STRING");

CallAutomationClient client = new CallAutomationClientBuilder()
    .connectionString(connectionString)
    .buildClient();
```

### 2.3 Anti-Patterns (ERRORS)

#### ❌ INCORRECT: Hardcoded connection string
```java
// WRONG - hardcoded values
CallAutomationClient client = new CallAutomationClientBuilder()
    .connectionString("endpoint=https://...;accesskey=...")
    .buildClient();
```

---

## 3. Call Operations

### 3.1 ✅ CORRECT: Create Outbound Call
```java
PhoneNumberIdentifier target = new PhoneNumberIdentifier("+14255551234");
PhoneNumberIdentifier caller = new PhoneNumberIdentifier("+14255550100");

CreateCallOptions options = new CreateCallOptions(
