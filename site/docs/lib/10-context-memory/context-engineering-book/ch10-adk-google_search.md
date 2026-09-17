---
title: "Google search example"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/adk/google_search/README.md"
sourceRel: "ch10/adk/google_search/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/adk/google_search/README.md"
sourceSha256: "26cc4eab40ff6453f84d79e4ceb0286889c7ff507547abc7372ceadc41e1fcad"
pageSha256: "26cc4eab40ff6453f84d79e4ceb0286889c7ff507547abc7372ceadc41e1fcad"
contentMode: "local-full"
zh: ""
---

# Google search example

This example demonstrates how to integrate Google Search as a grounding tool within an ADK agent, allowing the agent to retrieve real-time information from the web to answer user queries.

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
python google_search.py
```

## Output

The agent will respond to your queries, potentially using Google Search to find the answer. You will observe when it invokes the search tool and the results it obtains.
