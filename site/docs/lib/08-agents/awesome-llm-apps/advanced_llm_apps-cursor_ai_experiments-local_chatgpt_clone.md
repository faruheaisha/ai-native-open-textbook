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
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/cursor_ai_experiments/local_chatgpt_clone/README.md"
sourceRel: "advanced_llm_apps/cursor_ai_experiments/local_chatgpt_clone/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/cursor_ai_experiments/local_chatgpt_clone/README.md"
sourceSha256: "6bffa665246a0d9b14f7f7a9aa8adf25f278e0cd0ff763ef03bf2a4a5fa5c27c"
pageSha256: "6bffa665246a0d9b14f7f7a9aa8adf25f278e0cd0ff763ef03bf2a4a5fa5c27c"
contentMode: "local-full"
zh: ""
---

# Awesome LLM Apps

## 🦙💬 ChatGPT Clone using Llama-3
This project demonstrates how to build a ChatGPT clone using the Llama-3 model running locally on your computer. The application is built using Python and Streamlit, providing a user-friendly interface for interacting with the language model. Best of all, it's 100% free and doesn't require an internet connection!

### Features
- Runs locally on your computer without the need for an internet connection and completely free to use.
- Utilizes the Llama-3 instruct model for generating responses
- Provides a chat-like interface for seamless interaction

### How to get Started?

1. Clone the GitHub repository

```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd awesome-llm-apps/advanced_tools_frameworks/local_chatgpt_clone
```
2. Install the required dependencies:

```bash
pip install -r requirements.txt
```
3. Download and install the [LM Studio desktop app](https://lmstudio.ai/). Download the Llama-3 instruct model.

4. Expose the Llama-3 model as an OpenAI API by starting the server in LM Studio. Watch this [video walkthrough](https://x.com/Saboo_Shubham_/status/1783715814790549683).

5. Run the Streamlit App
```bash
streamlit run chatgpt_clone_llama3.py
```
