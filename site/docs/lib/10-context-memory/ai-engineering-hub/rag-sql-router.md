---
title: "RAG with SQL Router"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/rag-sql-router/README.md"
sourceRel: "rag-sql-router/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/rag-sql-router/README.md"
sourceSha256: "72af72cb9be6f01304860cbe70cd80651eff26e700460b495223aa620498434c"
pageSha256: "72af72cb9be6f01304860cbe70cd80651eff26e700460b495223aa620498434c"
contentMode: "local-full"
zh: ""
---

# RAG with SQL Router

We are developing a system that will guide you in creating a custom agent. This agent can query either your Vector DB index for RAG-based retrieval or a separate SQL query engine. 

## 🔍 **The Critical Component: Response Validation**

**While everyone is trying to build agents, no one tells you how to ensure their outputs are reliable.**

**[Cleanlab Codex](https://help.cleanlab.ai/codex/)**, developed by researchers from MIT, offers a platform to evaluate and monitor any RAG or agentic app you're building. This system integrates Cleanlab Codex for automatic response validation, ensuring your AI outputs are trustworthy and continuously improving.

### **Why Cleanlab Codex is Essential:**

- **🔍 Automatic Detection**: Detects inaccurate/unhelpful responses from your AI automatically
- **📈 Continuous Improvement**: Allows Subject Matter Experts to directly improve responses without engineering intervention  
- **🎯 Trust Scoring**: Provides reliability metrics for every response
- **🔄 Real-time Validation**: Validates queries and responses in real-time
- **📊 Analytics**: Track improvement rates and response quality over time

### **How It Works in This System:**

1. **Query Processing**: Your queries are automatically validated by Cleanlab Codex
2. **Response Validation**: AI responses are scored for reliability and accuracy
3. **SME Intervention**: Subject Matter Experts can improve responses through the Codex interface
4. **Continuous Learning**: The system learns from validated responses for future queries

We use:

- [Llama_Index](https://docs.llamaindex.ai/en/stable/) for orchestration
- [Docling](https://docling-project.github.io/docling) for simplifying document processing
- [Milvus](https://milvus.io/) to self-host a VectorDB
- [OpenRouterAI](https://openrouter.ai/docs/quick-start) to access Alibaba's Qwen model

> **💡 Key Insight**: While most tutorials focus on building agents, **[Cleanlab Codex](https://help.cleanlab.ai/codex/)** addresses the critical gap of ensuring those agents produce reliable, trustworthy outputs.

## Set Up

Follow these steps one by one:

### Setup Milvus VectorDB

Milvus provides an installation script to install it as a docker container.

To install Milvus in Docker, you can use the following command:

```bash
curl -sfL https://raw.githubusercontent.com/milvus-io/milvus/master/scripts/standalone_embed.sh -o standalone_embed.sh

bash standalone_embed.sh start
```

### Install Dependencies

```bash
uv sync
```

## Run the Notebook

You can run the `notebook.ipynb` file to test the functionality of the code in a Jupyter Notebook environment. This notebook will help you understand routing, tool calling, and validating responses.

## Run the Application

To run the Streamlit app, use the following command:

```bash
streamlit run app.py
```

Open your browser and navigate to `http://localhost:8501` to access the app.

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
