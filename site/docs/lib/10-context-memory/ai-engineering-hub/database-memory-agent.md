---
title: "Database Memory Agent"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/database-memory-agent/README.md"
sourceRel: "database-memory-agent/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/database-memory-agent/README.md"
sourceSha256: "8a2ce3613d6ede74390b966246b647f62156b60e9eccf96330d2b73a1d7c83ad"
pageSha256: "8a2ce3613d6ede74390b966246b647f62156b60e9eccf96330d2b73a1d7c83ad"
contentMode: "local-full"
zh: ""
---

# Database Memory Agent

We're building a Database Memory Agent with RAG (Retrieval Augmented Generation) capabilities that integrates MongoDB Atlas Vector Search for semantic document retrieval, Voyage AI for embeddings, and OpenAI for intelligent responses. The agent uses tools (vector search and calculator) to answer questions from uploaded documents and perform calculations, with context-aware memory across conversations.

We use:

- [MongoDB Atlas Vector Search](https://www.mongodb.com/products/platform/atlas-vector-search) for semantic search and document storage
- [Voyage AI](https://www.voyageai.com/) for generating embeddings (voyage-3-large model)
- [OpenAI](https://openai.com/) for LLM responses (gpt-4o)
- [Streamlit](https://streamlit.io/) to wrap the logic in an interactive UI

## Set Up

### Prerequisites

You must have the following:

- One of the following MongoDB cluster types:

  - An [Atlas cluster](https://www.mongodb.com/docs/atlas/tutorial/create-new-cluster/) running MongoDB version 6.0.11, 7.0.2, or later. Ensure that your IP address (Internet Protocol address) is included in your Atlas project's [access list](https://www.mongodb.com/docs/atlas/security/ip-access-list/).

  - A local Atlas deployment created using the Atlas CLI. To learn more, see [Create a Local Atlas Deployment](https://www.mongodb.com/docs/atlas/cli/current/atlas-cli-deploy-local/).

  - A MongoDB Community or Enterprise cluster with [Search and Vector Search](https://www.mongodb.com/docs/manual/administration/install-community/#std-label-community-search-deploy) installed.

- A Voyage AI API key.

- An OpenAI API key.

### Configure Environment Variables

Copy `.env.example` to `.env` and configure the following environment variables:

```env
