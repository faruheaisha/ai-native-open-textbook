---
title: "Context compression Agent Development Kit (ADK)"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/adk/context_compression/README.md"
sourceRel: "ch10/adk/context_compression/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/adk/context_compression/README.md"
sourceSha256: "2634cf1972c5d19435ec151c83826ed3a9a89cb053e25ed143afc5ab4b3fb16b"
pageSha256: "2634cf1972c5d19435ec151c83826ed3a9a89cb053e25ed143afc5ab4b3fb16b"
contentMode: "local-full"
zh: ""
---

# Context compression Agent Development Kit (ADK)

This example demonstrates how to implement and use context compression within an ADK agent. It showcases how to manage and reduce the size of the conversation history passed to the LLM, improving efficiency and controlling token usage for longer interactions.

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
python context_compression.py
```

## Output

The agent will respond to user prompts, demonstrating efficient context handling. Example of a possible output:

```
[user]: Your long prompt here.
[root_agent]: The agent's concise response.
```
