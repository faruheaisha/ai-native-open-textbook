---
title: "Sorting Hat"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/agno/sorting_hat/README.md"
sourceRel: "ch10/agno/sorting_hat/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/agno/sorting_hat/README.md"
sourceSha256: "97453c6fc65912dd02332debbb44037814173b78b64767b0721ca0417707632b"
pageSha256: "97453c6fc65912dd02332debbb44037814173b78b64767b0721ca0417707632b"
contentMode: "local-full"
zh: ""
---

# Sorting Hat

This example uses Agno's real `Agent` and `Workspace` APIs to inspect the local `ch10/agno` directory.

The important part is the boundary: the agent only gets read-style workspace access, so it can inventory the folder without seeing the rest of the repository. That makes it a good fit for Agno's runtime/control-plane model, where the same agent can later be managed, traced, and served through AgentOS.

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
python sorting_hat.py
```

## What it demonstrates

- Scoped workspace access to local files.
- A single agent that reasons over its own project folder.
- A clear path from ad-hoc script to managed AgentOS service.

## Output

When you run the script, it will print the results to the terminal.
