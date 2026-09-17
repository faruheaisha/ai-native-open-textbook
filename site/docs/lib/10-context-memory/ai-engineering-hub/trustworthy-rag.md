---
title: "Trustworthy RAG over complex documents using TLM and LlamaParse"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/trustworthy-rag/README.md"
sourceRel: "trustworthy-rag/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/trustworthy-rag/README.md"
sourceSha256: "3fc7d2fed0e1251e167ed72884d59151bf8370e6547099992f613a2a5f8548a3"
pageSha256: "3fc7d2fed0e1251e167ed72884d59151bf8370e6547099992f613a2a5f8548a3"
contentMode: "local-full"
zh: ""
---

# Trustworthy RAG over complex documents using TLM and LlamaParse

The project uses a trustworthy language model from Cleanlab (TLM) that prvides a confidence score and reasoning on the generated output. It also uses [LlamaParse](https://docs.cloud.llamaindex.ai/llamacloud/getting_started/api_key) to parse complex documents into LLM ready clean markdown format.

Before you start, grab your API keys for LlamaParse and TLM

- [LlamaParse API Key](https://docs.cloud.llamaindex.ai/llamacloud/getting_started/api_key)
- [Cleanlab TLM API Key](https://tlm.cleanlab.ai/)

---
## Setup and installations

**Setup Environment**:
- Paste your API keys by creating a `.env`
- Refer `.env.example` file

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install llama-index-llms-cleanlab llama-index llama-index-embeddings-huggingface
   ```
**Running the app**:
```bash
   streamlit run app.py
```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
