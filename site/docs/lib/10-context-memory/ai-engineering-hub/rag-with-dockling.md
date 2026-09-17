---
title: "RAG over excel sheets"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/rag-with-dockling/README.md"
sourceRel: "rag-with-dockling/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/rag-with-dockling/README.md"
sourceSha256: "b4baae079cda4a5a095d9e904bd663a56bf35c3ae13e7b9f3b0bc3056010b2e4"
pageSha256: "b4baae079cda4a5a095d9e904bd663a56bf35c3ae13e7b9f3b0bc3056010b2e4"
contentMode: "local-full"
zh: ""
---

# RAG over excel sheets

This project leverages LlamaIndex and IBM's Docling for RAG over excel sheets. You can also use it for ppts and other complex docs,

## Installation and setup

**Install Dependencies**:
   Ensure you have Python 3.11 or later installed.
   ```bash
   pip install -q --progress-bar off --no-warn-conflicts llama-index-core llama-index-readers-docling llama-index-node-parser-docling llama-index-embeddings-huggingface llama-index-llms-huggingface-api llama-index-readers-file python-dotenv llama-index-llms-ollama
   ```

   Download the Qwen3 LLM locally
   ```bash
   ollama pull qwen3
   ```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
