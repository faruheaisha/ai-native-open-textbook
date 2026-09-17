---
title: "Azure Document Intelligence — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-document-intelligence-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-document-intelligence-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-ai-document-intelligence-dotnet.md"
sourceSha256: "3d623c19a94bc8f60b798a9c1b2869824ac0f0fbd3f28987f0156d018ccaa10f"
pageSha256: "3d623c19a94bc8f60b798a9c1b2869824ac0f0fbd3f28987f0156d018ccaa10f"
contentMode: "local-full"
zh: ""
---

# Azure Document Intelligence — .NET SDK Quick Reference

> Condensed from **azure-ai-document-intelligence-dotnet**. Full patterns (custom models, classifiers, layout extraction)
> in the **azure-ai-document-intelligence-dotnet** plugin skill if installed.

## Install
```bash
dotnet add package Azure.AI.DocumentIntelligence
```

## Quick Start
```csharp
using Azure.AI.DocumentIntelligence;
var client = new DocumentIntelligenceClient(new Uri(endpoint), credential);
var adminClient = new DocumentIntelligenceAdministrationClient(new Uri(endpoint), credential);
```

## Non-Obvious Patterns
- Analyze is async LRO: `await client.AnalyzeDocumentAsync(WaitUntil.Completed, "prebuilt-invoice", uri)`
- Field access: `document.Fields.TryGetValue("VendorName", out DocumentField field)`
- Custom model build: `BuildDocumentModelOptions(modelId, DocumentBuildMode.Template, blobSource)`
- Entra ID requires custom subdomain, not regional endpoint

## Best Practices
1. Use DefaultAzureCredential for **local development only**. In production, use ManagedIdentityCredential — see [auth-best-practices.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-auth-best-practices)
2. Reuse client instances — clients are thread-safe
3. Handle long-running operations with `WaitUntil.Completed`
4. Check field confidence — always verify `Confidence` property
5. Use appropriate model — prebuilt for common docs, custom for specialized
6. Use custom subdomain — required for Entra ID authentication
