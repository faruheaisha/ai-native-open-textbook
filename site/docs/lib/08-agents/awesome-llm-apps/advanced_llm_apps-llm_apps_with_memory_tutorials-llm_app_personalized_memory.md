---
title: "Awesome LLM Apps"
sourceId: "08-agents/awesome-llm-apps"
sourceTitle: "Awesome LLM Apps"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps"
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/llm_apps_with_memory_tutorials/llm_app_personalized_memory/README.md"
sourceRel: "advanced_llm_apps/llm_apps_with_memory_tutorials/llm_app_personalized_memory/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/llm_apps_with_memory_tutorials/llm_app_personalized_memory/README.md"
sourceSha256: "5e3022734dcaa321460d7c96ee8950a0ebf9866cc8d8b41c960a91386fdb555e"
pageSha256: "5e3022734dcaa321460d7c96ee8950a0ebf9866cc8d8b41c960a91386fdb555e"
contentMode: "local-full"
zh: ""
---

# Awesome LLM Apps

## 🧠 LLM App with Memory
This Streamlit app is an AI-powered chatbot that uses OpenAI's GPT-4o model with a persistent memory feature. It allows users to have conversations with the AI while maintaining context across multiple interactions.

### Features

- Utilizes OpenAI's GPT-4o model for generating responses
- Implements persistent memory using Mem0 and Qdrant vector store
- Allows users to view their conversation history
- Provides a user-friendly interface with Streamlit

### How to get Started?

1. Clone the GitHub repository
```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd awesome-llm-apps/llm_apps_with_memory_tutorials/llm_app_personalized_memory
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Ensure Qdrant is running:
The app expects Qdrant to be running on localhost:6333. Adjust the configuration in the code if your setup is different.

```bash
docker pull qdrant/qdrant

docker run -p 6333:6333 -p 6334:6334 \
    -v $(pwd)/qdrant_storage:/qdrant/storage:z \
    qdrant/qdrant
```

4. Run the Streamlit App
```bash
streamlit run llm_app_memory.py
```
