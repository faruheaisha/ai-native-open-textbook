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
entryUrl: "https://github.com/Shubhamsaboo/awesome-llm-apps/blob/9848ec842c5f559ad42654288cc6a38db6b175fb/advanced_llm_apps/chat_with_X_tutorials/chat_with_gmail/README.md"
sourceRel: "advanced_llm_apps/chat_with_X_tutorials/chat_with_gmail/README.md"
rawUrl: "/raw/08-agents/awesome-llm-apps/advanced_llm_apps/chat_with_X_tutorials/chat_with_gmail/README.md"
sourceSha256: "45067bb5c22194d6e0a39131094b6b237acd4f05805b8a339b2dadc3fd42a9d6"
pageSha256: "45067bb5c22194d6e0a39131094b6b237acd4f05805b8a339b2dadc3fd42a9d6"
contentMode: "local-full"
zh: ""
---

# Awesome LLM Apps

## 📨 Chat with Gmail Inbox 

### 🎓 FREE Step-by-Step Tutorial 
**👉 [Click here to follow our complete step-by-step tutorial](https://www.theunwindai.com/p/build-rag-app-to-chat-with-your-gmail-inbox) and learn how to build this from scratch with detailed code walkthroughs, explanations, and best practices.**

LLM app with RAG to chat with Gmail in just 30 lines of Python Code. The app uses Retrieval Augmented Generation (RAG) to provide accurate answers to questions based on the content of your Gmail Inbox.

### Features

- Connect to your Gmail Inbox
- Ask questions about the content of your emails
- Get accurate answers using RAG and the selected LLM

### Installation

```bash
git clone https://github.com/Shubhamsaboo/awesome-llm-apps.git
cd advanced_llm_apps/chat_with_X_tutorials/chat_with_gmail
```
2. Install the required dependencies

```bash
pip install -r requirements.txt
```

3. Set up your Google Cloud project and enable the Gmail API:

- Go to the [Google Cloud Console](https://console.cloud.google.com/) and create a new project.
- Navigate to "APIs & Services > OAuth consent screen" and configure the OAuth consent screen.
- Publish the OAuth consent screen by providing the necessary app information.
- Enable the Gmail API and create OAuth client ID credentials.
- Download the credentials in JSON format and save them as `credentials.json` in your working directory.

4. Get your OpenAI API Key

- Sign up for an [OpenAI account](https://platform.openai.com/) (or the LLM provider of your choice) and obtain your API key.

4. Run the Streamlit App

```bash
streamlit run chat_gmail.py
```
