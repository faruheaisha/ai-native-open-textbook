---
title: "Azure AI Search — Python SDK Quick Reference"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-py.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-py.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-ai/references/sdk/azure-search-documents-py.md"
sourceSha256: "d65d61fe00ed7c54d4163279da7f915613aa94a88b0613801dfb82514f89bc86"
pageSha256: "d65d61fe00ed7c54d4163279da7f915613aa94a88b0613801dfb82514f89bc86"
contentMode: "local-full"
zh: ""
---

# Azure AI Search — Python SDK Quick Reference

> Condensed from **azure-search-documents-py**. Full patterns (agentic retrieval, integrated vectorization, skillsets)
> in the **azure-search-documents-py** plugin skill if installed.

## Install
```bash
pip install azure-search-documents azure-identity
```

## Quick Start
```python
from azure.search.documents import SearchClient
from azure.search.documents.indexes import SearchIndexClient, SearchIndexerClient
from azure.search.documents.models import VectorizedQuery
```

## Non-Obvious Patterns
- `SearchIndexingBufferedSender` for batch uploads with auto-batching/retries
- Vector field type: `Collection(Edm.Single)` with `vector_search_dimensions` + `vector_search_profile_name`
- Async client: `from azure.search.documents.aio import SearchClient`
- `KnowledgeBaseRetrievalClient` for agentic retrieval with LLM-powered Q&A

## Best Practices
1. Use hybrid search for best relevance combining vector and keyword
2. Enable semantic ranking for natural language queries
3. Index in batches of 100-1000 documents for efficiency
4. Use filters to narrow results before ranking
5. Configure vector dimensions to match your embedding model
6. Use HNSW algorithm for large-scale vector search
7. Create suggesters at index creation time (cannot add later)
8. Use `SearchIndexingBufferedSender` for batch uploads
9. Always define semantic configuration for agentic retrieval indexes
10. Use `create_or_update_index` for idempotent index creation
11. Close clients with context managers or explicit `close()`
