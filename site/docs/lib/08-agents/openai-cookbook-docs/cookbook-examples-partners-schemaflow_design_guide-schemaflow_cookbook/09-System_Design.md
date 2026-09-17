---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
sourceSha256: "afab413d868b1d2b8951a5c01c177c86ce2789efff0e64115a37780fd84076dc"
pageSha256: "5a61c5b6b707188f639c36e374ca1c6f02ef27045b70c8f0691f1bca28bb3e2f"
contentMode: "local-full"
zh: ""
---

## System Design

### Component Architecture

![schemaflow_system_design.png](https://developers.openai.com/cookbook/assets/images/schemaflow_system_design.png)

### Primary Runtime Objects

| Object | Created in | Purpose |
|---|---|---|
| `CHANGE_TEXT` | Input section | The natural-language database change request |
| `change_json` | Stage 1 | Structured interpretation of the request |
| `rag_vector_store_id` | Optional PDF RAG section | Hosted vector store ID for uploaded PDF context |
| `rag_file_search_results` | Stage 2 | Summary of File Search results returned to the Impact Agent |
| `impact_json` | Stage 2 | Impacted objects, risks, and assumptions |
| `plan_json` | Stage 3 | Rollout plan, checks, and rollback guidance |
| `sql_text` | Stage 4 | Draft SQL script |
| `validation` | Stage 5 | Deterministic SQL sanity-check result |
| `bundle` | Final Bundle section | Consolidated workflow output |
| `out_path` | Save Artifact section | Saved JSON artifact path |
| `promptfoo_config` | Promptfoo section | Generated eval configuration |

### Important Boundary

SchemaFlow generates draft implementation artifacts. It does **not** execute SQL against a database, apply migrations, open pull requests, or modify production systems.
