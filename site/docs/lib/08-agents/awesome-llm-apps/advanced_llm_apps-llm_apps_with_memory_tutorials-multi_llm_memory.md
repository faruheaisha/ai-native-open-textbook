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
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/llm_apps_with_memory_tutorials/multi_llm_memory/README.md"
sourceRel: "advanced_llm_apps/llm_apps_with_memory_tutorials/multi_llm_memory/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/llm_apps_with_memory_tutorials/multi_llm_memory/README.md"
sourceSha256: "5bce3feb6f4445b956ae1680150d9d7927b3dfd38b1e9b16fd804d26201e8a55"
pageSha256: "5bce3feb6f4445b956ae1680150d9d7927b3dfd38b1e9b16fd804d26201e8a55"
contentMode: "local-full"
zh: ""
---

# Awesome LLM Apps

## 🧠 Multi-LLM App with Shared Memory
This Streamlit application demonstrates a multi-LLM system with a shared memory layer, allowing users to interact with different language models while maintaining conversation history and context across sessions.

### Features

- Support for multiple LLMs:
    - OpenAI's GPT-4o
    - Anthropic's Claude 3.5 Sonnet

- Persistent memory using Qdrant vector store
- User-specific conversation history
- Memory retrieval for contextual responses
- User-friendly interface with LLM selection

### How to get Started?

1. Clone the GitHub repository
```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd awesome-llm-apps/llm_apps_with_memory_tutorials/multi_llm_memory
```

2. Install the required dependencies:

```bash
pip install -r requirements.txt
```

3. Ensure Qdrant is running:
The app expects Qdrant to be running on localhost:6333. Adjust the configuration in the code if your setup is different.

```bash
docker pull qdrant/qdrant
docker run -p 6333:6333 qdrant/qdrant
```

4. Run the Streamlit App
```bash
streamlit run multi_llm_memory.py
```
