---
title: "Agent with Tool with Microsoft Agent Framework"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/agent_framework/agent_with_tool/README.md"
sourceRel: "ch10/agent_framework/agent_with_tool/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/agent_framework/agent_with_tool/README.md"
sourceSha256: "1dfb0ef808bb8cfa71091baeb5433be7192cb75c9a241008f24f5df93d6ac9e7"
pageSha256: "1dfb0ef808bb8cfa71091baeb5433be7192cb75c9a241008f24f5df93d6ac9e7"
contentMode: "local-full"
zh: ""
---

# Agent with Tool with Microsoft Agent Framework

This example demonstrates how to create an agent equipped with custom tools using the Microsoft Agent Framework. The agent uses small demo tools for weather and time so you can see tool selection in action.

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

The agent will reply using the tool function defined: 

```
User: What's the weather in Madrid?
Agent response: It’s sunny in Madrid right now. Would you like the forecast or temperatures for today and the next few days?
```
