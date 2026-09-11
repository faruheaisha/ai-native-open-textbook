---
title: "🧠 Resume-Job Match Application (LLM-Powered)"
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

# 🧠 Resume-Job Match Application (LLM-Powered)

![AnalyseResume](https://raw.githubusercontent.com/ed-donner/agents/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/Multi-Model-Resume–JD-Match-Analyzer/AnalyzeResume.png)

This is a **Streamlit-based web app** that evaluates how well a resume matches a job description using powerful Large Language Models (LLMs) such as:

- OpenAI GPT
- Anthropic Claude
- Google Gemini (Generative AI)
- Groq LLM
- DeepSeek LLM

The app takes a resume and job description as input files, sends them to these LLMs, and returns:

- ✅ Match percentage from each model
- 📊 A ranked table sorted by match %
- 📈 Average match percentage
- 🧠 Simple, responsive UI for instant feedback

## 📂 Features

- Upload **any file type** for resume and job description (PDF, DOCX, TXT, etc.)
- Automatic extraction and cleaning of text
- Match results across multiple models in real time
- Table view with clean formatting
- Uses `.env` file for secure API key management

## 🔐 Environment Setup (`.env`)

Create a `.env` file in the project root and add the following API keys:

```env
OPENAI_API_KEY=your-openai-api-key
ANTHROPIC_API_KEY=your-anthropic-api-key
GOOGLE_API_KEY=your-google-api-key
GROQ_API_KEY=your-groq-api-key
DEEPSEEK_API_KEY=your-deepseek-api-key 
```

## ▶️ Running the App
### Launch the app using Streamlit:

streamlit run resume_agent.py

### The app will open in your browser at:
📍 http://localhost:8501
