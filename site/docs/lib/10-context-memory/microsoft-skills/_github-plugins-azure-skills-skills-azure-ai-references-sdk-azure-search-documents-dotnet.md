---
title: "Azure AI Search — .NET SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-dotnet.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-dotnet.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-dotnet.md"
sourceSha256: "70c91efbd4b10978db2798486b3c55cd93b7e022d6b74c21ef53aecf0b6ea241"
pageSha256: "70c91efbd4b10978db2798486b3c55cd93b7e022d6b74c21ef53aecf0b6ea241"
contentMode: "local-full"
zh: ""
---

# Azure AI Search — .NET SDK Quick Reference

> Condensed from **azure-search-documents-dotnet**. Full patterns (FieldBuilder, hybrid search, semantic answers)
> in the **azure-search-documents-dotnet** plugin skill if installed.

## Install
```bash
dotnet add package Azure.Search.Documents
```

## Quick Start
```csharp
using Azure.Search.Documents;
using Azure.Search.Documents.Indexes;
var client = new SearchClient(new Uri(endpoint), indexName, credential);
```

## Non-Obvious Patterns
- `FieldBuilder` + model attributes (`[SimpleField]`, `[SearchableField]`, `[VectorSearchField]`) for type-safe index definitions
- `VectorizedQuery` for vector search; set via `SearchOptions.VectorSearch.Queries`
- Semantic answers: `result.Value.SemanticSearch.Answers` / captions on each result

## Best Practices
1. Use `DefaultAzureCredential` for **local development only**. In production, use `ManagedIdentityCredential` — see [auth-best-practices.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-ai-references-auth-best-practices)
2. Use `FieldBuilder` with model attributes for type-safe index definitions
3. Use `CreateOrUpdateIndexAsync` for idempotent index creation
4. Batch document operations for better throughput
5. Use `Select` to return only needed fields
6. Configure semantic search for natural language queries
7. Combine vector + keyword + semantic for best relevance
