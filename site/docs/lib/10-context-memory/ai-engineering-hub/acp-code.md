---
title: "Summary Generator multi-agent workflow with ACP"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/README.md"
zh: ""
---

# Summary Generator multi-agent workflow with ACP

A simple demonstration of the Agent Communication Protocol (ACP), showcasing how two agents built using different frameworks (CrewAI and Smolagents) can collaborate seamlessly to generate and verify a research summary.

---

## Setup and Installation

1. **Install Ollama:**
   ```bash
   # Setting up Ollama on linux
   curl -fsSL https://ollama.com/install.sh | sh

   # Pull the Qwen2.5 model
   ollama pull qwen2.5:14b
   ```

2. **Install project dependencies:**

    Ensure you have Python 3.10 or later installed on your system.

    First, install `uv` and set up the environment:
    ```bash
    # MacOS/Linux
    curl -LsSf https://astral.sh/uv/install.sh | sh

    # Windows
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

    Install dependencies:
    ```bash
    # Create a new directory for our project
    uv init acp-project
    cd acp-project

    # Create virtual environment and activate it
    uv venv
    source .venv/bin/activate  # MacOS/Linux

    .venv\Scripts\activate     # Windows

    # Install dependencies
    uv add acp-sdk crewai smolagents duckduckgo-search ollama
    ```

You can also use any other LLM providers such as OpenAI or Anthropic. Create a `.env` file and add your API keys
```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

## Usage
Start the two ACP servers in separate terminals:

```bash
# Terminal 1
uv run crew_acp_server.py

# Terminal 2
uv run smolagents_acp_server.py
```

Run the ACP client to trigger the agent workflow:

```bash
uv run acp_client.py
```

Output:

A general summary from the first agent

A fact-checked and updated version from the second agent

## 📬 Stay Updated with Our Newsletter!
**Get a FREE Data Science eBook** 📖 with 150+ essential lessons in Data Science when you subscribe to our newsletter! Stay in the loop with the latest tutorials, insights, and exclusive resources. [Subscribe now!](https://join.dailydoseofds.com)

[![Daily Dose of Data Science Newsletter](https://github.com/patchy631/ai-engineering/blob/main/resources/join_ddods.png)](https://join.dailydoseofds.com)

---

## Contribution
