---
title: "Azure Communication SMS (Java)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-communication-sms-java/SKILL.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-communication-sms-java/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-communication-sms-java/SKILL.md"
sourceSha256: "78116489577296fe710c3dbd1f50e55536f612b71b26db2d5f56ddb8bc9b95ae"
pageSha256: "78116489577296fe710c3dbd1f50e55536f612b71b26db2d5f56ddb8bc9b95ae"
contentMode: "local-full"
zh: ""
---

# Azure Communication SMS (Java)

Send SMS messages to single or multiple recipients with delivery reporting.

## Installation

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-communication-sms</artifactId>
    <version>1.2.0</version>
</dependency>
```

## Client Creation

```java
import com.azure.communication.sms.SmsClient;
import com.azure.communication.sms.SmsClientBuilder;
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

// With DefaultAzureCredential (recommended)
SmsClient smsClient = new SmsClientBuilder()
    .endpoint("https://<resource>.communication.azure.com")
    .credential(credential)
    .buildClient();

// With connection string
SmsClient smsClient = new SmsClientBuilder()
