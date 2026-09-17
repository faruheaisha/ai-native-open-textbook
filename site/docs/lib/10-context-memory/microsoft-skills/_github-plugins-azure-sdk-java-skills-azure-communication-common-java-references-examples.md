---
title: "Azure Communication Common Java SDK - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-common-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-common-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-common-java/references/examples.md"
sourceSha256: "7b2a3df4df01f9cc409dd3bf2ddcc8a8f3e261022d656eaa6eb998681c03096f"
pageSha256: "7b2a3df4df01f9cc409dd3bf2ddcc8a8f3e261022d656eaa6eb998681c03096f"
contentMode: "local-full"
zh: ""
---

# Azure Communication Common Java SDK - Examples

Comprehensive code examples for the Azure Communication Services Common SDK for Java.

## Table of Contents
- [Maven Dependency](#maven-dependency)
- [Communication Token Credential](#communication-token-credential)
- [Communication Identifiers](#communication-identifiers)
- [Token Refresh Patterns](#token-refresh-patterns)
- [Entra ID Authentication](#entra-id-authentication)
- [Complete Application Example](#complete-application-example)

## Maven Dependency

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-common</artifactId>
    <version>1.4.0</version>
</dependency>
```

## Communication Token Credential

### Static Token (Short-lived Clients)

```java
import com.azure.communication.common.CommunicationTokenCredential;
