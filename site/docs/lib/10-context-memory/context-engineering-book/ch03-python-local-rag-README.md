---
title: "Context Engineering（Bonigarcia 教程）"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# Context Engineering（Bonigarcia 教程）

## Local retrieval-augmented generation (RAG)

This sample application implements a local RAG system using the following stack:

- LLM: [Llama 3.2 1B](https://ollama.com/library/llama3.2:1b) via [Ollama](https://ollama.com/download)
- Embedding model: [Nomic Embed Text](https://ollama.com/library/nomic-embed-text) (embedder for OllamaEmbedder)
- Vector database: [Qdrant](https://qdrant.tech/)
- Agent framework: [Agno](https://github.com/agno-agi/agno)

### Requirements

To run this example, you need the following:

- [Python](https://www.python.org/), for  the local RAG.
- [Ollama](https://ollama.com/), for the LLM and the embedding model.
- [Docker](https://www.docker.com/), for the vector database.
- [Node.js](https://nodejs.org/), for the agent web interface.

### Steps for running this example

1. Pull Llama 3.2 1B and Nomic Embed Text with Ollama:
```bash
ollama pull llama3.2:1b
ollama pull nomic-embed-text
```

2. Pull and install Qdrant with Docker:
```bash
docker pull qdrant/qdrant
docker run -p 6333:6333 qdrant/qdrant
```

3. Install dependencies:
```bash
python -m venv .venv

# macOS/Linux:
source .venv/bin/activate

# Windows Command Prompt:
.venv\Scripts\activate.bat

# Windows PowerShell:
.venv\Scripts\Activate.ps1

pip install -r requirements.txt
```

4. Run the script. Check that the agent API interface is working at http://localhost:7777/
```bash
python local_rag.py
```

5. Install a web interface. Open the UI interface and interact with the agent at http://localhost:3000/
```bash
npx create-agent-ui@latest
cd agent-ui
npm install
npm run dev
```

![RAG UI interface](https://gh-proxy.com/https://raw.githubusercontent.com/bonigarcia/context-engineering/46719154489e410b509db4fb69ab1c29fb3362a0/docs/img/loca-rag-ui.png)
