---
title: "Authentication — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/sdk/azure-identity-java.md"
sourceSha256: "f506b1a1854f1c271c7e78a8996ca354b5e1681ef1a8a8799af4efdfa0000cdb"
pageSha256: "f506b1a1854f1c271c7e78a8996ca354b5e1681ef1a8a8799af4efdfa0000cdb"
contentMode: "local-full"
zh: ""
---

# Authentication — Java SDK Quick Reference

> Condensed from **azure-identity-java**. Full patterns (workload identity,
> certificate auth, device code, sovereign clouds)
> in the **azure-identity-java** plugin skill if installed.

## Install
```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-identity</artifactId>
    <version>1.15.0</version>
</dependency>
```

## Quick Start

> **Auth:** `DefaultAzureCredential` is for local development. See [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md) for production patterns.

```java
import com.azure.identity.DefaultAzureCredentialBuilder;
var credential = new DefaultAzureCredentialBuilder().build();
```

## Best Practices
- Use DefaultAzureCredential for **local development only** (CLI, PowerShell, VS Code). In production, use ManagedIdentityCredential — see [auth-best-practices.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/auth-best-practices.md)
- Managed identity in production — no secrets to manage, automatic rotation
- Azure CLI for local dev — run `az login` before running your app
- Least privilege — grant only required permissions to service principals
- Token caching — enabled by default, reduces auth round-trips
- Environment variables — use for CI/CD, not hardcoded secrets
