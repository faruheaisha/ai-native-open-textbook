---
title: "Azure Communication CallingServer (Java) - DEPRECATED"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-callingserver-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-callingserver-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-callingserver-java/SKILL.md"
sourceSha256: "15e43981fbfcc9b9da3ca63e55a6953a5201626c7135fee578fc3224825440ea"
pageSha256: "15e43981fbfcc9b9da3ca63e55a6953a5201626c7135fee578fc3224825440ea"
contentMode: "local-full"
zh: ""
---

# Azure Communication CallingServer (Java) - DEPRECATED

> **⚠️ DEPRECATED**: This SDK has been renamed to **Call Automation**. For new projects, use `azure-communication-callautomation` instead. This skill is for maintaining legacy code only.

## Migration to Call Automation

```xml

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-callingserver</artifactId>
    <version>1.0.0-beta.5</version>
</dependency>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-callautomation</artifactId>
    <version>1.6.0</version>
</dependency>
```

## Class Name Changes

| CallingServer (Old) | Call Automation (New) |
|---------------------|----------------------|
| `CallingServerClient` | `CallAutomationClient` |
| `CallingServerClientBuilder` | `CallAutomationClientBuilder` |
| `CallConnection` | `CallConnection` (same) |
| `ServerCall` | Removed - use `CallConnection` |

## Legacy Client Creation

```java
// OLD WAY (deprecated)
import com.azure.communication.callingserver.CallingServerClient;
import com.azure.communication.callingserver.CallingServerClientBuilder;

CallingServerClient client = new CallingServerClientBuilder()
