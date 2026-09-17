---
title: "Azure AI Content Safety — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-contentsafety-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-contentsafety-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-contentsafety-java.md"
sourceSha256: "69bc81ac571f57270e2ee6c2c6453bc9d93a1b5a72598d8d8406cad74f91409a"
pageSha256: "69bc81ac571f57270e2ee6c2c6453bc9d93a1b5a72598d8d8406cad74f91409a"
contentMode: "local-full"
zh: ""
---

# Azure AI Content Safety — Java SDK Quick Reference

> Condensed from **azure-ai-contentsafety-java**. Full patterns (blocklist management, image moderation, 8-severity)
> in the **azure-ai-contentsafety-java** plugin skill if installed.

## Install
```xml
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-ai-contentsafety</artifactId>
  <version>1.1.0-beta.1</version>
</dependency>
```

## Quick Start
```java
import com.azure.ai.contentsafety.ContentSafetyClient;
import com.azure.ai.contentsafety.ContentSafetyClientBuilder;
import com.azure.ai.contentsafety.BlocklistClient;
import com.azure.ai.contentsafety.BlocklistClientBuilder;
ContentSafetyClient client = new ContentSafetyClientBuilder()
    .endpoint(endpoint).credential(credential).buildClient();
```

## Non-Obvious Patterns
- Two separate builders: `ContentSafetyClientBuilder` and `BlocklistClientBuilder`
- Image from file: `new ContentSafetyImageData().setContent(BinaryData.fromBytes(bytes))`
- Image from URL: `new ContentSafetyImageData().setBlobUrl(url)`
- Blocklist create uses raw `BinaryData` + `RequestOptions` (not typed model)

## Best Practices
1. Blocklist changes take ~5 minutes to take effect
2. Only request needed categories to reduce latency
3. Typically block severity >= 4 for strict moderation
4. Process multiple items in parallel for throughput
5. Cache blocklist results where appropriate
