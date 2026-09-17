---
title: "Azure Communication CallingServer Java SDK - Migration Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-callingserver-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-callingserver-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-callingserver-java/references/examples.md"
sourceSha256: "6588c0ca75d41645f10111e96909f9b0b89770795a67963686e4f1c8a9f8112c"
pageSha256: "6588c0ca75d41645f10111e96909f9b0b89770795a67963686e4f1c8a9f8112c"
contentMode: "local-full"
zh: ""
---

# Azure Communication CallingServer Java SDK - Migration Guide

> **⚠️ DEPRECATED**: This SDK has been renamed to **Call Automation**. For new projects, use `azure-communication-callautomation` instead.

## Migration Summary

The `azure-communication-callingserver` package is deprecated. All new development should use `azure-communication-callautomation`.

## Dependency Change

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

## Client Creation Migration

### Old Way (Deprecated)

```java
import com.azure.communication.callingserver.CallingServerClient;
import com.azure.communication.callingserver.CallingServerClientBuilder;

CallingServerClient client = new CallingServerClientBuilder()
