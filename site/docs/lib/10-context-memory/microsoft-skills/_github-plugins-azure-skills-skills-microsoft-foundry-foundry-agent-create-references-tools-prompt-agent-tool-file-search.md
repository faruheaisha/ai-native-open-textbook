---
title: "File Search Tool"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-file-search.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-file-search.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-file-search.md"
sourceSha256: "4713704bdd19da45f82d42d8a8944ee89ae14787fd76e27f66d01ddf61fca811"
pageSha256: "4713704bdd19da45f82d42d8a8944ee89ae14787fd76e27f66d01ddf61fca811"
contentMode: "local-full"
zh: ""
---

# File Search Tool

Enables agents to search through uploaded files using semantic and keyword search from vector stores. Supports a wide range of file formats including PDF, Markdown, Word, and more.

> ⚠️ **Important:** Before creating an agent with file search, you **must** read the official documentation linked in the References section to understand prerequisites, supported file types, and vector store setup.

## Prerequisites

- A [basic or standard agent environment](https://learn.microsoft.com/azure/ai-foundry/agents/environment-setup)
- A **vector store** must be created before the agent — the `file_search` tool requires `vector_store_ids`
- Files must be uploaded to the vector store before the agent can search them

## Key Concepts

| Concept | Description |
|---------|-------------|
| **Vector Store** | A container that indexes uploaded files for semantic search. Must be created first. |
| **vector_store_ids** | Required parameter on the `file_search` tool — references the vector store(s) to search. |
| **File upload** | Files are uploaded to the project, then attached to a vector store for indexing. |

## Setup Workflow

```
1. Create a vector store (REST API: POST /vector_stores)
   │
   ▼
2. (Optional) Upload files and attach to vector store
   │
   ▼
3. Create agent with file_search tool referencing the vector_store_ids
   │
   ▼
4. Agent can now search files in the vector store
```

> ⚠️ **Warning:** Creating an agent with `file_search` without providing `vector_store_ids` will fail with a `400 BadRequest` error: `required: Required properties ["vector_store_ids"] are not present`.

## REST API Notes

When creating vector stores via `az rest`:

| Parameter | Value |
|-----------|-------|
| **Endpoint** | `https://<resource>.services.ai.azure.com/api/projects/<project>/vector_stores` |
| **API version** | `v1` |
| **Auth resource** | `https://ai.azure.com` |

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `vector_store_ids` not present | Agent created without vector store | Create a vector store first, then pass its ID |
| 401 Unauthorized | Wrong auth resource for REST API | Use `--resource "https://ai.azure.com"` with `az rest` |
| Bad API version | Using ARM-style API version | Use `api-version=v1` for the data-plane vector store API |
| No search results | Vector store is empty | Upload files to the vector store before querying |

## References

- [File Search tool documentation](https://learn.microsoft.com/azure/ai-foundry/agents/how-to/tools/file-search?view=foundry&pivots=python)
- [Tool Catalog](https://learn.microsoft.com/azure/ai-foundry/agents/concepts/tool-catalog?view=foundry)
