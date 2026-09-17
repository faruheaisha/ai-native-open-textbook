---
title: "Fastest RAG stack with Milvus and Groq"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/fastest-rag-milvus-groq/README.md"
sourceRel: "fastest-rag-milvus-groq/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/fastest-rag-milvus-groq/README.md"
sourceSha256: "35ba1da5fff46e2cc03c42a448ef9459f972e5c71cb4f1d73f3034a126910f05"
pageSha256: "35ba1da5fff46e2cc03c42a448ef9459f972e5c71cb4f1d73f3034a126910f05"
contentMode: "local-full"
zh: ""
---

# Fastest RAG stack with Milvus and Groq

This project builds the fastest stack to build a RAG application with **retrieval latency < 15ms**. 

It leverages binary quantization for efficient retrieval coupled with Groq's blazing fast inference speeds.

We use:

- LlamaIndex for orchestrating the RAG app.
- Milvus vectorDB for binary vector indexing and storage.
- Groq as the inference engine for MoonshotAI's Kimi K2.
- [Beam](https://www.beam.cloud/) for ultra-fast serverless deployment.

## Setup and Installation

Ensure you have Python 3.11 or later installed on your system.

First, let’s install uv and set up our Python project and environment:
```bash
# MacOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**Install dependencies**:

```bash
# Create a new directory for our project
uv init fastest-rag
cd fastest-rag

# Create virtual environment and activate it
uv venv
source .venv/bin/activate  # MacOS/Linux

.venv\Scripts\activate     # Windows

# Install dependencies
uv add pymilvus llama-index llama-index-embeddings-huggingface llama-index-llms-groq streamlit beam-client
```

**Setup Groq**:

Get an API key from [Groq](https://console.groq.com/) and set it in the `.env` file as follows:

```bash
GROQ_API_KEY=<YOUR_GROQ_API_KEY> 
```

**Setup Beam**:

- Go to https://www.beam.cloud/ and get started
- Your default token will be generated automatically

In your terminal add the command with your beam token to register
```bash
beam configure default --token <YOUR_BEAM_TOKEN>
```

**Deploy the app on Beam cloud**:
```bash
python start_server.py
```

This will successfully deploy your streamlit application on Beam cloud. 

Copy the generated link and access the app straight from your browser.

**Run the app locally (optional)**:

   Or you can also run the app locally by running the following command:

   ```bash
   streamlit run app.py
   ```

---

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
