---
title: "Azure Communication Chat (Java)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-chat-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-chat-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-chat-java/SKILL.md"
sourceSha256: "6b4cf495990c027f146f4dab11b17a2d04c21e67fcf96af26ad56260f7a764fd"
pageSha256: "6b4cf495990c027f146f4dab11b17a2d04c21e67fcf96af26ad56260f7a764fd"
contentMode: "local-full"
zh: ""
---

# Azure Communication Chat (Java)

Build real-time chat applications with thread management, messaging, participants, and read receipts.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-chat</artifactId>
    <version>1.6.0</version>
</dependency>
```

## Client Creation

```java
import com.azure.communication.chat.ChatClient;
import com.azure.communication.chat.ChatClientBuilder;
import com.azure.communication.chat.ChatThreadClient;
import com.azure.communication.common.CommunicationTokenCredential;

// ChatClient requires a CommunicationTokenCredential (user access token)
String endpoint = "https://<resource>.communication.azure.com";
