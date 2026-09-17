---
title: "AI Avatar Demo powered by Zep"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/ai-avatar-demo/README.md"
sourceRel: "ai-avatar-demo/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/ai-avatar-demo/README.md"
sourceSha256: "253395090143ff3bb4767f173d61a74e9a350e1c8da37ffc0ca7fdebd2264fad"
pageSha256: "253395090143ff3bb4767f173d61a74e9a350e1c8da37ffc0ca7fdebd2264fad"
contentMode: "local-full"
zh: ""
---

# AI Avatar Demo powered by Zep

A conversational AI assistant powered by [Zep](https://www.getzep.com/) knowledge graphs, custom LLM integration, and Anam AI avatar—creating natural conversations with memory and context-aware responses.

We use:

- [Zep](https://www.getzep.com/) for conversation memory and knowledge graph management
- Anam AI for realistic avatar and voice interactions
- OpenRouter with Minimax M2 (LLM)
- FastAPI for streaming backend
- Streamlit to wrap the logic in an interactive UI

## Architecture

![Architecture Diagram](/mirror/85/8568eda064370c7097dd40921398d89d1ef4a526.webp)

## Set Up

Run these commands in project root

### Install Dependencies

```bash
uv sync
```

### Configure Environment

Create a `.env` file in the project root, similar to `.env.example`, and add your API keys:

[Get your Zep API keys here](https://www.getzep.com/)

### Ingest Data

To populate the knowledge graph with your data:

```bash
python scripts/ingest_to_graph.py
```

### Run the Application

Start the backend server:

```bash
uvicorn backend:app --port 8000 --reload
```

In a separate terminal, start the frontend:

```bash
streamlit run app.py
```

## Usage

1. Enter your session unique name in the sidebar
2. Click "Initialize New Session" to create a Zep session
3. Click "Start Conversation" to interact with the avatar
4. The assistant uses knowledge graph context and conversation history for personalized responses

Note: To understand Zep better, we recommend going through the Jupyter notebook (`zep_demo.ipynb`) provided in the project root.

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
