---
title: "Azure AI Search — TypeScript SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-ts.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-ts.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-ts.md"
sourceSha256: "69060237239c07d27a7e5bfe24ef146625bf12264a4fdac356e1d5324517837a"
pageSha256: "69060237239c07d27a7e5bfe24ef146625bf12264a4fdac356e1d5324517837a"
contentMode: "local-full"
zh: ""
---

# Azure AI Search — TypeScript SDK Quick Reference

> Condensed from **azure-search-documents-ts**. Full patterns (semantic config, vector profiles, autocomplete)
> in the **azure-search-documents-ts** plugin skill if installed.

## Install
```bash
npm install @azure/search-documents @azure/identity
```

## Quick Start
```typescript
import { SearchClient, SearchIndexClient, SearchIndexerClient } from "@azure/search-documents";
const searchClient = new SearchClient(endpoint, indexName, credential);
```

## Non-Obvious Patterns
- Vector search uses `vectorSearchOptions.queries` array with `kind: "vector"`
- Semantic search requires `queryType: "semantic"` + `semanticSearchOptions`
- Batch ops: `searchClient.indexDocuments(\{ actions: [\{ upload: doc \}, \{ delete: doc \}] \})`

## Best Practices
1. Use hybrid search — combine vector + text for best results
2. Enable semantic ranking — improves relevance for natural language queries
3. Batch document uploads — use `uploadDocuments` with arrays, not single docs
4. Use filters for security — implement document-level security with filters
5. Index incrementally — use `mergeOrUploadDocuments` for updates
6. Monitor query performance — use `includeTotalCount: true` sparingly in production
