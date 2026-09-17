---
title: "Agent with custom tool in LlamaIndex"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/llamaindex/agent_with_tool/README.md"
sourceRel: "ch10/llamaindex/agent_with_tool/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/llamaindex/agent_with_tool/README.md"
sourceSha256: "e9a3f93508143da936b6cb06be946e3f986077928b800cc383870dbd51cd3c4e"
pageSha256: "e9a3f93508143da936b6cb06be946e3f986077928b800cc383870dbd51cd3c4e"
contentMode: "local-full"
zh: ""
---

# Agent with custom tool in LlamaIndex

This example demonstrates how to create a LlamaIndex agent capable of using custom tools to extend its capabilities beyond its core knowledge. Tools allow agents to interact with the external environment, perform specific actions, or retrieve information that is not available in their pre-trained data or through RAG.

In this example, a simple `get_current_weather` tool is defined and then provided to a LlamaIndex `FunctionAgent`. The agent can then decide when to use this tool based on the user's query.

## Requirements

* [Python](https://www.python.org/) 3.10+
* An [OpenAI API key](https://platform.openai.com/api-keys) set as an environment variable (`OPENAI_API_KEY`)

## Steps for running this example in the shell

1. Install dependencies:
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

2. Export your API key as an environment variable:
```bash
export OPENAI_API_KEY="sk-..." # Windows cmd: set OPENAI_API_KEY="sk-..." # Windows PowerShell: $env:OPENAI_API_KEY="sk-..."
```

3. Run the script:
```bash
python agent_with_tool.py
```

## Output

The script will demonstrate an interaction with the agent. The agent will respond to queries about the weather by utilizing the `get_current_weather` tool when appropriate.
