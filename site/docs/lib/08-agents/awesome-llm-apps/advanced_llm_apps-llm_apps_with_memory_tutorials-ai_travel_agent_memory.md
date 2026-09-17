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
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/llm_apps_with_memory_tutorials/ai_travel_agent_memory/README.md"
sourceRel: "advanced_llm_apps/llm_apps_with_memory_tutorials/ai_travel_agent_memory/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/llm_apps_with_memory_tutorials/ai_travel_agent_memory/README.md"
sourceSha256: "5e5b17972ac92810786282950e850f9b1d6a76f9588f76287a19f3bc71e59270"
pageSha256: "5e5b17972ac92810786282950e850f9b1d6a76f9588f76287a19f3bc71e59270"
contentMode: "local-full"
zh: ""
---

# Awesome LLM Apps

## 🧳 AI Travel Agent with Memory
This Streamlit app implements an AI-powered travel assistant that remembers user preferences and past interactions. It utilizes OpenAI's GPT-4o for generating responses and Mem0 with Qdrant for maintaining conversation history.

### Features
- Chat-based interface for interacting with an AI travel assistant
- Persistent memory of user preferences and past conversations
- Utilizes OpenAI's GPT-4o model for intelligent responses
- Implements memory storage and retrieval using Mem0 and Qdrant
- User-specific conversation history and memory viewing

### How to get Started?

1. Clone the GitHub repository
```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd awesome-llm-apps/llm_apps_with_memory_tutorials/ai_travel_agent_memory
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
streamlit run travel_agent_memory.py
```
