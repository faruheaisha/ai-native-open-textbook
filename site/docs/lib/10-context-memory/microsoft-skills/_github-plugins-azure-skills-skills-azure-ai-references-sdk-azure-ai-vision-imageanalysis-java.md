---
title: "Azure AI Vision Image Analysis — Java SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-vision-imageanalysis-java.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-vision-imageanalysis-java.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-vision-imageanalysis-java.md"
sourceSha256: "7b9d980261377dfe61683b4b62775c563e3b74154b616ad09b6a14700c768309"
pageSha256: "7b9d980261377dfe61683b4b62775c563e3b74154b616ad09b6a14700c768309"
contentMode: "local-full"
zh: ""
---

# Azure AI Vision Image Analysis — Java SDK Quick Reference

> Condensed from **azure-ai-vision-imageanalysis-java**. Full patterns (dense captions, smart crops, people detection)
> in the **azure-ai-vision-imageanalysis-java** plugin skill if installed.

## Install
```xml
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-ai-vision-imageanalysis</artifactId>
  <version>1.1.0-beta.1</version>
</dependency>
```

## Quick Start
```java
import com.azure.ai.vision.imageanalysis.ImageAnalysisClient;
import com.azure.ai.vision.imageanalysis.ImageAnalysisClientBuilder;
import com.azure.ai.vision.imageanalysis.models.*;
ImageAnalysisClient client = new ImageAnalysisClientBuilder()
    .endpoint(endpoint).credential(credential).buildClient();
```

## Non-Obvious Patterns
- File input: `BinaryData.fromFile(new File("img.jpg").toPath())`
- URL: `client.analyzeFromUrl(url, Arrays.asList(VisualFeatures.CAPTION), options)`
- `ImageAnalysisOptions.setSmartCropsAspectRatios(Arrays.asList(1.0, 1.5))`

## Best Practices
1. Select only needed features to reduce latency and cost
2. Caption/Dense Captions require GPU-supported regions
3. Use `setGenderNeutralCaption(true)` for inclusive output
4. Specify language with `setLanguage("en")` for localized captions
5. Use async client for high-throughput scenarios
