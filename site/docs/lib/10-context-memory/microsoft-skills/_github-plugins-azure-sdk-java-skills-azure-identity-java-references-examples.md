---
title: "Azure Identity library for Java - Examples"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-sdk-java/skills/azure-identity-java/references/examples.md"
sourceRel: ".github/plugins/azure-sdk-java/skills/azure-identity-java/references/examples.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-sdk-java/skills/azure-identity-java/references/examples.md"
sourceSha256: "b58509321e58bbb1dac3f6d6d342f3d863b1ecce5ec37f1205418473431dc842"
pageSha256: "b58509321e58bbb1dac3f6d6d342f3d863b1ecce5ec37f1205418473431dc842"
contentMode: "local-full"
zh: ""
---

# Azure Identity library for Java - Examples

Comprehensive code examples for the Azure Identity library for Java.

## Table of Contents

- [Maven Dependency](#maven-dependency)
- [DefaultAzureCredential](#defaultazurecredential)
- [ChainedTokenCredential](#chainedtokencredential)
- [ClientSecretCredential](#clientsecretcredential)
- [ClientCertificateCredential](#clientcertificatecredential)
- [ManagedIdentityCredential](#managedidentitycredential)
- [EnvironmentCredential](#environmentcredential)
- [InteractiveBrowserCredential](#interactivebrowsercredential)
- [DeviceCodeCredential](#devicecodecredential)
- [AzureCliCredential](#azureclicredential)
- [Using Credentials with Azure SDK Clients](#using-credentials-with-azure-sdk-clients)

## Maven Dependency

```xml

<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-sdk-bom</artifactId>
            <version>1.2.29</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-identity</artifactId>
    </dependency>
</dependencies>

<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.18.2</version>
</dependency>
```

## DefaultAzureCredential

The recommended credential for most scenarios. Tries multiple authentication methods in order.

### Basic Usage

```java
import com.azure.identity.DefaultAzureCredential;
import com.azure.identity.DefaultAzureCredentialBuilder;
import com.azure.security.keyvault.secrets.SecretClient;
import com.azure.security.keyvault.secrets.SecretClientBuilder;

// Basic usage
DefaultAzureCredential credential = new DefaultAzureCredentialBuilder().build();

// Use with Azure SDK clients
SecretClient client = new SecretClientBuilder()
    .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
    .credential(credential)
    .buildClient();
```

### With User-Assigned Managed Identity

```java
DefaultAzureCredential credential = new DefaultAzureCredentialBuilder()
    .managedIdentityClientId("<MANAGED_IDENTITY_CLIENT_ID>")
    .build();

SecretClient client = new SecretClientBuilder()
    .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
    .credential(credential)
    .buildClient();
```

### Authentication Order

See [DefaultAzureCredential overview](https://aka.ms/azsdk/java/identity/credential-chains#defaultazurecredential-overview) for the current credential chain order and defaults.

## ChainedTokenCredential

Create a custom chain of credentials to try in sequence.

### Managed Identity with Interactive Browser Fallback

```java
import com.azure.identity.ChainedTokenCredential;
import com.azure.identity.ChainedTokenCredentialBuilder;
import com.azure.identity.ManagedIdentityCredential;
import com.azure.identity.ManagedIdentityCredentialBuilder;
import com.azure.identity.InteractiveBrowserCredential;
import com.azure.identity.InteractiveBrowserCredentialBuilder;

ManagedIdentityCredential managedIdentityCredential = new ManagedIdentityCredentialBuilder().build();
InteractiveBrowserCredential interactiveBrowserCredential = new InteractiveBrowserCredentialBuilder()
    .clientId(clientId)
    .redirectUrl("https://localhost:8765")
    .build();

ChainedTokenCredential credential = new ChainedTokenCredentialBuilder()
    .addLast(managedIdentityCredential)
    .addLast(interactiveBrowserCredential)
    .build();
```

### Azure CLI with IntelliJ for Development

```java
import com.azure.identity.AzureCliCredential;
import com.azure.identity.AzureCliCredentialBuilder;
import com.azure.identity.IntelliJCredential;
import com.azure.identity.IntelliJCredentialBuilder;

AzureCliCredential cliCredential = new AzureCliCredentialBuilder().build();
IntelliJCredential ijCredential = new IntelliJCredentialBuilder().build();

ChainedTokenCredential credential = new ChainedTokenCredentialBuilder()
    .addLast(cliCredential)
    .addLast(ijCredential)
    .build();
```

## ClientSecretCredential

Authenticate a service principal using a client secret.

### Basic Usage

```java
import com.azure.identity.ClientSecretCredential;
import com.azure.identity.ClientSecretCredentialBuilder;

String tenantId = System.getenv("AZURE_TENANT_ID");
String clientId = System.getenv("AZURE_CLIENT_ID");
String clientSecret = System.getenv("AZURE_CLIENT_SECRET");

ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    .tenantId(tenantId)
    .clientId(clientId)
    .clientSecret(clientSecret)
    .build();

SecretClient client = new SecretClientBuilder()
    .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
    .credential(credential)
    .buildClient();
```

### With Proxy Configuration

```java
import com.azure.core.http.ProxyOptions;
import com.azure.core.http.ProxyOptions.Type;
import java.net.InetSocketAddress;

ClientSecretCredential credential = new ClientSecretCredentialBuilder()
    .tenantId(tenantId)
    .clientId(clientId)
    .clientSecret(clientSecret)
    .proxyOptions(new ProxyOptions(Type.HTTP, new InetSocketAddress("10.21.32.43", 5465)))
    .build();
```

## ClientCertificateCredential

Authenticate a service principal using a certificate.

### Using PEM Certificate File

```java
import com.azure.identity.ClientCertificateCredential;
import com.azure.identity.ClientCertificateCredentialBuilder;

ClientCertificateCredential credential = new ClientCertificateCredentialBuilder()
    .tenantId(tenantId)
    .clientId(clientId)
    .pemCertificate("<PATH-TO-PEM-CERTIFICATE>")
    .build();

SecretClient client = new SecretClientBuilder()
    .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
    .credential(credential)
    .buildClient();
```

### Using PFX Certificate with Password

```java
ClientCertificateCredential credential = new ClientCertificateCredentialBuilder()
    .tenantId(tenantId)
    .clientId(clientId)
    .pfxCertificate("<PATH-TO-PFX-CERTIFICATE>", "P@s$w0rd")
    .build();
```

### Using Certificate from InputStream

```java
import java.io.ByteArrayInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

byte[] certificateBytes = Files.readAllBytes(Paths.get("certificate.pem"));
ByteArrayInputStream certificateStream = new ByteArrayInputStream(certificateBytes);

ClientCertificateCredential credential = new ClientCertificateCredentialBuilder()
    .tenantId(tenantId)
    .clientId(clientId)
    .pemCertificate(certificateStream)
    .build();
```

### With Proxy Configuration

```java
ClientCertificateCredential credential = new ClientCertificateCredentialBuilder()
    .tenantId(tenantId)
    .clientId(clientId)
    .pfxCertificate("<PATH-TO-PFX-CERTIFICATE>", "P@s$w0rd")
    .proxyOptions(new ProxyOptions(Type.HTTP, new InetSocketAddress("10.21.32.43", 5465)))
    .build();
```

## ManagedIdentityCredential

Authenticate using Azure managed identity (system-assigned or user-assigned).

### System-Assigned Managed Identity

```java
import com.azure.identity.ManagedIdentityCredential;
import com.azure.identity.ManagedIdentityCredentialBuilder;

// No clientId needed for system-assigned
ManagedIdentityCredential credential = new ManagedIdentityCredentialBuilder().build();

SecretClient client = new SecretClientBuilder()
    .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
    .credential(credential)
    .buildClient();
```

### User-Assigned Managed Identity (by Client ID)

```java
ManagedIdentityCredential credential = new ManagedIdentityCredentialBuilder()
    .clientId("<USER-ASSIGNED-MANAGED-IDENTITY-CLIENT-ID>")
    .build();

SecretClient client = new SecretClientBuilder()
    .vaultUrl("https://{YOUR_VAULT_NAME}.vault.azure.net")
    .credential(credential)
    .buildClient();
```

### User-Assigned Managed Identity (by Resource ID)

```java
ManagedIdentityCredential credential = new ManagedIdentityCredentialBuilder()
