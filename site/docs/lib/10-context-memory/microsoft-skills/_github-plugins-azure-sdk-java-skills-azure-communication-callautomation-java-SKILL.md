---
title: "Azure Communication Call Automation (Java)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-callautomation-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-callautomation-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-callautomation-java/SKILL.md"
sourceSha256: "2b0a220f3ec73a263cdddb7748943b445b2a10efa5385f950d0fc6730bafadc8"
pageSha256: "2b0a220f3ec73a263cdddb7748943b445b2a10efa5385f950d0fc6730bafadc8"
contentMode: "local-full"
zh: ""
---

# Azure Communication Call Automation (Java)

Build server-side call automation workflows including IVR systems, call routing, recording, and AI-powered interactions.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-callautomation</artifactId>
    <version>1.6.0</version>
</dependency>
```

## Client Creation

```java
import com.azure.communication.callautomation.CallAutomationClient;
import com.azure.communication.callautomation.CallAutomationClientBuilder;
import com.azure.core.credential.TokenCredential;
import com.azure.identity.AzureIdentityEnvVars;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.identity.ManagedIdentityCredentialBuilder;

// Local dev: DefaultAzureCredential. Production: set AZURE_TOKEN_CREDENTIALS=prod or AZURE_TOKEN_CREDENTIALS=<specific_credential>
TokenCredential credential = new DefaultAzureCredentialBuilder()
    .requireEnvVars(AzureIdentityEnvVars.AZURE_TOKEN_CREDENTIALS)
    .build();
// Or use a specific credential directly in production:
// See https://learn.microsoft.com/java/api/overview/azure/identity-readme?view=azure-java-stable#credential-classes
// TokenCredential credential = new ManagedIdentityCredentialBuilder().build();

// With DefaultAzureCredential
CallAutomationClient client = new CallAutomationClientBuilder()
    .endpoint("https://<resource>.communication.azure.com")
    .credential(credential)
    .buildClient();

// With connection string
CallAutomationClient client = new CallAutomationClientBuilder()
