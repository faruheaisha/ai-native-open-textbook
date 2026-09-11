---
title: "Hidden Gems World Travel Guide (RAG)"
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

# Hidden Gems World Travel Guide (RAG)

A Retrieval-Augmented Generation (RAG) chatbot that answers questions about hidden travel gems using locally generated markdown guides.

## Setup

### 1. Generate the Travel Guides

Before running the app, you need to generate the travel guide markdown files:

```bash
python hidden_gem_finder.py
```

This will:
- Create the `hidden_gems_output/` directory
- Generate 5 continent guide files (africa_guide.md, asia_guide.md, europe_guide.md, americas_guide.md, oceania_guide.md)
- Each guide contains 3 countries with 10 sites per country (15 countries total)
- Uses OpenAI `gpt-5-nano` to generate the content

**Note:** This requires an OpenAI API key in your `.env` file and will make API calls to generate the guides.

### 2. Run the RAG App

```bash
python app.py
```

The app will:
- Load and index the markdown guides from `hidden_gems_output/`
- Start a Gradio chat interface
- Use OpenAI `gpt-5-nano` for retrieval and answering
- Use Anthropic `claude-sonnet-4-5` for evaluation and auto-retry

## Environment Variables

Required:
- `OPENAI_API_KEY` - For chat and embeddings
- `ANTHROPIC_API_KEY` - For evaluator (optional, but recommended)

## Features

- RAG over travel guide markdown files
- Automatic country detection and validation
- Auto-retry with evaluator feedback
- Clean UI with information about available countries and fields
