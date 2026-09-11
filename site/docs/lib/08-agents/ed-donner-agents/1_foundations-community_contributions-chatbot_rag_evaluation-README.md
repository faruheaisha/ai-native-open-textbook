---
title: "RAG Chat Evaluator Bot"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: ""
zh: ""
---

# RAG Chat Evaluator Bot

A lightweight chatbot app that uses LangChain RAG for chunk retrieval, OpenAI for generation, and Gemini for response evaluation.

## 🔧 Features

- 📚 Retrieval-Augmented Generation (RAG) with LangChain + ChromaDB
- 🤖 Chat interface powered by OpenAI's GPT
- ✅ Gemini-based evaluator checks tone + accuracy
- 🛠️ Records user emails to Google Sheets or CSV fallback

## 🚀 Setup

```bash
git clone https://github.com/your-username/rag-chat-evaluator-bot.git
cd career-chats
```

2. Create a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:

```bash
 install -r requirements.txt
```

2. Keys in `.env` file:
```
