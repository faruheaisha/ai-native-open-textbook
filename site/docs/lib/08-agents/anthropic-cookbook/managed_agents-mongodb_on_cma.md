---
title: "MongoDB on Claude Managed Agents"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/mongodb_on_cma/README.md"
sourceRel: "managed_agents/mongodb_on_cma/README.md"
rawUrl: "/raw/08-agents/anthropic-cookbook/managed_agents/mongodb_on_cma/README.md"
sourceSha256: "bd779f6392fe4f10d7241147b41de9fa8adf0ea888c2f75a9d35e6e3e156195b"
pageSha256: "bd779f6392fe4f10d7241147b41de9fa8adf0ea888c2f75a9d35e6e3e156195b"
contentMode: "local-full"
zh: ""
---

# MongoDB on Claude Managed Agents

Setup boilerplate for the [**Fraud Review Agent with MongoDB Atlas and Claude Managed Agents**](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/CMA_with_mongodb_atlas.ipynb)
cookbook. The **teaching code lives inline in the notebook** — the four retrieval pipeline
builders, the custom-tool handlers, and the `requires_action` gate loop are all defined there.
This package holds only the pieces the notebook imports rather than reads.

| Module | What's inside |
| --- | --- |
| [`config.py`](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/mongodb_on_cma/config.py) | Tunables, index names, and the MongoDB server-version check (`supports_rank_fusion`). |
| [`embeddings.py`](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/mongodb_on_cma/embeddings.py) | An embedding + rerank client that adapts the MongoDB Atlas AI endpoint to the `voyageai` interface, so the cookbook is provider-agnostic. |
| [`tools.py`](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/mongodb_on_cma/tools.py) | MongoDB Atlas setup — seed the collection, create the vector + Atlas Search indexes and wait until they are queryable and synced, preflight — plus the shared decision/audit document shapers used by the notebook's `record_decision` handler and the AP2 module. |
| [`ap2_mandates.py`](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/mongodb_on_cma/ap2_mandates.py) | AP2 (Agent Payments Protocol) mandate signing and verification (ES256 JWTs) — a crypto black box the notebook calls through `verify_mandates` and acts on its verdict. |
| [`seed.py`](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/mongodb_on_cma/seed.py) | Loads the plaintext fixture from [`../example_data/mongodb_on_cma/`](https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/managed_agents/example_data/mongodb_on_cma/seed_transactions.jsonl). |

The MongoDB credential (`MONGO_URI`) only ever lives on your side of the boundary: `pymongo`
runs in the notebook's host-side handlers, never in the agent context or its sandbox. See the
cookbook for the connection pattern and the end-to-end fraud-review agent.
