---
title: "Multiplatform Deep Researcher"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/multiplatform_deep_researcher/README.md"
sourceRel: "multiplatform_deep_researcher/README.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/multiplatform_deep_researcher/README.md"
sourceSha256: "92b31a0d5e8cf263dd4cfe7203ddb6df35ba36246f724e0a752a5673a40de763"
pageSha256: "92b31a0d5e8cf263dd4cfe7203ddb6df35ba36246f724e0a752a5673a40de763"
contentMode: "local-full"
zh: ""
---

# Multiplatform Deep Researcher

We're building an MCP-powered multi-agent, multi-platform deep researcher, it can perform deep web searches using [Brightdata's](https://brightdata.com/ai/mcp-server) (Web MCP server), with agents orchestrated through CrewAI.

We use:

- [Brightdata](https://brightdata.com/ai/mcp-server) (Web MCP server)
- [CrewAI](https://docs.crewai.com/) (Agentic design)
- [Ollama](https://ollama.com/) to locally serve LLM
- [Streamlit](https://streamlit.io/) to wrap the logic in an interactive UI

## Set Up

Follow these steps one by one:

### Create .env File

Create a `.env` file in the root directory of your project with the following content:

```env
OPENAI_API_KEY=&lt;your_openai_api_key>
BRIGHT_DATA_API_TOKEN=&lt;your_bright_data_api_token>
```

### Download Ollama

Download and install [Ollama](https://ollama.com/download) for your operating system. Ollama is used to run large language models locally.

For example, on linux, you can use the following command:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

Pull the required model:

```bash
ollama pull gpt-oss
```

### Install Dependencies

```bash
uv sync
source .venv/bin/activate
```

This command will install all the required dependencies for the project.

## Run CrewAI Agentic Workflow

To run the CrewAI flow, execute the following command:

```bash
python flow.py
```

Running this command will start the CrewAI agentic workflow, which will handle the multi-agent orchestration for deep web research using Brightdata's Web MCP server.

## Run Streamlit Interface

To run the Streamlit interface, execute the following command:

```bash
streamlit run app.py
```

Running this command will start the Streamlit interface, allowing you to interact with the deep research application through a user-friendly web interface. Check the terminal output for the local URL to access the interface in your web browser. Go to the provided URL (usually `http://localhost:8501`) to access the Streamlit app.

## 📬 Stay Updated with Our Newsletter!

**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

## Contribution
