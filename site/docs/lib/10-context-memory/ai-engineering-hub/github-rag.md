---
title: "100% local RAG app to chat with GitHub!"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/github-rag/README.md"
sourceRel: "github-rag/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/github-rag/README.md"
sourceSha256: "09cf1fb9009e6744daf0c4a7fa946ab60b67bbb2eb2114a2521322fdc7415fab"
pageSha256: "09cf1fb9009e6744daf0c4a7fa946ab60b67bbb2eb2114a2521322fdc7415fab"
contentMode: "local-full"
zh: ""
---

# 100% local RAG app to chat with GitHub!

This project leverages GitIngest to parse a GitHub repo in markdown format and the use LlamaIndex for RAG orchestration over it.

## Installation and setup

**Install Dependencies**:
   Ensure you have Python 3.9 or later installed (tested with Python 3.11.9).
   
   **Option 1: Using requirements.txt (Recommended)**
   ```bash
   pip install -r requirements.txt
   ```
   
   **Option 2: Manual installation**
   ```bash
   pip install gitingest llama-index llama-index-llms-ollama llama-index-llms-openai llama-index-agent-openai llama-index-embeddings-huggingface streamlit pandas python-dotenv huggingface-hub
   ```

**Environment Setup**:
   For OpenAI integration, create a `.env` file in the project directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

**Running**:

Make sure you have Ollama Server running then you can run following command to start the streamlit application ```streamlit run app_local.py```.

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
