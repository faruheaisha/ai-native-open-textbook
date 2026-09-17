---
title: "Basic agent with Agent Development Kit (ADK)"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/adk/basic_agent/README.md"
sourceRel: "ch10/adk/basic_agent/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/adk/basic_agent/README.md"
sourceSha256: "e3bc18f30d6f0a5eba0a715354d491e10aabd7af359686bd89e45b18422f0250"
pageSha256: "e3bc18f30d6f0a5eba0a715354d491e10aabd7af359686bd89e45b18422f0250"
contentMode: "local-full"
zh: ""
---

# Basic agent with Agent Development Kit (ADK)

This example demonstrates how to create and run a simple LLM agent using the Agent Development Kit (ADK). The agent is configured with a basic system instruction and responds to a user prompt, showcasing the fundamental interaction flow in ADK.

## Requirements

* [Python](https://www.python.org/) 3.10+
* A [Google API key](https://ai.google.dev/) set as an environment variable (`GOOGLE_API_KEY`)

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
export GOOGLE_API_KEY="sk-..." # Windows cmd: set GOOGLE_API_KEY="sk-..." # Windows PowerShell: $env:GOOGLE_API_KEY="sk-..."
```

3. Run the script:
```bash
python basic_agent.py
```

## Output

The agent will respond to user prompts, for example as follows:

```
User: Hello, agent!
Agent: Hello there! How can I assist you today?
```
