---
title: "App Configuration — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/sdk/azure-appconfiguration-java.md"
sourceSha256: "0d8188aabece1057fb1ad26d966cc33a0da23c54fc5724b86304dcf7182dbc98"
pageSha256: "0d8188aabece1057fb1ad26d966cc33a0da23c54fc5724b86304dcf7182dbc98"
contentMode: "local-full"
zh: ""
---

# App Configuration — Java SDK Quick Reference

> Condensed from **azure-appconfiguration-java**. Full patterns (feature flags,
> secret references, snapshots, async client, conditional requests)
> in the **azure-appconfiguration-java** plugin skill if installed.

## Install
```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-data-appconfiguration</artifactId>
    <version>1.8.0</version>
</dependency>
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
</dependency>
```

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/auth-best-practices.md) for production patterns.

```java
import com.azure.data.appconfiguration.ConfigurationClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;
var client = new ConfigurationClientBuilder()
    .credential(new DefaultAzureCredentialBuilder().build())
    .endpoint(System.getenv("AZURE_APPCONFIG_ENDPOINT"))
    .buildClient();
```

## Best Practices
- Use labels — separate configurations by environment (Dev, Staging, Production)
- Use snapshots — create immutable snapshots for releases
- Feature flags — use for gradual rollouts and A/B testing
- Secret references — store sensitive values in Key Vault
- Conditional requests — use ETags for optimistic concurrency
- Read-only protection — lock critical production settings
- Use Entra ID — preferred over connection strings
- Async client — use for high-throughput scenarios
