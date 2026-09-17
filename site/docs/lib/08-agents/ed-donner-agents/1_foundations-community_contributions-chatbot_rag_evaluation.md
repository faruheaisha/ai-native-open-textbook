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
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/chatbot_rag_evaluation/README.md"
sourceRel: "1_foundations/community_contributions/chatbot_rag_evaluation/README.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/chatbot_rag_evaluation/README.md"
sourceSha256: "4cc3d683649263571b84ad26742e5126fa39bda137a4e3e232dc7e81adc4643c"
pageSha256: "4cc3d683649263571b84ad26742e5126fa39bda137a4e3e232dc7e81adc4643c"
contentMode: "local-full"
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
