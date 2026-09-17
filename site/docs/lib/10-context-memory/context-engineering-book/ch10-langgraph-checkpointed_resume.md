---
title: "LangGraph checkpointed resume"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langgraph/checkpointed_resume/README.md"
sourceRel: "ch10/langgraph/checkpointed_resume/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langgraph/checkpointed_resume/README.md"
sourceSha256: "50a7a0a7774ca68de8147e2ea1cfd3f8096e624d09161da23ef30e105836eb00"
pageSha256: "50a7a0a7774ca68de8147e2ea1cfd3f8096e624d09161da23ef30e105836eb00"
contentMode: "local-full"
zh: ""
---

# LangGraph checkpointed resume

This example shows persisted state surviving a pause/resume boundary.

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
python checkpointed_resume.py
```

## What it demonstrates

- A graph compiled with a checkpointer
- State loaded back by thread id after the first pause
- Final state completed on resume without losing the draft

## Output

When you run the script, it will print the results to the terminal.
