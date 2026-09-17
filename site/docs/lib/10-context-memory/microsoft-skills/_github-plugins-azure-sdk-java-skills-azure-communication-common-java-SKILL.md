---
title: "Azure Communication Common (Java)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-common-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-common-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-common-java/SKILL.md"
sourceSha256: "aa84ee9ea16a5663b2971f4f3c66b6fcaa901d067d9d3ffdabe24dc4b22593db"
pageSha256: "aa84ee9ea16a5663b2971f4f3c66b6fcaa901d067d9d3ffdabe24dc4b22593db"
contentMode: "local-full"
zh: ""
---

# Azure Communication Common (Java)

Shared authentication utilities and data structures for Azure Communication Services.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-common</artifactId>
    <version>1.4.0</version>
</dependency>
```

## Key Concepts

| Class | Purpose |
|-------|---------|
| `CommunicationTokenCredential` | Authenticate users with ACS services |
| `CommunicationTokenRefreshOptions` | Configure automatic token refresh |
| `CommunicationUserIdentifier` | Identify ACS users |
| `PhoneNumberIdentifier` | Identify PSTN phone numbers |
| `MicrosoftTeamsUserIdentifier` | Identify Teams users |
| `UnknownIdentifier` | Generic identifier for unknown types |

## CommunicationTokenCredential

### Static Token (Short-lived Clients)

```java
import com.azure.communication.common.CommunicationTokenCredential;

// Simple static token - no refresh
