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
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/cursor_ai_experiments/llm_router_app/README.md"
sourceRel: "advanced_llm_apps/cursor_ai_experiments/llm_router_app/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/cursor_ai_experiments/llm_router_app/README.md"
sourceSha256: "4c0529a90f871102a6c1849a0b11fd55877fe4a65b673eae0e6e98d039b8f38f"
pageSha256: "4c0529a90f871102a6c1849a0b11fd55877fe4a65b673eae0e6e98d039b8f38f"
contentMode: "local-full"
zh: ""
---

# Awesome LLM Apps

## 📡 RouteLLM Chat App 

> Note: This project is inspired by the opensource [RouteLLM library](https://github.com/lm-sys/RouteLLM/tree/main), which provides intelligent routing between different language models.

This Streamlit application demonstrates the use of RouteLLM, a system that intelligently routes queries between different language models based on the complexity of the task. It provides a chat interface where users can interact with AI models, and the app automatically selects the most appropriate model for each query.

### Features
- Chat interface for interacting with AI models
- Automatic model selection using RouteLLM
- Utilizes both GPT-4 and Meta-Llama 3.1 models
- Displays chat history with model information

### How to get Started?

1. Clone the GitHub repository

```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd awesome-llm-apps/advanced_tools_frameworks/llm_router_app
```
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```
3. Set up your API keys:

```bash
os.environ["OPENAI_API_KEY"] = "your_openai_api_key"
os.environ['TOGETHERAI_API_KEY'] = "your_togetherai_api_key"
```
Note: In a production environment, it's recommended to use environment variables or a secure configuration management system instead of hardcoding API keys.

4. Run the Streamlit App
```bash
streamlit run llm_router.py
```

### How it Works?

1. RouteLLM Initialization: The app initializes the RouteLLM controller with two models:
    - Strong model: GPT-4 (mini)
    -  Weak model: Meta-Llama 3.1 70B Instruct Turbo

2. Chat Interface: Users can input messages through a chat interface.

3. Model Selection: RouteLLM automatically selects the appropriate model based on the complexity of the user's query.

4. Response Generation: The selected model generates a response to the user's input.

5. Display: The app displays the response along with information about which model was used.

6. History: The chat history is maintained and displayed, including model information for each response.
