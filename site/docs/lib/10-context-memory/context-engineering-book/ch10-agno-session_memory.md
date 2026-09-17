---
title: "Session Memory"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/agno/session_memory/README.md"
sourceRel: "ch10/agno/session_memory/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/agno/session_memory/README.md"
sourceSha256: "2bde240206dc3a1be62912622e752c56c0018c2e35b594eb936c8bd64ea583b6"
pageSha256: "2bde240206dc3a1be62912622e752c56c0018c2e35b594eb936c8bd64ea583b6"
contentMode: "local-full"
zh: ""
---

# Session Memory

This companion would show how Agno reloads prior chat history between runs so the agent can continue a conversation instead of starting from scratch.

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
python session_memory.py
```

## Output

When you run the script, it will print the results to the terminal.
